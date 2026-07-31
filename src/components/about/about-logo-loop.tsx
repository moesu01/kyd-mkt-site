import { useEffect, useRef, useState } from "react"

const FRAME_COUNT = 48
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

const FRAME_ROTATIONS = Array.from(
  { length: LOGO_LOOP_FRAMES.length },
  (_, index) => ROTATION_POOL[index % ROTATION_POOL.length] ?? 0,
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
  aboutOpacity: number
  aboutProgress: number
}

export function AboutLogoLoop({
  className,
  aboutOpacity,
  aboutProgress,
}: AboutLogoLoopProps) {
  const endingFrameBagRef = useRef<number[]>([])
  const lastDrawnEndingFrameRef = useRef<number | null>(null)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [lockedEndingFrame, setLockedEndingFrame] = useState<number | null>(
    null,
  )

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

  const hasSettledAtEnding =
    !prefersReducedMotion && isSettledAtEnding(aboutProgress)

  useEffect(() => {
    let cancelled = false

    queueMicrotask(() => {
      if (cancelled) return

      if (!hasSettledAtEnding) {
        setLockedEndingFrame(null)
        return
      }

      setLockedEndingFrame((previous) => {
        if (previous !== null) return previous
        return drawEndingFrameIndex({
          bagRef: endingFrameBagRef,
          lastDrawnRef: lastDrawnEndingFrameRef,
        })
      })
    })

    return () => {
      cancelled = true
    }
  }, [hasSettledAtEnding])

  const scrubbedFrameIndex = getScrubbedFrameIndex(aboutProgress)
  const aboutFrameIndex = prefersReducedMotion
    ? LAST_FRAME_INDEX
    : (lockedEndingFrame ?? scrubbedFrameIndex)
  const aboutSrc =
    LOGO_LOOP_FRAMES[aboutFrameIndex] ?? LOGO_LOOP_FRAMES[0]
  const aboutRotation = FRAME_ROTATIONS[aboutFrameIndex] ?? 0

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
