import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react"
import {
  aboutSection,
  heroSection,
  links,
} from "../content/site-content"
import { colors } from "../theme/tokens"
import { AboutEmblem } from "./about/about-emblem"
import {
  aboutHeroTransition,
  clamp01,
  getAboutHeroPresentation,
} from "./about/about-hero-transition"
import { Button, CtaArrow } from "./ui/button"
import { Container } from "./ui/container"

const ABOUT_INK_BLEED_FILTER_ID = "about-headline-ink-bleed"
const ABOUT_BG_SURFACE_ID = "about-bg-surface"
const ABOUT_BG_VIDEO_ID = "about-bg-video"
const HERO_REVEAL_EASE = "cubic-bezier(0.2, 0, 0, 1)"
const HERO_REVEAL_DURATION_MS = 360
const HERO_REVEAL_STAGGER_MS = 200
/** Pin/compress hero copy when the viewport is too short to center emblem + copy. */
const HERO_SHORT_VIEWPORT = "(max-height: 900px)"
const HERO_SHORT_VIEWPORT_TIGHT = "(max-height: 720px)"
/** About end-state: body copy only shrinks at extreme short heights. */
const ABOUT_EXTREME_VIEWPORT = "(max-height: 640px)"
/**
 * Nav occupies ~84px (top offset + bar). Reserve that plus breathing room so
 * the curved tagline never sits under the sticky nav.
 */
const ABOUT_END_STAGE_PT = "108px"
const ABOUT_END_STAGE_PB = "clamp(1.5rem, 2dvh, 2rem)"
/** Below this height, pin the About stack to the bottom so nothing clips.
 *  901px covers a typical 14" MacBook browser viewport at full height. */
const ABOUT_SHORT_VIEWPORT = "(max-height: 901px)"
/**
 * Preserve enough arc width for the curved type to retain its intended
 * presence. The animated mark is scaled separately inside the emblem.
 */
const ABOUT_END_EMBLEM_MAX_W =
  "clamp(20rem, calc(77.8dvh - 100px), 48.25rem)"
/** ~48px at 540px height, ~60px at 720px, ~72px at 900px. */
const ABOUT_END_HEADLINE_SIZE =
  "clamp(48px, calc(12px + 6.67dvh), 75.8px)"
const ABOUT_END_STACK_GAP =
  "clamp(2rem, 1rem + 3dvh, 3.5rem)"
const ABOUT_END_COPY_GAP =
  "clamp(1rem, 0.5rem + 1.25dvh, 1.5rem)"

function mountAboutBackground({ stageElement }: { stageElement: HTMLElement }) {
  const surface = document.getElementById(ABOUT_BG_SURFACE_ID)
  const video = document.getElementById(ABOUT_BG_VIDEO_ID)

  if (surface) stageElement.prepend(surface)

  if (video instanceof HTMLVideoElement) {
    if (surface?.parentElement === stageElement) surface.after(video)
    else stageElement.prepend(video)

    if (getComputedStyle(video).display !== "none" && video.paused) {
      void video.play().catch(() => {
        // Autoplay can still fail until a trusted gesture; muted + playsinline usually works.
      })
    }
  }
}

export function AboutSection({
  onHeroSettled: onHeroSettledProp,
}: {
  onHeroSettled?: () => void
} = {}) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const emblemSlotRef = useRef<HTMLDivElement>(null)
  const hasBgVideoFadedInRef = useRef(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isHeroSettled, setIsHeroSettled] = useState(false)
  const [emblemSlotHeight, setEmblemSlotHeight] = useState(0)
  const progress = useAboutSceneProgress(sectionRef)
  const presentation = getAboutHeroPresentation({
    progress,
    prefersReducedMotion,
  })

  const handleHeroSettled = useCallback(() => {
    setIsHeroSettled(true)
    onHeroSettledProp?.()
  }, [onHeroSettledProp])

  useLayoutEffect(() => {
    const stageElement = stageRef.current
    if (!stageElement) return

    mountAboutBackground({ stageElement })
  }, [])

  const isHeroIntroVisible = prefersReducedMotion || isHeroSettled

  useLayoutEffect(() => {
    const video = document.getElementById(ABOUT_BG_VIDEO_ID)
    if (!(video instanceof HTMLVideoElement)) return

    const targetOpacity = isHeroIntroVisible
      ? presentation.bgVideoOpacity
      : 0

    if (!isHeroIntroVisible) {
      hasBgVideoFadedInRef.current = false
      video.style.transition = "none"
      video.style.opacity = "0"
      return
    }

    if (prefersReducedMotion) {
      hasBgVideoFadedInRef.current = true
      video.style.transition = "none"
      video.style.opacity = String(targetOpacity)
      return
    }

    if (!hasBgVideoFadedInRef.current) {
      hasBgVideoFadedInRef.current = true
      video.style.transition = "none"
      video.style.opacity = "0"
      void video.offsetWidth
      video.style.transition = `opacity ${HERO_REVEAL_DURATION_MS}ms ${HERO_REVEAL_EASE}`
      video.style.opacity = String(targetOpacity)

      const handleTransitionEnd = (event: TransitionEvent) => {
        if (event.propertyName !== "opacity") return
        video.style.transition = "none"
      }

      video.addEventListener("transitionend", handleTransitionEnd)
      return () => video.removeEventListener("transitionend", handleTransitionEnd)
    }

    video.style.transition = "none"
    video.style.opacity = String(targetOpacity)
  }, [
    isHeroIntroVisible,
    prefersReducedMotion,
    presentation.bgVideoOpacity,
  ])

  useLayoutEffect(() => {
    const emblemSlot = emblemSlotRef.current
    if (!emblemSlot) return

    const updateHeight = () => {
      setEmblemSlotHeight(emblemSlot.getBoundingClientRect().height)
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(emblemSlot)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleChange = () => {
      const matches = mediaQuery.matches
      setPrefersReducedMotion(matches)
      if (matches) setIsHeroSettled(true)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const areHeroCtasInteractive =
    isHeroIntroVisible && presentation.heroCopyOpacity > 0.5

  return (
    <Box
      ref={sectionRef}
      as="section"
      id="about"
      position="relative"
      h={`${aboutHeroTransition.scrollHeightVh}vh`}
      bg="transparent"
    >
      <Box
        ref={stageRef}
        position="sticky"
        top="0"
        h="100dvh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        px={{ base: "6", lg901: "12" }}
        pt={ABOUT_END_STAGE_PT}
        pb={ABOUT_END_STAGE_PB}
        bg="transparent"
        css={{
          // Tall screens: center in the nav-safe stage.
          // Short screens: pin to the bottom so the arc/body stay in frame.
          [`@media ${ABOUT_SHORT_VIEWPORT}`]: {
            justifyContent: "flex-end",
          },
        }}
      >
        <Box
          position="absolute"
          inset="0"
          zIndex={0}
          pointerEvents="none"
          backgroundImage={`linear-gradient(to top, ${colors.pageBg.value} 0%, transparent 72%)`}
          aria-hidden
        />

        <svg
          width="0"
          height="0"
          aria-hidden
          focusable="false"
          style={{ position: "absolute" }}
        >
          <filter
            id={ABOUT_INK_BLEED_FILTER_ID}
            colorInterpolationFilters="sRGB"
          >
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 1 1 1" />
            </feComponentTransfer>
          </filter>
        </svg>

        <Container position="relative" zIndex={1} w="full">
          <Flex
            direction="column"
            align="center"
            w="full"
            css={{ gap: ABOUT_END_STACK_GAP }}
          >
            {/* About end state: curved mark above, headline below.
                Emblem width scales with viewport height so the arc clears the nav. */}
            <Box
              ref={emblemSlotRef}
              w="full"
              maxW={ABOUT_END_EMBLEM_MAX_W}
              mx="auto"
              flexShrink={1}
              minH={0}
            >
              <AboutEmblem
                presentation={{
                  emblemScale: presentation.emblemScale,
                  curvedTextOpacity: presentation.curvedTextOpacity,
                  heroAnimationOpacity: presentation.heroAnimationOpacity,
                  aboutAnimationOpacity: presentation.aboutAnimationOpacity,
                  aboutAnimationProgress: presentation.aboutAnimationProgress,
                }}
                onHeroSettled={handleHeroSettled}
              />
            </Box>

            <Flex
              direction="column"
              align="center"
              w="full"
              maxW="75rem"
              flexShrink={0}
              css={{ gap: ABOUT_END_COPY_GAP }}
            >
              <AboutCopyLayer
                headline={aboutSection.headline}
                body={aboutSection.body}
                headlineOpacity={presentation.aboutHeadlineOpacity}
                bodyOpacity={presentation.aboutBodyOpacity}
              />
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Hero copy/CTAs sit below the mark and scroll away with blur + fade.
          Wide-but-short laptops still hit lg901 width breakpoints, so height
          media queries pin this stack to the bottom and let the emblem spacer
          compress instead of clipping CTAs. */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        h="100dvh"
        display={prefersReducedMotion ? "none" : "flex"}
        flexDirection="column"
        justifyContent="flex-end"
        px={{ base: "6", lg901: "12" }}
        pt={{ base: "24", lg901: "28" }}
        pb={{ base: "10", lg901: "12" }}
        zIndex={2}
        pointerEvents="none"
        css={{
          [`@media ${HERO_SHORT_VIEWPORT}`]: {
            paddingBottom: "40px",
          },
          [`@media ${HERO_SHORT_VIEWPORT_TIGHT}`]: {
            paddingBottom: "24px",
            paddingTop: "72px",
          },
        }}
      >
        <Container w="full">
          <Flex
            direction="column"
            align="center"
            gap={{ base: "10", lg901: "14" }}
            w="full"
            css={{
              [`@media ${HERO_SHORT_VIEWPORT}`]: {
                gap: "1.5rem",
              },
              [`@media ${HERO_SHORT_VIEWPORT_TIGHT}`]: {
                gap: "1rem",
              },
            }}
          >
            <Box
              w="full"
              h={emblemSlotHeight > 0 ? `${emblemSlotHeight}px` : undefined}
              flexShrink={1}
              minH={0}
              visibility="hidden"
              aria-hidden
              css={{
                [`@media ${HERO_SHORT_VIEWPORT}`]: {
                  maxHeight: "22vh",
                },
                [`@media ${HERO_SHORT_VIEWPORT_TIGHT}`]: {
                  maxHeight: "0px",
                  height: "0px",
                },
              }}
            />

            <Flex
              direction="column"
              align="center"
              gap={{ base: "6", lg901: "6" }}
              w="full"
              maxW="75rem"
              flexShrink={0}
              style={{
                opacity: presentation.heroCopyOpacity,
                filter: `blur(${presentation.heroCopyBlurPx}px)`,
                visibility:
                  presentation.heroCopyOpacity > 0.02 ? "visible" : "hidden",
                willChange: "opacity, filter",
              }}
              css={{
                [`@media ${HERO_SHORT_VIEWPORT_TIGHT}`]: {
                  gap: "1rem",
                },
              }}
            >
              <HeroCopyLayer
                isIntroVisible={isHeroIntroVisible}
                prefersReducedMotion={prefersReducedMotion}
              />

              <Flex
                flexWrap="wrap"
                align="center"
                justify="center"
                gap="6"
                pointerEvents={areHeroCtasInteractive ? "auto" : "none"}
                aria-hidden={!areHeroCtasInteractive}
                style={getHeroRevealStyle({
                  isVisible: isHeroIntroVisible,
                  prefersReducedMotion,
                  delayMs: HERO_REVEAL_STAGGER_MS * 2,
                })}
              >
                <Button
                  href={links.getInTouch}
                  size="hero"
                  tabIndex={areHeroCtasInteractive ? 0 : -1}
                >
                  <span>
                    {heroSection.primaryCta}
                    <CtaArrow />
                  </span>
                </Button>
                <Button
                  href={links.tickets}
                  variant="outline-accent"
                  size="hero"
                  tabIndex={areHeroCtasInteractive ? 0 : -1}
                >
                  {heroSection.secondaryCta}
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

function useAboutSceneProgress(sectionRef: RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let frameId = 0

    const updateProgress = () => {
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) {
        setProgress(1)
        return
      }

      const next = clamp01(-section.getBoundingClientRect().top / scrollable)
      setProgress((previous) =>
        Math.abs(previous - next) < 0.0005 ? previous : next,
      )
    }

    const scheduleUpdate = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        updateProgress()
      })
    }

    updateProgress()
    window.addEventListener("scroll", scheduleUpdate, { passive: true })
    window.addEventListener("resize", scheduleUpdate)

    const resizeObserver = new ResizeObserver(scheduleUpdate)
    resizeObserver.observe(section)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", scheduleUpdate)
      window.removeEventListener("resize", scheduleUpdate)
      resizeObserver.disconnect()
    }
  }, [sectionRef])

  return progress
}

function HeroCopyLayer({
  isIntroVisible,
  prefersReducedMotion,
}: {
  isIntroVisible: boolean
  prefersReducedMotion: boolean
}) {
  return (
    <Flex
      direction="column"
      align="center"
      gap="6"
      w="full"
      css={{
        [`@media ${HERO_SHORT_VIEWPORT}`]: {
          gap: "1rem",
        },
        [`@media ${HERO_SHORT_VIEWPORT_TIGHT}`]: {
          gap: "0.75rem",
        },
      }}
    >
      <Heading
        as="p"
        textAlign="center"
        fontFamily="cossetteTitre"
        fontWeight="bold"
        fontSize={{ base: "48px", lg901: "86px" }}
        lineHeight="1.1"
        color="warmDisplay"
        maxW="54.625rem"
        filter={`blur(0.7px) url(#${ABOUT_INK_BLEED_FILTER_ID})`}
        style={getHeroRevealStyle({
          isVisible: isIntroVisible,
          prefersReducedMotion,
          delayMs: 0,
        })}
        css={{
          [`@media ${HERO_SHORT_VIEWPORT}`]: {
            fontSize: "72px",
          },
          [`@media ${HERO_SHORT_VIEWPORT_TIGHT}`]: {
            fontSize: "64px",
          },
        }}
      >
        {heroSection.headlineLine1}
        <br />
        {heroSection.headlineLine2}
      </Heading>
      <Text
        textAlign="center"
        fontFamily="sans"
        fontWeight="normal"
        fontSize="18px"
        lineHeight="27px"
        letterSpacing="-0.36px"
        color="warmMuted"
        maxW="33.25rem"
        style={getHeroRevealStyle({
          isVisible: isIntroVisible,
          prefersReducedMotion,
          delayMs: HERO_REVEAL_STAGGER_MS,
        })}
        css={{
          [`@media ${HERO_SHORT_VIEWPORT_TIGHT}`]: {
            fontSize: "16px",
            lineHeight: "24px",
          },
        }}
      >
        {heroSection.body}
      </Text>
    </Flex>
  )
}

function AboutCopyLayer({
  headline,
  body,
  headlineOpacity,
  bodyOpacity,
}: {
  headline: string
  body: string
  headlineOpacity: number
  bodyOpacity: number
}) {
  const isVisible = headlineOpacity > 0.02 || bodyOpacity > 0.02

  return (
    <Flex
      direction="column"
      align="center"
      w="full"
      pointerEvents="none"
      aria-hidden={!isVisible}
      style={{
        visibility: isVisible ? "visible" : "hidden",
      }}
      css={{ gap: ABOUT_END_COPY_GAP }}
    >
      <Heading
        as="h2"
        textAlign="center"
        fontFamily="cossetteTitre"
        fontWeight="bold"
        fontSize={{ base: "48px", lg901: ABOUT_END_HEADLINE_SIZE }}
        lineHeight="1.1"
        color="warmDisplay"
        maxW="54.625rem"
        filter={`blur(0.7px) url(#${ABOUT_INK_BLEED_FILTER_ID})`}
        opacity={headlineOpacity}
        visibility={headlineOpacity > 0.02 ? "visible" : "hidden"}
        css={{
          textWrap: "balance",
          [`@media ${ABOUT_SHORT_VIEWPORT}`]: {
            maxWidth: "42rem",
          },
        }}
      >
        {headline}
      </Heading>
      <Text
        textAlign="center"
        fontFamily="sans"
        fontWeight="normal"
        fontSize="18px"
        lineHeight="27px"
        letterSpacing="-0.36px"
        color="warmMuted"
        maxW="33.25rem"
        opacity={bodyOpacity}
        visibility={bodyOpacity > 0.02 ? "visible" : "hidden"}
        css={{
          textWrap: "pretty",
          [`@media ${ABOUT_EXTREME_VIEWPORT}`]: {
            fontSize: "16px",
            lineHeight: "24px",
          },
        }}
      >
        {body}
      </Text>
    </Flex>
  )
}

function getHeroRevealStyle({
  isVisible,
  prefersReducedMotion,
  delayMs,
}: {
  isVisible: boolean
  prefersReducedMotion: boolean
  delayMs: number
}) {
  const opacity = isVisible ? 1 : 0

  if (prefersReducedMotion) {
    return {
      opacity,
      visibility: opacity > 0.02 ? "visible" : "hidden",
    } as const
  }

  return {
    opacity,
    visibility: "visible" as const,
    transitionProperty: "opacity",
    transitionDuration: `${HERO_REVEAL_DURATION_MS}ms`,
    transitionTimingFunction: HERO_REVEAL_EASE,
    transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
    willChange: "opacity",
  } as const
}
