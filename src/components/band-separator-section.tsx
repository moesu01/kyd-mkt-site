import { Box, Flex, chakra } from "@chakra-ui/react"
import { Reveal, RevealGroup } from "./ui/reveal"

export function BandSeparatorSection({
  isReversed = false,
}: BandSeparatorSectionProps) {
  const bandOrder = isReversed ? reversedBandOrder : defaultBandOrder

  return (
    <RevealGroup
      as="section"
      aria-hidden
      bg="pageBg"
      overflow="hidden"
      py="0"
      w="full"
    >
      <Reveal w="full">
        <Flex
          align="center"
          justify="center"
          flexWrap="nowrap"
          w="full"
          minW="0"
          transform={{
            base: isReversed ? "none" : "translateX(85px)",
            md700: isReversed ? "none" : "translateX(170px)",
          }}
        >
          {bandOrder.map((band) =>
            band === "stacked" ? (
              <StackedBand key={band} />
            ) : (
              <StripBand key={band} />
            ),
          )}
        </Flex>
      </Reveal>
    </RevealGroup>
  )
}

function StackedBand() {
  return (
    <Box
      flexShrink={0}
      w={{ base: "281px", md700: "562px" }}
      h={{ base: "97px", md700: "194px" }}
      position="relative"
      overflow="clip"
    >
      <chakra.img
        src="/images/kyd_band_2.png"
        alt=""
        display="block"
        w="100%"
        h="100%"
        objectFit="cover"
        pointerEvents="none"
      />
    </Box>
  )
}

function StripBand() {
  return (
    <Box
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w={{ base: "473.5px", md700: "947px" }}
      h={{ base: "65.7px", md700: "131px" }}
    >
      <Box
        transform="rotate(-2.3deg)"
        w={{ base: "472px", md700: "944px" }}
        h={{ base: "47px", md700: "94px" }}
        position="relative"
        overflow="clip"
      >
        <chakra.img
          src="/images/kyd_band_1b.png"
          alt=""
          display="block"
          w="100%"
          h="100%"
          objectFit="cover"
          pointerEvents="none"
        />
      </Box>
    </Box>
  )
}

const defaultBandOrder = ["stacked", "strip"] as const
const reversedBandOrder = ["strip", "stacked"] as const

interface BandSeparatorSectionProps {
  isReversed?: boolean
}
