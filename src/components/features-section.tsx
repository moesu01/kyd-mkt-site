import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react"
import { features, links } from "../content/site-content"
import { Button } from "./ui/button"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

interface FeatureCardProps {
  icon: string
  title: string
  body: string
}

function FeatureCard({ icon, title, body }: FeatureCardProps) {
  return (
    <Box as="article">
      <Flex
        align="center"
        justify="center"
        minH="320px"
        borderRadius="16px"
        bg="surfaceRaised"
        mb="6"
        aria-hidden
      >
        <Flex
          align="center"
          justify="center"
          h="11"
          w="11"
          borderRadius="12px"
          border="1px solid"
          borderColor="border"
          fontSize="lg"
          color="accent"
          opacity="0.5"
        >
          {icon}
        </Flex>
      </Flex>

      <Heading
        as="h3"
        fontSize="20px"
        fontWeight="500"
        lineHeight="28px"
        letterSpacing="-0.5px"
        color="fg"
      >
        {title}
      </Heading>

      <Text
        pt="2"
        fontSize="14px"
        lineHeight="1.6"
        letterSpacing="0"
        color="fgMuted"
      >
        {body}
      </Text>
    </Box>
  )
}

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
