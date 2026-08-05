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
  type RefObject,
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
  /** Override IntersectionObserver rootMargin. Default fires after content enters. */
  rootMargin?: string
  /** Observe a separate flow-positioned trigger for sticky section content. */
  triggerRef?: RefObject<Element | null>
}

interface RevealProps extends BoxProps {
  /** Stagger slot — delay is base + order * 100ms (capped). */
  order?: number
  children: ReactNode
}

export function RevealGroup({
  children,
  rootMargin = revealRootMargin,
  triggerRef,
  ...props
}: RevealGroupProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  useEffect(() => {
    const element = triggerRef?.current ?? rootRef.current
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
      { rootMargin, threshold: 0 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [rootMargin, triggerRef])

  return (
    <Box ref={rootRef} {...props}>
      <RevealGroupContext.Provider value={isRevealed}>
        {children}
      </RevealGroupContext.Provider>
    </Box>
  )
}

export function Reveal({ order = 0, children, style, ...props }: RevealProps) {
  const { className, style: revealStyle, onAnimationEnd } = useSectionReveal({
    order,
    style,
  })

  return (
    <Box
      className={className}
      style={revealStyle}
      onAnimationEnd={onAnimationEnd}
      {...props}
    >
      {children}
    </Box>
  )
}

/** Shared stagger state for custom hosts (e.g. SVG curved tagline). */
export function useSectionReveal({
  order = 0,
  style,
}: {
  order?: number
  style?: CSSProperties
} = {}) {
  const isRevealed = useContext(RevealGroupContext)
  const [hasEntered, setHasEntered] = useState(false)

  function handleAnimationEnd(event: AnimationEvent<Element>) {
    if (event.animationName !== "section-reveal-enter") return
    setHasEntered(true)
  }

  const className = !isRevealed
    ? "section-reveal-hidden"
    : !hasEntered
      ? "section-reveal-enter"
      : "section-reveal-entered"

  const revealStyle: CSSProperties | undefined =
    className === "section-reveal-enter"
      ? {
          ...style,
          // Order 0 must not use a 0ms delay: with fill-mode `both`, some
          // mobile engines skip the animation when the element is already at
          // opacity 0 and leave the `from` keyframe stuck forever.
          ["--reveal-delay" as string]: `${Math.min(order * revealStaggerMs + revealBaseDelayMs, revealMaxDelayMs)}ms`,
        }
      : style

  useEffect(() => {
    if (!isRevealed || hasEntered) return

    const fallbackMs = revealEnterMs + revealMaxDelayMs + 50
    const timeoutId = window.setTimeout(() => setHasEntered(true), fallbackMs)
    return () => window.clearTimeout(timeoutId)
  }, [isRevealed, hasEntered])

  return {
    isRevealed,
    className,
    style: revealStyle,
    onAnimationEnd: handleAnimationEnd,
  }
}

export function useRevealGroup() {
  return useContext(RevealGroupContext)
}

/** Shrinks the bottom of the observer viewport so reveals fire after content
    enters the screen. More negative = later. */
const revealRootMargin = "0px 0px -15% 0px"
const revealStaggerMs = 100
/** Minimum delay so order-0 enters are not skipped on mobile (see useSectionReveal). */
const revealBaseDelayMs = 50
const revealMaxDelayMs = 550
const revealEnterMs = 500

const RevealGroupContext = createContext(true)
