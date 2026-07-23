import type { MouseEvent } from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import {
  useCallback,
  useEffect,
  useState,
} from "react"
import { aboutHeroTransition } from "./about/about-hero-transition"
import { AboutEmblem } from "./about/about-emblem"
import { heroSection, links } from "../content/site-content"
import {
  getHeroRevealStyle,
} from "./hero-reveal"
import { HeroSplit, type HeroLayout } from "./hero-split"
import { Button, CtaArrow } from "./ui/button"
import { Container } from "./ui/container"

const HERO_BG_VIDEO_ID = "hero-bg-video"
const HERO_INK_BLEED_FILTER_ID = "hero-headline-ink-bleed"
const HERO_REVEAL_STAGGER_MS = 200
/** Pin/compress hero copy when the viewport is too short to center emblem + copy. */
const HERO_SHORT_VIEWPORT = "(max-height: 900px)"
const HERO_SHORT_VIEWPORT_TIGHT = "(max-height: 720px)"
/**
 * Nav occupies ~84px (top offset + bar). Reserve that plus breathing room so
 * the emblem never sits under the sticky nav.
 */
const HERO_STAGE_PT = "108px"
const HERO_STAGE_PB = "clamp(1.5rem, 2dvh, 2rem)"
const HERO_SHORT_VIEWPORT_STACK = "(max-height: 901px)"
const HERO_EMBLEM_MAX_W =
  "clamp(20rem, calc(77.8dvh - 100px), 48.25rem)"
const HERO_STACK_GAP = "clamp(2rem, 1rem + 3dvh, 3.5rem)"

function toggleHeroBgVideo() {
  const video = document.getElementById(HERO_BG_VIDEO_ID)
  if (!(video instanceof HTMLVideoElement)) return
  if (getComputedStyle(video).display === "none") return

  if (video.paused) {
    void video.play().catch(() => {
      // Play can still fail until a user gesture is trusted by the browser.
    })
    return
  }

  video.pause()
}

function shouldIgnoreHeroVideoToggle(target: EventTarget | null) {
  if (!(target instanceof Element)) return true

  if (target.closest("a, button, input, textarea, select, [role='button']"))
    return true

  if (target.closest("h1, h2, h3, h4, h5, h6, p, span, label")) return true

  return false
}

interface HeroSectionProps {
  layout: HeroLayout
  /** TEMP: Find my tickets swaps layouts for comparison. */
  onToggleLayout: () => void
  onHeroSettled?: () => void
  /** When true, skip replaying the logo intro (layout toggle / remount). */
  isIntroSettled?: boolean
}

export function HeroSection({
  layout,
  onToggleLayout,
  onHeroSettled,
  isIntroSettled = false,
}: HeroSectionProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isLocallySettled, setIsLocallySettled] = useState(isIntroSettled)

  const handleHeroSettled = useCallback(() => {
    setIsLocallySettled(true)
    onHeroSettled?.()
  }, [onHeroSettled])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleChange = () => {
      const matches = mediaQuery.matches
      setPrefersReducedMotion(matches)
      if (matches) {
        setIsLocallySettled(true)
        onHeroSettled?.()
      }
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [onHeroSettled])

  const isIntroVisible =
    prefersReducedMotion || isLocallySettled || isIntroSettled

  const handleBackgroundClick = (event: MouseEvent<HTMLElement>) => {
    if (shouldIgnoreHeroVideoToggle(event.target)) return

    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) return

    toggleHeroBgVideo()
  }

  if (layout === "split") {
    return (
      <Box
        id="hero"
        position="relative"
        minH="heroMinHeight"
        h="100vh"
        bg="transparent"
        overflow="hidden"
      >
        <HeroSplit
          isIntroVisible={isIntroVisible}
          prefersReducedMotion={prefersReducedMotion}
          onToggleLayout={onToggleLayout}
          onBackgroundClick={handleBackgroundClick}
        />
      </Box>
    )
  }

  return (
    <Box
      as="header"
      id="hero"
      position="relative"
      minH="heroMinHeight"
      h="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
      px={{ base: "6", lg901: "12" }}
      pt={HERO_STAGE_PT}
      pb={HERO_STAGE_PB}
      bg="transparent"
      onClick={handleBackgroundClick}
      css={{
        [`@media ${HERO_SHORT_VIEWPORT_STACK}`]: {
          justifyContent: "flex-end",
        },
        "@media (prefers-reduced-motion: reduce)": {
          cursor: "default",
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
        <filter id={HERO_INK_BLEED_FILTER_ID} colorInterpolationFilters="sRGB">
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
          css={{
            gap: HERO_STACK_GAP,
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
            maxW={HERO_EMBLEM_MAX_W}
            mx="auto"
            flexShrink={1}
            minH={0}
          >
            <AboutEmblem
              mode="hero"
              skipIntro={isIntroSettled}
              onHeroSettled={handleHeroSettled}
              curvedTextOpacity={0}
              presentation={{
                emblemScale: aboutHeroTransition.emblemScaleStart,
                heroAnimationOpacity: 1,
                aboutAnimationOpacity: 0,
                aboutAnimationProgress: 0,
              }}
            />
          </Box>

          <Flex
            direction="column"
            align="center"
            gap={{ base: "6", lg901: "6" }}
            w="full"
            maxW="75rem"
            flexShrink={0}
            css={{
              [`@media ${HERO_SHORT_VIEWPORT_TIGHT}`]: {
                gap: "1rem",
              },
            }}
          >
            <HeroCenteredCopy
              isIntroVisible={isIntroVisible}
              prefersReducedMotion={prefersReducedMotion}
            />

            <Flex
              flexWrap="wrap"
              align="center"
              justify="center"
              gap="6"
              pointerEvents={isIntroVisible ? "auto" : "none"}
              aria-hidden={!isIntroVisible}
              style={getHeroRevealStyle({
                isVisible: isIntroVisible,
                prefersReducedMotion,
                delayMs: HERO_REVEAL_STAGGER_MS * 2,
              })}
            >
              <Button
                href={links.getInTouch}
                size="hero"
                tabIndex={isIntroVisible ? 0 : -1}
              >
                <span>
                  {heroSection.primaryCta}
                  <CtaArrow />
                </span>
              </Button>
              <Button
                type="button"
                variant="outline-accent"
                size="hero"
                tabIndex={isIntroVisible ? 0 : -1}
                aria-label={`${heroSection.secondaryCta} (temporary: swap hero layout)`}
                onClick={onToggleLayout}
              >
                {heroSection.secondaryCta}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}

function HeroCenteredCopy({
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
        as="h1"
        textAlign="center"
        fontFamily="cossetteTitre"
        fontWeight="bold"
        fontSize={{ base: "48px", lg901: "86px" }}
        lineHeight="1.1"
        color="warmDisplay"
        maxW="54.625rem"
        filter={`blur(0.7px) url(#${HERO_INK_BLEED_FILTER_ID})`}
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
