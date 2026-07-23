import type { MouseEvent } from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { heroSection, links } from "../content/site-content"
import { getHeroRevealStyle } from "./hero-reveal"
import { Button, CtaArrow } from "./ui/button"

export type HeroLayout = "centered" | "split"

const HERO_INK_BLEED_FILTER_ID = "hero-headline-ink-bleed"
/** Pin/compress copy when the viewport is too short. */
const HERO_SHORT_VIEWPORT = "(max-height: 900px)"
const HERO_SHORT_VIEWPORT_TIGHT = "(max-height: 720px)"

interface HeroSplitProps {
  isIntroVisible: boolean
  prefersReducedMotion: boolean
  /** TEMP: swaps centered ↔ split hero layouts for A/B comparison. */
  onToggleLayout?: () => void
  onBackgroundClick?: (event: MouseEvent<HTMLElement>) => void
}

export function HeroSplit({
  isIntroVisible,
  prefersReducedMotion,
  onToggleLayout,
  onBackgroundClick,
}: HeroSplitProps) {
  return (
    <Flex
      as="header"
      position="relative"
      direction="column"
      minH="heroMinHeight"
      h="100%"
      bg="transparent"
      overflow="hidden"
      onClick={onBackgroundClick}
      css={{
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

      <Flex
        position="relative"
        zIndex={2}
        flex="1"
        align="flex-end"
        px={{ base: "6", lg901: "10" }}
        py={{ base: "16", lg901: "24" }}
      >
        <Flex
          w="full"
          maxW="container"
          mx="auto"
          direction={{ base: "column", lg901: "row" }}
          align={{ base: "center", lg901: "flex-end" }}
          justify="space-between"
          gap={{ base: "8", lg901: "12" }}
          textAlign={{ base: "center", lg901: "left" }}
        >
          <Box flexShrink={0} w={{ base: "full", lg901: "auto" }}>
            <Heading
              as="h1"
              textAlign={{ base: "center", lg901: "left" }}
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
            <Flex
              flexWrap="wrap"
              align="center"
              justify={{ base: "center", lg901: "flex-start" }}
              gap="6"
              mt="6"
              pointerEvents={isIntroVisible ? "auto" : "none"}
              aria-hidden={!isIntroVisible}
              style={getHeroRevealStyle({
                isVisible: isIntroVisible,
                prefersReducedMotion,
                delayMs: 400,
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
          </Box>

          <Text
            textAlign={{ base: "center", lg901: "left" }}
            fontFamily="sans"
            fontWeight="normal"
            fontSize="18px"
            lineHeight="27px"
            letterSpacing="-0.36px"
            color="warmMuted"
            maxW="33.25rem"
            alignSelf={{ base: "center", lg901: "center" }}
            style={getHeroRevealStyle({
              isVisible: isIntroVisible,
              prefersReducedMotion,
              delayMs: 200,
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
      </Flex>
    </Flex>
  )
}
