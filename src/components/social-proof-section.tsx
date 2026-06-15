import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { roster } from "../content/site-content"
import { Container } from "./ui/container"
import { TestimonialCarousel } from "./testimonial-carousel"

export function SocialProofSection() {
  return (
    <Box
      as="section"
      borderTop="1px solid"
      borderColor="border"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
    >
      <Container>
        <Text textStyle="eyebrow" mb="8" color="fgSubtle">
          Used by artists and venues across the country
        </Text>

        <Flex flexWrap="wrap" ml="-1px" mt="-1px" mb={{ base: "16", lg901: "24" }}>
          {roster.map((item, index) => (
            <Box
              key={`${item.name}-${index}`}
              border="1px solid"
              borderColor="border"
              px="6"
              py="3.5"
              fontSize="clamp(1.1rem, 2vw, 1.55rem)"
              fontWeight="black"
              textTransform="uppercase"
              lineHeight="1"
              letterSpacing="tight"
              color={item.type === "artist" ? "accent" : "fgMuted"}
            >
              {item.name}
            </Box>
          ))}
        </Flex>

        <Heading as="h2" mb={{ base: "10", lg901: "12" }} textStyle="displayHeading">
          What people are saying
        </Heading>
      </Container>

      <TestimonialCarousel />
    </Box>
  )
}
