import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react"
import {
  useEffect,
  useState,
  type TransitionEvent,
} from "react"
import { links, navMenuLinks } from "../content/site-content"
import { assetUrl } from "../lib/asset-url"
import { Button } from "./ui/button"

const interactionEase = "cubic-bezier(0.2, 0, 0, 1)"
const navShellRadius = 16
const navMenuButtonRadius = 8
const navMenuGlassBg = "oklch(0.15 0.01 63.9 / 0.8)"
const navGlassFilter = "blur(8px) saturate(4)"
const navShellShadow =
  "0 0 0 1px rgba(255, 255, 255, 0.1), 0 2px 10px rgba(0, 0, 0, 0.25)"
const navIntroDurationMs = 360
const navIntroEase = "cubic-bezier(0.2, 0, 0, 1)"
const navIntroOffsetPx = 12
const navStateDurationMs = 280

export type AlternateNavVariant = "hero" | "compact"

const navLinkStyles = {
  display: "inline-flex",
  alignItems: "center",
  minH: "10",
  px: "4",
  bg: "transparent",
  color: "fg",
  fontFamily: "sans",
  fontSize: "13px",
  fontWeight: "medium",
  lineHeight: "1",
  textDecoration: "none",
  borderRadius: "4px",
  transitionProperty: "background-color, transform",
  transitionDuration: "180ms",
  transitionTimingFunction: interactionEase,
  _hover: {
    bg: "surfaceRaised",
  },
  _active: {
    transform: "scale(0.96)",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "rgba(255, 255, 255, 0.45)",
    outlineOffset: "2px",
  },
} as const

const ticketsButtonStyles = {
  bg: "frameBg",
  boxShadow: "0 0 2px 1px rgba(255, 255, 255, 0.15)",
  _hover: {
    bg: "surfaceRaised",
    boxShadow: "0 0 2px 1px rgba(255, 255, 255, 0.15)",
  },
  _active: {
    boxShadow: "0 0 2px 1px rgba(255, 255, 255, 0.15)",
  },
} as const

function MenuIcon({ isOpen }: MenuIconProps) {
  return (
    <Box position="relative" w="4" h="4" aria-hidden>
      <Box
        position="absolute"
        top="50%"
        left="0"
        w="full"
        h="0.5"
        bg="fg"
        transform={isOpen ? "translateY(-50%) rotate(45deg)" : "translateY(-4px)"}
        transitionProperty="transform"
        transitionDuration="200ms"
        transitionTimingFunction={interactionEase}
      />
      <Box
        position="absolute"
        top="50%"
        left="0"
        w="full"
        h="0.5"
        bg="fg"
        transform={isOpen ? "translateY(-50%) rotate(-45deg)" : "translateY(3px)"}
        transitionProperty="transform"
        transitionDuration="200ms"
        transitionTimingFunction={interactionEase}
      />
    </Box>
  )
}

function LogoLink() {
  return (
    <Link
      href="#"
      display="inline-flex"
      alignItems="center"
      minH="10"
      textDecoration="none"
      aria-label="KYD Labs home"
      css={{
        transitionProperty: "opacity",
        transitionDuration: "150ms",
        transitionTimingFunction: interactionEase,
        _hover: { opacity: 0.8 },
        _active: { opacity: 0.7 },
        _focusVisible: {
          outline: "2px solid",
          outlineColor: "rgba(255, 255, 255, 0.45)",
          outlineOffset: "2px",
        },
      }}
    >
      <Image
        src={assetUrl("/icons/kyd_horiz.svg")}
        alt="KYD Labs"
        h="20px"
        w="auto"
        maxW="none"
        objectFit="contain"
      />
    </Link>
  )
}

function getMobileMenuPanelMotion(isOpen: boolean) {
  return {
    transform: isOpen ? "translateY(0)" : "translateY(-12px)",
    visibility: isOpen ? "visible" : "hidden",
    pointerEvents: isOpen ? "auto" : "none",
    transitionProperty: "transform, visibility",
    // Transform runs immediately; visibility waits for the exit to finish.
    transitionDuration: isOpen ? "220ms, 0ms" : "150ms, 0ms",
    transitionDelay: isOpen ? "0ms, 0ms" : "0ms, 150ms",
    transitionTimingFunction: isOpen
      ? `${interactionEase}, linear`
      : "ease-in, linear",
  } as const
}

function getMobileMenuItemMotion({
  index,
  isOpen,
  totalItems,
}: {
  index: number
  isOpen: boolean
  totalItems: number
}) {
  const enterDelay = `${index * 80}ms`
  const exitDelay = `${Math.max(totalItems - index - 1, 0) * 30}ms`

  return {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(12px)",
    filter: isOpen ? "blur(0px)" : "blur(4px)",
    transitionProperty: "opacity, transform, filter",
    transitionDuration: isOpen ? "220ms" : "150ms",
    transitionTimingFunction: isOpen ? interactionEase : "ease-in",
    transitionDelay: isOpen ? enterDelay : exitDelay,
  } as const
}

export function AlternateNav({
  isIntroVisible = true,
  variant = "compact",
}: {
  isIntroVisible?: boolean
  variant?: AlternateNavVariant
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [menuVariant, setMenuVariant] = useState(variant)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [hasIntroSettled, setHasIntroSettled] = useState(false)
  const [trackedIntroVisible, setTrackedIntroVisible] = useState(isIntroVisible)
  const isHero = variant === "hero"

  // Close mobile menu when crossing hero → compact (layout width changes).
  if (menuVariant !== variant) {
    setMenuVariant(variant)
    if (isMenuOpen) setIsMenuOpen(false)
  }

  // Reset intro settle when the intro is hidden again (e.g. future loader).
  if (trackedIntroVisible !== isIntroVisible) {
    setTrackedIntroVisible(isIntroVisible)
    if (!isIntroVisible && hasIntroSettled) setHasIntroSettled(false)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  function handleToggleMenu() {
    setIsMenuOpen((isOpen) => !isOpen)
  }

  function handleCloseMenu() {
    setIsMenuOpen(false)
  }

  function handleIntroTransitionEnd(event: TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return
    if (event.propertyName !== "opacity") return
    if (!isIntroVisible) return
    setHasIntroSettled(true)
  }

  const isVisible = prefersReducedMotion || isIntroVisible
  const introSettled = hasIntroSettled || prefersReducedMotion
  const stateTransition = prefersReducedMotion
    ? undefined
    : {
        transitionProperty:
          "max-width, background-color, box-shadow, border-radius, padding",
        transitionDuration: `${navStateDurationMs}ms`,
        transitionTimingFunction: interactionEase,
      }

  return (
    <Box
      position="relative"
      w="full"
      maxW={isHero ? "1222px" : "720px"}
      style={
        introSettled
          ? undefined
          : getNavIntroStyle({
              isVisible,
              prefersReducedMotion,
            })
      }
      pointerEvents={isVisible ? "auto" : "none"}
      aria-hidden={!isVisible}
      onTransitionEnd={handleIntroTransitionEnd}
      css={stateTransition}
    >
      <Box
        bg={isHero ? "transparent" : "#000"}
        pl={isHero ? { base: "0", lg901: "5" } : { base: "4", lg901: "5" }}
        pr={isHero ? { base: "0", lg901: "1.5" } : "1.5"}
        py={isHero ? "1.5" : "1.5"}
        borderRadius={isHero ? "0" : `${navShellRadius}px`}
        boxShadow={isHero ? "none" : navShellShadow}
        css={stateTransition}
      >
        <Flex align="center" justify="space-between" w="full">
          <LogoLink />

          <Flex
            as="nav"
            display={{ base: "none", lg901: "flex" }}
            align="center"
            gap="2"
            aria-label="Page sections"
          >
            {navMenuLinks.map((item) => (
              <Link key={item.href} href={item.href} css={navLinkStyles}>
                {item.label}
              </Link>
            ))}
            <Button
              href={links.tickets}
              variant="dark"
              size="compact"
              css={ticketsButtonStyles}
            >
              My Tickets
            </Button>
          </Flex>

          <chakra.button
            type="button"
            display={{ base: "flex", lg901: "none" }}
            alignItems="center"
            justifyContent="center"
            minW="10"
            minH="10"
            p="0"
            border="none"
            borderRadius={`${navMenuButtonRadius}px`}
            bg={
              isHero
                ? "oklch(0.178 0.01 63.9 / 0.4)"
                : "oklch(0.178 0.01 63.9 / 0.25)"
            }
            color="fg"
            cursor="pointer"
            boxShadow="0 0 0 1px rgba(255, 255, 255, 0.1)"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="alternate-nav-menu"
            css={{
              transitionProperty: "background-color, box-shadow, transform",
              transitionDuration: "180ms",
              transitionTimingFunction: interactionEase,
              _hover: {
                bg: "oklch(0.178 0.01 63.9 / 0.4)",
                boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.16)",
              },
              _active: { transform: "scale(0.96)" },
              _focusVisible: {
                outline: "2px solid",
                outlineColor: "rgba(255, 255, 255, 0.45)",
                outlineOffset: "2px",
              },
            }}
            onClick={handleToggleMenu}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </chakra.button>
        </Flex>
      </Box>

      {/*
        Menu is a sibling of the glass shell (not nested inside backdrop-filter).
        Opacity stays off the glass layer so backdrop blur keeps working.
      */}
      <Box
        display={{ base: "block", lg901: "none" }}
        position="absolute"
        top="calc(100% + 8px)"
        left="0"
        right="0"
        zIndex={1}
        css={getMobileMenuPanelMotion(isMenuOpen)}
      >
        <Flex
          id="alternate-nav-menu"
          as="nav"
          direction="column"
          gap="2"
          p="2"
          bg={navMenuGlassBg}
          backdropFilter={navGlassFilter}
          css={{ WebkitBackdropFilter: navGlassFilter }}
          borderRadius={`${navShellRadius}px`}
          boxShadow="frame"
          aria-label="Mobile page sections"
          aria-hidden={!isMenuOpen}
        >
          {navMenuLinks.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              w="full"
              tabIndex={isMenuOpen ? 0 : -1}
              css={{
                ...navLinkStyles,
                fontSize: "18px",
                minH: "12",
                px: "4",
                py: "3",
                ...getMobileMenuItemMotion({
                  index,
                  isOpen: isMenuOpen,
                  totalItems: navMenuLinks.length + 1,
                }),
                // Link hover/active transform must not fight the enter motion.
                transitionProperty:
                  "opacity, transform, filter, background-color",
              }}
              onClick={handleCloseMenu}
            >
              {item.label}
            </Link>
          ))}
          <Button
            href={links.tickets}
            variant="dark"
            size="compact"
            tabIndex={isMenuOpen ? 0 : -1}
            css={{
              ...ticketsButtonStyles,
              w: "full",
              minH: "12",
              justifyContent: "flex-start",
              px: "4",
              py: "3",
              fontSize: "18px",
              ...getMobileMenuItemMotion({
                index: navMenuLinks.length,
                isOpen: isMenuOpen,
                totalItems: navMenuLinks.length + 1,
              }),
            }}
            onClick={handleCloseMenu}
          >
            My Tickets
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}

interface MenuIconProps {
  isOpen: boolean
}

function getNavIntroStyle({
  isVisible,
  prefersReducedMotion,
}: {
  isVisible: boolean
  prefersReducedMotion: boolean
}) {
  if (prefersReducedMotion) {
    return {
      opacity: isVisible ? 1 : 0,
      visibility: isVisible ? ("visible" as const) : ("hidden" as const),
    }
  }

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : `translateY(-${navIntroOffsetPx}px)`,
    filter: isVisible ? "blur(0px)" : "blur(4px)",
    visibility: "visible" as const,
    transitionProperty: "opacity, transform, filter",
    transitionDuration: `${navIntroDurationMs}ms`,
    transitionTimingFunction: navIntroEase,
    willChange: "opacity, transform, filter",
  }
}
