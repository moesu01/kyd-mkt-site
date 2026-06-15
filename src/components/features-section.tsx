import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import { features, links } from "../content/site-content"
import { FeatureCard } from "./feature-card"
import { Button } from "./ui/button"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

const topRowFeatures = features.slice(0, 3)
const bottomRowFeatures = features.slice(3, 5)

export function FeaturesSection() {
  return (
    <Box
      as="section"
      id="platform"
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
                Modern Ticketing Infrastructure.
                <br />
                <Text as="span" color="accent">
                  Built for Control.
                </Text>
              </>
            }
          />
        </Box>

        <Grid
          templateColumns={{ base: "1fr", lg901: "repeat(3, 1fr)" }}
          gap={{ base: "12", lg901: "10" }}
        >
          {topRowFeatures.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              body={feature.body}
            />
          ))}
        </Grid>

        <Flex justify="center" mt={{ base: "12", lg901: "10" }}>
          <Grid
            templateColumns={{ base: "1fr", lg901: "repeat(2, 1fr)" }}
            gap={{ base: "12", lg901: "10" }}
            w={{ base: "full", lg901: "66.666%" }}
          >
            {bottomRowFeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                body={feature.body}
              />
            ))}
          </Grid>
        </Flex>

        <Flex justify="center" mt="12">
          <Button href={links.getInTouch}>Get in touch →</Button>
        </Flex>
      </Container>
    </Box>
  )
}
