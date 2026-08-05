import { Box, Flex } from "@chakra-ui/react"
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type MutableRefObject,
} from "react"
import { testimonials } from "../content/site-content"
import { TestimonialBlock } from "./testimonial-block"

const AUTO_SCROLL_MS = 5000
const SCROLL_SETTLE_MS = 320
const SOFT_SETTLE_MS = 420
const SNAP_ALIGN_EPSILON_PX = 1.5
const TESTIMONIAL_LIFT_MOBILE_PX = 120
const TESTIMONIAL_LIFT_DESKTOP_PX = 144
const CARD_WIDTH_PX = 440
const GAP_PX = 32
const BEHIND_BUFFER = 1
const AHEAD_BUFFER = 3
const TESTIMONIAL_COUNT = testimonials.length

/** Resting tilts in [-2, 1.5] — shuffled so neighbors don't look progressive */
const TESTIMONIAL_ROTATIONS = [-1.8, 1.2, -0.6, 0.9, -2, 1.5, -1.1, 0.4] as const

export function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isHoverPausedRef = useRef(false)
  const isFocusPausedRef = useRef(false)
  const isPointerPausedRef = useRef(false)
  const isInViewRef = useRef(true)
  const prefersReducedMotionRef = useRef(false)
  const windowStartRef = useRef(0)
  const windowCountRef = useRef(4)
  const activeLogicalIndexRef = useRef(0)
  const scrollProgressRef = useRef(0)
  const pendingScrollAdjustRef = useRef(0)
  const pendingSnapToChildIndexRef = useRef<number | null>(null)
  const pendingScrollToLogicalRef = useRef<number | null>(null)
  const settleTimeoutRef = useRef(0)
  const isRebasingRef = useRef(false)
  const isSoftSettlingRef = useRef(false)
  const softSettleRafRef = useRef(0)
  const scrollRafRef = useRef(0)
  const supportsScrollEndRef = useRef(
    typeof window !== "undefined" && "onscrollend" in window,
  )

  const [windowStart, setWindowStart] = useState(0)
  const [windowCount, setWindowCount] = useState(4)
  const [activeLogicalIndex, setActiveLogicalIndex] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useLayoutEffect(() => {
    windowStartRef.current = windowStart
    windowCountRef.current = windowCount
    activeLogicalIndexRef.current = activeLogicalIndex
    scrollProgressRef.current = scrollProgress
    prefersReducedMotionRef.current = prefersReducedMotion
  }, [
    windowStart,
    windowCount,
    activeLogicalIndex,
    scrollProgress,
    prefersReducedMotion,
  ])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    function handleChange() {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    function updateWindowCount() {
      const el = scrollRef.current
      if (!el) return

      const stride = measureCardStride(el)
      const nextCount = getVisibleWindowCount({
        containerWidth: el.clientWidth,
        cardStride: stride,
      })

      setWindowCount((current) => (current === nextCount ? current : nextCount))
    }

    updateWindowCount()

    const resizeObserver = new ResizeObserver(updateWindowCount)
    resizeObserver.observe(container)
    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    if (typeof IntersectionObserver === "undefined") {
      isInViewRef.current = true
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry?.isIntersecting ?? true
      },
      { threshold: 0.15 },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useLayoutEffect(() => {
    const container = scrollRef.current
    if (!container) return

    const snapChildIndex = pendingSnapToChildIndexRef.current
    const adjust = pendingScrollAdjustRef.current

    if (snapChildIndex !== null || adjust !== 0) {
      isRebasingRef.current = true
      pendingSnapToChildIndexRef.current = null
      pendingScrollAdjustRef.current = 0

      const pinnedChildIndex = snapChildIndex
      container.style.scrollBehavior = "auto"
      container.style.scrollSnapType = "none"

      if (pinnedChildIndex !== null) {
        const item = container.children[pinnedChildIndex] as
          | HTMLElement
          | undefined
        if (item) container.scrollLeft = getSnapScrollLeft(item)
      } else {
        container.scrollLeft += adjust
      }

      void container.offsetWidth

      const progress = readScrollProgress({
        container,
        windowStart: windowStartRef.current,
      })
      scrollProgressRef.current = progress
      setScrollProgress(progress)

      // Restore snap after two frames so layout + scrollLeft are stable
      // before mandatory snap can re-evaluate targets. Clear inline styles
      // so CSS defaults (smooth settle) return — don't restore a gesture-time
      // "none" that may have been set for edge overshoot.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (pinnedChildIndex !== null) {
            const pinned = container.children[pinnedChildIndex] as
              | HTMLElement
              | undefined
            if (pinned) container.scrollLeft = getSnapScrollLeft(pinned)
          }

          container.style.scrollSnapType = ""
          container.style.scrollBehavior = ""
          isRebasingRef.current = false
        })
      })
    }

    const pendingLogicalIndex = pendingScrollToLogicalRef.current
    if (pendingLogicalIndex === null) return

    const childIndex = pendingLogicalIndex - windowStartRef.current
    const item = container.children[childIndex] as HTMLElement | undefined
    if (!item) return

    pendingScrollToLogicalRef.current = null
    container.scrollTo({
      left: getSnapScrollLeft(item),
      behavior: prefersReducedMotionRef.current ? "instant" : "smooth",
    })
  }, [windowStart, windowCount])

  useEffect(() => {
    const container = scrollRef.current
    if (!container || TESTIMONIAL_COUNT <= 1) return
    if (prefersReducedMotion) return

    const intervalId = window.setInterval(() => {
      if (
        isAutoScrollPaused({
          isHoverPausedRef,
          isFocusPausedRef,
          isPointerPausedRef,
          isInViewRef,
          prefersReducedMotionRef,
        })
      )
        return

      if (isRebasingRef.current || isSoftSettlingRef.current) return

      const el = scrollRef.current
      if (!el) return

      const nextLogicalIndex = activeLogicalIndexRef.current + 1
      const start = windowStartRef.current
      const end = start + windowCountRef.current
      const isMounted = nextLogicalIndex >= start && nextLogicalIndex < end

      activeLogicalIndexRef.current = nextLogicalIndex
      setActiveLogicalIndex(nextLogicalIndex)

      if (!isMounted) {
        shiftWindowStart({
          nextStart: Math.max(0, nextLogicalIndex - BEHIND_BUFFER),
          activeLogicalIndex: nextLogicalIndex,
          container: el,
          windowStartRef,
          pendingScrollAdjustRef,
          pendingSnapToChildIndexRef,
          setWindowStart,
        })
        pendingScrollToLogicalRef.current = nextLogicalIndex
        return
      }

      const childIndex = nextLogicalIndex - start
      const item = el.children[childIndex] as HTMLElement | undefined
      if (!item) return

      el.scrollTo({
        left: getSnapScrollLeft(item),
        behavior: "smooth",
      })
    }, AUTO_SCROLL_MS)

    return () => window.clearInterval(intervalId)
  }, [prefersReducedMotion])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    function publishScrollProgress() {
      const el = scrollRef.current
      if (!el || isRebasingRef.current || isSoftSettlingRef.current) return

      const progress = readScrollProgress({
        container: el,
        windowStart: windowStartRef.current,
      })
      scrollProgressRef.current = progress
      setScrollProgress(progress)
    }

    function handleSettledScroll() {
      const el = scrollRef.current
      if (!el) return
      if (
        isPointerPausedRef.current ||
        isRebasingRef.current ||
        isSoftSettlingRef.current
      )
        return

      publishScrollProgress()
      softSettleThenRebase({
        container: el,
        prefersReducedMotion: prefersReducedMotionRef.current,
        isSoftSettlingRef,
        softSettleRafRef,
        onFrame: publishScrollProgress,
        onComplete: () => {
          publishScrollProgress()
          syncFromScroll({
            shouldRebase: true,
            scrollRef,
            isRebasingRef,
            isPointerPausedRef,
            windowStartRef,
            activeLogicalIndexRef,
            pendingScrollAdjustRef,
            pendingSnapToChildIndexRef,
            setActiveLogicalIndex,
            setWindowStart,
          })
        },
      })
    }

    function handleNativeScroll() {
      if (isRebasingRef.current || isSoftSettlingRef.current) return

      const el = scrollRef.current
      if (el) releaseSnapIfPastEdge(el)

      if (scrollRafRef.current === 0) {
        scrollRafRef.current = window.requestAnimationFrame(() => {
          scrollRafRef.current = 0
          publishScrollProgress()
        })
      }

      // Update active for a11y while scrolling, but never recycle mid-gesture.
      // Trackpad flings have event gaps that falsely look like "settle".
      syncFromScroll({
        shouldRebase: false,
        scrollRef,
        isRebasingRef,
        isPointerPausedRef,
        windowStartRef,
        activeLogicalIndexRef,
        pendingScrollAdjustRef,
        pendingSnapToChildIndexRef,
        setActiveLogicalIndex,
        setWindowStart,
      })

      if (supportsScrollEndRef.current) return

      window.clearTimeout(settleTimeoutRef.current)
      settleTimeoutRef.current = window.setTimeout(() => {
        handleSettledScroll()
      }, SCROLL_SETTLE_MS)
    }

    function handleScrollEnd() {
      window.clearTimeout(settleTimeoutRef.current)
      handleSettledScroll()
    }

    container.addEventListener("scroll", handleNativeScroll, { passive: true })
    container.addEventListener("scrollend", handleScrollEnd)
    return () => {
      window.clearTimeout(settleTimeoutRef.current)
      window.cancelAnimationFrame(scrollRafRef.current)
      window.cancelAnimationFrame(softSettleRafRef.current)
      container.removeEventListener("scroll", handleNativeScroll)
      container.removeEventListener("scrollend", handleScrollEnd)
    }
  }, [])

  function handlePauseHover() {
    isHoverPausedRef.current = true
  }

  function handleResumeHover() {
    isHoverPausedRef.current = false
  }

  function handleFocusCapture() {
    isFocusPausedRef.current = true
  }

  function handleBlurCapture(event: FocusEvent<HTMLDivElement>) {
    const nextTarget = event.relatedTarget
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget))
      return

    isFocusPausedRef.current = false
  }

  function handlePointerDown() {
    isPointerPausedRef.current = true
    cancelSoftSettle({
      isSoftSettlingRef,
      softSettleRafRef,
      container: scrollRef.current,
    })
  }

  function handlePointerUp() {
    isPointerPausedRef.current = false

    // Pointer-up can land before the final scrollend of a fling — wait for
    // momentum to finish, then soft-settle and recycle safely.
    window.clearTimeout(settleTimeoutRef.current)
    settleTimeoutRef.current = window.setTimeout(() => {
      const el = scrollRef.current
      if (!el) return
      if (
        isPointerPausedRef.current ||
        isRebasingRef.current ||
        isSoftSettlingRef.current
      )
        return

      const progress = readScrollProgress({
        container: el,
        windowStart: windowStartRef.current,
      })
      scrollProgressRef.current = progress
      setScrollProgress(progress)

      softSettleThenRebase({
        container: el,
        prefersReducedMotion: prefersReducedMotionRef.current,
        isSoftSettlingRef,
        softSettleRafRef,
        onFrame: () => {
          const live = scrollRef.current
          if (!live) return
          const next = readScrollProgress({
            container: live,
            windowStart: windowStartRef.current,
          })
          scrollProgressRef.current = next
          setScrollProgress(next)
        },
        onComplete: () => {
          syncFromScroll({
            shouldRebase: true,
            scrollRef,
            isRebasingRef,
            isPointerPausedRef,
            windowStartRef,
            activeLogicalIndexRef,
            pendingScrollAdjustRef,
            pendingSnapToChildIndexRef,
            setActiveLogicalIndex,
            setWindowStart,
          })
        },
      })
    }, SCROLL_SETTLE_MS)
  }

  function handlePointerLeave() {
    // Don't clear pointer pause on leave while buttons are held — the user
    // may still be dragging. pointerup/cancel handles release.
  }

  function handlePointerCancel() {
    handlePointerUp()
  }

  const slots = Array.from({ length: windowCount }, (_, offset) => {
    const logicalIndex = windowStart + offset
    return {
      logicalIndex,
      testimonial: getTestimonialByLogicalIndex(logicalIndex),
    }
  })

  return (
    <Box
      ml={{ base: "-6", lg901: "-12" }}
      mr={{ base: "-6", lg901: "-12" }}
      onMouseEnter={handlePauseHover}
      onMouseLeave={handleResumeHover}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      onPointerLeave={handlePointerLeave}
    >
      <Flex
        ref={scrollRef}
        as="ul"
        listStyleType="none"
        gap="8"
        overflowX="auto"
        px={{ base: "6", lg901: "12" }}
        pt={{
          base: `${TESTIMONIAL_LIFT_MOBILE_PX + 12}px`,
          lg901: `${TESTIMONIAL_LIFT_DESKTOP_PX + 12}px`,
        }}
        mt={{
          base: `-${TESTIMONIAL_LIFT_MOBILE_PX}px`,
          lg901: `-${TESTIMONIAL_LIFT_DESKTOP_PX}px`,
        }}
        pb="5"
        aria-label="Testimonials"
        css={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          scrollSnapType: "x mandatory",
          // Smooth snap settle for user flings (e.g. bouncing back from the
          // trailing edge). Recycle corrections still force behavior: "auto"
          // inline so they stay invisible.
          scrollBehavior: prefersReducedMotion ? "auto" : "smooth",
          scrollPaddingInline: "24px",
          "&::-webkit-scrollbar": { display: "none" },
          "@media (min-width: 901px)": {
            scrollPaddingInline: "48px",
          },
        }}
      >
        {slots.map(({ logicalIndex, testimonial }) => {
          const relativePosition = logicalIndex - scrollProgress
          const liftMultiplier = prefersReducedMotion
            ? 0
            : getTestimonialLiftMultiplier(relativePosition)
          const restingRotation = getTestimonialRotationDeg(
            modulo(logicalIndex, TESTIMONIAL_COUNT),
          )
          const rotateDeg = prefersReducedMotion
            ? 0
            : getTestimonialRotationDegForProgress({
                relativePosition,
                restingRotation,
              })
          const isVisibleOrTransitioning =
            logicalIndex >= activeLogicalIndex - 1 &&
            logicalIndex <= activeLogicalIndex + 2

          return (
            <Box
              as="li"
              key={`testimonial-${logicalIndex}`}
              flex="0 0 auto"
              flexShrink={0}
              w={{ base: "calc(100vw - 88px)", md700: "testimonialCard" }}
              transform={{
                base: `translateY(-${TESTIMONIAL_LIFT_MOBILE_PX * liftMultiplier}px) rotate(${rotateDeg}deg)`,
                lg901: `translateY(-${TESTIMONIAL_LIFT_DESKTOP_PX * liftMultiplier}px) rotate(${rotateDeg}deg)`,
              }}
              transitionProperty="transform"
              transitionDuration="0ms"
              willChange={isVisibleOrTransitioning ? "transform" : "auto"}
              css={{ scrollSnapAlign: "start" }}
              aria-hidden={activeLogicalIndex !== logicalIndex}
            >
              <TestimonialBlock
                quote={testimonial.quote}
                attribution={testimonial.attribution}
                role={testimonial.role}
                logoSrc={testimonial.logoSrc}
                placeholder={testimonial.placeholder}
                rotateDeg={0}
                willChangeTransform={false}
              />
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

function syncFromScroll({
  shouldRebase,
  scrollRef,
  isRebasingRef,
  isPointerPausedRef,
  windowStartRef,
  activeLogicalIndexRef,
  pendingScrollAdjustRef,
  pendingSnapToChildIndexRef,
  setActiveLogicalIndex,
  setWindowStart,
}: {
  shouldRebase: boolean
  scrollRef: MutableRefObject<HTMLDivElement | null>
  isRebasingRef: MutableRefObject<boolean>
  isPointerPausedRef: MutableRefObject<boolean>
  windowStartRef: MutableRefObject<number>
  activeLogicalIndexRef: MutableRefObject<number>
  pendingScrollAdjustRef: MutableRefObject<number>
  pendingSnapToChildIndexRef: MutableRefObject<number | null>
  setActiveLogicalIndex: (value: number) => void
  setWindowStart: (value: number) => void
}) {
  const el = scrollRef.current
  if (!el) return
  if (shouldRebase && (isRebasingRef.current || isPointerPausedRef.current))
    return

  const childIndex = findNearestChildIndex(el)
  if (childIndex < 0) return

  const nextActive = windowStartRef.current + childIndex
  if (nextActive !== activeLogicalIndexRef.current) {
    activeLogicalIndexRef.current = nextActive
    setActiveLogicalIndex(nextActive)
  }

  if (!shouldRebase || isRebasingRef.current) return

  const currentStart = windowStartRef.current
  const idealStart = Math.max(0, nextActive - BEHIND_BUFFER)

  // On settle, drop fully offscreen cards behind the active one and append
  // the same count ahead. Do this eagerly (not only when runway is low) so
  // we recycle one card at a time instead of a jarring multi-card batch.
  const needsForwardRecycle =
    idealStart > currentStart && nextActive - currentStart > BEHIND_BUFFER

  if (needsForwardRecycle) {
    shiftWindowStart({
      nextStart: idealStart,
      activeLogicalIndex: nextActive,
      container: el,
      windowStartRef,
      pendingScrollAdjustRef,
      pendingSnapToChildIndexRef,
      setWindowStart,
    })
    return
  }

  // Extend backward only when the user reaches the first mounted card.
  if (idealStart < currentStart && nextActive === currentStart) {
    shiftWindowStart({
      nextStart: idealStart,
      activeLogicalIndex: nextActive,
      container: el,
      windowStartRef,
      pendingScrollAdjustRef,
      pendingSnapToChildIndexRef,
      setWindowStart,
    })
  }
}

function isAutoScrollPaused({
  isHoverPausedRef,
  isFocusPausedRef,
  isPointerPausedRef,
  isInViewRef,
  prefersReducedMotionRef,
}: {
  isHoverPausedRef: MutableRefObject<boolean>
  isFocusPausedRef: MutableRefObject<boolean>
  isPointerPausedRef: MutableRefObject<boolean>
  isInViewRef: MutableRefObject<boolean>
  prefersReducedMotionRef: MutableRefObject<boolean>
}): boolean {
  return (
    isHoverPausedRef.current ||
    isFocusPausedRef.current ||
    isPointerPausedRef.current ||
    !isInViewRef.current ||
    prefersReducedMotionRef.current
  )
}

function shiftWindowStart({
  nextStart,
  activeLogicalIndex,
  container,
  windowStartRef,
  pendingScrollAdjustRef,
  pendingSnapToChildIndexRef,
  setWindowStart,
}: {
  nextStart: number
  activeLogicalIndex: number
  container: HTMLElement
  windowStartRef: MutableRefObject<number>
  pendingScrollAdjustRef: MutableRefObject<number>
  pendingSnapToChildIndexRef: MutableRefObject<number | null>
  setWindowStart: (value: number) => void
}) {
  const currentStart = windowStartRef.current
  if (nextStart === currentStart) return

  const delta = nextStart - currentStart
  const stride = measureCardStride(container)

  if (delta > 0)
    pendingScrollAdjustRef.current += -measureLeftRemoveWidth(container, delta)
  else pendingScrollAdjustRef.current += -delta * stride

  // After recycle, pin scroll to the active card's new child index so
  // mandatory snap cannot fall back to the first card.
  pendingSnapToChildIndexRef.current = Math.max(
    0,
    activeLogicalIndex - nextStart,
  )

  windowStartRef.current = nextStart
  setWindowStart(nextStart)
}

function measureLeftRemoveWidth(
  container: HTMLElement,
  removeCount: number,
): number {
  if (removeCount <= 0) return 0

  const items = container.children
  if (items.length <= removeCount) return removeCount * (CARD_WIDTH_PX + GAP_PX)

  const first = items[0] as HTMLElement
  const pivot = items[removeCount] as HTMLElement
  return pivot.offsetLeft - first.offsetLeft
}

function readScrollProgress({
  container,
  windowStart,
}: {
  container: HTMLElement
  windowStart: number
}): number {
  const stride = measureCardStride(container)
  if (stride <= 0) return windowStart

  const padding = getScrollPaddingInlineStart(container)
  const first = container.children[0] as HTMLElement | undefined
  const origin = first?.offsetLeft ?? padding
  const fractionalChildIndex = (container.scrollLeft + padding - origin) / stride

  return windowStart + fractionalChildIndex
}

function getTestimonialRotationDeg(index: number): number {
  return TESTIMONIAL_ROTATIONS[index % TESTIMONIAL_ROTATIONS.length] ?? 0
}

/** Piecewise lift curve matching the old discrete steps, but continuous. */
function getTestimonialLiftMultiplier(relativePosition: number): number {
  if (relativePosition <= 0) return 0
  if (relativePosition < 1) return 0.5 * relativePosition
  if (relativePosition < 2) return 0.5 + 0.5 * (relativePosition - 1)
  return 1
}

function getTestimonialRotationDegForProgress({
  relativePosition,
  restingRotation,
}: {
  relativePosition: number
  restingRotation: number
}): number {
  const distance = Math.abs(relativePosition)
  if (distance >= 1) return restingRotation
  return restingRotation * distance
}

function getTestimonialByLogicalIndex(logicalIndex: number) {
  return testimonials[modulo(logicalIndex, TESTIMONIAL_COUNT)]!
}

function modulo(value: number, length: number): number {
  return ((value % length) + length) % length
}

function getVisibleWindowCount({
  containerWidth,
  cardStride,
}: {
  containerWidth: number
  cardStride: number
}): number {
  if (cardStride <= 0) return BEHIND_BUFFER + AHEAD_BUFFER + 1
  // Visible cards + one behind + enough ahead for multi-card flings.
  return Math.max(
    BEHIND_BUFFER + AHEAD_BUFFER + 1,
    Math.ceil(containerWidth / cardStride) + BEHIND_BUFFER + AHEAD_BUFFER,
  )
}

function measureCardStride(container: HTMLElement): number {
  const items = container.children
  if (items.length >= 2) {
    const first = items[0] as HTMLElement
    const second = items[1] as HTMLElement
    const stride = second.offsetLeft - first.offsetLeft
    if (stride > 0) return stride
  }

  if (items.length === 1) {
    const only = items[0] as HTMLElement
    return only.offsetWidth + GAP_PX
  }

  return CARD_WIDTH_PX + GAP_PX
}

function getScrollPaddingInlineStart(container: HTMLElement): number {
  const parsed = Number.parseFloat(
    getComputedStyle(container).scrollPaddingInlineStart,
  )
  return Number.isFinite(parsed) ? parsed : 0
}

function getSnapScrollLeft(item: HTMLElement): number {
  const container = item.parentElement
  if (!container) return item.offsetLeft
  return Math.max(0, item.offsetLeft - getScrollPaddingInlineStart(container))
}

/** When the user overshoots past the first/last snap point, drop mandatory
 * snap so the browser cannot hard-correct — we ease back ourselves. */
function releaseSnapIfPastEdge(container: HTMLElement) {
  const items = container.children
  if (items.length === 0) return

  const firstSnap = getSnapScrollLeft(items[0] as HTMLElement)
  const lastSnap = getSnapScrollLeft(items[items.length - 1] as HTMLElement)
  const left = container.scrollLeft

  if (left > lastSnap + SNAP_ALIGN_EPSILON_PX || left < firstSnap - SNAP_ALIGN_EPSILON_PX)
    container.style.scrollSnapType = "none"
}

function cancelSoftSettle({
  isSoftSettlingRef,
  softSettleRafRef,
  container,
}: {
  isSoftSettlingRef: MutableRefObject<boolean>
  softSettleRafRef: MutableRefObject<number>
  container: HTMLElement | null
}) {
  if (softSettleRafRef.current !== 0) {
    window.cancelAnimationFrame(softSettleRafRef.current)
    softSettleRafRef.current = 0
  }
  isSoftSettlingRef.current = false
  if (container) {
    container.style.scrollSnapType = ""
    container.style.scrollBehavior = ""
  }
}

function softSettleThenRebase({
  container,
  prefersReducedMotion,
  isSoftSettlingRef,
  softSettleRafRef,
  onFrame,
  onComplete,
}: {
  container: HTMLElement
  prefersReducedMotion: boolean
  isSoftSettlingRef: MutableRefObject<boolean>
  softSettleRafRef: MutableRefObject<number>
  onFrame: () => void
  onComplete: () => void
}) {
  const childIndex = findNearestChildIndex(container)
  if (childIndex < 0) {
    container.style.scrollSnapType = ""
    onComplete()
    return
  }

  const item = container.children[childIndex] as HTMLElement | undefined
  if (!item) {
    container.style.scrollSnapType = ""
    onComplete()
    return
  }

  const target = getSnapScrollLeft(item)
  const distance = target - container.scrollLeft

  if (Math.abs(distance) <= SNAP_ALIGN_EPSILON_PX || prefersReducedMotion) {
    if (Math.abs(distance) > 0 && prefersReducedMotion)
      container.scrollLeft = target
    container.style.scrollSnapType = ""
    container.style.scrollBehavior = ""
    onComplete()
    return
  }

  isSoftSettlingRef.current = true
  container.style.scrollSnapType = "none"
  container.style.scrollBehavior = "auto"

  const from = container.scrollLeft
  const startedAt = performance.now()

  function tick(now: number) {
    const t = Math.min(1, (now - startedAt) / SOFT_SETTLE_MS)
    // easeOutCubic — decelerates into the snap point
    const eased = 1 - (1 - t) ** 3
    container.scrollLeft = from + distance * eased
    onFrame()

    if (t < 1) {
      softSettleRafRef.current = window.requestAnimationFrame(tick)
      return
    }

    softSettleRafRef.current = 0
    container.scrollLeft = target
    container.style.scrollSnapType = ""
    container.style.scrollBehavior = ""
    isSoftSettlingRef.current = false
    onFrame()
    onComplete()
  }

  softSettleRafRef.current = window.requestAnimationFrame(tick)
}

function findNearestChildIndex(container: HTMLElement): number {
  const items = Array.from(container.children) as HTMLElement[]
  if (items.length === 0) return -1

  const target = container.scrollLeft + getScrollPaddingInlineStart(container)
  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY

  items.forEach((item, index) => {
    const distance = Math.abs(item.offsetLeft - target)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  return closestIndex
}
