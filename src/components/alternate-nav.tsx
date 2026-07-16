import { Box, Flex, Image, Link, chakra } from "@chakra-ui/react"
import { useState } from "react"
import { navMenuLinks } from "../content/site-content"

const interactionEase = "cubic-bezier(0.2, 0, 0, 1)"

const navLinkStyles = {
  display: "inline-flex",
  alignItems: "center",
  minH: "10",
  px: "4",
  bg: "transparent",
  color: "fg",
  fontFamily: "cossetteTexte",
  fontSize: { base: "12px", lg901: "14px" },
  fontWeight: "normal",
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
        src="/kyd-labs-logo.svg"
        alt="KYD Labs"
        h="36px"
        w="auto"
        maxW="none"
        objectFit="contain"
      />
    </Link>
  )
}

export function AlternateNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function handleToggleMenu() {
    setIsMenuOpen((isOpen) => !isOpen)
  }

  function handleCloseMenu() {
    setIsMenuOpen(false)
  }

  return (
    <Box
      position="relative"
      w="full"
      maxW="container"
      bg="#000"
      px={{ base: "4", lg901: "5" }}
      py="3"
      borderRadius="16px"
      boxShadow="0 0 0 1px rgba(255, 255, 255, 0.08)"
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
          {navMenuLinks.map((item, index) => {
            const isLast = index === navMenuLinks.length - 1

            return (
              <Link
                key={item.href}
                href={item.href}
                css={{
                  ...navLinkStyles,
                  ...(isLast ? { pr: "0" } : {}),
                }}
              >
                {item.label}
              </Link>
            )
          })}
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
          borderRadius="4px"
          bg="pageBg"
          color="fg"
          cursor="pointer"
          boxShadow="0 0 0 1px rgba(255, 255, 255, 0.08)"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="alternate-nav-menu"
          css={{
            transitionProperty: "background-color, box-shadow, transform",
            transitionDuration: "180ms",
            transitionTimingFunction: interactionEase,
            _hover: {
              bg: "surfaceRaised",
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

      <Flex
        id="alternate-nav-menu"
        as="nav"
        display={{ base: "flex", lg901: "none" }}
        direction="column"
        gap="2"
        position="absolute"
        top="calc(100% + 8px)"
        left="0"
        right="0"
        p="2"
        bg="pageBg"
        borderRadius="8px"
        boxShadow="0 0 0 1px rgba(255, 255, 255, 0.08), 0 12px 32px rgba(0, 0, 0, 0.28)"
        opacity={isMenuOpen ? 1 : 0}
        transform={isMenuOpen ? "translateY(0)" : "translateY(-8px)"}
        visibility={isMenuOpen ? "visible" : "hidden"}
        pointerEvents={isMenuOpen ? "auto" : "none"}
        transitionProperty="opacity, transform, visibility"
        transitionDuration="200ms"
        transitionTimingFunction={interactionEase}
        aria-label="Mobile page sections"
        aria-hidden={!isMenuOpen}
      >
        {navMenuLinks.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            w="full"
            tabIndex={isMenuOpen ? 0 : -1}
            css={navLinkStyles}
            onClick={handleCloseMenu}
          >
            {item.label}
          </Link>
        ))}
      </Flex>
    </Box>
  )
}

interface MenuIconProps {
  isOpen: boolean
}
