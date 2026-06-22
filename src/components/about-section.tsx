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
      py={{ base: "20", lg901: "28" }}
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
              fontFamily="cossetteTitre"
              fontWeight="bold"
              fontSize={{ base: "48px", lg901: "75.8px" }}
              lineHeight="1.1"
              color="warmDisplay"
              maxW="54.625rem"
            >
              {aboutSection.headline}
            </Heading>
            <Text
              textAlign="center"
              fontFamily="sans"
              fontWeight="normal"
              fontSize="18px"
              lineHeight="27px"
              letterSpacing="-0.36px"
              color="warmMuted"
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
