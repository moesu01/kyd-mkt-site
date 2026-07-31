/** Tunable values for the About scroll scene. */
export const aboutHeroTransition = {
  /** Sticky scrubber length as a viewport-height multiple. */
  scrollHeightVh: 200,
  /** Emblem scale used by the standalone hero (About stays at 1). */
  emblemScaleStart: 0.64,
  /** Ascii bg video opacity at About entry / About end (matches footer). */
  bgVideoOpacityStart: 1,
  bgVideoOpacityEnd: 0.24,
  /** Progress windows: [start, end] for each morph. */
  ranges: {
    /**
     * Logo frame scrub. Starts immediately so early frames are visible
     * once the one-time Reveal enters (opacity is not scroll-driven).
     */
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
      aboutAnimationOpacity: 1,
      aboutAnimationProgress: 1,
      bgVideoOpacity: aboutHeroTransition.bgVideoOpacityEnd,
    }
  }

  const p = clamp01(progress)

  return {
    /** About no longer morphs scale on scroll — only the logo frame scrubs. */
    emblemScale: 1,
    aboutAnimationOpacity: 1,
    aboutAnimationProgress: progressInRange(
      p,
      aboutHeroTransition.ranges.aboutAnimation,
    ),
    bgVideoOpacity: aboutHeroTransition.bgVideoOpacityEnd,
  }
}

export interface AboutHeroPresentation {
  emblemScale: number
  aboutAnimationOpacity: number
  aboutAnimationProgress: number
  bgVideoOpacity: number
}
