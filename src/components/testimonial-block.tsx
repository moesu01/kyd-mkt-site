import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useLayoutEffect, useRef, useState } from "react"
import { assetUrl } from "../lib/asset-url"

interface TestimonialBlockProps {
  quote: string
  attribution: string
  role?: string
  logoSrc?: string
  placeholder?: boolean
  rotateDeg?: number
  willChangeTransform?: boolean
}

const PAPER_TEXTURE_URL = assetUrl("/images/paper_tx2.png")
const QUOTE_FONT_MIN_PX = 18
const QUOTE_FONT_MAX_PX = 26
/**
 * Mobile skips the height fitter: the card is only ~290px wide there, so any
 * size that fills the card height leaves fewer than 30 characters per line.
 */
const QUOTE_FONT_MOBILE_PX = 20
const QUOTE_DESKTOP_QUERY = "(min-width: 901px)"

function TestimonialLogo({
  logoSrc,
  attribution,
}: {
  logoSrc?: string
  attribution: string
}) {
  const [hasError, setHasError] = useState(false)

  if (!logoSrc || hasError) {
    return (
      <Box
        h="10"
        w="32"
        borderRadius="md"
        border="1px dashed"
        borderColor="rgba(0, 0, 0, 0.2)"
        bg="rgba(0, 0, 0, 0.04)"
        aria-hidden
      />
    )
  }

  return (
    <Image
      src={logoSrc}
      alt={`${attribution} logo`}
      h="10"
      w="auto"
      maxW="32"
      objectFit="contain"
      onError={() => setHasError(true)}
    />
  )
}

const testimonialFontFeatures = {
  fontFeatureSettings: '"ss08" 1, "case" 1',
} as const

const testimonialQuoteFeatures = {
  fontFeatureSettings: '"case" 1, "ss03" 1, "cv01" 1',
} as const

const testimonialRotateEase = "cubic-bezier(0.2, 0, 0, 1)"

function fitQuoteFontSize({
  container,
  quoteEl,
}: {
  container: HTMLElement
  quoteEl: HTMLElement
}): number {
  const styles = getComputedStyle(container)
  const availableHeight =
    container.clientHeight -
    Number.parseFloat(styles.paddingTop) -
    Number.parseFloat(styles.paddingBottom)

  if (availableHeight <= 0) return QUOTE_FONT_MIN_PX

  let low = QUOTE_FONT_MIN_PX
  let high = QUOTE_FONT_MAX_PX
  let best = low

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    quoteEl.style.fontSize = `${mid}px`
    // Height-only: Safari hanging-punctuation can inflate scrollWidth and
    // falsely mark every size as overflowing.
    const overflows = quoteEl.scrollHeight > availableHeight + 1

    if (overflows) {
      high = mid - 1
      continue
    }

    best = mid
    low = mid + 1
  }

  quoteEl.style.fontSize = ""
  return best
}

export function TestimonialBlock({
  quote,
  attribution,
  role = "",
  logoSrc,
  placeholder = false,
  rotateDeg = 0,
  willChangeTransform = false,
}: TestimonialBlockProps) {
  const quoteContainerRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLParagraphElement>(null)
  const [quoteFontSizePx, setQuoteFontSizePx] = useState(26)

  useLayoutEffect(() => {
    const container = quoteContainerRef.current
    const quoteEl = quoteRef.current
    if (!container || !quoteEl) return

    let isCancelled = false
    const desktopQuery = window.matchMedia(QUOTE_DESKTOP_QUERY)

    const updateFontSize = () => {
      if (isCancelled) return
      if (!desktopQuery.matches) {
        setQuoteFontSizePx(QUOTE_FONT_MOBILE_PX)
        return
      }
      setQuoteFontSizePx(fitQuoteFontSize({ container, quoteEl }))
    }

    updateFontSize()

    const fontsReady =
      "fonts" in document ? document.fonts.ready : Promise.resolve()
    void fontsReady.then(updateFontSize)

    const observer = new ResizeObserver(updateFontSize)
    observer.observe(container)
    desktopQuery.addEventListener("change", updateFontSize)
    return () => {
      isCancelled = true
      observer.disconnect()
      desktopQuery.removeEventListener("change", updateFontSize)
    }
  }, [quote])

  return (
    <Flex
      as="article"
      direction="column"
      flex="0 0 auto"
      flexShrink={0}
      position="relative"
      w="full"
      maxW="testimonialCard"
      h={{ base: "auto", lg901: "550px" }}
      minH={{ base: "360px", lg901: "auto" }}
      borderRadius="8px"
      border="1px solid"
      borderColor="rgba(0, 0, 0, 0.1)"
      bg={placeholder ? "warmDisplay" : "white"}
      backgroundImage={
        placeholder ? undefined : `url(${PAPER_TEXTURE_URL})`
      }
      backgroundSize={placeholder ? undefined : "cover"}
      backgroundPosition={
        placeholder ? undefined : { base: "top right", lg901: "top left" }
      }
      backgroundRepeat={placeholder ? undefined : "no-repeat"}
      pt="8"
      px={{ base: "18px", lg901: "8" }}
      pb={{ base: "21px", lg901: "8" }}
      overflow="hidden"
      transform={`rotate(${rotateDeg}deg)`}
      transitionProperty="transform"
      transitionDuration="300ms"
      transitionTimingFunction={testimonialRotateEase}
      willChange={willChangeTransform ? "transform" : "auto"}
      css={foldedPosterCss}
    >
      <Box position="relative" zIndex={1}>
        <TestimonialLogo logoSrc={logoSrc} attribution={attribution} />
      </Box>

      <Flex
        ref={quoteContainerRef}
        flex="1"
        direction="column"
        justify="center"
        minH={0}
        px={{ base: "0", lg901: "12px" }}
        py={{ base: "6", lg901: "12" }}
        position="relative"
        zIndex={1}
      >
        <Text
          ref={quoteRef}
          as="p"
          fontFamily="cossetteTitre"
          fontSize={`${quoteFontSizePx}px`}
          fontWeight="bold"
          lineHeight="1.3"
          letterSpacing="-0.01em"
          color="fgDim"
          wordBreak="break-word"
          textWrap="pretty"
          css={testimonialQuoteFeatures}
        >
          <Box
            as="span"
            display="block"
            fontSize="2em"
            fontWeight="100"
            lineHeight="0.5"
            opacity={0.6}
            aria-hidden
          >
            &ldquo; &rdquo;
          </Box>
          <Box as="span" display="block">
            {quote}
          </Box>
        </Text>
      </Flex>

      <Box position="relative" zIndex={1} flexShrink={0}>
        <Text
          fontFamily="cossetteTexte"
          fontSize="18px"
          fontWeight="bold"
          lineHeight="1.3"
          color="fgDim"
          css={testimonialFontFeatures}
        >
          {attribution}
        </Text>
        {role ? (
          <Text
            fontFamily="cossetteTexte"
            mt="1"
            fontSize="14px"
            fontWeight="medium"
            lineHeight="1.2"
            letterSpacing="-0.26px"
            color="#404040"
            opacity={0.85}
            css={testimonialFontFeatures}
          >
            {role}
          </Text>
        ) : null}
      </Box>
    </Flex>
  )
}

/** Folded printed-poster creases — original lynnandtonic/PoZpjOr values */
const foldedPosterCss = {
  "&::before, &::after": {
    content: '""',
    width: "100%",
    left: 0,
    position: "absolute",
    pointerEvents: "none",
  },
  "&::before": {
    height: "4%",
    bottom: "-4%",
    backgroundRepeat: "no-repeat",
    backgroundImage:
      "linear-gradient(177deg, rgba(0, 0, 0, 0.09) 10%, transparent 50%), linear-gradient(-177deg, rgba(0, 0, 0, 0.09) 10%, transparent 50%)",
    backgroundSize: "49% 100%",
    backgroundPosition: "2% 0, 98% 0",
  },
  "&::after": {
    height: "100%",
    top: 0,
    zIndex: 2,
    backgroundRepeat: "no-repeat",
    backgroundImage: [
      "linear-gradient(to right, rgba(255, 255, 255, 0.075) 0.5%, rgba(0, 0, 0, 0.06) 1.2%, transparent 1.2%)",
      "linear-gradient(to bottom, rgba(255, 255, 255, 0.075) 0.5%, rgba(0, 0, 0, 0.06) 1.2%, transparent 1.2%)",
      "linear-gradient(to bottom, rgba(255, 255, 255, 0.075) 0.5%, rgba(0, 0, 0, 0.06) 1.2%, transparent 1.2%)",
      "linear-gradient(265deg, rgba(0, 0, 0, 0.075), transparent 10%)",
      "linear-gradient(5deg, rgba(0, 0, 0, 0.075), transparent 15%)",
      "linear-gradient(-5deg, rgba(0, 0, 0, 0.04), transparent 10%)",
      "linear-gradient(5deg, rgba(0, 0, 0, 0.04), transparent 10%)",
      "linear-gradient(-265deg, rgba(0, 0, 0, 0.075), transparent 10%)",
      "linear-gradient(-5deg, rgba(0, 0, 0, 0.075), transparent 15%)",
      "linear-gradient(266deg, rgba(0, 0, 0, 0.075), transparent 10%)",
    ].join(", "),
    backgroundSize: [
      "50% 100%",
      "100% 33.3333%",
      "100% 33.3333%",
      "50% 33.3333%",
      "50% 33.3333%",
      "50% 33.3333%",
      "50% 33.3333%",
      "50% 33.3333%",
      "50% 33.3333%",
      "50% 33.3333%",
    ].join(", "),
    backgroundPosition: [
      "right top",
      "left center",
      "left bottom",
      "left top",
      "left top",
      "right top",
      "left center",
      "right center",
      "right center",
      "left bottom",
    ].join(", "),
  },
} as const
