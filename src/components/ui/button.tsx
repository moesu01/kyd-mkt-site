import { chakra, useRecipe, type SystemStyleObject } from "@chakra-ui/react"
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import { buttonRecipe } from "../../theme"
import { heroCoolAccent } from "../hero-reveal"

type ButtonVariant =
  | "primary"
  | "outline"
  | "outline-accent"
  | "ghost"
  | "dark"
  | "outline-dark"
type ButtonSize = "section" | "compact" | "hero"

interface ButtonBaseProps {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  static?: boolean
  css?: SystemStyleObject
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

const ChakraButton = chakra("button")
const ChakraLink = chakra("a")
const ChakraSpan = chakra("span")

/** Trailing arrow that nudges on button hover via `.cta-arrow` in the recipe. */
export function CtaArrow() {
  return (
    <ChakraSpan className="cta-arrow" aria-hidden ms="0.2em">
      →
    </ChakraSpan>
  )
}

export function BookCallCtaContent() {
  return (
    <ChakraSpan display="inline-flex" alignItems="center" gap="24px">
      <ChakraSpan display="inline-flex" alignItems="center" gap="4px">
        <BookCallCalendarIcon />
        Book a call
      </ChakraSpan>
      <CtaArrow />
    </ChakraSpan>
  )
}

export function Button({
  children,
  variant = "primary",
  size = "section",
  className = "",
  static: isStatic = false,
  css: cssOverride,
  ...props
}: ButtonProps) {
  const recipe = useRecipe({ recipe: buttonRecipe })
  const styles = recipe({ variant, size, static: isStatic })

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props
    return (
      <ChakraLink
        href={href}
        css={[styles, cssOverride]}
        className={className}
        {...anchorProps}
      >
        {children}
      </ChakraLink>
    )
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <ChakraButton
      type="button"
      css={[styles, cssOverride]}
      className={className}
      {...buttonProps}
    >
      {children}
    </ChakraButton>
  )
}

function BookCallCalendarIcon() {
  return (
    <chakra.svg
      aria-hidden
      viewBox="0 0 24 24"
      w="16px"
      h="16px"
      display="inline-block"
      flexShrink={0}
      opacity="0.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4M16 2v4M3 9h18" />
      <rect x="3" y="4" width="18" height="17" rx="2" />
    </chakra.svg>
  )
}

export const bookCallButtonCss = {
  ...heroCoolAccent.buttonCss,
  fontWeight: "bold",
  paddingInline: "16px",
  borderRadius: "8px",
  "& .cta-arrow": { marginInlineStart: "0" },
} satisfies SystemStyleObject
