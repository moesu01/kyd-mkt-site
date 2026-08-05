import { Box } from "@chakra-ui/react"
import { useLayoutEffect, useRef } from "react"
import { colors, sizes } from "../theme/tokens"

const HERO_BG_SURFACE_ID = "hero-bg-surface"
const HERO_BG_VIDEO_ID = "hero-bg-video"
const HERO_REVEAL_DURATION_MS = 360
const HERO_REVEAL_EASE = "cubic-bezier(0.2, 0, 0, 1)"
/**
 * Mirrors the bounds HeroSection resolves to (min-height, 100vh, max-height).
 * Without the cap the sticky stage stays a full 100dvh and spills past the
 * hero on tall, narrow windows.
 */
const HERO_STAGE_HEIGHT = {
  base: `clamp(${sizes.heroMinHeight.value}, 100dvh, ${sizes.heroMaxHeight.value})`,
  lg901: "100dvh",
}

export function HeroAboutBackground() {
  const stageRef = useRef<HTMLDivElement>(null)
  const hasFadedInRef = useRef(false)

  useLayoutEffect(() => {
    const stageElement = stageRef.current
    if (!stageElement) return

    const surface = document.getElementById(HERO_BG_SURFACE_ID)
    const video = document.getElementById(HERO_BG_VIDEO_ID)

    if (surface) stageElement.prepend(surface)

    if (!(video instanceof HTMLVideoElement)) return

    if (surface?.parentElement === stageElement) surface.after(video)
    else stageElement.prepend(video)

    if (getComputedStyle(video).display !== "none" && video.paused) {
      void video.play().catch(() => {
        // Autoplay can still fail until a trusted gesture; muted + playsinline usually works.
      })
    }

    if (hasFadedInRef.current) {
      backgroundVideoShow(video, false)
      return
    }

    hasFadedInRef.current = true
    backgroundVideoShow(video, true)
  }, [])

  return (
    <Box
      position="absolute"
      inset="0"
      zIndex={0}
      pointerEvents="none"
      aria-hidden
    >
      <Box
        ref={stageRef}
        position="sticky"
        top="0"
        h={HERO_STAGE_HEIGHT}
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset="0"
          zIndex={1}
          pointerEvents="none"
          backgroundImage={`linear-gradient(to top, ${colors.pageBg.value} 0%, transparent 72%)`}
        />
      </Box>
    </Box>
  )
}

function backgroundVideoShow(video: HTMLVideoElement, animate: boolean) {
  if (!animate) {
    video.style.transition = "none"
    video.style.opacity = "1"
    return
  }

  video.style.transition = `opacity ${HERO_REVEAL_DURATION_MS}ms ${HERO_REVEAL_EASE}`
  video.style.opacity = "1"
}
