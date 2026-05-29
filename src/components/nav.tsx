import { Box, Flex, Link } from "@chakra-ui/react"
import { links } from "../content/site-content"
import { Button } from "./ui/button"

export function Nav() {
  return (
    <Flex
      as="nav"
      position="fixed"
      insetInline="0"
      top="0"
      zIndex="100"
      align="center"
      justify="space-between"
      px={{ base: "6", lg901: "12" }}
      py="7"
      style={{
        background:
          "linear-gradient(to bottom, color-mix(in oklch, oklch(0.05 0 0) 92%, transparent), transparent)",
      }}
    >
      <Link
        href="#"
        fontSize="1.75rem"
        fontWeight="black"
        textTransform="uppercase"
        letterSpacing="tight"
        color="fg"
        textDecoration="none"
      >
        KYD.
      </Link>
      <Flex as="ul" listStyleType="none" align="center" gap="6">
        <Box as="li">
          <Button
            href={links.tickets}
            variant="outline"
            css={{ px: "22px", py: "9px", fontSize: "sm" }}
          >
            Find My Tickets
          </Button>
        </Box>
        <Box as="li">
          <Button
            href={links.getInTouch}
            variant="primary"
            css={{ px: "22px", py: "9px", fontSize: "sm" }}
          >
            Get in touch
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}
