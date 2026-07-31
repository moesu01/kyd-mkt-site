import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import { links } from "../content/site-content"
import { assetUrl } from "../lib/asset-url"
import { Ticket } from "./ticket"
import { Button, CtaArrow } from "./ui/button"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function FanSection() {
  const handleClaim = () => {
    window.open(links.tickets, "_blank", "noopener,noreferrer")
  }

  return (
    <Box
      as="section"
      id="fans"
      bg="pageBg"
      px={{ base: "4", md: "8" }}
      pt={{ base: "20", lg901: "28" }}
      pb={{ base: "10", lg901: "14" }}
    >
      <Container
        maxW="containerFramed"
        borderRadius="32px"
        bg="pageBg"
        boxShadow="frame"
        overflow="hidden"
      >
        <Grid
          templateColumns={{ base: "1fr", lg901: "1fr 1fr" }}
          minH={{ base: "680px", lg901: "380px" }}
        >
          <Flex
            minW="0"
            direction="column"
            justify="center"
            px={{ base: "8", md: "12", lg901: "16" }}
            py={{ base: "12", lg901: "16" }}
          >
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
              Looking for your tickets? You&apos;re in the right place.
            </Text>

            <Flex mt="8" align="center">
              <Button href={links.tickets} variant="outline">
                <span>
                  Find My Tickets
                  <CtaArrow />
                </span>
              </Button>
            </Flex>
          </Flex>

          <Box
            position="relative"
            minW="0"
            h={{ base: "360px", lg901: "380px" }}
            maxH={{ base: "360px", lg901: "380px" }}
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={{ base: "40px", lg901: "56px" }}
              left="50%"
              w={{ base: "260px", md: "300px", lg901: "330px" }}
              transform="translateX(-50%)"
            >
              <Ticket
                posterUrl={assetUrl("/images/used-by/action-bronson.jpg")}
                subtitle="+ Human Growth Hormone"
                title="Action Bronson"
                ticketType="General Admission"
                quantity={2}
                date="Saturday • Aug 15 2026"
                time="9:00PM"
                venue="Le Poisson Rouge"
                city="New York City, NY"
                ctaLabel="Find My Tickets"
                onClaim={handleClaim}
              />
            </Box>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
