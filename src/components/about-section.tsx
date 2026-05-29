import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react"
import { backers } from "../content/site-content"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

export function AboutSection() {
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
          alignItems="start"
          gap={{ base: "12", lg901: "24" }}
        >
          <SectionHeading
            label="About KYD"
            headline={
              <>
                Built for the people who actually{" "}
                <Text as="span" color="accent">
                  create value.
                </Text>
              </>
            }
          />

          <Box>
            <Text mb="8" fontSize="1.05rem" lineHeight="relaxed" color="fgMuted">
              Live events are the beating heart of culture. For too long, venues
              and artists have been cut off from the fans and revenue they
              generate. KYD is the infrastructure to change that.
            </Text>
            <Heading
              as="p"
              mb="12"
              fontSize="clamp(1.5rem, 2.5vw, 2rem)"
              fontWeight="black"
              textTransform="uppercase"
              lineHeight="1.05"
              letterSpacing="tight"
            >
              Control your data.
              <br />
              Keep your fans.
              <br />
              <Text as="span" color="accent">
                Maximize your profit.
              </Text>
            </Heading>
            <Text textStyle="eyebrow" mb="5" color="fgSubtle">
              Backed by
            </Text>
            <Flex flexWrap="wrap" gap="3">
              {backers.map((backer) => (
                <Box
                  key={backer}
                  borderRadius="md"
                  border="1px solid"
                  borderColor="border"
                  px="4"
                  py="1.5"
                  fontSize="base"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="wider"
                  color="fgGhost"
                >
                  {backer}
                </Box>
              ))}
            </Flex>
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
