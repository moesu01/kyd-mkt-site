import { Box, Grid, Heading, Text } from "@chakra-ui/react"
import { links, stats, venueAudiences } from "../content/site-content"
import { Button } from "./ui/button"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function VenuesSection() {
  return (
    <Box
      as="section"
      borderTop="1px solid"
      borderColor="border"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
    >
      <Container>
        <Grid
          templateColumns={{ base: "1fr", lg901: "1fr 1fr" }}
          alignItems="center"
          gap={{ base: "14", lg901: "24" }}
        >
          <Box>
            <SectionHeading
              label="For Venues & Artists"
              headline={
                <>
                  Your tickets.
                  <br />
                  Your fans.
                  <br />
                  <Text as="span" color="accent">
                    Your money.
                  </Text>
                </>
              }
              mb="6"
            />
            <Text
              mb="10"
              maxW="bodyCopy"
              fontSize="1.05rem"
              lineHeight="relaxed"
              color="fgMuted"
            >
              A next-gen, whitelabel ticketing and marketing platform for
              independent artists, touring acts, and venues. Own your ticketing.
              Keep your fan data. Automate your marketing. Deliver 10x results
              &mdash; and never rent your audience again.
            </Text>
            <Button href={links.getInTouch}>Get in touch →</Button>
          </Box>

          <Grid templateColumns="repeat(2, 1fr)" border="1px solid" borderColor="border">
            {stats.map((stat, index) => (
              <Box
                key={stat.label}
                borderColor="border"
                p="8"
                px={{ lg901: "8" }}
                py={{ lg901: "9" }}
                borderRightWidth={index % 2 === 0 ? "1px" : undefined}
                borderBottomWidth={index < 2 ? "1px" : undefined}
              >
                <Text
                  fontVariantNumeric="tabular-nums"
                  fontSize="3.75rem"
                  fontWeight="black"
                  lineHeight="1"
                  letterSpacing="tight"
                  color="accent"
                >
                  {stat.value}
                </Text>
                <Text mt="2" fontFamily="mono" fontSize="13px" color="fgSubtle">
                  {stat.label}
                </Text>
              </Box>
            ))}
          </Grid>
        </Grid>

        <Box mt={{ base: "16", lg901: "24" }}>
          <Text textStyle="eyebrow" mb="8" color="fgSubtle">
            Who it&apos;s for
          </Text>
          <Grid
            templateColumns={{ base: "1fr", lg901: "repeat(3, 1fr)" }}
            gap="1px"
            border="1px solid"
            borderColor="border"
            bg="border"
          >
            {venueAudiences.map((audience) => (
              <Box as="article" key={audience.title} bg="bg" p="8">
                <Heading
                  as="h3"
                  mb="3"
                  fontSize="1.4rem"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="tight"
                  color="fg"
                >
                  {audience.title}
                </Heading>
                <Text fontSize="0.95rem" lineHeight="relaxed" color="fgMuted">
                  {audience.body}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
