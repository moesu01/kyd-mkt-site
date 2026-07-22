import { useEffect, useRef, useState } from "react"
import { motion } from "motion/react"

const FRAME_COUNT = 48
const HERO_FRAME_DURATION_MS = 55
/** How many trailing frames are eligible as the scroll-end landing spot. */
const ENDING_FRAME_OPTIONS = 8
/** Progress must reach this before we treat the scroll as "settled on an ending". */
const ENDING_SETTLE_PROGRESS = 0.999
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

/** Hero intro — second half of the loop, ending on the second-to-last frame.
 *  Drop the first 25% of that range so the enter cycle is shorter. */
const HERO_INTRO_END = FRAME_COUNT - 1
const HERO_INTRO_FULL_START = Math.floor(FRAME_COUNT / 2)
const HERO_INTRO_LENGTH = Math.round(
  (HERO_INTRO_END - HERO_INTRO_FULL_START) * 0.75,
)
const HERO_INTRO_START = HERO_INTRO_END - HERO_INTRO_LENGTH

const HERO_INTRO_FRAMES = LOGO_LOOP_FRAMES.slice(
  HERO_INTRO_START,
  HERO_INTRO_END,
)

const FRAME_ROTATIONS = Array.from(
  { length: LOGO_LOOP_FRAMES.length },
  (_, index) => ROTATION_POOL[index % ROTATION_POOL.length] ?? 0,
)

const HERO_INTRO_ROTATIONS = FRAME_ROTATIONS.slice(
  HERO_INTRO_START,
  HERO_INTRO_END,
)

const LAST_FRAME_INDEX = LOGO_LOOP_FRAMES.length - 1
const ENDING_ZONE_START = Math.max(
  0,
  LAST_FRAME_INDEX - (ENDING_FRAME_OPTIONS - 1),
)

function shuffleEndingFrameBag() {
  const bag = Array.from(
    { length: LAST_FRAME_INDEX - ENDING_ZONE_START + 1 },
    (_, index) => ENDING_ZONE_START + index,
  )

  for (let index = bag.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = bag[index]
    const swap = bag[swapIndex]
    if (current === undefined || swap === undefined) continue
    bag[index] = swap
    bag[swapIndex] = current
  }

  return bag
}

function drawEndingFrameIndex({
  bagRef,
  lastDrawnRef,
}: {
  bagRef: { current: number[] }
  lastDrawnRef: { current: number | null }
}) {
  if (bagRef.current.length === 0) {
    bagRef.current = shuffleEndingFrameBag()

    // After a reshuffle, don't lead with the frame we just showed.
    if (
      bagRef.current.length > 1 &&
      bagRef.current[bagRef.current.length - 1] === lastDrawnRef.current
    ) {
      const repeat = bagRef.current.pop()
      if (repeat !== undefined) bagRef.current.unshift(repeat)
    }
  }

  const next = bagRef.current.pop()
  if (next === undefined) return LAST_FRAME_INDEX

  lastDrawnRef.current = next
  return next
}

function getScrubbedFrameIndex(progress: number) {
  return Math.round(Math.min(1, Math.max(0, progress)) * LAST_FRAME_INDEX)
}

function isSettledAtEnding(progress: number) {
  return Math.min(1, Math.max(0, progress)) >= ENDING_SETTLE_PROGRESS
}

interface AboutLogoLoopProps {
  className?: string
  heroOpacity: number
  aboutOpacity: number
  aboutProgress: number
  onHeroSettled?: () => void
}

export function AboutLogoLoop({
  className,
  heroOpacity,
  aboutOpacity,
  aboutProgress,
  onHeroSettled,
}: AboutLogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const hasNotifiedSettledRef = useRef(false)
  const lockedEndingFrameRef = useRef<number | null>(null)
  const endingFrameBagRef = useRef<number[]>([])
  const lastDrawnEndingFrameRef = useRef<number | null>(null)
  const [heroFrameIndex, setHeroFrameIndex] = useState(0)
  const [hasHeroAnimationStarted, setHasHeroAnimationStarted] = useState(false)
  const [isHeroSettled, setIsHeroSettled] = useState(false)
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
        setHasHeroAnimationStarted(true)
        observer.disconnect()
      },
      { threshold: 0.25 },
    )
    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!hasHeroAnimationStarted) return
    if (prefersReducedMotion) return

    let nextFrameIndex = 0
    const intervalId = window.setInterval(() => {
      nextFrameIndex += 1

      if (nextFrameIndex >= HERO_INTRO_FRAMES.length) {
        window.clearInterval(intervalId)
        setIsHeroSettled(true)
        return
      }

      setHeroFrameIndex(nextFrameIndex)
    }, HERO_FRAME_DURATION_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [hasHeroAnimationStarted, prefersReducedMotion])

  const hasSettled = prefersReducedMotion || isHeroSettled

  useEffect(() => {
    if (!hasSettled || hasNotifiedSettledRef.current) return
    hasNotifiedSettledRef.current = true
    onHeroSettled?.()
  }, [hasSettled, onHeroSettled])

  const heroCycleSrc =
    HERO_INTRO_FRAMES[heroFrameIndex] ?? HERO_INTRO_FRAMES[0]
  const heroCycleRotation = HERO_INTRO_ROTATIONS[heroFrameIndex] ?? 0

  const scrubbedFrameIndex = getScrubbedFrameIndex(aboutProgress)
  const hasSettledAtEnding =
    !prefersReducedMotion && isSettledAtEnding(aboutProgress)

  if (hasSettledAtEnding) {
    if (lockedEndingFrameRef.current === null) {
      lockedEndingFrameRef.current = drawEndingFrameIndex({
        bagRef: endingFrameBagRef,
        lastDrawnRef: lastDrawnEndingFrameRef,
      })
    }
  } else {
    lockedEndingFrameRef.current = null
  }

  const aboutFrameIndex = prefersReducedMotion
    ? LAST_FRAME_INDEX
    : (lockedEndingFrameRef.current ?? scrubbedFrameIndex)
  const aboutSrc =
    LOGO_LOOP_FRAMES[aboutFrameIndex] ?? LOGO_LOOP_FRAMES[0]
  const aboutRotation = FRAME_ROTATIONS[aboutFrameIndex] ?? 0

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: heroOpacity,
          visibility: heroOpacity > 0.001 ? "visible" : "hidden",
          willChange: heroOpacity > 0 && heroOpacity < 1 ? "opacity" : undefined,
        }}
      >
        {!hasSettled ? (
          <LogoFrame src={heroCycleSrc} rotation={heroCycleRotation} />
        ) : prefersReducedMotion ? null : (
          <motion.img
            key="hero-fade-out"
            src={heroCycleSrc}
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
              transform: `rotate(${heroCycleRotation}deg)`,
            }}
          />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: aboutOpacity,
          visibility: aboutOpacity > 0.001 ? "visible" : "hidden",
          willChange:
            aboutOpacity > 0 && aboutOpacity < 1 ? "opacity" : undefined,
        }}
      >
        <LogoFrame src={aboutSrc} rotation={aboutRotation} />
      </div>
    </div>
  )
}

function LogoFrame({ src, rotation }: LogoFrameProps) {
  return (
    <img
      src={src}
      alt=""
      draggable={false}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transform: `rotate(${rotation}deg)`,
      }}
    />
  )
}

interface LogoFrameProps {
  src: string
  rotation: number
}
