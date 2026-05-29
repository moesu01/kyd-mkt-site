import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { links } from "../content/site-content"
import { Button } from "./ui/button"

export function HeroSplit() {
  return (
    <Flex
      position="relative"
      direction={{ base: "column", lg901: "row" }}
      minH="heroMinHeight"
      h="100vh"
      overflow="hidden"
    >
      <Box
        position="relative"
        flex={{ base: "1", lg901: "none" }}
        bg="bg"
        h={{ base: "50vh", lg901: "auto" }}
        flexBasis={{ lg901: "50%" }}
      >
        <Box
          pointerEvents="none"
          position="absolute"
          left="10"
          top="50%"
          transform="translateY(-50%)"
          userSelect="none"
          px="10"
          fontSize="clamp(4rem, 9vw, 9rem)"
          fontWeight="black"
          textTransform="uppercase"
          lineHeight="0.88"
          letterSpacing="tight"
          color="fgDim"
        >
          YOUR
          <br />
          TICKETS
        </Box>
        <Text
          position="absolute"
          bottom="10"
          left="10"
          fontFamily="mono"
          fontSize="10px"
          textTransform="uppercase"
          letterSpacing="0.2em"
          color="fgDim"
        >
          [ Fan crowd — photo ]
        </Text>
      </Box>

      <Box
        position="relative"
        flex={{ base: "1", lg901: "none" }}
        bg="bg"
        h={{ base: "50vh", lg901: "auto" }}
        flexBasis={{ lg901: "50%" }}
      >
        <Box
          pointerEvents="none"
          position="absolute"
          right="10"
          top="50%"
          transform="translateY(-50%)"
          userSelect="none"
          textAlign="right"
          fontSize="clamp(4rem, 9vw, 9rem)"
          fontWeight="black"
          textTransform="uppercase"
          lineHeight="0.88"
          letterSpacing="tight"
          color="fgDim"
        >
          YOUR
          <br />
          PLATFORM
        </Box>
        <Text
          position="absolute"
          bottom="10"
          right="10"
          fontFamily="mono"
          fontSize="10px"
          textTransform="uppercase"
          letterSpacing="0.2em"
          color="fgDim"
        >
          [ Side-of-stage — photo ]
        </Text>
      </Box>

      <Box
        pointerEvents="none"
        position="absolute"
        inset="0"
        zIndex="1"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklch, oklch(0.05 0 0) 60%, transparent), transparent, color-mix(in oklch, oklch(0.05 0 0) 40%, transparent))",
        }}
      />

      <Box
        pointerEvents="none"
        position="absolute"
        inset="0"
        zIndex="1"
        display={{ base: "block", lg901: "none" }}
        aria-hidden
        style={{
          background:
            "linear-gradient(to bottom, transparent, color-mix(in oklch, oklch(0.05 0 0) 94%, transparent), transparent)",
        }}
      />

      <Box
        pointerEvents="none"
        position="absolute"
        inset="0"
        zIndex="1"
        display={{ base: "none", lg901: "block" }}
        aria-hidden
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in oklch, oklch(0.05 0 0) 92%, transparent), transparent)",
        }}
      />

      <Flex
        position="absolute"
        inset="0"
        zIndex="2"
        direction="column"
        align="center"
        justify="center"
        gap="7"
        px="8"
        textAlign="center"
      >
        <Text
          fontFamily="mono"
          fontSize="11px"
          fontWeight="medium"
          textTransform="uppercase"
          letterSpacing="0.25em"
          color="accent"
        >
          KYD Labs
        </Text>
        <Heading
          as="h1"
          maxW="heroHeadline"
          fontSize="clamp(2rem, 4vw, 3.75rem)"
          fontWeight="black"
          textTransform="uppercase"
          lineHeight="1.02"
          letterSpacing="tight"
        >
          Modern ticketing
          <br />
          <Text as="span" color="accent">
            built for venues.
          </Text>
        </Heading>
        <Text
          maxW="heroSubtext"
          fontSize="clamp(0.95rem, 1.5vw, 1.1rem)"
          lineHeight="relaxed"
          color="fgMuted"
        >
          Own your data. Capture resale. Activate fans with AI. The
          infrastructure venues use to run smarter shows.
        </Text>
        <Flex flexWrap="wrap" align="center" justify="center" gap="3.5">
          <Button href={links.getInTouch}>Get in touch →</Button>
          <Button href={links.tickets} variant="outline">
            Find My Tickets
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
