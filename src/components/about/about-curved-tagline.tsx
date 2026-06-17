import { Box, type BoxProps } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { aboutSection } from "../../content/site-content"
import {
  getSvgFontSizeUserUnits,
  getTargetFontSizePx,
  getTextPathAlignment,
  type CurvedTaglineTypography,
} from "./about-curved-tagline-dial"

const ARC_PATH_ID = "about-curved-tagline-arc"

interface AboutCurvedTaglinePath {
  arcRadius: number
  arcCenterY: number
  viewBoxWidth: number
  viewBoxHeight: number
}

interface AboutCurvedTaglineProps extends BoxProps {
  path: AboutCurvedTaglinePath
  typography: CurvedTaglineTypography
}

export function AboutCurvedTagline({
  path,
  typography,
  ...props
}: AboutCurvedTaglineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(typography.referenceWidth)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateWidth = () => {
      setContainerWidth(element.getBoundingClientRect().width)
    }

    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const { viewBoxWidth, viewBoxHeight, arcRadius, arcCenterY } = path
  const arcStartX = viewBoxWidth / 2 - arcRadius
  const arcEndX = viewBoxWidth / 2 + arcRadius
  const arcLength = Math.PI * arcRadius

  const targetFontSizePx = getTargetFontSizePx({
    containerWidthPx: containerWidth,
    typography,
  })
  const fontSizeUserUnits = getSvgFontSizeUserUnits({
    targetPx: targetFontSizePx,
    containerWidthPx: containerWidth,
    viewBoxWidth,
  })

  const lengthAdjust = typography.lengthAdjust as
    | "spacing"
    | "spacingAndGlyphs"
  const textLengthAdjust =
    typography.useFontSizeClamp || lengthAdjust === "spacing"
      ? "spacing"
      : "spacingAndGlyphs"
  const textPathAlignment = getTextPathAlignment({ arcLength, typography })

  return (
    <Box ref={containerRef} position="relative" color="fg" {...props}>
      <Box
        position="absolute"
        w="1px"
        h="1px"
        p="0"
        m="-1px"
        overflow="hidden"
        clip="rect(0, 0, 0, 0)"
        whiteSpace="nowrap"
        border="0"
      >
        {aboutSection.curvedTagline}
      </Box>
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
        style={{ overflow: "visible", display: "block" }}
      >
        <defs>
          <path
            id={ARC_PATH_ID}
            d={`M ${arcStartX} ${arcCenterY} A ${arcRadius} ${arcRadius} 0 0 1 ${arcEndX} ${arcCenterY}`}
          />
        </defs>
        <text
          fill="currentColor"
          textAnchor={textPathAlignment.textAnchor}
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: typography.fontWeight,
            textTransform: "none",
            letterSpacing: `${typography.letterSpacing}px`,
            fontSize: fontSizeUserUnits,
          }}
        >
          <textPath
            href={`#${ARC_PATH_ID}`}
            startOffset={
              textPathAlignment.usePercentOffset
                ? `${textPathAlignment.startOffset}%`
                : textPathAlignment.startOffset
            }
            textAnchor={textPathAlignment.textAnchor}
            {...(typography.useTextLength
              ? {
                  textLength: arcLength * typography.textLengthScale,
                  lengthAdjust: textLengthAdjust,
                }
              : {})}
          >
            {aboutSection.curvedTagline}
          </textPath>
        </text>
      </svg>
    </Box>
  )
}
