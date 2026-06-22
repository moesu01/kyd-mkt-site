import { Box, Heading, Text, type BoxProps } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { prominentEyebrowTextProps } from "./prominent-eyebrow-styles"

type SectionHeadingLevel = "h2" | "h3"
type EyebrowVariant = "default" | "prominent"

interface SectionHeadingProps extends BoxProps {
  label: string
  headline: ReactNode
  headingAs?: SectionHeadingLevel
  eyebrowVariant?: EyebrowVariant
  headingTextStyle?: "displayHeading" | "cossetteDisplayHeading"
  headingTextTransform?: "none" | "uppercase"
  headingFontWeight?: "normal" | "bold"
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

function getEyebrowProps(variant: EyebrowVariant) {
  switch (variant) {
    case "prominent":
      return { ...prominentEyebrowTextProps, mb: "6" }
    case "default":
      return { textStyle: "eyebrow", mb: "6", color: "fgSubtle" }
    default: {
      const _exhaustive: never = variant
      return _exhaustive
    }
  }
}

export function SectionHeading({
  label,
  headline,
  headingAs = "h2",
  eyebrowVariant = "default",
  headingTextStyle,
  headingTextTransform,
  headingFontWeight,
  ...props
}: SectionHeadingProps) {
  const resolvedHeadingTextStyle =
    headingTextStyle ?? getHeadingTextStyle(headingAs)

  return (
    <Box {...props}>
      <Text {...getEyebrowProps(eyebrowVariant)}>{label}</Text>
      <Heading
        as={headingAs}
        textStyle={resolvedHeadingTextStyle}
        textTransform={headingTextTransform}
        fontWeight={headingFontWeight}
        whiteSpace={
          typeof headline === "string" && headline.includes("\n")
            ? "pre-line"
            : undefined
        }
      >
        {headline}
      </Heading>
    </Box>
  )
}
