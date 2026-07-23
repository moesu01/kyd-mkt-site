const HERO_REVEAL_EASE = "cubic-bezier(0.2, 0, 0, 1)"
const HERO_REVEAL_DURATION_MS = 360

export function getHeroRevealStyle({
  isVisible,
  prefersReducedMotion,
  delayMs,
}: {
  isVisible: boolean
  prefersReducedMotion: boolean
  delayMs: number
}) {
  const opacity = isVisible ? 1 : 0

  if (prefersReducedMotion) {
    return {
      opacity,
      visibility: opacity > 0.02 ? ("visible" as const) : ("hidden" as const),
    }
  }

  return {
    opacity,
    visibility: "visible" as const,
    transitionProperty: "opacity",
    transitionDuration: `${HERO_REVEAL_DURATION_MS}ms`,
    transitionTimingFunction: HERO_REVEAL_EASE,
    transitionDelay: isVisible ? `${delayMs}ms` : "0ms",
    willChange: "opacity",
  }
}
