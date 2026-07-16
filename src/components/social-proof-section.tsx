import { Box, Flex, Heading } from "@chakra-ui/react"
import { colors } from "../theme/tokens"
import { Container } from "./ui/container"
import { TestimonialCarousel } from "./testimonial-carousel"

export function SocialProofSection() {
  return (
    <Box
      as="section"
      px={{ base: "6", lg901: "12" }}
      pt="0"
      pb={{ base: "20", lg901: "28" }}
      bg="transparent"
      backgroundImage={socialProofSectionGradient}
    >
      <Container>
        <Flex
          mb="16"
          pt={{ base: "6", lg901: "8" }}
          flexDirection="column"
          align="center"
          gap="6"
        >
          <Heading
            as="h2"
            textStyle="cossetteDisplayHeading"
            color="warmDisplay"
            textWrap="balance"
            textAlign="center"
          >
            What our customers and the industry are saying
          </Heading>
        </Flex>
      </Container>

      <TestimonialCarousel />
    </Box>
  )
}

/** Solid pageBg until the last 56px, then a tight fade so the footer reveal peeks through. */
const socialProofSectionGradient = `linear-gradient(to bottom, ${colors.pageBg.value} 0%, ${colors.pageBg.value} calc(100% - 56px), transparent 100%)`
