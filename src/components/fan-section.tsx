import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import { links } from "../content/site-content"
import { Button, CtaArrow } from "./ui/button"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function FanSection() {
  return (
    <Box
      as="section"
      id="fans"
      bg="pageBg"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
    >
      <Container>
        <Grid
          templateColumns={{ base: "1fr", lg901: "1fr 1fr" }}
          gap={{ base: "10", lg901: "16" }}
          borderTop="3px solid"
          borderColor="rgba(255, 255, 255, 0.1)"
          pt={{ base: "8", lg901: "10" }}
        >
          <Box minW="0">
            <SectionHeading
              eyebrowVariant="prominent"
              headingTextStyle="cossetteDisplayHeading"
              headingTextTransform="none"
              headingFontWeight="bold"
              headingAs="h2"
              label="For Fans"
              headline="Need Ticket Help?"
              withInkBleed
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

            <Flex mt="8" align="center">
              <Button href={links.tickets} variant="outline">
                <span>
                  Find My Tickets
                  <CtaArrow />
                </span>
              </Button>
            </Flex>
          </Box>

          <Box display={{ base: "none", lg901: "block" }} aria-hidden />
        </Grid>
      </Container>
    </Box>
  )
}
