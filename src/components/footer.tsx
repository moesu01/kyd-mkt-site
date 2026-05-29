import { Box, Flex, Link, Text } from "@chakra-ui/react"
import { footerLinks } from "../content/site-content"
import { Container } from "./ui/container"

export function Footer() {
  return (
    <Box
      as="footer"
      borderTop="1px solid"
      borderColor="border"
      px={{ base: "6", lg901: "12" }}
      py="10"
    >
      <Container display="flex" flexDirection="column" gap="6">
        <Flex
          direction={{ base: "column", lg901: "row" }}
          flexWrap="wrap"
          align={{ base: "flex-start", lg901: "center" }}
          justify="space-between"
          gap="4"
        >
          <Link
            href="#"
            fontSize="xl"
            fontWeight="black"
            textTransform="uppercase"
            letterSpacing="tight"
            color="fgGhost"
            textDecoration="none"
          >
            KYD Labs.
          </Link>
          <Flex as="ul" listStyleType="none" flexWrap="wrap" gap="7">
            {footerLinks.map((link) => (
              <Box as="li" key={link.label}>
                <Link
                  href={link.href}
                  fontSize="13px"
                  color="fgGhost"
                  transitionProperty="colors"
                  transitionDuration="150ms"
                  _hover={{ color: "fgMuted" }}
                >
                  {link.label}
                </Link>
              </Box>
            ))}
          </Flex>
        </Flex>
        <Text fontSize="xs" color="fgFaint">
          © 2025 KYD Labs. All rights reserved.
        </Text>
      </Container>
    </Box>
  )
}
