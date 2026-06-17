import type { CSSProperties, ReactNode } from "react"

export interface PixelDot {
  x: number
  y: number
}

interface PixelDotSvgProps {
  dots: PixelDot[]
  dotRadius?: number
  dotClassName?: string
  getDotClassName?: (dot: PixelDot, index: number) => string | undefined
  getDotStyle?: (dot: PixelDot, index: number) => CSSProperties | undefined
}

export function PixelDotSvg({
  dots,
  dotRadius = 0.9,
  dotClassName,
  getDotClassName,
  getDotStyle,
}: PixelDotSvgProps) {
  return (
    <svg viewBox="0 0 132 132" width="100%" height="100%" fill="none">
      {dots.map((dot, index) => (
        <circle
          key={`${dot.x}-${dot.y}-${index}`}
          cx={dot.x}
          cy={dot.y}
          r={dotRadius}
          className={getDotClassName?.(dot, index) ?? dotClassName}
          style={getDotStyle?.(dot, index)}
        />
      ))}
    </svg>
  )
}

interface PixelDotArtProps extends PixelDotSvgProps {
  className?: string
  children?: ReactNode
}

export function PixelDotArt({
  className,
  children,
  ...svgProps
}: PixelDotArtProps) {
  return (
    <div className={className} aria-hidden>
      <PixelDotSvg {...svgProps} />
      {children}
    </div>
  )
}
