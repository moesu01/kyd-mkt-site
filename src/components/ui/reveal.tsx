import { Box, type BoxProps } from "@chakra-ui/react"
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type ReactNode,
} from "react"

/**
 * Scroll-triggered staggered enter for page sections.
 *
 * Wrap a section in <RevealGroup> and its chunks in <Reveal order={n}>.
 * The group runs once when it reaches the lower part of the viewport.
 * Reduced motion is handled in CSS (src/index.css).
 */

interface RevealGroupProps extends BoxProps {
  children: ReactNode
}

interface RevealProps extends BoxProps {
  /** Stagger slot — delay is order * 100ms (capped at 500ms). */
  order?: number
  children: ReactNode
}

export function RevealGroup({ children, ...props }: RevealGroupProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const element = rootRef.current
    if (!element) return

    if (typeof IntersectionObserver === "undefined") {
      setIsRevealed(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setIsRevealed(true)
        observer.disconnect()
      },
      { rootMargin: revealRootMargin, threshold: 0 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <Box ref={rootRef} {...props}>
      <RevealGroupContext.Provider value={isRevealed}>
        {children}
      </RevealGroupContext.Provider>
    </Box>
  )
}

export function Reveal({ order = 0, children, style, ...props }: RevealProps) {
  const isRevealed = useContext(RevealGroupContext)
  const [hasEntered, setHasEntered] = useState(false)

  function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.animationName !== "section-reveal-enter") return
    setHasEntered(true)
  }

  // Drop the animation class once done so no persistent transform/filter
  // remains on the wrapper.
  const className = !isRevealed
    ? "section-reveal-hidden"
    : !hasEntered
      ? "section-reveal-enter"
      : undefined

  const revealStyle: CSSProperties | undefined =
    className === "section-reveal-enter"
      ? {
          ...style,
          ["--reveal-delay" as string]: `${Math.min(order * revealStaggerMs, revealMaxDelayMs)}ms`,
        }
      : style

  return (
    <Box
      className={className}
      style={revealStyle}
      onAnimationEnd={handleAnimationEnd}
      {...props}
    >
      {children}
    </Box>
  )
}

/** Shrinks the bottom of the observer viewport so reveals fire after content
    enters the screen. More negative = later. */
const revealRootMargin = "0px 0px -15% 0px"
const revealStaggerMs = 100
const revealMaxDelayMs = 500

const RevealGroupContext = createContext(true)
