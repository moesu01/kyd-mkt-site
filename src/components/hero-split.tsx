import { Box, Flex, Heading, Text } from "@chakra-ui/react"
import { links } from "../content/site-content"
import { Button } from "./ui/button"

const HERO_BG_VIDEO = "/videos/ascii-animation-7.mp4"

// TEMP: hero mini footer hidden — restore imports and uncomment block below
// import { Link } from "@chakra-ui/react"
// import { heroFooterLinks } from "../content/site-content"
// import { HeroNycClock } from "./hero-nyc-clock"
//
// function HeroMiniFooter() { ... see git history }

export function HeroSplit() {
  return (
    <Flex
      as="header"
      position="relative"
      direction="column"
      minH="heroMinHeight"
      h="100vh"
      bg="#000"
      overflow="hidden"
      css={{
        "@media (prefers-reduced-motion: reduce)": {
          "& video": { display: "none" },
        },
      }}
    >
      <Box
        as="video"
        src={HERO_BG_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        position="absolute"
        inset="0"
        w="full"
        h="full"
        objectFit="cover"
        objectPosition="center"
        pointerEvents="none"
        zIndex={0}
      />

      <Box
        position="absolute"
        inset="0"
        zIndex={1}
        pointerEvents="none"
        backgroundImage="linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 42%, rgba(0,0,0,0.12) 100%)"
      />

      <Flex
        position="relative"
        zIndex={2}
        flex="1"
        align="flex-end"
        px={{ base: "6", lg901: "10" }}
        py={{ base: "16", lg901: "24" }}
      >
        <Flex
          w="full"
          maxW="container"
          mx="auto"
          direction={{ base: "column", lg901: "row" }}
          align={{ base: "flex-start", lg901: "flex-end" }}
          justify="space-between"
          gap={{ base: "8", lg901: "12" }}
        >
          <Box flexShrink={0}>
            <Heading
              as="h1"
              fontFamily="cossetteTitre"
              fontWeight="bold"
              fontSize={{ base: "48px", lg901: "75.8px" }}
              lineHeight="1.1"
              color="warmDisplay"
            >
              Modern Ticketing
              <br />
              Built for Venues
            </Heading>
            <Flex flexWrap="wrap" align="center" gap="6" mt="6">
              <Button href={links.getInTouch} size="hero">
                Get in touch →
              </Button>
              <Button href={links.tickets} variant="outline-accent" size="hero">
                Find my tickets
              </Button>
            </Flex>
          </Box>

          <Text
            maxW="353px"
            fontSize="clamp(1rem, 1.5vw, 1.2rem)"
            lineHeight="1.2"
            letterSpacing="-0.02em"
            color="fg"
          >
            Own your data. Capture resale. Activate fans with AI. The
            infrastructure venues use to run smarter shows.
          </Text>
        </Flex>
      </Flex>

      {/* TEMP: hero mini footer hidden — <HeroMiniFooter /> */}
    </Flex>
  )
}
