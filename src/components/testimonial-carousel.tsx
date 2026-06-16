import { Box, Flex } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { testimonials } from "../content/site-content"
import { TestimonialBlock } from "./testimonial-block"

const AUTO_SCROLL_MS = 5000

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
        pb="2"
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
        {testimonials.map((testimonial, index) => (
          <Box
            as="li"
            key={`testimonial-${index}`}
            flex="0 0 auto"
            flexShrink={0}
            w="testimonialCard"
            css={{ scrollSnapAlign: "start" }}
            aria-hidden={activeIndex !== index}
          >
            <TestimonialBlock
              quote={testimonial.quote}
              attribution={testimonial.attribution}
              role={testimonial.role}
              logoSrc={testimonial.logoSrc}
              placeholder={testimonial.placeholder}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
