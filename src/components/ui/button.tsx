import { chakra, useRecipe, type SystemStyleObject } from "@chakra-ui/react"
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"
import { buttonRecipe } from "../../theme"

type ButtonVariant = "primary" | "outline" | "ghost" | "dark" | "outline-dark"

interface ButtonBaseProps {
  children: ReactNode
  variant?: ButtonVariant
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

export function Button({
  children,
  variant = "primary",
  className = "",
  static: isStatic = false,
  css: cssOverride,
  ...props
}: ButtonProps) {
  const recipe = useRecipe({ recipe: buttonRecipe })
  const styles = recipe({ variant, static: isStatic })

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
