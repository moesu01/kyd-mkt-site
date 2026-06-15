import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react"
import { heroFooterLinks, links } from "../content/site-content"
import { HeroNycClock } from "./hero-nyc-clock"
import { Button } from "./ui/button"

function HeroMiniFooter() {
  return (
    <Box
      borderTop="1px solid"
      borderColor="fg"
      px={{ base: "6", lg901: "10" }}
      py="4"
    >
      <Flex
        maxW="container"
        mx="auto"
        align="center"
        justify="space-between"
        gap="4"
        flexWrap="wrap"
      >
        <Text
          fontSize="10px"
          letterSpacing="-0.2px"
          textTransform="uppercase"
          color="fg"
          whiteSpace="nowrap"
        >
          NYC BASED
        </Text>

        <HeroNycClock />

        <Flex
          align="center"
          gap={{ base: "4", lg901: "6" }}
          flexWrap="wrap"
          justify={{ base: "flex-start", lg901: "flex-end" }}
        >
          {heroFooterLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              display="inline-flex"
              alignItems="center"
              gap="1"
              fontSize="10px"
              letterSpacing="-0.2px"
              textTransform="uppercase"
              color="fg"
              textDecoration="none"
              whiteSpace="nowrap"
              _hover={{ opacity: 0.75 }}
            >
              {item.label}
              {item.showIcon ? (
                <Text as="span" fontSize="10px" aria-hidden>
                  +
                </Text>
              ) : null}
            </Link>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

export function HeroSplit() {
  return (
    <Flex
      as="header"
      position="relative"
      direction="column"
      minH="heroMinHeight"
      h="100vh"
      bg="black"
      overflow="hidden"
    >
      <Flex
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
            <Text
              fontWeight="bold"
              fontSize="14px"
              textTransform="uppercase"
              letterSpacing="-0.2px"
              color="fg"
            >
              KYD LABS
            </Text>
            <Heading
              as="h1"
              mt="6"
              fontSize="clamp(2.5rem, 6vw, 4.15rem)"
              fontWeight="bold"
              lineHeight="1.02"
              letterSpacing="-0.02em"
              color="fg"
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

      <HeroMiniFooter />
    </Flex>
  )
}
