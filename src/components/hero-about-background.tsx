import { Box } from "@chakra-ui/react"
import { useLayoutEffect, useRef } from "react"
import { colors } from "../theme/tokens"

const HERO_BG_SURFACE_ID = "hero-bg-surface"
const HERO_BG_VIDEO_ID = "hero-bg-video"
const HERO_REVEAL_DURATION_MS = 360
const HERO_REVEAL_EASE = "cubic-bezier(0.2, 0, 0, 1)"

interface HeroAboutBackgroundProps {
  isHeroIntroVisible: boolean
}

export function HeroAboutBackground({
  isHeroIntroVisible,
}: HeroAboutBackgroundProps) {
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
  }, [])

  useLayoutEffect(() => {
    const video = document.getElementById(HERO_BG_VIDEO_ID)
    if (!(video instanceof HTMLVideoElement)) return
    const backgroundVideo = video

    if (!isHeroIntroVisible) {
      hasFadedInRef.current = false
      backgroundVideo.style.transition = "none"
      backgroundVideo.style.opacity = "0"
      return
    }

    if (hasFadedInRef.current) {
      backgroundVideo.style.transition = "none"
      backgroundVideo.style.opacity = "1"
      return
    }

    hasFadedInRef.current = true
    backgroundVideo.style.transition = `opacity ${HERO_REVEAL_DURATION_MS}ms ${HERO_REVEAL_EASE}`
    backgroundVideo.style.opacity = "1"
  }, [isHeroIntroVisible])

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
        h="100dvh"
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
