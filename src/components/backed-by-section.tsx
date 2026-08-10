import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import { backers } from "../content/site-content"
import { Container } from "./ui/container"
import { prominentEyebrowTextProps } from "./ui/prominent-eyebrow-styles"
import { Reveal, RevealGroup } from "./ui/reveal"

function BackerLogo({
  name,
  logoSrc,
  maxH,
  maxW,
}: {
  name: string
  logoSrc: string
  maxH: string
  maxW: string
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
      h="auto"
      w="auto"
      maxH={maxH}
      maxW={{ base: maxW, sm500: "100%", lg901: maxW }}
      objectFit="contain"
      flexShrink={1}
      minW="0"
      opacity={0.9}
      onError={() => setHasError(true)}
      css={{ filter: "grayscale(1)" }}
    />
  )
}

export function BackedBySection() {
  return (
    <Box
      as="section"
      id="backed-by"
      px={{ base: "0", lg901: "12" }}
      pt={{ base: "18", lg901: "24" }}
      pb={{ base: "6", lg901: "8" }}
      bg="transparent"
    >
      <RevealGroup>
        <Container>
          <Reveal order={0}>
            <Text
              {...prominentEyebrowTextProps}
              mb="0"
              w="full"
              textAlign="center"
            >
              Backed by
            </Text>
          </Reveal>

          <Flex
            as="ul"
            listStyleType="none"
            direction={{ base: "column", sm500: "row" }}
            align={{ base: "center", sm500: "stretch" }}
            justify="space-between"
            gap={{ base: "2", sm500: "3", lg901: "6" }}
            w="full"
            maxW={{ base: "full", lg901: "80%" }}
            mx="auto"
            pt="5"
            pb="2"
            minW="0"
          >
            {backers.map((backer, index) => (
              <Reveal
                as="li"
                order={index + 1}
                key={backer.name}
                display="flex"
                flex={{ base: "0 0 auto", sm500: "1" }}
                w={{ base: "full", sm500: "auto" }}
                flexDirection="column"
                gap="4"
                minW="0"
                p={{ base: "2", sm500: "3", lg901: "5" }}
              >
                <Flex flex="1" align="center" justify="center" minH="12" minW="0">
                  <BackerLogo
                    name={backer.name}
                    logoSrc={backer.logoSrc}
                    maxH={backer.maxH}
                    maxW={backer.maxW}
                  />
                </Flex>
                {/* TEMP: backer name labels hidden — restore when ready.
                <Text
                  textStyle="eyebrow"
                  color="fgSubtle"
                  w="full"
                  textAlign="center"
                >
                  {backer.name}
                </Text>
                */}
              </Reveal>
            ))}
          </Flex>
        </Container>
      </RevealGroup>
    </Box>
  )
}
