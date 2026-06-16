import { Box, Grid, Heading, Text } from "@chakra-ui/react"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

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
        <Grid
          templateColumns={{ base: "1fr", lg901: "1fr 1fr" }}
          alignItems="start"
          gap={{ base: "12", lg901: "24" }}
        >
          <SectionHeading
            label="About KYD"
            headline={
              <>
                Built for the People Who Actually{" "}
                <Text as="span" color="accent">
                  Create Value.
                </Text>
              </>
            }
          />

          <Box>
            <Text
              mb="8"
              textStyle="sectionBody"
              letterSpacing="-0.02em"
              color="fgMuted"
            >
              Live events are the beating heart of culture. For too long, venues
              and artists have been cut off from the fans and revenue they
              generate. KYD is the infrastructure to change that.
            </Text>
            <Heading
              as="p"
              fontSize="clamp(1.5rem, 2.5vw, 2rem)"
              fontWeight="black"
              lineHeight="1.05"
              letterSpacing="tight"
            >
              Control Your Data.
              <br />
              Keep Your Fans.
              <br />
              <Text as="span" color="accent">
                Maximize Your Profit.
              </Text>
            </Heading>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
