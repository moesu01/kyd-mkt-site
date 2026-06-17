import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { aboutSection } from "../content/site-content"
import { AboutEmblem } from "./about/about-emblem"
import { Container } from "./ui/container"

export function AboutSection() {
  return (
    <Box
      as="section"
      id="about"
      bg="transparent"
      px={{ base: "6", lg901: "12" }}
      pt={{ base: "20", lg901: "28" }}
      pb={{ base: "10", lg901: "14" }}
    >
      <Container>
        <Flex
          direction="column"
          align="center"
          gap={{ base: "10", lg901: "14" }}
        >
          <AboutEmblem />

          <Flex
            direction="column"
            align="center"
            gap="6"
            w="full"
            maxW="75rem"
            pt={{ base: "4", lg901: "6" }}
          >
            <Heading
              as="h2"
              textAlign="center"
              textStyle="displayHeading"
              maxW="54.625rem"
              letterSpacing="-0.025em"
              lineHeight="1.1"
            >
              {aboutSection.headline}
            </Heading>
            <Text
              textAlign="center"
              textStyle="sectionBody"
              letterSpacing="-0.02em"
              color="fgMuted"
              maxW="33.25rem"
            >
              {aboutSection.body}
            </Text>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
