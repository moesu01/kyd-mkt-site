export const ABOUT_CURVED_TAGLINE_MOBILE_BREAKPOINT_PX = 630

export interface CurvedTaglinePath {
  arcRadius: number
  arcCenterY: number
  viewBoxWidth: number
  viewBoxHeight: number
}

export interface CurvedTaglineParams {
  typography: CurvedTaglineTypography
  path: CurvedTaglinePath
  mark: CurvedTaglineMark
  stack: EmblemStack
}

export interface CurvedTaglineMark {
  widthMax: number
  widthMin: number
  referenceWidth: number
}

export interface EmblemStack {
  bottomPercent: number
  eyebrowGapMax: number
  eyebrowGapMin: number
  eyebrowFontSizeMax: number
  eyebrowFontSizeMin: number
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
    viewBoxHeight: 774,
  },
  mark: {
    widthMax: 300,
    widthMin: 200,
    referenceWidth: 1160,
  },
  stack: {
    bottomPercent: 11,
    eyebrowGapMax: 69,
    eyebrowGapMin: 40,
    eyebrowFontSizeMax: 14,
    eyebrowFontSizeMin: 10,
    referenceWidth: 1160,
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
    viewBoxHeight: 770,
  },
  mark: {
    widthMax: 219,
    widthMin: 140,
    referenceWidth: 770,
  },
  stack: {
    bottomPercent: 11,
    eyebrowGapMax: 48,
    eyebrowGapMin: 28,
    eyebrowFontSizeMax: 12,
    eyebrowFontSizeMin: 9,
    referenceWidth: 770,
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
    viewBoxHeight: [774, 400, 1200] as [number, number, number],
  },
  mark: {
    widthMax: [300, 100, 400] as [number, number, number],
    widthMin: [200, 80, 300] as [number, number, number],
    referenceWidth: [1160, 320, 1400] as [number, number, number],
  },
  stack: {
    bottomPercent: [11, 0, 30, 0.1] as [number, number, number, number],
    eyebrowGapMax: [69, 20, 120] as [number, number, number],
    eyebrowGapMin: [40, 15, 80] as [number, number, number],
    eyebrowFontSizeMax: [14, 8, 20] as [number, number, number],
    eyebrowFontSizeMin: [10, 8, 14] as [number, number, number],
    referenceWidth: [1160, 320, 1400] as [number, number, number],
  },
  container: {
    topPercentMobile: [5, 0, 30, 0.1] as [number, number, number, number],
    topPercentDesktop: [9.3, 0, 30, 0.1] as [number, number, number, number],
    leftPercentDesktop: [16.72, 0, 50, 0.1] as [number, number, number, number],
    widthPercentMobile: [96, 50, 100, 0.5] as [number, number, number, number],
    widthPercentDesktop: [66.5, 40, 100, 0.5] as [number, number, number, number],
    maxWidthRem: [48.25, 20, 72, 0.25] as [number, number, number, number],
    aspectRatioW: [772, 400, 1200] as [number, number, number],
    aspectRatioH: [774, 400, 1200] as [number, number, number],
  },
  emblem: {
    maxWidthRem: [72.5, 40, 90, 0.5] as [number, number, number, number],
    aspectRatioW: [1160, 800, 1400] as [number, number, number],
    aspectRatioH: [462, 300, 600] as [number, number, number],
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

export function getEmblemStackMetrics({
  emblemWidthPx,
  stack,
}: {
  emblemWidthPx: number
  stack: EmblemStack
}) {
  return {
    eyebrowGapPx: getScaledEmblemPx({
      emblemWidthPx,
      max: stack.eyebrowGapMax,
      min: stack.eyebrowGapMin,
      referenceWidth: stack.referenceWidth,
    }),
    eyebrowFontSizePx: getScaledEmblemPx({
      emblemWidthPx,
      max: stack.eyebrowFontSizeMax,
      min: stack.eyebrowFontSizeMin,
      referenceWidth: stack.referenceWidth,
    }),
  }
}
