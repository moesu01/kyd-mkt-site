import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react"
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

const navMenuButtonStyles = {
  minH: "auto",
  h: "auto",
  borderRadius: "4px",
  px: "6",
  py: "3",
  fontFamily: "sans",
  fontSize: "13px",
  fontWeight: "medium",
  textTransform: "uppercase",
  border: "1px solid",
  lineHeight: "1",
} as const

const navMenuOutlineButtonStyles = {
  ...navMenuButtonStyles,
  borderColor: "accent",
  color: "fg",
  _hover: { borderColor: "fg", color: "fg" },
} as const

const navMenuPrimaryButtonStyles = {
  ...navMenuButtonStyles,
  bg: "accent",
  color: "accentFg",
  borderColor: "transparent",
  fontWeight: "580",
  _hover: { filter: "brightness(1.05)" },
} as const

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

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleToggleMenu() {
    setIsMenuOpen((open) => !open)
  }

  function handleCloseMenu() {
    setIsMenuOpen(false)
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
        borderRadius="4px"
        bg="#444444"
        boxShadow="0 0 0 1px rgba(255, 255, 255, 0.15)"
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset="0"
          bg="black"
          opacity="0.6"
          borderRadius="4px"
          pointerEvents="none"
        />

        <Box position="relative" zIndex="1" w="9" flexShrink={0} />

        <Link
          href="#"
          position="relative"
          zIndex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flex="0 0 auto"
          flexShrink={0}
          textDecoration="none"
          aria-label="KYD Labs home"
        >
          <Image
            src="/kyd-labs-logo.svg"
            alt="KYD Labs"
            h="25px"
            w="auto"
            maxW="none"
            objectFit="contain"
            flexShrink={0}
          />
        </Link>

        <Box position="relative" zIndex="1" flexShrink={0}>
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
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="nav-menu-panel"
            css={{
              transitionProperty: "transform",
              transitionDuration: "150ms",
              transitionTimingFunction: "ease-out",
              _active: { transform: "scale(0.96)" },
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
        borderRadius="4px"
        bg="#444444"
        boxShadow="0 0 0 1px rgba(255, 255, 255, 0.15)"
        zIndex="10"
        aria-hidden={!isMenuOpen}
        css={{
          opacity: isMenuOpen ? 1 : 0,
          transform: isMenuOpen ? "translateY(0)" : "translateY(-8px)",
          filter: isMenuOpen ? "blur(0px)" : "blur(4px)",
          pointerEvents: isMenuOpen ? "auto" : "none",
          visibility: isMenuOpen ? "visible" : "hidden",
          transitionProperty: "opacity, transform, filter, visibility",
          transitionDuration: isMenuOpen ? "200ms" : "150ms",
          transitionTimingFunction: isMenuOpen ? iconEase : "ease-in",
          transitionDelay: isMenuOpen ? "0ms" : "0ms, 0ms, 0ms, 150ms",
        }}
      >
        <Flex as="nav" direction="column" gap="2" aria-label="Page sections">
          {navMenuLinks.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              fontSize="14px"
              fontWeight="medium"
              letterSpacing="0.02em"
              textTransform="uppercase"
              color="fg"
              textDecoration="none"
              py="1"
              tabIndex={isMenuOpen ? 0 : -1}
              css={{
                ...getMenuItemMotion(index, isMenuOpen, menuItemCount),
                _hover: { opacity: isMenuOpen ? 0.75 : 0 },
              }}
              onClick={handleCloseMenu}
            >
              {item.label}
            </Link>
          ))}
        </Flex>

        <Box
          borderTop="1px solid"
          borderColor="rgba(255, 255, 255, 0.15)"
          css={getMenuItemMotion(navMenuLinks.length, isMenuOpen, menuItemCount)}
        />

        <Flex
          direction={{ base: "column", lg901: "row" }}
          gap="6"
          w="full"
          css={getMenuItemMotion(navMenuLinks.length + 1, isMenuOpen, menuItemCount)}
        >
          <Box flex={{ lg901: "1" }} w={{ base: "full", lg901: "auto" }}>
            <Button
              href={links.getInTouch}
              variant="primary"
              tabIndex={isMenuOpen ? 0 : -1}
              css={{
                ...navMenuPrimaryButtonStyles,
                w: "full",
              }}
              onClick={handleCloseMenu}
            >
              Get in touch
            </Button>
          </Box>
          <Box flex={{ lg901: "1" }} w={{ base: "full", lg901: "auto" }}>
            <Button
              href={links.tickets}
              variant="outline"
              tabIndex={isMenuOpen ? 0 : -1}
              css={{
                ...navMenuOutlineButtonStyles,
                w: "full",
              }}
              onClick={handleCloseMenu}
            >
              Find My Tickets
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
