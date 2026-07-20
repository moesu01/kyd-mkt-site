import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useState } from "react"
import { backers } from "../content/site-content"
import { Container } from "./ui/container"
import { prominentEyebrowTextProps } from "./ui/prominent-eyebrow-styles"

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
      maxW={maxW}
      objectFit="contain"
      flexShrink={0}
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
      px={{ base: "6", lg901: "12" }}
      py={{ base: "12", lg901: "16" }}
      bg="transparent"
    >
      <Container>
        <Text
          {...prominentEyebrowTextProps}
          mb="0"
          w="full"
          textAlign="center"
        >
          Backed by
        </Text>

        <Flex
          as="ul"
          listStyleType="none"
          align="stretch"
          justify="space-between"
          gap="0"
          w="full"
          maxW="80%"
          mx="auto"
          pt="5"
          pb="2"
        >
          {backers.map((backer) => (
            <Box
              as="li"
              key={backer.name}
              display="flex"
              flex="1"
              flexDirection="column"
              gap="4"
              p={{ base: "4", lg901: "5" }}
            >
              <Flex flex="1" align="center" justify="center" minH="12">
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
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  )
}
