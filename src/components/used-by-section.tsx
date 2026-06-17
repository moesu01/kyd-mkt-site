import { Box, Flex, Heading, Image, Text, chakra } from "@chakra-ui/react"
import { useEffect, useRef, useState, type MouseEvent } from "react"
import { usedBy } from "../content/site-content"

const ChakraLink = chakra("a")
const ChakraImg = chakra("img")

interface UsedByCardProps {
  name: string
  subtitle: string
  href: string
  imageSrc: string
  objectPosition?: string
}

function ExternalLinkArrow({ isHovered }: { isHovered: boolean }) {
  return (
    <Box
      display="inline-flex"
      flexShrink={0}
      transform={isHovered ? "translateX(3px)" : "translateX(0)"}
      transitionProperty="transform"
      transitionDuration="200ms"
      transitionTimingFunction={usedByCardEase}
      aria-hidden
    >
      <Image src="/icons/external-link-arrow.svg" alt="" w="13.828px" h="12px" />
    </Box>
  )
}

function UsedByCard({
  name,
  subtitle,
  href,
  imageSrc,
  objectPosition = "center",
}: UsedByCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isPlaceholderLink = href === "#"

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (isPlaceholderLink) event.preventDefault()
  }

  return (
    <ChakraLink
      href={href}
      display="flex"
      flexDirection="column"
      gap="3"
      textDecoration="none"
      color="inherit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      aria-label={
        isPlaceholderLink
          ? `${name}, ${subtitle} (link coming soon)`
          : `${name}, ${subtitle}`
      }
      _focusVisible={usedByCardFocusVisible}
    >
      <Box>
        <Box
          display="inline-flex"
          alignItems="center"
          gap="2"
          fontSize="15px"
          fontWeight="medium"
          lineHeight="18px"
          letterSpacing="-0.5px"
          color={isHovered ? "accent" : "fg"}
          transitionProperty="color"
          transitionDuration="200ms"
          transitionTimingFunction={usedByCardEase}
        >
          <Text as="span">{name}</Text>
          <ExternalLinkArrow isHovered={isHovered} />
        </Box>
        <Text
          as="p"
          mt="0"
          fontSize="15px"
          fontWeight="normal"
          lineHeight="18px"
          letterSpacing="-0.5px"
          color={isHovered ? "fg" : "fgMuted"}
          transitionProperty="color"
          transitionDuration="200ms"
          transitionTimingFunction={usedByCardEase}
        >
          {subtitle}
        </Text>
      </Box>

      <Box
        position="relative"
        aspectRatio="1"
        w="full"
        borderRadius="8px"
        overflow="hidden"
        boxShadow={isHovered ? usedByImageShadowHover : usedByImageShadow}
        transform={isHovered ? "translateY(-4px)" : "translateY(0)"}
        transitionProperty="box-shadow, transform"
        transitionDuration="200ms"
        transitionTimingFunction={usedByCardEase}
      >
        <Image
          src={imageSrc}
          alt=""
          position="absolute"
          inset="0"
          w="full"
          h="full"
          objectFit="cover"
          objectPosition={objectPosition}
          transform={isHovered ? "scale(1.03)" : "scale(1)"}
          transitionProperty="transform"
          transitionDuration="200ms"
          transitionTimingFunction={usedByCardEase}
        />
      </Box>
    </ChakraLink>
  )
}

const usedByCardEase = "cubic-bezier(0.2, 0, 0, 1)"

const usedByCardFocusVisible = {
  outline: "2px solid",
  outlineColor: "rgba(255, 255, 255, 0.45)",
  outlineOffset: "4px",
  borderRadius: "2px",
} as const

const usedByImageShadow = "0 0 0 1px rgba(255, 255, 255, 0.1)"

const usedByImageShadowHover =
  `${usedByImageShadow}, 0 20px 48px -14px rgba(0, 0, 0, 0.7), 0 8px 20px -8px rgba(0, 0, 0, 0.5)`

export function UsedBySection() {
  return (
    <Flex mb="16" align="center" justify="space-between" gap="8">
      <Box minW="0">
        <Heading
          as="h2"
          color="fg"
          textStyle="platformHeading"
          textWrap="balance"
        >
          Used by venues and artists
          <br />
          across the country
        </Heading>
      </Box>

      <ChakraImg
        src="/images/used-by/pixel-globe.svg"
        alt=""
        aria-hidden
        className="used-by-globe-spin"
        w="132px"
        h="132px"
        flexShrink={0}
        display="block"
        objectFit="contain"
      />
    </Flex>
  )
}

const USED_BY_SCROLL_SPEED_PX_PER_FRAME = 0.75

export function UsedByCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isPausedRef = useRef(false)

  useEffect(() => {
    const container = scrollRef.current
    if (!container || usedBy.length <= 1) return

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReducedMotion) return

    let animationId = 0

    function tick() {
      const el = scrollRef.current
      if (!el) return

      if (!isPausedRef.current) {
        el.scrollLeft += USED_BY_SCROLL_SPEED_PX_PER_FRAME

        const loopWidth = el.scrollWidth / 2
        if (loopWidth > 0 && el.scrollLeft >= loopWidth) {
          el.scrollLeft -= loopWidth
        }
      }

      animationId = window.requestAnimationFrame(tick)
    }

    animationId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(animationId)
  }, [])

  function handlePause() {
    isPausedRef.current = true
  }

  function handleResume() {
    isPausedRef.current = false
  }

  const carouselItems = [...usedBy, ...usedBy]

  return (
    <Box
      mb={{ base: "16", lg901: "24" }}
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
        overflowX="hidden"
        px={{ base: "6", lg901: "12" }}
        pb="2"
        aria-label="Venues and artists using KYD"
        css={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {carouselItems.map((item, index) => (
          <Box
            as="li"
            key={`${item.name}-${index}`}
            flex="0 0 auto"
            flexShrink={0}
            w={{ base: "280px", md: "320px", lg901: "360px" }}
          >
            <UsedByCard
              name={item.name}
              subtitle={item.subtitle}
              href={item.href}
              imageSrc={item.imageSrc}
              objectPosition={"objectPosition" in item ? item.objectPosition : "center"}
            />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
