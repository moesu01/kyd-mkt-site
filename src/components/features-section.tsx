import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react"
import { features } from "../content/site-content"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function FeaturesSection() {
  return (
    <Box
      as="section"
      borderTop="1px solid"
      borderColor="border"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
    >
      <Container>
        <Box mb="12">
          <SectionHeading
            label="Platform"
            headline={
              <>
                Modern ticketing infrastructure.
                <br />
                <Text as="span" color="accent">
                  Built for control.
                </Text>
              </>
            }
          />
        </Box>

        <Grid
          templateColumns={{ base: "1fr", lg901: "repeat(3, 1fr)" }}
          gap="1px"
          border="1px solid"
          borderColor="border"
          bg="border"
        >
          {features.map((feature) => (
            <Box
              as="article"
              key={feature.title}
              bg="bg"
              p="8"
              px={{ lg901: "8" }}
              py={{ lg901: "10" }}
            >
              <Flex
                mb="7"
                h="11"
                w="11"
                align="center"
                justify="center"
                borderRadius="10px"
                border="1px solid"
                borderColor="border"
                fontSize="lg"
                color="accent"
              >
                {feature.icon}
              </Flex>
              <Heading
                as="h3"
                mb="3"
                fontSize="1.4rem"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="tight"
                color="fg"
              >
                {feature.title}
              </Heading>
              <Text fontSize="0.95rem" lineHeight="relaxed" color="fgSubtle">
                {feature.body}
              </Text>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}
