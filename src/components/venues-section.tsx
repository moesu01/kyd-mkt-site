import { Box, Flex, Grid, Text } from "@chakra-ui/react"
import { links, stats } from "../content/site-content"
import { Button, CtaArrow } from "./ui/button"
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
    <Flex
      align="center"
      gap={{ base: "4", lg901: "6" }}
      minH={{ base: "102px", lg901: "122px" }}
      py={{ base: "5", lg901: "8" }}
      borderTop={isFirst ? "3px solid" : undefined}
      borderBottom="3px solid"
      borderColor="border"
      w="full"
    >
      <Text
        flexShrink={0}
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
        flex="1"
        minW="0"
        textStyle="touringCategory"
        textAlign="right"
      >
        {label}
      </Text>
    </Flex>
  )
}

export function VenuesSection() {
  return (
    <Box
      as="section"
      id="venues"
      bg="pageBg"
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
              eyebrowVariant="prominent"
              headingTextStyle="cossetteDisplayHeading"
              headingTextTransform="none"
              headingFontWeight="bold"
              label="For Venues & Artists"
              headline={"Your tickets.\nYour fans.\nYour money."}
            />
            <Text
              maxW="bodyCopy"
              fontFamily="sans"
              fontWeight="normal"
              fontSize="18px"
              lineHeight="27px"
              letterSpacing="-0.36px"
              color="warmMuted"
            >
              A next-gen, whitelabel ticketing and marketing platform for
              independent artists, touring acts, and venues. Own your ticketing.
              Keep your fan data. Automate your marketing. Deliver 10x results
              &mdash; and never rent your audience again.
            </Text>
            <Box alignSelf="flex-start">
              <Button
                href={links.getInTouch}
                size="hero"
                css={{ fontWeight: "bold" }}
              >
                <span>
                  Get in touch
                  <CtaArrow />
                </span>
              </Button>
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
