import { Box, type BoxProps } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { aboutSection } from "../../content/site-content"
import {
  getEmblemViewBox,
  getMarkLayout,
  getSvgFontSizeUserUnits,
  getTargetFontSizePx,
  getTextPathAlignment,
  type CurvedTaglineMark,
  type CurvedTaglineTypography,
} from "./about-curved-tagline-dial"

const ARC_PATH_ID = "about-curved-tagline-arc"
const KYD_MARK_PATH =
  "M300 170V129.316H199.193L270.334 58.2728L241.884 29.1247L170.738 100.168V0H129.262L129.499 99.4556L58.8557 29.1247L29.6662 58.2728L101.046 129.316H0V170H300Z"

interface AboutCurvedTaglinePath {
  arcRadius: number
  arcCenterY: number
  viewBoxWidth: number
}

interface AboutCurvedTaglineProps extends BoxProps {
  path: AboutCurvedTaglinePath
  typography: CurvedTaglineTypography
  mark: CurvedTaglineMark
  markGap: number
  markAlign: number
}

export function AboutCurvedTagline({
  path,
  typography,
  mark,
  markGap,
  markAlign,
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

  const { viewBoxWidth, arcRadius, arcCenterY } = path
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

  const { markX, markY, markScale, markBottom } = getMarkLayout({
    arcCenterY,
    viewBoxWidth,
    containerWidthPx: containerWidth,
    mark,
    markGap,
    markAlign,
  })

  const lengthAdjust = typography.lengthAdjust as
    | "spacing"
    | "spacingAndGlyphs"
  const textLengthAdjust =
    typography.useFontSizeClamp || lengthAdjust === "spacing"
      ? "spacing"
      : "spacingAndGlyphs"
  const textPathAlignment = getTextPathAlignment({ arcLength, typography })
  const emblemViewBox = getEmblemViewBox({
    arcCenterY,
    arcRadius,
    viewBoxWidth,
    markBottom,
    bottomPadding: markGap,
    fontSizeUserUnits,
  })

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
        viewBox={`0 ${emblemViewBox.minY} ${emblemViewBox.width} ${emblemViewBox.height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="auto"
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
          fill="#888"
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
        <g transform={`translate(${markX}, ${markY}) scale(${markScale})`}>
          <path d={KYD_MARK_PATH} fill="currentColor" />
        </g>
      </svg>
    </Box>
  )
}
