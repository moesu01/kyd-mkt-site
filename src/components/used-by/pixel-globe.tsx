import { Box } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import globeDotsData from "../../assets/pixel-globe-dots.json"
import type { CSSProperties } from "react"
import { PixelDotSvg } from "../ui/pixel-dot-svg"

interface GlobeDot {
  x: number
  y: number
  phase: number
  duration: number
  stutter: boolean
}

const globeDots = globeDotsData as GlobeDot[]

export function PixelGlobe() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = rootRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        element.classList.toggle("used-by-globe-paused", !entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Box
      ref={rootRef}
      className="used-by-globe-spin"
      w="132px"
      h="132px"
      flexShrink={0}
      aria-hidden
    >
      <PixelDotSvg
        dots={globeDots}
        getDotClassName={(_dot, index) => {
          const globeDot = globeDots[index]
          return globeDot.stutter ? "globe-dot globe-dot--stutter" : "globe-dot"
        }}
        getDotStyle={(_dot, index) => {
          const globeDot = globeDots[index]
          return {
            "--twinkle-delay": `${globeDot.phase}s`,
            "--twinkle-duration": `${globeDot.duration}s`,
          } as CSSProperties
        }}
      />
    </Box>
  )
}
