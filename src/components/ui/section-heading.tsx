import { Box, Heading, Text, type BoxProps } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface SectionHeadingProps extends BoxProps {
  label: string
  headline: ReactNode
}

export function SectionHeading({
  label,
  headline,
  ...props
}: SectionHeadingProps) {
  return (
    <Box {...props}>
      <Text textStyle="eyebrow" mb="6" color="fgSubtle">
        {label}
      </Text>
      <Heading as="h2" textStyle="displayHeading">
        {headline}
      </Heading>
    </Box>
  )
}
