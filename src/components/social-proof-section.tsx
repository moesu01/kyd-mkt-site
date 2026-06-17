import { Box, Flex, Heading } from "@chakra-ui/react"
import { Container } from "./ui/container"
import { TestimonialCarousel } from "./testimonial-carousel"

export function SocialProofSection() {
  return (
    <Box
      as="section"
      px={{ base: "6", lg901: "12" }}
      pt="0"
      pb={{ base: "20", lg901: "28" }}
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
            color="fg"
            textStyle="platformHeading"
            textWrap="balance"
            textAlign="center"
          >
            What venues, artists, and
            <br />
            the industry are saying
          </Heading>
        </Flex>
      </Container>

      <TestimonialCarousel />
    </Box>
  )
}

const socialProofSectionGradient = "linear-gradient(to bottom, #111, #000)"
