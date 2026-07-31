/**
 * KYD color primitives. Names like `pageBg` (not `bg`) avoid colliding with
 * Chakra's built-in semantic tokens (`bg`, `fg`, `border`, etc.) from
 * defaultConfig — those semantics win over same-named primitives.
 *
 * TODO(before launch): Audit semantic vs primitive token usage site-wide
 * (pageBg, fg, border, accent, …) and either override Chakra semantics in
 * index.ts or rename all primitives that conflict.
 */

/** Shared warm-tint hue (degrees). Adjust to shift all warm-tinted UI colors together. */
export const warmHue = 63.9

/** Shared warm-tint chroma. Adjust to shift saturation of all warm-tinted UI colors together. */
export const warmChroma = 0.010

function oklchWarm(l: number | string): string {
  return `oklch(${l} ${warmChroma} ${warmHue})`
}

export const colors = {
  pageBg: { value: "oklch(0.178 .01 63.9)" },
  surface: { value: "oklch(0.12 0 0)" },
  surfaceRaised: { value: oklchWarm(0.25) },
  fg: { value: "oklch(0.93 0 0)" },
  fgMuted: { value: "oklch(0.7 0 0)" },
  fgSubtle: { value: "oklch(0.7 0 0)" },
  fgGhost: { value: "oklch(0.54 0 0)" },
  fgFaint: { value: "oklch(0.46 0 0)" },
  fgDim: { value: oklchWarm(0.32) },
  fgFeature: { value: "#a1a1aa" },
  accent: { value: "oklch(0.98 0 0)" },
  accentFg: { value: "oklch(0.05 0 0)" },
  success: { value: "oklch(0.78 0.18 145)" },
  border: { value: oklchWarm(0.3) },
  borderStrong: { value: "oklch(0.4 0 0)" },
  frameBg: { value: oklchWarm(0.15) },
  warmDisplay: { value: oklchWarm(0.90) },
  warmSoft: { value: oklchWarm(0.88) },
  warmMuted: { value: oklchWarm(0.71) },
  /** Cool near-white for headlines and buttons. */
  coolDisplay: { value: "oklch(0.977 0.012486 236.6)" },
  /** Soft cool glow paired with coolDisplay. */
  coolGlow: { value: "oklch(0.857 0.078315 238.5)" },
}

export const fonts = {
  sans: {
    value: '"Inter", ui-sans-serif, system-ui, sans-serif',
  },
  mono: {
    value: '"IBM Plex Mono", ui-monospace, "SF Mono", monospace',
  },
  cossetteTitre: {
    value: '"Cossette Titre", sans-serif',
  },
  cossetteTexte: {
    value: '"Cossette Texte", sans-serif',
  },
}

export const sizes = {
  container: { value: "1200px" },
  containerFramed: { value: "1252px" },
  heroHeadline: { value: "680px" },
  heroSubtext: { value: "520px" },
  bodyCopy: { value: "540px" },
  heroMinHeight: { value: "620px" },
  testimonialCard: { value: "440px" },
}

export const breakpoints = {
  md700: "700px",
  lg901: "901px",
  xl1048: "1048px",
  xl1100: "1100px",
}

/** Dark-mode ring shadow — use with boxShadow, not colors. */
export const shadows = {
  frame: { value: "0 0 2px 1px rgba(255, 255, 255, 0.05)" },
  /** Subtle cool halo for hero headline text / primary CTA. */
  coolGlow: {
    value: `0 0 6px color-mix(in oklab, ${colors.coolGlow.value} 55%, transparent), 0 0 12px color-mix(in oklab, ${colors.coolGlow.value} 28%, transparent)`,
  },
}
