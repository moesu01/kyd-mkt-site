/** Tunable values for the About scroll scene (entered after the standalone hero). */
export const aboutHeroTransition = {
  /** Sticky scrubber length as a viewport-height multiple. */
  scrollHeightVh: 200,
  /** Emblem scale at progress 0 (matches standalone hero). Progress 1 = About scale 1. */
  emblemScaleStart: 0.64,
  /** Ascii bg video opacity at About entry / About end (matches footer). */
  bgVideoOpacityStart: 1,
  bgVideoOpacityEnd: 0.24,
  /** Progress windows: [start, end] for each morph. */
  ranges: {
    /** Morph begins as soon as About pins. */
    emblemScale: [0, 0.5] as const,
    bgVideoOpacity: [0, 0.5] as const,
    /** Logo hero → about crossfade — leave on scroll scrub. */
    animationCrossfade: [0, 0.2] as const,
    aboutAnimation: [0, 0.82] as const,
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
      heroAnimationOpacity: 0,
      aboutAnimationOpacity: 1,
      aboutAnimationProgress: 1,
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
  const bgVideoT = progressInRange(p, ranges.bgVideoOpacity)

  return {
    emblemScale: lerp(emblemScaleStart, 1, emblemT),
    heroAnimationOpacity: 1 - animationCrossfade,
    aboutAnimationOpacity: animationCrossfade,
    aboutAnimationProgress: progressInRange(p, ranges.aboutAnimation),
    bgVideoOpacity: lerp(bgVideoOpacityStart, bgVideoOpacityEnd, bgVideoT),
  }
}

export interface AboutHeroPresentation {
  emblemScale: number
  heroAnimationOpacity: number
  aboutAnimationOpacity: number
  aboutAnimationProgress: number
  bgVideoOpacity: number
}
