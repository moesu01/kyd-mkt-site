import { Box, type BoxProps } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { aboutSection } from "../../content/site-content"
import { colors } from "../../theme/tokens"
import {
  getEmblemViewBox,
  getMarkLayout,
  getSvgFontSizeUserUnits,
  getTargetFontSizePx,
  getTextPathAlignment,
  KYD_MARK_VIEWBOX_WIDTH,
  type CurvedTaglineMark,
  type CurvedTaglineTypography,
} from "./about-curved-tagline-dial"
import { AboutLogoLoop } from "./about-logo-loop"

const ARC_PATH_ID = "about-curved-tagline-arc"
const ARC_INK_BLEED_FILTER_ID = "about-arc-ink-bleed"

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
  logoLoopScale: number
  curvedTextOpacity?: number
  emblemScale?: number
  heroAnimationOpacity?: number
  aboutAnimationOpacity?: number
  aboutAnimationProgress?: number
  onHeroSettled?: () => void
}

export function AboutCurvedTagline({
  path,
  typography,
  mark,
  markGap,
  markAlign,
  logoLoopScale,
  curvedTextOpacity = 1,
  emblemScale = 1,
  heroAnimationOpacity = 0,
  aboutAnimationOpacity = 1,
  aboutAnimationProgress = 1,
  onHeroSettled,
  ...props
}: AboutCurvedTaglineProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(typography.referenceWidth)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const updateWidth = () => {
      setContainerWidth(element.clientWidth)
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

  const { markX, markY, markScale, markBottom, markHeightUnits } =
    getMarkLayout({
      arcCenterY,
      viewBoxWidth,
      containerWidthPx: containerWidth,
      mark,
      markGap,
      markAlign,
    })

  // Keep layout spacing from the original 300×170 mark, but render a 1:1
  // frame canvas centered on those bounds so vertical rhythm stays the same.
  // Non-mobile uses logoLoopScale (1.8) for a larger mark without changing
  // the emblem layout box that drives section spacing.
  const markWidthUnits = KYD_MARK_VIEWBOX_WIDTH * markScale
  const logoLoopSize = markWidthUnits * logoLoopScale
  const markCenterX = markX + markWidthUnits / 2
  const markCenterY = markY + markHeightUnits / 2
  const logoLoopX = markCenterX - logoLoopSize / 2
  const logoLoopY = markCenterY - logoLoopSize / 2

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

  const isCurvedTextVisible = curvedTextOpacity > 0.01

  return (
    <Box
      ref={containerRef}
      position="relative"
      color="fg"
      css={{
        transform: `scale(${emblemScale})`,
        transformOrigin: "center center",
        willChange: emblemScale === 1 ? "auto" : "transform",
        "@media (max-height: 901px)": {
          "& [data-about-logo-loop]": {
            transform: "scale(0.82)",
          },
        },
      }}
      {...props}
    >
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
          <filter
            id={ARC_INK_BLEED_FILTER_ID}
            colorInterpolationFilters="sRGB"
          >
            <feComponentTransfer>
              <feFuncA type="discrete" tableValues="0 1 1 1" />
            </feComponentTransfer>
          </filter>
        </defs>
        <text
          fill={colors.warmDisplay.value}
          textAnchor={textPathAlignment.textAnchor}
          opacity={curvedTextOpacity}
          style={{
            fontFamily: '"Cossette Titre", sans-serif',
            fontWeight: typography.fontWeight,
            textTransform: "none",
            letterSpacing: `${typography.letterSpacing}px`,
            fontSize: fontSizeUserUnits,
            lineHeight: 1.2,
            filter: isCurvedTextVisible
              ? `blur(0.7px) url(#${ARC_INK_BLEED_FILTER_ID})`
              : undefined,
            visibility: isCurvedTextVisible ? "visible" : "hidden",
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
        <foreignObject
          x={logoLoopX}
          y={logoLoopY}
          width={logoLoopSize}
          height={logoLoopSize}
          style={{ overflow: "visible" }}
        >
          <div
            {...{ xmlns: "http://www.w3.org/1999/xhtml" }}
            data-about-logo-loop
            style={{
              width: "100%",
              height: "100%",
              transformBox: "border-box",
              transformOrigin: "center center",
            }}
          >
            <AboutLogoLoop
              heroOpacity={heroAnimationOpacity}
              aboutOpacity={aboutAnimationOpacity}
              aboutProgress={aboutAnimationProgress}
              onHeroSettled={onHeroSettled}
            />
          </div>
        </foreignObject>
      </svg>
    </Box>
  )
}
