import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import { roster, testimonials } from "../content/site-content"
import { Container } from "./ui/container"

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

        <Flex flexWrap="wrap" ml="-1px" mt="-1px" mb="20">
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

        <Text textStyle="eyebrow" mb="6" color="fgSubtle">
          What people are saying
        </Text>

        <Grid
          mt="8"
          templateColumns={{ base: "1fr", lg901: "repeat(3, 1fr)" }}
          gap="6"
        >
          {testimonials.map((testimonial) => (
            <Flex
              as="article"
              key={testimonial.attribution}
              direction="column"
              gap="4"
              borderRadius="md"
              border="1px solid"
              borderColor={
                testimonial.placeholder ? "borderStrong" : "border"
              }
              borderStyle={testimonial.placeholder ? "dashed" : "solid"}
              p="8"
            >
              <Text
                flex="1"
                fontSize="base"
                lineHeight="relaxed"
                fontStyle={testimonial.placeholder ? "italic" : undefined}
                color={testimonial.placeholder ? "fgFaint" : "fgMuted"}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </Text>
              <Text
                fontSize="13px"
                fontWeight="medium"
                color={testimonial.placeholder ? "fgFaint" : "accent"}
              >
                {testimonial.attribution}
              </Text>
            </Flex>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
