import { Box, Flex, Text } from "@chakra-ui/react"
import { links } from "../content/site-content"
import { Button } from "./ui/button"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function FanSection() {
  return (
    <Box
      as="section"
      id="fans"
      bg="surface"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
    >
      <Container>
        <Flex
          direction={{ base: "column", lg901: "row" }}
          align={{ base: "flex-start", lg901: "center" }}
          justify="space-between"
          gap={{ base: "10", lg901: "16" }}
        >
          <Box flex="1" minW="0">
            <SectionHeading
              eyebrowVariant="prominent"
              headingTextStyle="cossetteDisplayHeading"
              headingTextTransform="none"
              headingFontWeight="bold"
              headingAs="h2"
              label="For Fans"
              headline="Need Ticket Help?"
            />
            <Text
              mt="6"
              maxW="bodyCopy"
              fontFamily="sans"
              fontWeight="normal"
              fontSize="18px"
              lineHeight="27px"
              letterSpacing="-0.36px"
              color="warmMuted"
            >
              Locate your tickets. You&apos;re in the right place.
            </Text>
          </Box>

          <Flex flexShrink={0} align="center">
            <Button href={links.tickets} variant="outline">
              Find My Tickets →
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
