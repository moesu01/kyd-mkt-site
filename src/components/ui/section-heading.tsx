import { Box, Heading, Text, type BoxProps } from "@chakra-ui/react"
import type { ReactNode } from "react"

type SectionHeadingLevel = "h2" | "h3"

interface SectionHeadingProps extends BoxProps {
  label: string
  headline: ReactNode
  headingAs?: SectionHeadingLevel
}

function getHeadingTextStyle(level: SectionHeadingLevel) {
  switch (level) {
    case "h2":
      return "displayHeading"
    case "h3":
      return "sectionHeading"
    default: {
      const _exhaustive: never = level
      return _exhaustive
    }
  }
}

export function SectionHeading({
  label,
  headline,
  headingAs = "h2",
  ...props
}: SectionHeadingProps) {
  return (
    <Box {...props}>
      <Text textStyle="eyebrow" mb="6" color="fgSubtle">
        {label}
      </Text>
      <Heading as={headingAs} textStyle={getHeadingTextStyle(headingAs)}>
        {headline}
      </Heading>
    </Box>
  )
}
