import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react"
import { breakpoints, colors, fonts, sizes } from "./tokens"

export const buttonRecipe = defineRecipe({
  className: "kyd-button",
  base: {
    display: "inline-flex",
    minH: "10",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5",
    borderRadius: "full",
    px: "26px",
    py: "13px",
    fontSize: "sm",
    transitionProperty: "transform, filter, border-color, color, background-color",
    transitionDuration: "150ms",
    _active: {
      transform: "scale(0.96)",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "accent",
        color: "accentFg",
        fontWeight: "semibold",
        _hover: {
          filter: "brightness(1.05)",
        },
      },
      outline: {
        border: "1px solid",
        borderColor: "borderStrong",
        color: "fg",
        _hover: {
          borderColor: "fgMuted",
        },
      },
      ghost: {
        color: "fgMuted",
        _hover: {
          color: "fg",
        },
      },
      dark: {
        bg: "surfaceRaised",
        color: "fg",
        fontWeight: "semibold",
        _hover: {
          bg: "color-mix(in oklch, fgGhost 30%, transparent)",
        },
      },
      "outline-dark": {
        border: "1px solid",
        borderColor: "borderStrong",
        color: "fgMuted",
        _hover: {
          borderColor: "fg",
          color: "fg",
        },
      },
    },
    static: {
      true: {
        _active: {
          transform: "none",
        },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
})

const config = defineConfig({
  preflight: true,
  theme: {
    breakpoints,
    tokens: {
      colors,
      fonts,
      sizes,
    },
    textStyles: {
      eyebrow: {
        value: {
          fontFamily: "mono",
          fontSize: "12px",
          fontWeight: "semibold",
          textTransform: "uppercase",
          letterSpacing: "0.2em",
        },
      },
      sectionBody: {
        value: {
          fontSize: "clamp(0.875rem, 0.75rem + 0.625vw, 1.125rem)",
          lineHeight: "relaxed",
        },
      },
      displayHeading: {
        value: {
          fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
          fontWeight: "bold",
          textTransform: "uppercase",
          lineHeight: "0.95",
          letterSpacing: "tight",
        },
      },
    },
    recipes: {
      kydButton: buttonRecipe,
    },
  },
  globalCss: {
    html: {
      scrollBehavior: "smooth",
    },
    body: {
      bg: "bg",
      color: "fg",
      fontFamily: "sans",
      fontSize: "base",
      lineHeight: "relaxed",
      overflowX: "hidden",
    },
    "h1, h2, h3": {
      textWrap: "balance",
    },
    p: {
      textWrap: "pretty",
    },
  },
})

export const system = createSystem(defaultConfig, config)
