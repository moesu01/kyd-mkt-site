import { Box, Flex, Heading } from "@chakra-ui/react"
import { Container } from "./ui/container"
import { Reveal, RevealGroup } from "./ui/reveal"
import { TestimonialCarousel } from "./testimonial-carousel"

const SOCIAL_PROOF_INK_BLEED_FILTER_ID = "social-proof-headline-ink-bleed"

export function SocialProofSection() {
  return (
    <Box
      as="section"
      id="press"
      px={{ base: "6", lg901: "12" }}
      pt="0"
      pb={{ base: "20", lg901: "28" }}
      bg="pageBg"
      position="relative"
    >
      <svg
        width="0"
        height="0"
        aria-hidden
        focusable="false"
        style={{ position: "absolute" }}
      >
        <filter
          id={SOCIAL_PROOF_INK_BLEED_FILTER_ID}
          colorInterpolationFilters="sRGB"
        >
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 1 1 1" />
          </feComponentTransfer>
        </filter>
      </svg>

      <RevealGroup>
        <Container>
          <Flex
            mb="16"
            pt={{ base: "6", lg901: "8" }}
            flexDirection="column"
            align="flex-start"
            gap="6"
          >
            <Reveal order={0}>
              <Heading
                as="h2"
                textStyle="cossetteDisplayHeading"
                fontWeight="bold"
                textTransform="none"
                lineHeight="1.1"
                color="warmDisplay"
                textWrap="balance"
                textAlign="left"
                filter={`blur(0.7px) url(#${SOCIAL_PROOF_INK_BLEED_FILTER_ID})`}
              >
                Press
              </Heading>
            </Reveal>
          </Flex>
        </Container>

        <Reveal order={1}>
          <TestimonialCarousel />
        </Reveal>
      </RevealGroup>
    </Box>
  )
}
