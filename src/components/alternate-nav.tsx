import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react"
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type TransitionEvent,
} from "react"
import { createPortal } from "react-dom"
import { links, navMenuLinks } from "../content/site-content"
import { assetUrl } from "../lib/asset-url"
import { navScrollOffsetPx } from "../theme"
import { Button, CtaArrow } from "./ui/button"
import { useActiveSection } from "./use-active-section"

const interactionEase = "cubic-bezier(0.2, 0, 0, 1)"
const navShellRadius = 16
const navMenuButtonRadius = 8
/** pageBg at 0.85 — opaque enough to read, still lets blur show through. */
const navMenuGlassBg = "oklch(0.178 0.01 63.9 / 0.85)"
const navGlassFilter = "blur(16px) saturate(1.2)"
const navMenuButtonHeroBg = "oklch(0.178 0.01 63.9 / 0.7)"
const navMenuButtonCompactBg = "oklch(0.178 0.01 63.9 / 0.25)"
const navMenuButtonHoverBg = "oklch(0.178 0.01 63.9 / 0.7)"
/**
 * Dimmed black page overlay — must stay inside #root’s stacking tree (not
 * document.body). A body portal sits above the entire React tree, so the nav
 * chrome can never paint over it.
 * Stack in #root: page (1) < scrim (inside nav 110) < nav shell < menu (120).
 */
const navScrimBg = "rgba(0, 0, 0, 0.6)"
const navMenuPortalZIndex = 120
const navShellShadow =
  "0 0 0 1px rgba(255, 255, 255, 0.1), 0 2px 10px rgba(0, 0, 0, 0.25)"
const navIntroDurationMs = 360
const navIntroEase = "cubic-bezier(0.2, 0, 0, 1)"
const navIntroOffsetPx = 12
const navStateDurationMs = 280
const navMenuGapPx = 8
/**
 * Hover in is near-instant while hover out fades. Sweeping across menu items
 * back to back then only ever reads as one lit row following the cursor,
 * instead of every row it passed easing on a beat behind the pointer.
 */
const navHoverInDurationMs = 60
const navHoverOutDurationMs = 140
const navPressDurationMs = 150
/** Only the section you are reading gets pure white. */
const navActiveColor = "#fff"
/** DOM order matters: the probe walks these top to bottom. */
const navSectionIds = navMenuLinks.map((item) => item.href.replace("#", ""))

export type AlternateNavVariant = "hero" | "compact"

interface MenuPanelBox {
  top: number
  left: number
  width: number
}

const navLinkStyles = {
  display: "inline-flex",
  alignItems: "center",
  minH: "10",
  px: "4",
  bg: "transparent",
  color: "warmDisplay",
  fontFamily: "sans",
  fontSize: "13px",
  fontWeight: "normal",
  lineHeight: "1",
  textDecoration: "none",
  borderRadius: "4px",
  // Press animates `scale`, not `transform`, so it can never fight the
  // staggered translateY the mobile menu runs on each item's wrapper.
  transitionProperty: "background-color, color, scale",
  transitionDuration: `${navHoverOutDurationMs}ms, ${navHoverOutDurationMs}ms, ${navPressDurationMs}ms`,
  transitionTimingFunction: `${interactionEase}, ${interactionEase}, ease-out`,
  _hover: {
    bg: "surfaceRaised",
    transitionDuration: `${navHoverInDurationMs}ms, ${navHoverInDurationMs}ms, ${navPressDurationMs}ms`,
  },
  _active: {
    scale: "0.96",
  },
  // Ring only — weight and color are reserved for the active section, so a
  // focused link can never impersonate the one you are reading.
  _focusVisible: {
    outline: "1px solid",
    outlineColor: "rgba(255, 255, 255, 0.24)",
    outlineOffset: "2px",
  },
} as const

function getNavLinkStyles({ isActive }: { isActive: boolean }) {
  return {
    ...navLinkStyles,
    color: isActive ? navActiveColor : "warmDisplay",
    fontWeight: isActive ? "medium" : "normal",
  } as const
}

const ticketsButtonStyles = {
  bg: "frameBg",
  // One step under the `dark` variant's semibold, matching the resting links.
  color: "warmDisplay",
  fontWeight: "medium",
  boxShadow: "0 0 2px 1px rgba(255, 255, 255, 0.15)",
  // Overrides the recipe's symmetric 220ms so this matches the sibling links.
  transitionDuration: `${navHoverOutDurationMs}ms`,
  _hover: {
    bg: "surfaceRaised",
    boxShadow: "0 0 2px 1px rgba(255, 255, 255, 0.15)",
    transitionDuration: `${navHoverInDurationMs}ms`,
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
 * Visibility only on the portal wrapper — opacity/transform/filter on an
 * ancestor all break backdrop-filter on the glass panel.
 */
function getMobileMenuPanelMotion(isOpen: boolean) {
  return {
    visibility: isOpen ? "visible" : "hidden",
    pointerEvents: isOpen ? "auto" : "none",
    transitionProperty: "visibility",
    transitionDuration: "0ms",
    transitionDelay: isOpen ? "0ms" : "220ms",
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

  // Applied to a wrapper, never the interactive element: a single
  // transitionDelay covers every listed property, so staggering the item
  // itself would also delay its hover background by index * 80ms.
  return {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(12px)",
    transitionProperty: "opacity, transform",
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
  const [isPortalReady, setIsPortalReady] = useState(false)
  const [menuPanelBox, setMenuPanelBox] = useState<MenuPanelBox | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)
  const wasMenuOpenRef = useRef(false)
  const isHero = variant === "hero"
  const { activeId } = useActiveSection({
    sectionIds: navSectionIds,
    offsetPx: navScrollOffsetPx,
  })

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

  // Intro can mount already-visible without firing transitionend — clear
  // filter/transform leftovers that permanently break backdrop-filter.
  useEffect(() => {
    if (!isIntroVisible || hasIntroSettled || prefersReducedMotion) return

    const timeoutId = window.setTimeout(() => {
      setHasIntroSettled(true)
    }, navIntroDurationMs + 40)

    return () => window.clearTimeout(timeoutId)
  }, [isIntroVisible, hasIntroSettled, prefersReducedMotion])

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

  useLayoutEffect(() => {
    function updateMenuPanelBox() {
      const root = rootRef.current
      if (!root) return

      const rect = root.getBoundingClientRect()
      setMenuPanelBox({
        top: rect.bottom + navMenuGapPx,
        left: rect.left,
        width: rect.width,
      })
    }

    updateMenuPanelBox()
    window.addEventListener("resize", updateMenuPanelBox)
    return () => window.removeEventListener("resize", updateMenuPanelBox)
  }, [isMenuOpen, variant, isHero])

  useEffect(() => {
    if (isMenuOpen) {
      // Focus the panel rather than its first link. Focus still enters the
      // menu (Tab and Escape work), but programmatically focusing a link can
      // satisfy :focus-visible even on tap, and a lit first item reads as
      // "this is your current section" when it only means "focus landed here".
      menuPanelRef.current?.focus()
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

  const portalTarget =
    isPortalReady && typeof document !== "undefined"
      ? document.getElementById("root")
      : null

  const mobileMenuPortal =
    portalTarget && menuPanelBox
      ? createPortal(
          <Box
            display={{ base: "block", lg901: "none" }}
            position="fixed"
            top={`${menuPanelBox.top}px`}
            left={`${menuPanelBox.left}px`}
            w={`${menuPanelBox.width}px`}
            zIndex={navMenuPortalZIndex}
            css={getMobileMenuPanelMotion(isMenuOpen)}
          >
            <Flex
              ref={menuPanelRef}
              id="alternate-nav-menu"
              as="nav"
              tabIndex={-1}
              direction="column"
              gap="2"
              p="2"
              bg={navMenuGlassBg}
              borderRadius={`${navShellRadius}px`}
              boxShadow="frame"
              aria-label="Mobile page sections"
              aria-hidden={!isMenuOpen}
              // filter:none is required — any ancestor/self filter kills blur.
              // Transform-free glass node so backdrop-filter can sample the page.
              css={{
                filter: "none",
                backdropFilter: navGlassFilter,
                WebkitBackdropFilter: navGlassFilter,
                // Scripted focus target, never tabbed to — a ring here would
                // just outline the whole panel on open.
                outline: "none",
              }}
            >
              {navMenuLinks.map((item, index) => (
                <Box
                  key={item.href}
                  w="full"
                  css={getMobileMenuItemMotion({
                    index,
                    isOpen: isMenuOpen,
                    totalItems: navMenuLinks.length + 1,
                  })}
                >
                  <Link
                    href={item.href}
                    w="full"
                    tabIndex={isMenuOpen ? 0 : -1}
                    aria-current={
                      activeId === item.href.slice(1) ? "location" : undefined
                    }
                    css={{
                      ...getNavLinkStyles({
                        isActive: activeId === item.href.slice(1),
                      }),
                      fontSize: "18px",
                      minH: "12",
                      px: "4",
                      py: "3",
                    }}
                    onClick={handleCloseMenu}
                  >
                    {item.label}
                  </Link>
                </Box>
              ))}
              <Box
                w="full"
                css={getMobileMenuItemMotion({
                  index: navMenuLinks.length,
                  isOpen: isMenuOpen,
                  totalItems: navMenuLinks.length + 1,
                })}
              >
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
                  }}
                  onClick={handleCloseMenu}
                >
                  Find my tickets
                  <CtaArrow />
                </Button>
              </Box>
            </Flex>
          </Box>,
          portalTarget,
        )
      : null

  return (
    <Box
      ref={rootRef}
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
      {/*
        Scrim stays in the nav stacking context (App z=110), not a body portal.
        Fixed inset covers the viewport; shell above it stays undimmed.
      */}
      <Box
        display={{ base: "block", lg901: "none" }}
        position="fixed"
        inset="0"
        zIndex={0}
        bg={navScrimBg}
        aria-hidden
        css={getMobileMenuScrimMotion(isMenuOpen)}
        onClick={handleCloseMenu}
      />

      {mobileMenuPortal}

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
              <Link
                key={item.href}
                href={item.href}
                aria-current={
                  activeId === item.href.slice(1) ? "location" : undefined
                }
                css={getNavLinkStyles({
                  isActive: activeId === item.href.slice(1),
                })}
              >
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
              filter: "none",
              WebkitBackdropFilter: isHero ? navGlassFilter : undefined,
              transitionProperty: "background-color, box-shadow, scale",
              transitionDuration: `${navHoverOutDurationMs}ms, ${navHoverOutDurationMs}ms, ${navPressDurationMs}ms`,
              transitionTimingFunction: `${interactionEase}, ${interactionEase}, ease-out`,
              _hover: {
                bg: navMenuButtonHoverBg,
                boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.16)",
                transitionDuration: `${navHoverInDurationMs}ms, ${navHoverInDurationMs}ms, ${navPressDurationMs}ms`,
              },
              _active: { scale: "0.96" },
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
    // Use none at rest — blur(0) still creates a filter containing block and
    // permanently disables backdrop-filter on descendants.
    filter: isVisible ? "none" : "blur(4px)",
    visibility: "visible" as const,
    transitionProperty: "opacity, transform, filter",
    transitionDuration: `${navIntroDurationMs}ms`,
    transitionTimingFunction: navIntroEase,
  }
}
