import { Box, Heading, Text, type BoxProps } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface SectionHeadingProps extends BoxProps {
  label: string
  headline: ReactNode
  dividerTone?: "light" | "dark"
}

export function SectionHeading({
  label,
  headline,
  dividerTone = "light",
  ...props
}: SectionHeadingProps) {
  return (
    <Box {...props}>
      <Text textStyle="eyebrow" mb="6" color="fgSubtle">
        {label}
      </Text>
      <Box
        mb="7"
        h="3px"
        w="9"
        bg={dividerTone === "dark" ? "fg" : "accent"}
      />
      <Heading as="h2" textStyle="displayHeading">
        {headline}
      </Heading>
    </Box>
  )
}
