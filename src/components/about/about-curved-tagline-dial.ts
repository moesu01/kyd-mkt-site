export const ABOUT_CURVED_TAGLINE_MOBILE_BREAKPOINT_PX = 630

export interface CurvedTaglinePath {
  arcRadius: number
  arcCenterY: number
  viewBoxWidth: number
}

export interface CurvedTaglineParams {
  typography: CurvedTaglineTypography
  path: CurvedTaglinePath
  mark: CurvedTaglineMark
  layout: EmblemLayout
}

export interface EmblemLayout {
  maxWidthRem: number
  markGap: number
  markAlign: number
}

export interface CurvedTaglineMark {
  widthMax: number
  widthMin: number
  referenceWidth: number
}

export const aboutCurvedTaglineDesktopParams: CurvedTaglineParams = {
  typography: {
    useFontSizeClamp: true,
    fontSize: 48,
    fontSizeMin: 17,
    fontSizeMax: 44,
    referenceWidth: 730,
    letterSpacing: -4,
    fontWeight: 900,
    useTextLength: true,
    textLengthScale: 1,
    lengthAdjust: "spacing",
    startOffset: 50,
    textAnchor: "middle",
  },
  path: {
    arcRadius: 370,
    arcCenterY: 390,
    viewBoxWidth: 772,
  },
  mark: {
    widthMax: 300,
    widthMin: 200,
    referenceWidth: 1160,
  },
  layout: {
    maxWidthRem: 48.25,
    markGap: 22,
    markAlign: 0.4,
  },
}

export const aboutCurvedTaglineMobileParams: CurvedTaglineParams = {
  typography: {
    useFontSizeClamp: true,
    fontSize: 48,
    fontSizeMin: 17,
    fontSizeMax: 33,
    referenceWidth: 770,
    letterSpacing: -4,
    fontWeight: 900,
    useTextLength: true,
    textLengthScale: 1,
    lengthAdjust: "spacing",
    startOffset: 50,
    textAnchor: "middle",
  },
  path: {
    arcRadius: 270,
    arcCenterY: 280,
    viewBoxWidth: 770,
  },
  mark: {
    widthMax: 219,
    widthMin: 140,
    referenceWidth: 770,
  },
  layout: {
    maxWidthRem: 48.25,
    markGap: 22,
    markAlign: 0.4,
  },
}

export const aboutCurvedTaglineDialConfig = {
  typography: {
    useFontSizeClamp: true,
    fontSize: [48, 8, 120] as [number, number, number],
    fontSizeMin: [17, 8, 44] as [number, number, number],
    fontSizeMax: [44, 20, 120] as [number, number, number],
    referenceWidth: [730, 320, 1200] as [number, number, number],
    letterSpacing: [-4, -4, 4, 0.01] as [number, number, number, number],
    fontWeight: [900, 100, 900, 100] as [number, number, number, number],
    useTextLength: true,
    textLengthScale: [1, 0.5, 1.2, 0.01] as [number, number, number, number],
    lengthAdjust: {
      type: "select" as const,
      options: ["spacing", "spacingAndGlyphs"],
      default: "spacing",
    },
    startOffset: [50, 0, 100, 0.5] as [number, number, number, number],
    textAnchor: {
      type: "select" as const,
      options: ["start", "middle", "end"],
      default: "middle",
    },
  },
  path: {
    arcRadius: [370, 200, 500] as [number, number, number],
    arcCenterY: [390, 200, 600] as [number, number, number],
    viewBoxWidth: [772, 400, 1200] as [number, number, number],
  },
  mark: {
    widthMax: [300, 100, 400] as [number, number, number],
    widthMin: [200, 80, 300] as [number, number, number],
    referenceWidth: [1160, 320, 1400] as [number, number, number],
  },
  layout: {
    maxWidthRem: [48.25, 20, 72, 0.25] as [number, number, number, number],
    markGap: [22, 0, 60, 1] as [number, number, number, number],
    markAlign: [0.4, 0, 1, 0.01] as [number, number, number, number],
  },
}

export interface CurvedTaglineTypography {
  useFontSizeClamp: boolean
  fontSize: number
  fontSizeMin: number
  fontSizeMax: number
  referenceWidth: number
  letterSpacing: number
  fontWeight: number
  useTextLength: boolean
  textLengthScale: number
  lengthAdjust: "spacing" | "spacingAndGlyphs" | string
  startOffset: number
  textAnchor: "start" | "middle" | "end" | string
}

export const KYD_MARK_VIEWBOX_WIDTH = 300
export const KYD_MARK_VIEWBOX_HEIGHT = 170
export const KYD_MARK_BAR_TOP_Y = 129.316

export function getMarkLayout({
  arcCenterY,
  viewBoxWidth,
  containerWidthPx,
  mark,
  markGap,
  markAlign,
}: {
  arcCenterY: number
  viewBoxWidth: number
  containerWidthPx: number
  mark: CurvedTaglineMark
  markGap: number
  markAlign: number
}) {
  const markWidthPx = getMarkWidthPx({
    emblemWidthPx: containerWidthPx,
    mark,
  })
  const markWidthUnits =
    containerWidthPx > 0
      ? (markWidthPx / containerWidthPx) * viewBoxWidth
      : mark.widthMax
  const markScale = markWidthUnits / KYD_MARK_VIEWBOX_WIDTH
  const markHeightUnits = KYD_MARK_VIEWBOX_HEIGHT * markScale
  const markBarTopRatio = KYD_MARK_BAR_TOP_Y / KYD_MARK_VIEWBOX_HEIGHT
  const markX = (viewBoxWidth - markWidthUnits) / 2
  const raisedMarkY = arcCenterY - markGap - markHeightUnits
  const loweredMarkY = arcCenterY - markBarTopRatio * markHeightUnits
  const markY = raisedMarkY + (loweredMarkY - raisedMarkY) * markAlign

  return {
    markX,
    markY,
    markScale,
    markHeightUnits,
    markBottom: markY + markHeightUnits,
  }
}

export function getEmblemViewBox({
  arcCenterY,
  arcRadius,
  viewBoxWidth,
  markBottom,
  bottomPadding,
  fontSizeUserUnits,
}: {
  arcCenterY: number
  arcRadius: number
  viewBoxWidth: number
  markBottom: number
  bottomPadding: number
  fontSizeUserUnits: number
}) {
  const viewBoxMinY = Math.max(
    0,
    arcCenterY - arcRadius - fontSizeUserUnits * 0.85,
  )
  const viewBoxMaxY = markBottom + bottomPadding
  const viewBoxHeight = viewBoxMaxY - viewBoxMinY

  return {
    minY: viewBoxMinY,
    width: viewBoxWidth,
    height: viewBoxHeight,
  }
}

export function getTargetFontSizePx({
  containerWidthPx,
  typography,
}: {
  containerWidthPx: number
  typography: CurvedTaglineTypography
}) {
  const fontSize = Number(typography.fontSize)
  const fontSizeMin = Number(typography.fontSizeMin)
  const fontSizeMax = Number(typography.fontSizeMax)
  const referenceWidth = Number(typography.referenceWidth)

  if (!typography.useFontSizeClamp) return fontSize

  if (containerWidthPx <= 0) return fontSizeMax

  const t = Math.min(1, containerWidthPx / referenceWidth)
  return fontSizeMin + (fontSizeMax - fontSizeMin) * t
}

export function getSvgFontSizeUserUnits({
  targetPx,
  containerWidthPx,
  viewBoxWidth,
}: {
  targetPx: number
  containerWidthPx: number
  viewBoxWidth: number
}) {
  if (containerWidthPx <= 0) return targetPx

  const scale = containerWidthPx / viewBoxWidth
  return targetPx / scale
}

export function getTextPathAlignment({
  arcLength,
  typography,
}: {
  arcLength: number
  typography: CurvedTaglineTypography
}) {
  const textAnchor = typography.textAnchor as "start" | "middle" | "end"

  if (typography.useTextLength) {
    const forcedLength = arcLength * Number(typography.textLengthScale)
    return {
      startOffset: (arcLength - forcedLength) / 2,
      textAnchor: "start" as const,
      usePercentOffset: false,
    }
  }

  return {
    startOffset: Number(typography.startOffset),
    textAnchor,
    usePercentOffset: true,
  }
}

export function getScaledEmblemPx({
  emblemWidthPx,
  max,
  min,
  referenceWidth,
}: {
  emblemWidthPx: number
  max: number
  min: number
  referenceWidth: number
}) {
  const widthMax = Number(max)
  const widthMin = Number(min)
  const reference = Number(referenceWidth)

  if (emblemWidthPx <= 0) return widthMax

  const t = Math.min(1, emblemWidthPx / reference)
  return widthMin + (widthMax - widthMin) * t
}

export function getMarkWidthPx({
  emblemWidthPx,
  mark,
}: {
  emblemWidthPx: number
  mark: CurvedTaglineMark
}) {
  return getScaledEmblemPx({
    emblemWidthPx,
    max: mark.widthMax,
    min: mark.widthMin,
    referenceWidth: mark.referenceWidth,
  })
}
