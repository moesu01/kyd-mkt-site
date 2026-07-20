/** Tunable values for the alternate hero → About scroll scene. */
export const aboutHeroTransition = {
  /** Sticky scrubber length as a viewport-height multiple. */
  scrollHeightVh: 220,
  /** Emblem scale at progress 0 (hero). Progress 1 = About scale 1. */
  emblemScaleStart: 0.64,
  /** Ascii bg video opacity at hero start / About end (matches footer). */
  bgVideoOpacityStart: 0.65,
  bgVideoOpacityEnd: 0.24,
  /** Progress windows: [start, end] for each morph. */
  ranges: {
    /** Hero copy/CTAs blur out while they scroll off. */
    heroCopyExit: [0.02, 0.14] as const,
    /** Preserve a real scroll gesture before the About transition starts. */
    emblemScale: [0.2, 0.6] as const,
    bgVideoOpacity: [0.2, 0.6] as const,
    animationCrossfade: [0.2, 0.3] as const,
    aboutAnimation: [0.2, 0.88] as const,
    /** Keep all About text hidden until 60%, then reveal it quickly. */
    curvedText: [0.6, 0.67] as const,
    aboutCopy: [0.6, 0.67] as const,
  },
} as const

export function clamp01(value: number) {
  if (value <= 0) return 0
  if (value >= 1) return 1
  return value
}

export function progressInRange(
  progress: number,
  range: readonly [number, number],
) {
  const [start, end] = range
  if (end <= start) return progress >= end ? 1 : 0
  return clamp01((progress - start) / (end - start))
}

export function lerp(from: number, to: number, t: number) {
  return from + (to - from) * t
}

export function getAboutHeroPresentation({
  progress,
  prefersReducedMotion,
}: {
  progress: number
  prefersReducedMotion: boolean
}) {
  if (prefersReducedMotion) {
    return {
      emblemScale: 1,
      curvedTextOpacity: 1,
      heroAnimationOpacity: 0,
      aboutAnimationOpacity: 1,
      aboutAnimationProgress: 1,
      aboutCopyOpacity: 1,
      heroCopyOpacity: 0,
      heroCopyBlurPx: 4,
      bgVideoOpacity: aboutHeroTransition.bgVideoOpacityEnd,
    }
  }

  const p = clamp01(progress)
  const {
    ranges,
    emblemScaleStart,
    bgVideoOpacityStart,
    bgVideoOpacityEnd,
  } = aboutHeroTransition
  const emblemT = progressInRange(p, ranges.emblemScale)
  const animationCrossfade = progressInRange(p, ranges.animationCrossfade)
  const heroCopyExit = progressInRange(p, ranges.heroCopyExit)
  const bgVideoT = progressInRange(p, ranges.bgVideoOpacity)

  return {
    emblemScale: lerp(emblemScaleStart, 1, emblemT),
    curvedTextOpacity: progressInRange(p, ranges.curvedText),
    heroAnimationOpacity: 1 - animationCrossfade,
    aboutAnimationOpacity: animationCrossfade,
    aboutAnimationProgress: progressInRange(p, ranges.aboutAnimation),
    aboutCopyOpacity: progressInRange(p, ranges.aboutCopy),
    heroCopyOpacity: 1 - heroCopyExit,
    heroCopyBlurPx: lerp(0, 4, heroCopyExit),
    bgVideoOpacity: lerp(bgVideoOpacityStart, bgVideoOpacityEnd, bgVideoT),
  }
}

export interface AboutHeroPresentation {
  emblemScale: number
  curvedTextOpacity: number
  heroAnimationOpacity: number
  aboutAnimationOpacity: number
  aboutAnimationProgress: number
  aboutCopyOpacity: number
  heroCopyOpacity: number
  heroCopyBlurPx: number
  bgVideoOpacity: number
}
