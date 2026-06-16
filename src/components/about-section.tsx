import { Box, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import { backers } from "../content/site-content"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

function BackerLogo({
  name,
  logoSrc,
}: {
  name: string
  logoSrc: string
}) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <Text
        fontSize="sm"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
        color="fgGhost"
        whiteSpace="nowrap"
      >
        {name}
      </Text>
    )
  }

  return (
    <Image
      src={logoSrc}
      alt={name}
      h="8"
      w="auto"
      maxW="40"
      objectFit="contain"
      flexShrink={0}
      onError={() => setHasError(true)}
    />
  )
}

export function AboutSection() {
  return (
    <Box
      as="section"
      id="about"
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

      <Box mt={{ base: "16", lg901: "20" }}>
        <Container>
          <Text mb="5" textAlign="center" textStyle="eyebrow" color="fgSubtle">
            Backed by
          </Text>

          <Flex
            as="ul"
            listStyleType="none"
            align="center"
            justify="space-between"
            w="full"
            pb="2"
          >
            {backers.map((backer) => (
              <Box
                as="li"
                key={backer.name}
                display="flex"
                alignItems="center"
                justifyContent="center"
                minH="12"
              >
                <BackerLogo name={backer.name} logoSrc={backer.logoSrc} />
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
