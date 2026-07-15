import { useEffect, useRef } from "react"
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

/**
 * Safari (especially iOS) requires the muted + playsinline attributes to exist
 * on the real DOM node before autoplay is allowed. React does not reliably
 * write `muted` to the DOM (longstanding bug), so we inject the <video> as HTML
 * and force the muted/playsInline properties before calling play().
 */
function HeroBgVideo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const video = container.querySelector("video")
    if (!video) return

    video.defaultMuted = true
    video.muted = true
    video.playsInline = true
    video.setAttribute("muted", "")
    video.setAttribute("playsinline", "")
    video.setAttribute("webkit-playsinline", "")

    const tryPlay = () => {
      void video.play().catch(() => {
        // Autoplay can still be blocked (e.g. Low Power Mode). Retry on gesture.
      })
    }

    tryPlay()
    video.addEventListener("loadeddata", tryPlay)
    video.addEventListener("canplay", tryPlay)

    const handleGesture = () => {
      tryPlay()
    }
    window.addEventListener("touchstart", handleGesture, {
      once: true,
      passive: true,
    })
    window.addEventListener("click", handleGesture, { once: true })

    return () => {
      video.removeEventListener("loadeddata", tryPlay)
      video.removeEventListener("canplay", tryPlay)
      window.removeEventListener("touchstart", handleGesture)
      window.removeEventListener("click", handleGesture)
    }
  }, [])

  return (
    <Box
      ref={containerRef}
      position="absolute"
      inset="0"
      zIndex={0}
      pointerEvents="none"
      aria-hidden
      css={{
        "& video": {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        },
      }}
      dangerouslySetInnerHTML={{
        __html: `<video autoplay muted loop playsinline webkit-playsinline preload="auto" aria-hidden="true"><source src="${HERO_BG_VIDEO}" type="video/mp4" /></video>`,
      }}
    />
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
      bg="#000"
      overflow="hidden"
      css={{
        "@media (prefers-reduced-motion: reduce)": {
          "& video": { display: "none" },
        },
      }}
    >
      <HeroBgVideo />

      {/* <Box
        position="absolute"
        inset="0"
        zIndex={1}
        pointerEvents="none"
        backgroundImage="linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 42%, rgba(0,0,0,0.12) 100%)"
      /> */}

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
              fontSize={{
                base: "40px",
                md: "56px",
                lg901: "72px",
                xl: "100px",
              }}
              lineHeight="1"
              color="warmDisplay"
              css={{
                transition: "font-size var(--resize-dur) var(--resize-ease)",
                willChange: "font-size",
                "@media (prefers-reduced-motion: reduce)": {
                  transition: "none",
                },
              }}
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
            alignSelf={{ lg901: "center" }}
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
