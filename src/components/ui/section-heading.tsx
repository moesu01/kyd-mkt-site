import type { ReactNode } from "react"

interface SectionHeadingProps {
  label: string
  headline: ReactNode
  dividerTone?: "light" | "dark"
  className?: string
}

export function SectionHeading({
  label,
  headline,
  dividerTone = "light",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="mb-6 text-[11px] font-medium uppercase tracking-[0.2em] text-fg-subtle">
        {label}
      </p>
      <div
        className={`mb-7 h-[3px] w-9 ${
          dividerTone === "dark" ? "bg-fg" : "bg-accent"
        }`}
      />
      <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-[0.95] tracking-tight">
        {headline}
      </h2>
    </div>
  )
}
