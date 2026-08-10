import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react"
import {
  useEffect,
  useRef,
  useState,
  type TransitionEvent,
} from "react"
import { createPortal } from "react-dom"
import { links, navMenuLinks } from "../content/site-content"
import { assetUrl } from "../lib/asset-url"
import { Button, CtaArrow } from "./ui/button"

const interactionEase = "cubic-bezier(0.2, 0, 0, 1)"
const navShellRadius = 16
const navMenuButtonRadius = 8
/** Matches pageBg (oklch 0.178 .01 63.9) at ~0.8 opacity for frosted panel. */
const navMenuGlassBg = "oklch(0.178 0.01 63.9 / 0.8)"
const navGlassFilter = "blur(12px) saturate(4)"
const navMenuButtonHeroBg = "oklch(0.178 0.01 63.9 / 0.7)"
const navMenuButtonCompactBg = "oklch(0.178 0.01 63.9 / 0.25)"
const navMenuButtonHoverBg = "oklch(0.178 0.01 63.9 / 0.7)"
/** Dimmed black page overlay; z sits under App nav chrome (zIndex 100). */
const navScrimBg = "rgba(0, 0, 0, 0.6)"
const navScrimZIndex = 99
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

/**
 * Visibility on the positioning wrapper only — no transform here.
 * A transformed ancestor breaks backdrop-filter on the glass panel.
 */
function getMobileMenuPanelVisibility(isOpen: boolean) {
  return {
    visibility: isOpen ? "visible" : "hidden",
    pointerEvents: isOpen ? "auto" : "none",
    transitionProperty: "visibility",
    transitionDuration: "0ms",
    transitionDelay: isOpen ? "0ms" : "150ms",
  } as const
}

/** Slide motion lives on the same node as backdrop-filter so blur still works. */
function getMobileMenuPanelMotion(isOpen: boolean) {
  return {
    transform: isOpen ? "translateY(0)" : "translateY(-12px)",
    transitionProperty: "transform",
    transitionDuration: isOpen ? "220ms" : "150ms",
    transitionTimingFunction: isOpen ? interactionEase : "ease-in",
  } as const
}

function getMobileMenuScrimMotion(isOpen: boolean) {
  return {
    opacity: isOpen ? 1 : 0,
    visibility: isOpen ? "visible" : "hidden",
    pointerEvents: isOpen ? "auto" : "none",
    transitionProperty: "opacity, visibility",
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
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLElement>(null)
  const wasMenuOpenRef = useRef(false)
  const [isPortalReady, setIsPortalReady] = useState(false)
  const isHero = variant === "hero"

  useEffect(() => {
    setIsPortalReady(true)
  }, [])

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

  useEffect(() => {
    if (!isMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      setIsMenuOpen(false)
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isMenuOpen])

  useEffect(() => {
    if (isMenuOpen) {
      const firstFocusable = menuPanelRef.current?.querySelector<HTMLElement>(
        "a[href], button:not([disabled])",
      )
      firstFocusable?.focus()
      wasMenuOpenRef.current = true
      return
    }

    if (!wasMenuOpenRef.current) return
    wasMenuOpenRef.current = false
    menuButtonRef.current?.focus()
  }, [isMenuOpen])

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
      {isPortalReady
        ? createPortal(
            <Box
              display={{ base: "block", lg901: "none" }}
              position="fixed"
              inset="0"
              zIndex={navScrimZIndex}
              bg={navScrimBg}
              aria-hidden
              css={getMobileMenuScrimMotion(isMenuOpen)}
              onClick={handleCloseMenu}
            />,
            document.body,
          )
        : null}

      <Box
        position="relative"
        zIndex={1}
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
            ref={menuButtonRef}
            type="button"
            display={{ base: "flex", lg901: "none" }}
            alignItems="center"
            justifyContent="center"
            minW="10"
            minH="10"
            p="0"
            border="none"
            borderRadius={`${navMenuButtonRadius}px`}
            bg={isHero ? navMenuButtonHeroBg : navMenuButtonCompactBg}
            color="fg"
            cursor="pointer"
            boxShadow="0 0 0 1px rgba(255, 255, 255, 0.1)"
            backdropFilter={isHero ? navGlassFilter : undefined}
            css={{
              WebkitBackdropFilter: isHero ? navGlassFilter : undefined,
              transitionProperty: "background-color, box-shadow, transform",
              transitionDuration: "180ms",
              transitionTimingFunction: interactionEase,
              _hover: {
                bg: navMenuButtonHoverBg,
                boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.16)",
              },
              _active: { transform: "scale(0.96)" },
              _focusVisible: {
                outline: "2px solid",
                outlineColor: "rgba(255, 255, 255, 0.45)",
                outlineOffset: "2px",
              },
            }}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="alternate-nav-menu"
            onClick={handleToggleMenu}
          >
            <MenuIcon isOpen={isMenuOpen} />
          </chakra.button>
        </Flex>
      </Box>

      {/*
        Positioning wrapper stays transform-free so backdrop-filter on the
        glass panel can sample the page (and portal scrim) behind it.
      */}
      <Box
        display={{ base: "block", lg901: "none" }}
        position="absolute"
        top="calc(100% + 8px)"
        left="0"
        right="0"
        zIndex={1}
        css={getMobileMenuPanelVisibility(isMenuOpen)}
      >
        <Flex
          ref={menuPanelRef}
          id="alternate-nav-menu"
          as="nav"
          direction="column"
          gap="2"
          p="2"
          bg={navMenuGlassBg}
          backdropFilter={navGlassFilter}
          borderRadius={`${navShellRadius}px`}
          boxShadow="frame"
          aria-label="Mobile page sections"
          aria-hidden={!isMenuOpen}
          css={{
            WebkitBackdropFilter: navGlassFilter,
            ...getMobileMenuPanelMotion(isMenuOpen),
          }}
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
              justifyContent: "space-between",
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
            Find my tickets
            <CtaArrow />
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
