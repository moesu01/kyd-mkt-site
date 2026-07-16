import {
  createSystem,
  defaultConfig,
  defineConfig,
  defineRecipe,
} from "@chakra-ui/react"
import { breakpoints, colors, fonts, shadows, sizes } from "./tokens"

const buttonEase = "cubic-bezier(0.33, 1, 0.68, 1)"
const buttonDuration = "220ms"

const shadowBorder = "0 0 0 1px rgba(255, 255, 255, 0.1)"

const primaryShadowRest =
  "0 2px 10px rgba(0, 0, 0, 0), inset 0 1px 0 rgba(255, 255, 255, 0)"
const primaryShadowHover =
  "0 2px 10px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.28)"

const outlineAccentShadowRest = "inset 0 0 0 1px rgba(255, 255, 255, 0)"
const outlineAccentShadowHover = "inset 0 0 0 1px rgba(255, 255, 255, 0.12)"

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
    cursor: "pointer",
    transform: "scale(1)",
    filter: "brightness(1)",
    transitionProperty:
      "transform, filter, border-color, color, background-color, box-shadow",
    transitionDuration: buttonDuration,
    transitionTimingFunction: buttonEase,
    "& .cta-arrow": {
      display: "inline-block",
      transitionProperty: "transform",
      transitionDuration: buttonDuration,
      transitionTimingFunction: buttonEase,
    },
    _hover: {
      "& .cta-arrow": {
        transform: "translateX(3px)",
      },
    },
    _focusVisible: buttonFocusVisible,
    _active: {
      transform: "scale(0.96)",
    },
  },
  variants: {
    variant: {
      primary: {
        bg: "accent",
        color: "pageBg",
        fontWeight: "semibold",
        borderColor: "transparent",
        boxShadow: primaryShadowRest,
        _hover: {
          transform: "scale(1.02)",
          filter: "brightness(1.06)",
          boxShadow: primaryShadowHover,
        },
        _active: {
          transform: "scale(0.96)",
          filter: "brightness(1)",
          boxShadow: primaryShadowRest,
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
          boxShadow:
            "0 0 0 1px rgba(255, 255, 255, 0.18), 0 2px 8px rgba(0, 0, 0, 0.2)",
        },
        _active: {
          bg: "accent",
          color: "accentFg",
          filter: "brightness(0.96)",
          boxShadow: shadowBorder,
        },
      },
      "outline-accent": {
        bg: "rgba(0, 0, 0, 0.63)",
        borderColor: "accent",
        color: "fg",
        fontWeight: "medium",
        boxShadow: outlineAccentShadowRest,
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
        filter: "none",
        _hover: {
          borderColor: "fg",
          color: "fg",
          bg: "rgba(0, 0, 0, 0.72)",
          boxShadow: outlineAccentShadowHover,
        },
        _active: {
          bg: "rgba(0, 0, 0, 0.78)",
          boxShadow: outlineAccentShadowRest,
        },
      },
      ghost: {
        bg: "transparent",
        borderColor: "transparent",
        color: "fgMuted",
        fontWeight: "medium",
        _hover: {
          color: "fg",
          bg: "rgba(255, 255, 255, 0.08)",
        },
      },
      dark: {
        bg: "surfaceRaised",
        color: "fg",
        fontWeight: "semibold",
        borderColor: "transparent",
        _hover: {
          bg: "rgba(255, 255, 255, 0.16)",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.28)",
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
          bg: "rgba(255, 255, 255, 0.08)",
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
        letterSpacing: "0",
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
      shadows,
    },
    textStyles: {
      eyebrow: {
        value: {
          fontFamily: "cossetteTexte",
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
      cossetteDisplayHeading: {
        value: {
          fontFamily: "cossetteTitre",
          fontWeight: "normal",
          fontSize: "72px",
          lineHeight: "1.1",
          letterSpacing: "1%",
          textTransform: "uppercase",
          color: "warmDisplay",
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
      touringArtistName: {
        value: {
          fontFamily: "cossetteTitre",
          fontSize: { base: "28px", lg901: "29px", xl1048: "36px" },
          fontWeight: "normal",
          lineHeight: "1",
          textTransform: "uppercase",
          color: "warmSoft",
        },
      },
      touringCategory: {
        value: {
          fontFamily: "cossetteTexte",
          fontSize: { base: "18px", lg901: "19px", xl1048: "24px" },
          fontWeight: "normal",
          lineHeight: "1",
          textTransform: "uppercase",
          color: "warmMuted",
        },
      },
      usedByLocation: {
        value: {
          fontFamily: "cossetteTexte",
          fontSize: "16px",
          fontWeight: "normal",
          lineHeight: "1",
          textTransform: "uppercase",
          color: "warmMuted",
        },
      },
      touringShowsLink: {
        value: {
          fontFamily: "sans",
          fontSize: { base: "16px", lg901: "16px", xl1048: "20px" },
          fontWeight: "medium",
          lineHeight: "1",
          letterSpacing: "-0.5px",
          color: "warmMuted",
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
      bg: "pageBg",
    },
    body: {
      bg: "pageBg",
      color: "fg",
      fontFamily: "sans",
      fontSize: "base",
      lineHeight: "relaxed",
      overflowX: "hidden",
    },
    "#root": {
      bg: "pageBg",
      minH: "100dvh",
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
