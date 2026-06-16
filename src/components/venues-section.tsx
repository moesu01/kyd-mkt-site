import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import { links, stats } from "../content/site-content"
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
      minH={{ base: "102px", lg901: "122px" }}
      borderTop={isFirst ? "1px solid" : undefined}
      borderBottom="1px solid"
      borderColor="border"
    >
      <Text
        position="absolute"
        left="0"
        top={{ base: "20px", lg901: "31px" }}
        fontFamily="sans"
        fontSize={{ base: "3rem", lg901: "72px" }}
        fontWeight="100"
        lineHeight="1"
        letterSpacing="-0.15rem"
        color="accent"
        css={{ fontFeatureSettings: '"cv01" 1' }}
      >
        {value}
      </Text>
      <Text
        position="absolute"
        right="0"
        top={{ base: "48px", lg901: "65px" }}
        maxW="224px"
        fontSize="16px"
        lineHeight="20px"
        letterSpacing="-0.1504px"
        textAlign="right"
        color="fg"
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
      px={{ base: "6", lg901: "12" }}
      pt={{ base: "20", lg901: "28" }}
      pb={{ base: "20", lg901: "28" }}
    >
      <Container>
        <Grid
          templateColumns={{ base: "1fr", lg901: "1fr 1fr" }}
          alignItems={{ base: "start", lg901: "stretch" }}
          gap={{ base: "14", lg901: "24" }}
        >
          <Flex
            direction="column"
            justify={{ base: "flex-start", lg901: "space-between" }}
            h={{ base: "auto", lg901: "full" }}
            gap={{ base: "10", lg901: 0 }}
          >
            <SectionHeading
              label="For Venues & Artists"
              headline={
                <>
                  Your Tickets.
                  <br />
                  Your Fans.
                  <br />
                  <Text as="span" color="accent">
                    Your Money.
                  </Text>
                </>
              }
            />
            <Text maxW="bodyCopy" textStyle="sectionBody" color="fgMuted">
              A next-gen, whitelabel ticketing and marketing platform for
              independent artists, touring acts, and venues. Own your ticketing.
              Keep your fan data. Automate your marketing. Deliver 10x results
              &mdash; and never rent your audience again.
            </Text>
            <Box alignSelf="flex-start">
              <Button href={links.getInTouch}>Get in touch →</Button>
            </Box>
          </Flex>

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
      </Container>
    </Box>
  )
}
