import { shadows } from "../theme/tokens"

const HERO_REVEAL_EASE = "cubic-bezier(0.2, 0, 0, 1)"
const HERO_REVEAL_DURATION_MS = 360

/** Cool display fill + glow for the hero Get in touch CTA. */
export const heroCoolAccent = {
  buttonCss: {
    bg: "coolDisplay",
    boxShadow: shadows.coolGlow.value,
    _hover: {
      boxShadow: [
        "0 2px 10px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.28)",
        shadows.coolGlow.value,
      ].join(", "),
    },
    _active: {
      boxShadow: shadows.coolGlow.value,
    },
  },
}

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
