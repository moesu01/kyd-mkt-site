import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react"
import {
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react"
import {
  aboutSection,
  footerLegalLinks,
  footerUtilityLinks,
  links,
} from "../content/site-content"
import { colors } from "../theme/tokens"
import { AboutEmblem } from "./about/about-emblem"
import { ABOUT_CURVED_TAGLINE_MOBILE_BREAKPOINT_PX } from "./about/about-curved-tagline-dial"
import {
  clamp01,
  getAboutHeroPresentation,
} from "./about/about-hero-transition"
import {
  BookCallCtaContent,
  bookCallButtonCss,
  findTicketsButtonCss,
  Button,
} from "./ui/button"
import { Container } from "./ui/container"
import { Reveal, RevealGroup } from "./ui/reveal"

/** About end-state: body copy only shrinks at extreme short heights. */
const ABOUT_EXTREME_VIEWPORT = "(max-height: 640px)"
/**
 * Match the equal vertical rhythm of the preceding content sections
 * (Social Proof bottom / Used By / Venues: py 20 / 28).
 */
const ABOUT_STAGE_PY = { base: "20", lg901: "28" } as const
/**
 * Absolute legal bar sits on top of the stage — reserve enough bottom
 * padding so the Book a call CTA stays clear of the copyright row on
 * short viewports (stacked mobile footer is taller than the desktop row).
 */
const ABOUT_FOOTER_CLEARANCE = { base: "9rem", md: "6rem" } as const
/** Below this height, tighten copy width so the stack stays readable. */
const ABOUT_SHORT_VIEWPORT = "(max-height: 901px)"
/**
 * Preserve enough arc width for the curved type to retain its intended
 * presence. The animated mark is scaled separately inside the emblem.
 */
const ABOUT_END_EMBLEM_MAX_W =
  "clamp(20rem, calc(77.8dvh - 100px), 48.25rem)"
/** ~48px at 540px height, ~60px at 720px, ~72px at 900px. */
const ABOUT_END_HEADLINE_SIZE =
  "clamp(48px, calc(12px + 6.67dvh), 75.8px)"
const ABOUT_END_STACK_GAP =
  "clamp(2rem, 1rem + 3dvh, 3.5rem)"
const ABOUT_END_COPY_GAP =
  "clamp(1rem, 0.5rem + 1.25dvh, 1.5rem)"
/** Base intro duration before the +25% per-frame stretch. */
const ABOUT_ENTRY_ANIMATION_BASE_MS = 1400
const ABOUT_ENTRY_ANIMATION_MS = ABOUT_ENTRY_ANIMATION_BASE_MS * 1.25
const CURRENT_YEAR = new Date().getFullYear()
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

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const progress = useAboutLogoProgress({
    sectionRef,
    prefersReducedMotion,
  })
  const presentation = getAboutHeroPresentation({
    progress,
    prefersReducedMotion,
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return (
    <Box
      ref={sectionRef}
      as="footer"
      id="about"
      position="relative"
      bg="transparent"
      backgroundImage={aboutSectionGradient}
    >
      <Box
        position="relative"
        minH="heroMinHeight"
        h="100dvh"
        maxH={{ base: "heroMaxHeight", lg901: "none" }}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        px={{ base: "6", lg901: "12" }}
        pt={ABOUT_STAGE_PY}
        pb={ABOUT_FOOTER_CLEARANCE}
        bg="transparent"
      >
        <Container position="relative" zIndex={1} w="full">
          <RevealGroup triggerRef={sectionRef} rootMargin="0px">
            <Flex
              direction="column"
              align="center"
              w="full"
              css={{ gap: ABOUT_END_STACK_GAP }}
            >
              {/* Logo + curved tagline share one-time Reveal stagger; logo auto-plays once, then scrubs. */}
              <Box
                w="full"
                maxW={ABOUT_END_EMBLEM_MAX_W}
                mx="auto"
                flexShrink={1}
                minH={0}
                css={{
                  [`@media (max-width: ${ABOUT_CURVED_TAGLINE_MOBILE_BREAKPOINT_PX}px)`]:
                    {
                      position: "relative",
                      left: "50%",
                      width: "calc(100vw + 32px)",
                      maxWidth: "calc(100vw + 32px)",
                      flexShrink: 0,
                      transform: "translateX(-50%)",
                    },
                }}
              >
                <AboutEmblem
                  revealCurvedText
                  presentation={{
                    emblemScale: presentation.emblemScale,
                    aboutAnimationOpacity: presentation.aboutAnimationOpacity,
                    aboutAnimationProgress: presentation.aboutAnimationProgress,
                  }}
                />
              </Box>

              <Flex
                direction="column"
                align="center"
                w="full"
                maxW="75rem"
                flexShrink={0}
                css={{ gap: ABOUT_END_COPY_GAP }}
              >
                <AboutCopyLayer
                  headline={aboutSection.headline}
                  body={aboutSection.body}
                />
              </Flex>
            </Flex>
          </RevealGroup>
        </Container>
        <RevealGroup
          triggerRef={sectionRef}
          rootMargin="0px"
          position="absolute"
          insetInline={{ base: "6", lg901: "12" }}
          bottom={{ base: "4", md: "8" }}
          zIndex={1}
        >
          <Reveal order={4}>
            <LegalFooterBar />
          </Reveal>
        </RevealGroup>
      </Box>
    </Box>
  )
}

function LegalFooterBar() {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="space-between"
      gap={{ base: "2", md: "0" }}
      mx="auto"
      w="full"
      maxW="1256px"
      position="relative"
    >
      <Flex
        as="nav"
        aria-label="Support"
        gap="3"
        flexWrap="wrap"
        justify={{ base: "center", md: "flex-start" }}
        flex={{ md: "1" }}
        minW="0"
      >
        {footerUtilityLinks.map((link) => (
          <FooterBarLink key={link.label} link={link} />
        ))}
      </Flex>

      <Text
        fontSize="12px"
        lineHeight="18px"
        color="warmMuted"
        textAlign="center"
        textTransform="uppercase"
        whiteSpace={{ base: "normal", sm: "nowrap" }}
        position={{ md: "absolute" }}
        left={{ md: "50%" }}
        transform={{ md: "translateX(-50%)" }}
        pointerEvents="none"
      >
        © {CURRENT_YEAR} KYD Labs. All rights reserved.
      </Text>

      <Flex
        as="nav"
        aria-label="Legal"
        gap="3"
        flexWrap="wrap"
        justify={{ base: "center", md: "flex-end" }}
        flex={{ md: "1" }}
        minW="0"
      >
        {footerLegalLinks.map((link) => (
          <FooterBarLink key={link.label} link={link} />
        ))}
      </Flex>
    </Flex>
  )
}

function FooterBarLink({
  link,
}: {
  link: { label: string; href: string }
}) {
  const isExternal = link.href.startsWith("http")

  return (
    <Link
      href={link.href}
      {...footerLinkStyles}
      {...(isExternal
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {link.label}
    </Link>
  )
}

function useAboutLogoProgress({
  sectionRef,
  prefersReducedMotion,
}: {
  sectionRef: RefObject<HTMLElement | null>
  prefersReducedMotion: boolean
}) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let frameId = 0
    let scrollFrameId = 0
    let introFrameId = 0
    let hasStartedIntro = false
    let hasFinishedIntro = false
    let introStartedAt = 0
    let introEndScrollY: number | null = null

    function publishProgress(next: number) {
      setProgress((previous) =>
        Math.abs(previous - next) < 0.0005 ? previous : next,
      )
    }

    function updateFromScroll() {
      if (!hasFinishedIntro || introEndScrollY === null) return

      const activeSection = sectionRef.current
      if (!activeSection) return

      const distanceFromIntroEnd = Math.abs(window.scrollY - introEndScrollY)
      if (distanceFromIntroEnd === 0) return

      const scrubTravel = Math.max(
        1,
        Math.min(window.innerHeight, activeSection.offsetHeight),
      )
      publishProgress(clamp01(1 - distanceFromIntroEnd / scrubTravel))
    }

    function scheduleScrollUpdate() {
      if (scrollFrameId) return
      scrollFrameId = window.requestAnimationFrame(() => {
        scrollFrameId = 0
        updateFromScroll()
      })
    }

    function animateIntro(now: number) {
      if (introStartedAt === 0) introStartedAt = now

      const next = clamp01((now - introStartedAt) / ABOUT_ENTRY_ANIMATION_MS)
      publishProgress(next)

      if (next < 1) {
        introFrameId = window.requestAnimationFrame(animateIntro)
        return
      }

      hasFinishedIntro = true
      introEndScrollY = window.scrollY
      publishProgress(1)
    }

    if (prefersReducedMotion) {
      frameId = window.requestAnimationFrame(() => {
        hasFinishedIntro = true
        publishProgress(1)
      })
      return () => window.cancelAnimationFrame(frameId)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasStartedIntro) return
        hasStartedIntro = true
        observer.disconnect()
        introFrameId = window.requestAnimationFrame(animateIntro)
      },
      { rootMargin: "0px", threshold: 0 },
    )

    observer.observe(section)
    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true })
    window.addEventListener("resize", scheduleScrollUpdate)

    return () => {
      if (frameId) window.cancelAnimationFrame(frameId)
      if (introFrameId) window.cancelAnimationFrame(introFrameId)
      if (scrollFrameId) window.cancelAnimationFrame(scrollFrameId)
      observer.disconnect()
      window.removeEventListener("scroll", scheduleScrollUpdate)
      window.removeEventListener("resize", scheduleScrollUpdate)
    }
  }, [prefersReducedMotion, sectionRef])

  return progress
}

function AboutCopyLayer({
  headline,
  body,
}: {
  headline: string
  body: string
}) {
  return (
    <Flex
      direction="column"
      align="center"
      w="full"
      css={{ gap: ABOUT_END_COPY_GAP }}
    >
      <Reveal order={1} w="full">
        <Heading
          as="h2"
          textAlign="center"
          fontFamily="cossetteTitre"
          fontWeight="bold"
          fontSize={{ base: "40px", lg901: ABOUT_END_HEADLINE_SIZE }}
          lineHeight="1.1"
          color="warmDisplay"
          maxW="54.625rem"
          mx="auto"
          css={{
            textWrap: "balance",
            "@media (max-width: 399px)": {
              fontSize: "30px",
            },
            [`@media ${ABOUT_SHORT_VIEWPORT}`]: {
              maxWidth: "42rem",
            },
          }}
        >
          {headline}
        </Heading>
      </Reveal>
      <Reveal order={2} w="full">
        <Text
          textAlign="center"
          fontFamily="sans"
          fontWeight="normal"
          fontSize={{ base: "16px", lg901: "18px" }}
          lineHeight={{ base: "24px", lg901: "27px" }}
          letterSpacing="-0.36px"
          color="warmMuted"
          maxW="33.25rem"
          mx="auto"
          css={{
            textWrap: "pretty",
            [`@media ${ABOUT_EXTREME_VIEWPORT}`]: {
              fontSize: "16px",
              lineHeight: "24px",
            },
          }}
        >
          {body}
        </Text>
      </Reveal>
      <Reveal order={3}>
        {/*
          Same CTA rhythm as the hero: both buttons share a line down to
          500px, then stack with matched widths via stretch + fit-content.
        */}
        <Flex
          direction={{ base: "column", sm500: "row" }}
          flexWrap={{ base: "nowrap", sm500: "wrap" }}
          align={{ base: "stretch", sm500: "center" }}
          justify="center"
          w={{ base: "fit-content", sm500: "auto" }}
          mx="auto"
          columnGap="6"
          rowGap="2"
          flexShrink={0}
          px="0.5"
        >
          <Button
            href={links.getInTouch}
            size="hero"
            css={bookCallButtonCss}
          >
            <BookCallCtaContent />
          </Button>
          {/* TEMP: Find my tickets hidden in About — restore when ready. */}
          <Button
            href={links.tickets}
            variant="outline-accent"
            size="hero"
            css={{ ...findTicketsButtonCss, display: "none" }}
          >
            Find my tickets
          </Button>
        </Flex>
      </Reveal>
    </Flex>
  )
}

/** Solid pageBg until the last 56px, then a tight fade so the footer reveal peeks through. */
const aboutSectionGradient = `linear-gradient(to bottom, ${colors.pageBg.value} 0%, ${colors.pageBg.value} calc(100% - 56px), transparent 100%)`
