import type { MouseEvent } from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { heroSection, links } from "../content/site-content"
import {
  BookCallCtaContent,
  bookCallButtonCss,
  Button,
} from "./ui/button"
import { Container } from "./ui/container"
import { Reveal, RevealGroup } from "./ui/reveal"

const HERO_BG_VIDEO_ID = "hero-bg-video"
/**
 * Pin/compress hero copy when the viewport is too short to center copy. Scoped
 * to landscape so tall portrait phones (e.g. 390x844) keep the roomier mobile
 * rhythm instead of being treated as short viewports.
 */
const HERO_SHORT_VIEWPORT = "(max-height: 900px) and (orientation: landscape)"
const HERO_SHORT_VIEWPORT_TIGHT =
  "(max-height: 720px) and (orientation: landscape)"
/**
 * Desktop: Figma uses 84.5px across a 1200px content bar — cqw keeps that
 * single-line ratio. Mobile: two-line wrap sized in cqw so each line fills the
 * content width without spilling to a 3rd line. The longest line
 * ("MODERN TICKETING,") measures ~7.35x its font size, so 13cqw leaves a small
 * margin under the ~13.6cqw hard limit.
 */
const HERO_HEADLINE_SIZE = {
  base: "clamp(1.875rem, 13cqw, 3.25rem)",
  lg901: "min(84.5px, 7.0417cqw)",
} as const
/**
 * Mobile steps the sub-copy down so it settles on its two authored lines
 * instead of breaking mid-word; the headline carries the size on small screens.
 */
const HERO_BODY_SIZE = {
  base: "16px",
  lg901: "18px",
} as const
/**
 * Nav occupies ~84px (top offset + bar). Reserve that plus breathing room so
 * content never sits under the sticky nav.
 */
const HERO_STAGE_PT = "108px"
const HERO_STAGE_PB = "48px"

/** Figma: transparent "Find my tickets" with light border. */
const findTicketsButtonCss = {
  bg: "transparent",
  borderColor: "rgba(248, 248, 248, 0.44)",
  color: "fg",
  fontWeight: "medium",
  px: "24px",
  py: "14px",
  backdropFilter: "none",
  WebkitBackdropFilter: "none",
  boxShadow: "none",
  _hover: {
    bg: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(248, 248, 248, 0.64)",
    boxShadow: "none",
  },
  _active: {
    bg: "rgba(255, 255, 255, 0.12)",
    boxShadow: "none",
  },
} as const

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

export function HeroSection() {
  const handleBackgroundClick = (event: MouseEvent<HTMLElement>) => {
    if (shouldIgnoreHeroVideoToggle(event.target)) return

    const selection = window.getSelection()
    if (selection && !selection.isCollapsed) return

    toggleHeroBgVideo()
  }

  return (
    <Box
      as="header"
      id="hero"
      position="relative"
      minH="heroMinHeight"
      h="100vh"
      maxH={{ base: "heroMaxHeight", lg901: "none" }}
      display="flex"
      flexDirection="column"
      justifyContent="flex-end"
      alignItems="center"
      overflow="hidden"
      px={{ base: "4", md700: "6", lg901: "12" }}
      pt={HERO_STAGE_PT}
      pb={HERO_STAGE_PB}
      bg="transparent"
      onClick={handleBackgroundClick}
      css={{
        "@media (prefers-reduced-motion: reduce)": {
          cursor: "default",
        },
      }}
    >
      <Container position="relative" zIndex={1} w="full">
        <RevealGroup w="full" rootMargin="0px">
          <Flex
            direction="column"
            align="center"
            gap="6"
            w="full"
            flexShrink={0}
            css={{
              containerType: "inline-size",
              [`@media ${HERO_SHORT_VIEWPORT}`]: {
                gap: "1rem",
              },
              [`@media ${HERO_SHORT_VIEWPORT_TIGHT}`]: {
                gap: "0.75rem",
              },
            }}
          >
            <Reveal order={0} w="full">
              <Heading
                as="h1"
                textAlign="center"
                fontFamily="cossetteTitre"
                fontWeight="bold"
                fontSize={HERO_HEADLINE_SIZE}
                lineHeight="1"
                color="warmDisplay"
                w="full"
                whiteSpace={{ base: "normal", lg901: "nowrap" }}
                css={{
                  textWrap: "balance",
                  "@media (min-width: 901px)": {
                    textWrap: "nowrap",
                  },
                }}
              >
                {heroSection.headlineLine1.toUpperCase()}
                <Box as="br" display={{ base: "block", lg901: "none" }} />
                <Box as="span" display={{ base: "none", lg901: "inline" }}>
                  {" "}
                </Box>
                {heroSection.headlineLine2.toUpperCase()}
              </Heading>
            </Reveal>

            <Reveal order={1} w="full">
              <Flex
                direction={{ base: "column", lg901: "row" }}
                align={{ base: "center", lg901: "center" }}
                justify="space-between"
                gap="6"
                w="full"
              >
                <Text
                  textAlign={{ base: "center", lg901: "left" }}
                  fontFamily="cossetteTexte"
                  fontWeight="normal"
                  fontSize={HERO_BODY_SIZE}
                  lineHeight="1.4"
                  color="warmMuted"
                  flex={{ base: "none", lg901: "1" }}
                  minW="0"
                  css={{
                    textWrap: "pretty",
                    [`@media ${HERO_SHORT_VIEWPORT_TIGHT}`]: {
                      fontSize: "16px",
                    },
                  }}
                >
                  {heroSection.bodyLine1}
                  <br />
                  {heroSection.bodyLine2}
                </Text>

                <Flex
                  direction={{ base: "column", lg901: "row" }}
                  flexWrap={{ base: "nowrap", lg901: "wrap" }}
                  align={{ base: "stretch", lg901: "center" }}
                  justify={{ base: "center", lg901: "flex-end" }}
                  w={{ base: "fit-content", lg901: "auto" }}
                  mx={{ base: "auto", lg901: "0" }}
                  columnGap="6"
                  rowGap="2"
                  flexShrink={0}
                  px="0.5"
                >
                  <Button
                    href={links.getInTouch}
                    size="hero"
                    css={bookCallButtonCss}
                  >
                    <BookCallCtaContent />
                  </Button>
                  <Button
                    href={links.tickets}
                    variant="outline-accent"
                    size="hero"
                    css={findTicketsButtonCss}
                  >
                    {heroSection.secondaryCta}
                  </Button>
                </Flex>
              </Flex>
            </Reveal>
          </Flex>
        </RevealGroup>
      </Container>
    </Box>
  )
}
