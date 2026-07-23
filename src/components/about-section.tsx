import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react"
import { aboutSection } from "../content/site-content"
import { AboutEmblem } from "./about/about-emblem"
import {
  aboutHeroTransition,
  clamp01,
  getAboutHeroPresentation,
} from "./about/about-hero-transition"
import { Container } from "./ui/container"
import { Reveal, RevealGroup } from "./ui/reveal"

const ABOUT_INK_BLEED_FILTER_ID = "about-headline-ink-bleed"
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

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const revealTriggerRef = useRef<HTMLDivElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const progress = useAboutSceneProgress(sectionRef)
  const presentation = getAboutHeroPresentation({
    progress,
    prefersReducedMotion,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

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
        ref={revealTriggerRef}
        position="absolute"
        top="100dvh"
        w="1px"
        h="1px"
        aria-hidden
        pointerEvents="none"
      />
      <Box
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
          <RevealGroup triggerRef={revealTriggerRef} rootMargin="0px">
            <Flex
              direction="column"
              align="center"
              w="full"
              css={{ gap: ABOUT_END_STACK_GAP }}
            >
              {/* Emblem mark keeps scroll morph; curved tagline staggers via Reveal. */}
              <Box
                w="full"
                maxW={ABOUT_END_EMBLEM_MAX_W}
                mx="auto"
                flexShrink={1}
                minH={0}
              >
                <AboutEmblem
                  mode="about"
                  skipIntro
                  revealCurvedText
                  presentation={{
                    emblemScale: presentation.emblemScale,
                    heroAnimationOpacity: presentation.heroAnimationOpacity,
                    aboutAnimationOpacity: presentation.aboutAnimationOpacity,
                    aboutAnimationProgress: presentation.aboutAnimationProgress,
                  }}
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
                />
              </Flex>
            </Flex>
          </RevealGroup>
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

function AboutCopyLayer({
  headline,
  body,
}: {
  headline: string
  body: string
}) {
  return (
    <Flex
      direction="column"
      align="center"
      w="full"
      css={{ gap: ABOUT_END_COPY_GAP }}
    >
      <Reveal order={1} w="full">
        <Heading
          as="h2"
          textAlign="center"
          fontFamily="cossetteTitre"
          fontWeight="bold"
          fontSize={{ base: "48px", lg901: ABOUT_END_HEADLINE_SIZE }}
          lineHeight="1.1"
          color="warmDisplay"
          maxW="54.625rem"
          mx="auto"
          filter={`blur(0.7px) url(#${ABOUT_INK_BLEED_FILTER_ID})`}
          css={{
            textWrap: "balance",
            [`@media ${ABOUT_SHORT_VIEWPORT}`]: {
              maxWidth: "42rem",
            },
          }}
        >
          {headline}
        </Heading>
      </Reveal>
      <Reveal order={2} w="full">
        <Text
          textAlign="center"
          fontFamily="sans"
          fontWeight="normal"
          fontSize="18px"
          lineHeight="27px"
          letterSpacing="-0.36px"
          color="warmMuted"
          maxW="33.25rem"
          mx="auto"
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
      </Reveal>
    </Flex>
  )
}
