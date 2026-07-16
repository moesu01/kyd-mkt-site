import { Box, Flex, Image, Link, Text, chakra } from "@chakra-ui/react"
import { useState } from "react"
import { links, navMenuLinks } from "../content/site-content"
import { Button } from "./ui/button"

const iconEase = "cubic-bezier(0.2, 0, 0, 1)"

const iconTransition = {
  transitionProperty: "opacity, transform, filter",
  transitionDuration: "300ms",
  transitionTimingFunction: iconEase,
} as const

const iconHidden = {
  opacity: 0,
  transform: "scale(0.25)",
  filter: "blur(4px)",
  pointerEvents: "none",
} as const

const iconVisible = {
  opacity: 1,
  transform: "scale(1)",
  filter: "blur(0px)",
} as const

function HamburgerBars() {
  return (
    <Flex direction="column" gap="0.5" w="4" aria-hidden>
      <Box w="full" h="0.5" bg="#f9f4eb" />
      <Box w="full" h="0.5" bg="#f9f4eb" />
      <Box w="full" h="0.5" bg="#f9f4eb" />
    </Flex>
  )
}

function CloseIcon() {
  return (
    <Box position="relative" w="4" h="4" aria-hidden>
      <Box
        position="absolute"
        top="50%"
        left="0"
        w="full"
        h="0.5"
        bg="#f9f4eb"
        transform="translateY(-50%) rotate(45deg)"
      />
      <Box
        position="absolute"
        top="50%"
        left="0"
        w="full"
        h="0.5"
        bg="#f9f4eb"
        transform="translateY(-50%) rotate(-45deg)"
      />
    </Box>
  )
}

function MenuToggleIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <Box
      position="relative"
      w="4"
      h="4"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        position="absolute"
        inset="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        css={{
          ...iconTransition,
          ...(isOpen ? iconHidden : iconVisible),
        }}
      >
        <HamburgerBars />
      </Box>
      <Box
        position="absolute"
        inset="0"
        display="flex"
        alignItems="center"
        justifyContent="center"
        css={{
          ...iconTransition,
          ...(isOpen ? iconVisible : iconHidden),
        }}
      >
        <CloseIcon />
      </Box>
      <Box visibility="hidden" aria-hidden>
        <HamburgerBars />
      </Box>
    </Box>
  )
}

const navMenuSpacing = "4"
const navMenuSpacingPx = 16

const navMenuCtaButtonRadiusPx = 4
const navMenuCtaPanelRadiusPx = navMenuCtaButtonRadiusPx + navMenuSpacingPx
const navMenuPanelRadiusPx = navMenuCtaPanelRadiusPx + navMenuSpacingPx

const navMenuCtaButtonRadius = `${navMenuCtaButtonRadiusPx}px`
const navMenuCtaPanelRadius = `${navMenuCtaPanelRadiusPx}px`
const navMenuPanelRadius = `${navMenuPanelRadiusPx}px`
const navBarRadius = navMenuCtaPanelRadius

const navMenuCtaSubheadStyles = {
  mb: "2",
  fontFamily: "sans",
  fontSize: "13px",
  fontWeight: "medium",
  color: "fg",
} as const

const navMenuLinkPaddingLeftPx = navMenuSpacingPx
const navMenuLinkPaddingLeftHoverPx = navMenuSpacingPx + 8
const navMenuLinkHoverDuration = "200ms"

const navMenuLinkDimmedOpacity = 0.45

const navMenuLinkMotionProperties = ["transform", "filter"] as const

const navMenuLinkHoverProperties = [
  "opacity",
  "border-color",
  "border-bottom-color",
  "color",
  "box-shadow",
  "padding-left",
  "padding-inline-start",
  "font-weight",
  "letter-spacing",
] as const

function repeatTransitionValue(value: string, count: number) {
  return Array(count).fill(value).join(", ")
}

function getNavMenuLinkTransitions(
  menuMotion: ReturnType<typeof getMenuItemMotion>,
) {
  const motionCount = navMenuLinkMotionProperties.length
  const hoverCount = navMenuLinkHoverProperties.length

  return {
    transitionProperty: [...navMenuLinkMotionProperties, ...navMenuLinkHoverProperties].join(
      ", ",
    ),
    transitionDuration: [
      repeatTransitionValue(menuMotion.transitionDuration, motionCount),
      repeatTransitionValue(navMenuLinkHoverDuration, hoverCount),
    ].join(", "),
    transitionTimingFunction: [
      repeatTransitionValue(menuMotion.transitionTimingFunction, motionCount),
      repeatTransitionValue(iconEase, hoverCount),
    ].join(", "),
    transitionDelay: [
      repeatTransitionValue(menuMotion.transitionDelay, motionCount),
      repeatTransitionValue("0ms", hoverCount),
    ].join(", "),
  } as const
}

function getNavMenuLinkDivider(index: number, total: number) {
  const isLast = index === total - 1

  if (isLast) return {} as const

  return {
    borderBottom: "1px solid",
    borderBottomColor: "rgba(255, 255, 255, 0.075)",
  } as const
}

const navMenuLinkStyles = {
  display: "block",
  paddingLeft: `${navMenuLinkPaddingLeftPx}px`,
  paddingInlineStart: `${navMenuLinkPaddingLeftPx}px`,
  paddingRight: `${navMenuSpacingPx}px`,
  py: "2.5",
  minH: "10",
  borderRadius: "0",
  fontWeight: "medium",
  letterSpacing: "0",
  _hover: {
    paddingLeft: `${navMenuLinkPaddingLeftHoverPx}px`,
    paddingInlineStart: `${navMenuLinkPaddingLeftHoverPx}px`,
    fontWeight: "580",
    letterSpacing: "1%",
  },
  _active: {
    paddingLeft: `${navMenuLinkPaddingLeftHoverPx}px`,
    paddingInlineStart: `${navMenuLinkPaddingLeftHoverPx}px`,
    fontWeight: "580",
    letterSpacing: "1%",
  },
  _focusVisible: {
    outline: "2px solid",
    outlineColor: "rgba(255, 255, 255, 0.45)",
    outlineOffset: "2px",
  },
} as const

function getNavMenuLinkStyles(index: number, total: number) {
  return {
    ...navMenuLinkStyles,
    ...getNavMenuLinkDivider(index, total),
  } as const
}

function getNavMenuLinkOpacity(
  isMenuOpen: boolean,
  hoveredLinkHref: string | null,
  href: string,
) {
  if (!isMenuOpen) return 0

  if (hoveredLinkHref !== null && hoveredLinkHref !== href) return navMenuLinkDimmedOpacity

  return 1
}

function getNavMenuLinkCss(
  index: number,
  isMenuOpen: boolean,
  menuItemCount: number,
  hoveredLinkHref: string | null,
  href: string,
) {
  const menuMotion = getMenuItemMotion(index, isMenuOpen, menuItemCount)

  return {
    ...getNavMenuLinkStyles(index, navMenuLinks.length),
    opacity: getNavMenuLinkOpacity(isMenuOpen, hoveredLinkHref, href),
    transform: menuMotion.transform,
    filter: menuMotion.filter,
    pointerEvents: menuMotion.pointerEvents,
    ...getNavMenuLinkTransitions(menuMotion),
  } as const
}

function getMenuItemMotion(index: number, isOpen: boolean, totalItems: number) {
  const enterDelay = `${index * 80}ms`
  const exitDelay = `${Math.max(totalItems - index - 1, 0) * 30}ms`

  return {
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "translateY(0)" : "translateY(8px)",
    filter: isOpen ? "blur(0px)" : "blur(4px)",
    pointerEvents: isOpen ? "auto" : "none",
    transitionProperty: "opacity, transform, filter",
    transitionDuration: isOpen ? "200ms" : "150ms",
    transitionTimingFunction: isOpen ? iconEase : "ease-in",
    transitionDelay: isOpen ? enterDelay : exitDelay,
  } as const
}

const navGlassStyles = {
  bg: "rgba(255, 255, 255, 0.1)",
  boxShadow: "0 0 0 1px rgba(255, 255, 255, 0.15)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
} as const

const navShellRadiusTransition = {
  transitionProperty: "border-radius",
  transitionDuration: "200ms",
  transitionTimingFunction: iconEase,
} as const

function getNavBarRadiusStyles(isMenuOpen: boolean) {
  return {
    ...navShellRadiusTransition,
    borderTopLeftRadius: navBarRadius,
    borderTopRightRadius: navBarRadius,
    borderBottomLeftRadius: isMenuOpen ? navMenuCtaButtonRadius : navBarRadius,
    borderBottomRightRadius: isMenuOpen ? navMenuCtaButtonRadius : navBarRadius,
  } as const
}

function getNavMenuPanelRadiusStyles(isMenuOpen: boolean) {
  return {
    ...navShellRadiusTransition,
    borderTopLeftRadius: isMenuOpen ? navMenuCtaButtonRadius : navMenuPanelRadius,
    borderTopRightRadius: isMenuOpen ? navMenuCtaButtonRadius : navMenuPanelRadius,
    borderBottomLeftRadius: navMenuPanelRadius,
    borderBottomRightRadius: navMenuPanelRadius,
  } as const
}
const navMenuCtaPanelStyles = {
  bg: "rgba(0, 0, 0, 0.25)",
  borderRadius: navMenuCtaPanelRadius,
  p: navMenuSpacing,
} as const

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [hoveredLinkHref, setHoveredLinkHref] = useState<string | null>(null)

  function handleToggleMenu() {
    setHoveredLinkHref(null)
    setIsMenuOpen((open) => !open)
  }

  function handleCloseMenu() {
    setIsMenuOpen(false)
    setHoveredLinkHref(null)
  }

  const menuItemCount = navMenuLinks.length + 2

  return (
    <Box position="relative" w="full" maxW="438px">
      <Flex
        as="nav"
        position="relative"
        align="center"
        justify="space-between"
        h="50px"
        pl="2.5"
        pr="3"
        {...navGlassStyles}
        css={getNavBarRadiusStyles(isMenuOpen)}
      >
        <Box w="9" flexShrink={0} />

        <Link
          href="#"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex="0 0 auto"
          flexShrink={0}
          textDecoration="none"
          aria-label="KYD Labs home"
          css={{
            transitionProperty: "opacity",
            transitionDuration: "150ms",
            transitionTimingFunction: iconEase,
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
            src="/kyd-labs-logo.svg"
            alt="KYD Labs"
            h="36px"
            w="auto"
            maxW="none"
            objectFit="contain"
            flexShrink={0}
          />
        </Link>

        <Box flexShrink={0}>
          <chakra.button
            type="button"
            display="flex"
            alignItems="center"
            justifyContent="center"
            minW="10"
            minH="10"
            border="none"
            bg="transparent"
            cursor="pointer"
            p="0"
            borderRadius="md"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu-panel"
            css={{
              transitionProperty: "transform, background-color",
              transitionDuration: "150ms",
              transitionTimingFunction: iconEase,
              _hover: { bg: "rgba(255, 255, 255, 0.1)" },
              _active: { transform: "scale(0.96)", bg: "rgba(255, 255, 255, 0.14)" },
              _focusVisible: {
                outline: "2px solid",
                outlineColor: "rgba(255, 255, 255, 0.45)",
                outlineOffset: "2px",
              },
            }}
            onClick={handleToggleMenu}
          >
            <MenuToggleIcon isOpen={isMenuOpen} />
          </chakra.button>
        </Box>
      </Flex>

      <Flex
        id="nav-menu-panel"
        direction="column"
        gap="4"
        position="absolute"
        top="calc(100% + 8px)"
        left="0"
        right="0"
        p="4"
        {...navGlassStyles}
        zIndex="10"
        aria-hidden={!isMenuOpen}
        css={{
          ...getNavMenuPanelRadiusStyles(isMenuOpen),
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? "translateY(0)" : "translateY(-8px)",
          filter: isMenuOpen ? "blur(0px)" : "blur(4px)",
          pointerEvents: isMenuOpen ? "auto" : "none",
          visibility: isMenuOpen ? "visible" : "hidden",
          transitionProperty: "opacity, transform, filter, visibility, border-radius",
          transitionDuration: isMenuOpen ? "200ms" : "150ms",
          transitionTimingFunction: isMenuOpen ? iconEase : "ease-in",
          transitionDelay: isMenuOpen ? "0ms" : "0ms, 0ms, 0ms, 150ms",
        }}
      >
        <Flex
          as="nav"
          direction="column"
          aria-label="Page sections"
          onMouseLeave={() => setHoveredLinkHref(null)}
        >
          {navMenuLinks.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              fontSize="14px"
              color="fg"
              textDecoration="none"
              tabIndex={isMenuOpen ? 0 : -1}
              css={getNavMenuLinkCss(
                index,
                isMenuOpen,
                menuItemCount,
                hoveredLinkHref,
                item.href,
              )}
              onMouseEnter={() => setHoveredLinkHref(item.href)}
              onClick={handleCloseMenu}
            >
              {item.label}
            </Link>
          ))}
        </Flex>

        <Flex
          direction="row"
          align="stretch"
          w="full"
          css={{
            ...getMenuItemMotion(navMenuLinks.length + 1, isMenuOpen, menuItemCount),
            ...navMenuCtaPanelStyles,
          }}
        >
          <Box flex="1" minW="0" pr="6">
            <Text {...navMenuCtaSubheadStyles}>Work with kyd</Text>
            <Button
              href={links.getInTouch}
              variant="primary"
              size="compact"
              tabIndex={isMenuOpen ? 0 : -1}
              css={{ w: "full", fontWeight: "580" }}
              onClick={handleCloseMenu}
            >
              Get in touch
            </Button>
          </Box>
          <Box
            w="1px"
            flexShrink={0}
            bg="rgba(255, 255, 255, 0.15)"
            alignSelf="stretch"
          />
          <Box flex="1" minW="0" pl="6">
            <Text {...navMenuCtaSubheadStyles}>For fans</Text>
            <Button
              href={links.tickets}
              variant="outline"
              size="compact"
              tabIndex={isMenuOpen ? 0 : -1}
              css={{ w: "full" }}
              onClick={handleCloseMenu}
            >
              Find my tickets
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
