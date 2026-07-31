import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"

/**
 * Creative logo-frame loader extracted from the former hero intro.
 * Not currently mounted — keep around for a future splash/loader moment.
 */

const FRAME_COUNT = 48
const FRAME_DURATION_MS = 55
const FRAME_BASE_PATH = "./anim/kyd%20logo%20loop"

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

/** Second half of the loop, ending on the second-to-last frame.
 *  Drop the first 25% of that range so the enter cycle is shorter. */
const INTRO_END = FRAME_COUNT - 1
const INTRO_FULL_START = Math.floor(FRAME_COUNT / 2)
const INTRO_LENGTH = Math.round((INTRO_END - INTRO_FULL_START) * 0.75)
const INTRO_START = INTRO_END - INTRO_LENGTH

const INTRO_FRAMES = LOGO_LOOP_FRAMES.slice(INTRO_START, INTRO_END)

const FRAME_ROTATIONS = Array.from(
  { length: LOGO_LOOP_FRAMES.length },
  (_, index) => ROTATION_POOL[index % ROTATION_POOL.length] ?? 0,
)

const INTRO_ROTATIONS = FRAME_ROTATIONS.slice(INTRO_START, INTRO_END)

interface CreativeLoaderProps {
  className?: string
  /** Fires once after the frame sequence finishes (or immediately if reduced motion). */
  onSettled?: () => void
}

export function CreativeLoader({ className, onSettled }: CreativeLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasNotifiedSettledRef = useRef(false)
  const [frameIndex, setFrameIndex] = useState(0)
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false)
  const [isSettled, setIsSettled] = useState(false)
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
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setHasAnimationStarted(true)
        observer.disconnect()
      },
      { threshold: 0.25 },
    )
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasAnimationStarted) return
    if (prefersReducedMotion) {
      setIsSettled(true)
      return
    }

    let nextFrameIndex = 0
    const intervalId = window.setInterval(() => {
      nextFrameIndex += 1

      if (nextFrameIndex >= INTRO_FRAMES.length) {
        window.clearInterval(intervalId)
        setIsSettled(true)
        return
      }

      setFrameIndex(nextFrameIndex)
    }, FRAME_DURATION_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [hasAnimationStarted, prefersReducedMotion])

  useEffect(() => {
    if (!isSettled && !prefersReducedMotion) return
    if (hasNotifiedSettledRef.current) return
    hasNotifiedSettledRef.current = true
    onSettled?.()
  }, [isSettled, prefersReducedMotion, onSettled])

  const cycleSrc = INTRO_FRAMES[frameIndex] ?? INTRO_FRAMES[0]
  const cycleRotation = INTRO_ROTATIONS[frameIndex] ?? 0
  const shouldPlaySettleFade = isSettled && !prefersReducedMotion

  return (
    <div
      ref={containerRef}
      className={className}
      aria-hidden
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {!isSettled && !prefersReducedMotion ? (
        <img
          src={cycleSrc}
          alt=""
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `rotate(${cycleRotation}deg)`,
          }}
        />
      ) : shouldPlaySettleFade ? (
        <motion.img
          key="creative-loader-fade-out"
          src={cycleSrc}
          alt=""
          draggable={false}
          initial={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          animate={{
            opacity: 0,
            filter: "blur(4px)",
          }}
          transition={{
            type: "spring",
            duration: 0.5,
            bounce: 0,
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `rotate(${cycleRotation}deg)`,
          }}
        />
      ) : null}
    </div>
  )
}
