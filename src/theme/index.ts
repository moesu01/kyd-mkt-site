import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react"
import { breakpoints, colors, fonts, sizes } from "./tokens"

const buttonEase = "cubic-bezier(0.2, 0, 0, 1)"

const shadowBorder = "0 0 0 1px rgba(255, 255, 255, 0.1)"
const shadowBorderHover = "0 0 0 1px rgba(255, 255, 255, 0.13)"

const buttonFocusVisible = {
  outline: "2px solid",
  outlineColor: "rgba(255, 255, 255, 0.45)",
  outlineOffset: "2px",
} as const

export const buttonRecipe = defineRecipe({
  className: "kyd-button",
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.5",
    fontFamily: "sans",
    border: "1px solid",
    borderColor: "transparent",
    transitionProperty:
      "transform, filter, border-color, color, background-color, box-shadow",
    transitionDuration: "150ms",
    transitionTimingFunction: buttonEase,
    _focusVisible: buttonFocusVisible,
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
        borderColor: "transparent",
        _hover: {
          filter: "brightness(1.06)",
          boxShadow:
            "0 1px 2px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
        },
        _active: {
          filter: "brightness(1)",
          boxShadow: "none",
        },
      },
      outline: {
        bg: "rgba(255, 255, 255, 0.05)",
        borderColor: "transparent",
        color: "fg",
        fontWeight: "medium",
        boxShadow: shadowBorder,
        _hover: {
          bg: "accent",
          color: "accentFg",
          boxShadow: shadowBorderHover,
        },
        _active: {
          bg: "accent",
          color: "accentFg",
          filter: "brightness(0.96)",
          boxShadow: shadowBorder,
        },
      },
      "outline-accent": {
        bg: "transparent",
        borderColor: "accent",
        color: "fg",
        fontWeight: "medium",
        _hover: {
          borderColor: "fg",
          color: "fg",
          bg: "rgba(255, 255, 255, 0.06)",
        },
        _active: {
          bg: "rgba(255, 255, 255, 0.1)",
        },
      },
      ghost: {
        bg: "transparent",
        borderColor: "transparent",
        color: "fgMuted",
        fontWeight: "medium",
        _hover: {
          color: "fg",
          bg: "rgba(255, 255, 255, 0.06)",
        },
      },
      dark: {
        bg: "surfaceRaised",
        color: "fg",
        fontWeight: "semibold",
        borderColor: "transparent",
        _hover: {
          bg: "rgba(255, 255, 255, 0.14)",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.25)",
        },
        _active: {
          boxShadow: "none",
        },
      },
      "outline-dark": {
        bg: "transparent",
        borderColor: "borderStrong",
        color: "fgMuted",
        fontWeight: "medium",
        _hover: {
          borderColor: "fg",
          color: "fg",
          bg: "rgba(255, 255, 255, 0.06)",
        },
      },
    },
    size: {
      section: {
        minH: "10",
        borderRadius: "full",
        px: "27px",
        py: "11px",
        fontSize: "14px",
        lineHeight: "21px",
      },
      compact: {
        minH: "auto",
        h: "auto",
        borderRadius: "4px",
        px: "6",
        py: "3",
        fontSize: "13px",
        lineHeight: "1",
      },
      hero: {
        minH: "auto",
        h: "auto",
        borderRadius: "4px",
        px: "6",
        py: "3.5",
        fontSize: "14px",
        letterSpacing: "-0.2px",
        lineHeight: "1",
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
    size: "section",
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
          lineHeight: "0.95",
          letterSpacing: "tight",
        },
      },
      sectionHeading: {
        value: {
          fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
          fontWeight: "bold",
          lineHeight: "1.05",
          letterSpacing: "tight",
        },
      },
      platformHeading: {
        value: {
          fontSize: "36px",
          fontWeight: "bold",
          lineHeight: "1.2",
          letterSpacing: "-1.57px",
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
      fontFamily: "Inter, sans-serif",
      fontFeatureSettings: "'liga' 1, 'calt' 1",
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
