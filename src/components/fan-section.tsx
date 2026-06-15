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
      borderTop="1px solid"
      borderColor="border"
      bg="surface"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
    >
      <Container>
        <Box mb="5">
          <SectionHeading
            label="For Fans"
            headline="Need Ticket Help?"
          />
        </Box>
        <Text maxW="bodyCopy" textStyle="sectionBody" color="fgMuted">
          Locate your tickets. You&apos;re in the right place.
        </Text>
        <Flex mt="10" flexWrap="wrap" gap="3">
          <Button href={links.tickets} variant="dark">
            Find My Tickets →
          </Button>
        </Flex>
      </Container>
    </Box>
  )
}
