import { Box, Heading } from "@chakra-ui/react"
import { Container } from "./ui/container"
import { TestimonialCarousel } from "./testimonial-carousel"
import { UsedByCarousel, UsedBySection } from "./used-by-section"

export function SocialProofSection() {
  return (
    <Box
      as="section"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
      backgroundImage={socialProofSectionGradient}
    >
      <Container>
        <UsedBySection />
      </Container>

      <UsedByCarousel />

      <Container>
        <Heading
          as="h2"
          mb={{ base: "10", lg901: "12" }}
          color="fg"
          textStyle="platformHeading"
          textWrap="balance"
        >
          What People Are Saying
        </Heading>
      </Container>

      <TestimonialCarousel />
    </Box>
  )
}

const socialProofSectionGradient = "linear-gradient(to bottom, #111, #000)"
