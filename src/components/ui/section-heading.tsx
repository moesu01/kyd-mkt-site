import { Box, Heading, Text, type BoxProps } from "@chakra-ui/react"
import type { ReactNode } from "react"
import { prominentEyebrowTextProps } from "./prominent-eyebrow-styles"

type SectionHeadingLevel = "h2" | "h3"
type EyebrowVariant = "default" | "prominent"

const SECTION_HEADING_INK_BLEED_FILTER_ID = "section-heading-ink-bleed"

interface SectionHeadingProps extends BoxProps {
  label: string
  headline: ReactNode
  headingAs?: SectionHeadingLevel
  eyebrowVariant?: EyebrowVariant
  headingTextStyle?: "displayHeading" | "cossetteDisplayHeading"
  headingTextTransform?: "none" | "uppercase"
  headingFontWeight?: "normal" | "bold"
  withInkBleed?: boolean
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
  withInkBleed = false,
  ...props
}: SectionHeadingProps) {
  const resolvedHeadingTextStyle =
    headingTextStyle ?? getHeadingTextStyle(headingAs)

  return (
    <Box position={withInkBleed ? "relative" : undefined} {...props}>
      {withInkBleed ? (
        <svg
          width="0"
          height="0"
          aria-hidden
          focusable="false"
          style={{ position: "absolute" }}
        >
          <filter
            id={SECTION_HEADING_INK_BLEED_FILTER_ID}
            colorInterpolationFilters="sRGB"
          >
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 1 1 1" />
            </feComponentTransfer>
          </filter>
        </svg>
      ) : null}
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
        filter={
          withInkBleed
            ? `blur(0.7px) url(#${SECTION_HEADING_INK_BLEED_FILTER_ID})`
            : undefined
        }
      >
        {headline}
      </Heading>
    </Box>
  )
}
