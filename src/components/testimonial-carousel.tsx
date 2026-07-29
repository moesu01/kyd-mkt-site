import { Box, Flex } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { testimonials } from "../content/site-content"
import { TestimonialBlock } from "./testimonial-block"

const AUTO_SCROLL_MS = 5000
const TESTIMONIAL_LIFT_MOBILE_PX = 120
const TESTIMONIAL_LIFT_DESKTOP_PX = 144

/** Resting tilts in [-2, 1.5] — shuffled so neighbors don't look progressive */
const TESTIMONIAL_ROTATIONS = [-1.8, 1.2, -0.6, 0.9, -2, 1.5, -1.1, 0.4] as const

function getTestimonialRotationDeg(index: number): number {
  return TESTIMONIAL_ROTATIONS[index % TESTIMONIAL_ROTATIONS.length] ?? 0
}

function getTestimonialLiftMultiplier({
  index,
  activeIndex,
}: {
  index: number
  activeIndex: number
}): number {
  const visiblePosition = index - activeIndex

  if (visiblePosition === 1) return 0.5
  if (visiblePosition >= 2) return 1
  return 0
}

export function TestimonialCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const isPausedRef = useRef(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container || testimonials.length <= 1) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReducedMotion) return

    const intervalId = window.setInterval(() => {
      if (isPausedRef.current) return

      setActiveIndex((current) => {
        const next = (current + 1) % testimonials.length
        const item = container.children[next] as HTMLElement | undefined
        if (item) {
          container.scrollTo({
            left: item.offsetLeft,
            behavior: "smooth",
          })
        }
        return next
      })
    }, AUTO_SCROLL_MS)

    return () => window.clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return

    function handleScrollEnd() {
      const el = scrollRef.current
      if (!el) return

      const items = Array.from(el.children) as HTMLElement[]
      if (items.length === 0) return

      const scrollLeft = el.scrollLeft
      let closestIndex = 0
      let closestDistance = Number.POSITIVE_INFINITY

      items.forEach((item, index) => {
        const distance = Math.abs(item.offsetLeft - scrollLeft)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveIndex(closestIndex)
    }

    container.addEventListener("scrollend", handleScrollEnd)
    return () => container.removeEventListener("scrollend", handleScrollEnd)
  }, [])

  function handlePause() {
    isPausedRef.current = true
  }

  function handleResume() {
    isPausedRef.current = false
  }

  return (
    <Box
      ml={{ base: "-6", lg901: "-12" }}
      mr={{ base: "-6", lg901: "-12" }}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
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
          scrollBehavior: "smooth",
          scrollPaddingInline: "24px",
          "&::-webkit-scrollbar": { display: "none" },
          "@media (min-width: 901px)": {
            scrollPaddingInline: "48px",
          },
        }}
      >
        {testimonials.map((testimonial, index) => {
          const liftMultiplier = getTestimonialLiftMultiplier({
            index,
            activeIndex,
          })
          const isVisibleOrTransitioning =
            index >= activeIndex - 1 && index <= activeIndex + 2

          return (
            <Box
              as="li"
              key={`testimonial-${index}`}
              flex="0 0 auto"
              flexShrink={0}
              w="testimonialCard"
              transform={{
                base: `translateY(-${TESTIMONIAL_LIFT_MOBILE_PX * liftMultiplier}px)`,
                lg901: `translateY(-${TESTIMONIAL_LIFT_DESKTOP_PX * liftMultiplier}px)`,
              }}
              transitionProperty="transform"
              transitionDuration="300ms"
              transitionTimingFunction="cubic-bezier(0.2, 0, 0, 1)"
              willChange={isVisibleOrTransitioning ? "transform" : "auto"}
              css={{ scrollSnapAlign: "start" }}
              aria-hidden={activeIndex !== index}
            >
              <TestimonialBlock
                quote={testimonial.quote}
                attribution={testimonial.attribution}
                role={testimonial.role}
                logoSrc={testimonial.logoSrc}
                placeholder={testimonial.placeholder}
                rotateDeg={
                  activeIndex === index ? 0 : getTestimonialRotationDeg(index)
                }
                willChangeTransform={isVisibleOrTransitioning}
              />
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}
