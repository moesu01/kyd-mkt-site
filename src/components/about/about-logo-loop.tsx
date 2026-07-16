import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

const FRAME_COUNT = 48
const FRAME_DURATION_MS = 150
const SCALE_POP_MS = 75
const EXIT_FADE_MS = 50
const FRAME_BASE_PATH = "/anim/kyd%20logo%20loop"

const ROTATION_POOL = [
  1.7, -2.3, 0.6, -1.4, 2.5, -0.8, 1.9, -2.1, 0.4, -1.7, 2.2, -0.5, 1.3,
  -2.5, 0.9, -1.9, 2.4, -0.7, 1.5, -2.2, 0.3, -1.6, 2.1, -0.4, 1.8, -2.4,
  0.7, -1.2, 2.3, -0.9, 1.1, -2.0, 0.5, -1.8, 2.5, -1.0, 1.6, -2.3, 0.8,
  -1.5, 2.0, -1.3, 1.4, -2.1, 0.9, -2.4, 1.8, -0.6,
] as const

const LOGO_LOOP_FRAMES = Array.from(
  { length: FRAME_COUNT },
  (_, index) =>
    `${FRAME_BASE_PATH}/${String(index + 1).padStart(2, "0")}.png`,
)

const FRAME_ROTATIONS = Array.from(
  { length: LOGO_LOOP_FRAMES.length },
  (_, index) => ROTATION_POOL[index % ROTATION_POOL.length] ?? 0,
)

interface AboutLogoLoopProps {
  className?: string
}

export function AboutLogoLoop({ className }: AboutLogoLoopProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    LOGO_LOOP_FRAMES.forEach((src) => {
      const image = new Image()
      image.src = src
    })
  }, [])

  useEffect(() => {
    if (prefersReducedMotion || LOGO_LOOP_FRAMES.length <= 1) return

    const intervalId = window.setInterval(() => {
      setCurrentIndex((previous) => (previous + 1) % LOGO_LOOP_FRAMES.length)
    }, FRAME_DURATION_MS)

    return () => window.clearInterval(intervalId)
  }, [prefersReducedMotion])

  const currentSrc = LOGO_LOOP_FRAMES[currentIndex] ?? LOGO_LOOP_FRAMES[0]
  const currentRotation = FRAME_ROTATIONS[currentIndex] ?? 0

  if (prefersReducedMotion) {
    return (
      <div
        className={className}
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={LOGO_LOOP_FRAMES[0]}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    )
  }

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.img
          key={currentIndex}
          src={currentSrc}
          alt=""
          draggable={false}
          initial={{
            opacity: 0,
            scale: 0.98,
            rotate: currentRotation,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: currentRotation,
            transition: {
              opacity: { duration: 0.001 },
              scale: { duration: SCALE_POP_MS / 1000, ease: "easeOut" },
              rotate: { duration: 0 },
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              opacity: { duration: EXIT_FADE_MS / 1000, ease: "easeIn" },
            },
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AnimatePresence>
    </div>
  )
}
