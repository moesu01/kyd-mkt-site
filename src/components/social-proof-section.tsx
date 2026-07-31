import { Box, Flex, Heading } from "@chakra-ui/react"
import { Container } from "./ui/container"
import { Reveal, RevealGroup } from "./ui/reveal"
import { TestimonialCarousel } from "./testimonial-carousel"

export function SocialProofSection() {
  return (
    <Box
      as="section"
      id="press"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
      bg="pageBg"
      position="relative"
    >
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
                fontWeight="normal"
                textTransform="uppercase"
                lineHeight="1.1"
                color="warmDisplay"
                textWrap="balance"
                textAlign="left"
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
