import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react"

type ButtonVariant = "primary" | "outline" | "ghost" | "dark" | "outline-dark"

interface ButtonBaseProps {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
  static?: boolean
}

type ButtonAsButton = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-fg font-semibold hover:brightness-105",
  outline:
    "border border-border-strong text-fg hover:border-fg-muted",
  ghost: "text-fg-muted hover:text-fg",
  dark:
    "bg-surface-raised text-fg font-semibold hover:bg-fg-ghost/30",
  "outline-dark":
    "border border-border-strong text-fg-muted hover:border-fg hover:text-fg",
}

const baseClasses =
  "inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full px-[26px] py-[13px] text-sm transition-[transform,filter,border-color,color,background-color] active:scale-[0.96]"

export function Button({
  children,
  variant = "primary",
  className = "",
  static: isStatic = false,
  ...props
}: ButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${isStatic ? "active:scale-100" : ""} ${className}`

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
