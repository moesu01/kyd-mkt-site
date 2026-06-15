import { Box, Grid, Heading, Text } from "@chakra-ui/react"
import { links, stats, venueAudiences } from "../content/site-content"
import { Button } from "./ui/button"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

function StatRow({
  value,
  label,
  isFirst,
}: {
  value: string
  label: string
  isFirst: boolean
}) {
  return (
    <Box
      position="relative"
      minH={{ base: "120px", lg901: "144px" }}
      borderTop={isFirst ? "1px solid" : undefined}
      borderBottom="1px solid"
      borderColor="border"
    >
      <Text
        position="absolute"
        left="0"
        top={{ base: "6", lg901: "9" }}
        fontVariantNumeric="tabular-nums"
        fontSize={{ base: "3rem", lg901: "72px" }}
        fontWeight="normal"
        lineHeight="1"
        letterSpacing="-0.25rem"
        color="accent"
      >
        {value}
      </Text>
      <Text
        position="absolute"
        right="0"
        top={{ base: "14", lg901: "19" }}
        maxW="224px"
        fontSize="14px"
        lineHeight="20px"
        letterSpacing="-0.1504px"
        textAlign="right"
        color="fgMuted"
      >
        {label}
      </Text>
    </Box>
  )
}

export function VenuesSection() {
  return (
    <Box
      as="section"
      id="venues"
      borderTop="1px solid"
      borderColor="border"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
    >
      <Container>
        <Grid
          templateColumns={{ base: "1fr", lg901: "1fr 1fr" }}
          alignItems="start"
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
            <Text mb="10" maxW="bodyCopy" textStyle="sectionBody" color="fgMuted">
              A next-gen, whitelabel ticketing and marketing platform for
              independent artists, touring acts, and venues. Own your ticketing.
              Keep your fan data. Automate your marketing. Deliver 10x results
              &mdash; and never rent your audience again.
            </Text>
            <Button href={links.getInTouch}>Get in touch →</Button>
          </Box>

          <Box w="full">
            {stats.map((stat, index) => (
              <StatRow
                key={stat.label}
                value={stat.value}
                label={stat.label}
                isFirst={index === 0}
              />
            ))}
          </Box>
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
