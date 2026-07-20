import { Box, Flex, Image, Link, Text } from "@chakra-ui/react"
import { useLayoutEffect, useRef } from "react"
import { footerLegalLinks, links } from "../content/site-content"
import { Button, CtaArrow } from "./ui/button"

const FOOTER_BG_SURFACE_ID = "footer-bg-surface"
const FOOTER_BG_VIDEO_ID = "footer-bg-video"

const footerLinkStyles = {
  fontSize: "13px",
  lineHeight: "19.5px",
  color: "warmMuted",
  bg: "#000",
  borderRadius: "2px",
  px: "8px",
  py: "4px",
  textDecoration: "none",
  transitionProperty: "color, background-color",
  transitionDuration: "150ms",
  transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
  _hover: { color: "fg", bg: "rgba(0, 0, 0, 0.82)" },
  _active: { color: "fg", transform: "scale(0.96)" },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "rgba(255, 255, 255, 0.45)",
    outlineOffset: "2px",
  },
} as const

function mountFooterBackground({ footerElement }: { footerElement: HTMLElement }) {
  const surface = document.getElementById(FOOTER_BG_SURFACE_ID)
  const video = document.getElementById(FOOTER_BG_VIDEO_ID)

  if (surface) footerElement.prepend(surface)

  if (video instanceof HTMLVideoElement) {
    if (surface?.parentElement === footerElement) surface.after(video)
    else footerElement.prepend(video)

    if (getComputedStyle(video).display !== "none" && video.paused) {
      void video.play().catch(() => {
        // Autoplay can still fail until a trusted gesture; muted + playsinline usually works.
      })
    }
  }
}

function smoothstep(value: number) {
  const t = Math.min(1, Math.max(0, value))
  return t * t * (3 - 2 * t)
}

function getFooterRevealProgress({
  footerHeight,
  viewportHeight,
  scrollY,
  scrollHeight,
}: {
  footerHeight: number
  viewportHeight: number
  scrollY: number
  scrollHeight: number
}) {
  const maxScroll = Math.max(1, scrollHeight - viewportHeight)
  const remaining = Math.max(0, maxScroll - scrollY)
  // Start fading a bit before the sticky curtain lifts, finish at page end.
  const fadeRange = Math.max(footerHeight * 0.9, viewportHeight * 0.65)
  return smoothstep(1 - Math.min(1, remaining / fadeRange))
}

function syncFooterReveal({
  footerElement,
  prefersReducedMotion,
}: {
  footerElement: HTMLElement
  prefersReducedMotion: boolean
}) {
  if (prefersReducedMotion) {
    footerElement.style.opacity = "1"
    footerElement.style.pointerEvents = "auto"
    return
  }

  const progress = getFooterRevealProgress({
    footerHeight: footerElement.offsetHeight,
    viewportHeight: window.innerHeight,
    scrollY: window.scrollY,
    scrollHeight: document.documentElement.scrollHeight,
  })

  footerElement.style.opacity = String(progress)
  footerElement.style.pointerEvents = progress < 0.08 ? "none" : "auto"
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const footerElement = footerRef.current
    if (!footerElement) return

    mountFooterBackground({ footerElement })

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frameId = 0

    const updateReveal = () => {
      syncFooterReveal({
        footerElement,
        prefersReducedMotion: motionQuery.matches,
      })
    }

    const scheduleReveal = () => {
      if (frameId) return
      frameId = window.requestAnimationFrame(() => {
        frameId = 0
        updateReveal()
      })
    }

    updateReveal()
    window.addEventListener("scroll", scheduleReveal, { passive: true })
    window.addEventListener("resize", scheduleReveal)
    motionQuery.addEventListener("change", updateReveal)

    const resizeObserver = new ResizeObserver(scheduleReveal)
    resizeObserver.observe(footerElement)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      window.removeEventListener("scroll", scheduleReveal)
      window.removeEventListener("resize", scheduleReveal)
      motionQuery.removeEventListener("change", updateReveal)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <Box
      as="footer"
      ref={footerRef}
      position="sticky"
      bottom={{ base: "4", md: "8" }}
      zIndex={0}
      display="flex"
      flexDirection="column"
      minH={{ base: "calc(760px - 32px)", md: "calc(850px - 64px)" }}
      pt={{ base: "24", md: "156px" }}
      pb={{ base: "8", md: "12" }}
      px={{ base: "6", md: "12" }}
      m={{ base: "4", md: "8" }}
      w={{ base: "calc(100% - 32px)", md: "calc(100% - 64px)" }}
      borderRadius="32px"
      boxShadow="frame"
      overflow="hidden"
      bg="transparent"
      opacity={0}
      css={{
        "@media (prefers-reduced-motion: reduce)": {
          opacity: "1 !important",
          pointerEvents: "auto !important",
        },
      }}
    >
      <Flex
        position="relative"
        zIndex={1}
        direction="column"
        align="center"
        gap="8"
        mx="auto"
        w="full"
        maxW="628px"
        textAlign="center"
      >
        <Link
          href="#"
          display="block"
          aria-label="KYD Labs home"
          css={{
            transitionProperty: "opacity, transform",
            transitionDuration: "180ms",
            transitionTimingFunction: "cubic-bezier(0.2, 0, 0, 1)",
            _hover: { opacity: 0.88, transform: "scale(1.01)" },
            _active: { transform: "scale(0.96)" },
            _focusVisible: {
              outline: "2px solid",
              outlineColor: "rgba(255, 255, 255, 0.45)",
              outlineOffset: "6px",
            },
          }}
        >
          <Image
            src="/kyd-labs-logo.svg"
            alt="KYD Labs"
            w={{ base: "min(78vw, 360px)", md: "608px" }}
            h="auto"
          />
        </Link>

        <Text
          maxW="513px"
          color="fgFeature"
          opacity={0.9}
          fontFamily="cossetteTexte"
          fontSize={{ base: "16px", md: "18px" }}
          lineHeight={{ base: "24px", md: "27px" }}
          letterSpacing="0.18px"
          textWrap="pretty"
        >
          Own your data. Capture resale. Activate fans with AI. The
          infrastructure venues use to run smarter shows.
        </Text>

        <Flex
          direction={{ base: "column", sm: "row" }}
          align="stretch"
          justify="center"
          gap="6"
          w={{ base: "full", sm: "auto" }}
        >
          <Button
            href={links.getInTouch}
            size="hero"
            css={{ width: { base: "full", sm: "auto" } }}
          >
            <span>
              Get in touch
              <CtaArrow />
            </span>
          </Button>
          <Button
            href={links.tickets}
            variant="outline-accent"
            size="hero"
            css={{ width: { base: "full", sm: "auto" } }}
          >
            Find my tickets
          </Button>
        </Flex>
      </Flex>

      <Flex
        position="relative"
        zIndex={1}
        direction={{ base: "column", md: "row" }}
        align={{ base: "center", md: "flex-end" }}
        justify="space-between"
        gap="8"
        mt="auto"
        mx="auto"
        w="full"
        maxW="1256px"
      >
        <Flex as="nav" aria-label="Legal" gap="3" flexWrap="wrap" justify="center">
          {footerLegalLinks.map((link) => (
            <Link key={link.label} href={link.href} {...footerLinkStyles}>
              {link.label}
            </Link>
          ))}
        </Flex>

        <Flex
          direction="column"
          align={{ base: "center", md: "flex-end" }}
          gap="5px"
        >
          <Image
            src="/icons/kyd-dashboard-mark.svg"
            alt=""
            aria-hidden="true"
            w="45px"
            h="26px"
          />
          <Text
            fontSize="12px"
            lineHeight="18px"
            color="warmMuted"
            textAlign={{ base: "center", md: "right" }}
            textTransform="uppercase"
            whiteSpace={{ base: "normal", sm: "nowrap" }}
          >
            © 2025 KYD Labs. All rights reserved.
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}
