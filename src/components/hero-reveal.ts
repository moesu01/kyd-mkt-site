import { shadows } from "../theme/tokens"

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
