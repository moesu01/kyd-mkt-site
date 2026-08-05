import { Box, Flex, Heading, Image, Text, chakra } from "@chakra-ui/react"
import { useEffect, useRef, useState, type MouseEvent } from "react"
import { usedBy } from "../content/site-content"
import { assetUrl } from "../lib/asset-url"
import { PixelGlobe } from "./used-by/pixel-globe"

const ChakraLink = chakra("a")

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
      <Image src={assetUrl("/icons/external-link-arrow.svg")} alt="" w="13.828px" h="12px" />
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
      <Box display="flex" flexDirection="column" gap="1.5">
        <Box
          display="inline-flex"
          alignItems="center"
          gap="2"
          transitionProperty="color"
          transitionDuration="200ms"
          transitionTimingFunction={usedByCardEase}
        >
          <Text
            as="span"
            textStyle="touringArtistName"
          >
            {name}
          </Text>
          <ExternalLinkArrow isHovered={isHovered} />
        </Box>
        <Text
          as="p"
          mt="0"
          textStyle="usedByLocation"
          color={isHovered ? "fg" : "warmMuted"}
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
    <Flex
      position="relative"
      pt={{ base: "6", lg901: "8" }}
      direction={{ base: "column", lg901: "row" }}
      align="center"
      justify="space-between"
      gap={{ base: "6", lg901: "8" }}
    >
      <Box
        order={{ base: 1, lg901: 2 }}
        flexShrink={0}
        alignSelf="center"
      >
        <PixelGlobe />
      </Box>

      <Box minW="0" order={{ base: 2, lg901: 1 }} w="full">
        <Heading
          as="h2"
          textStyle="cossetteDisplayHeading"
          fontWeight="normal"
          textTransform="uppercase"
          lineHeight="1.1"
          color="warmDisplay"
          textAlign={{ base: "center", lg901: "left" }}
          textWrap="balance"
          w={{ base: "100vw", lg901: "auto" }}
          ms={{ base: "calc(50% - 50vw)", lg901: "0" }}
        >
          Used by Venues &amp; Artists
          <br />
          <Text as="span" color="warmMuted">
            Across the Country
          </Text>
        </Heading>
      </Box>
    </Flex>
  )
}

const USED_BY_SCROLL_SPEED_PX_PER_FRAME = 1

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
      ml={{ base: "-6", lg901: "-12" }}
      mr={{ base: "-6", lg901: "-12" }}
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      css={{
        maskImage:
          "linear-gradient(to right, transparent, #000 2.5rem, #000 calc(100% - 2.5rem), transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, #000 2.5rem, #000 calc(100% - 2.5rem), transparent)",
        "@media (min-width: 901px)": {
          maskImage:
            "linear-gradient(to right, transparent, #000 4rem, #000 calc(100% - 4rem), transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 4rem, #000 calc(100% - 4rem), transparent)",
        },
      }}
    >
      <Flex
        ref={scrollRef}
        as="ul"
        listStyleType="none"
        gap="8"
        overflowX="hidden"
        px={{ base: "6", lg901: "12" }}
        pt="0"
        pb="0"
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
            py="1"
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
