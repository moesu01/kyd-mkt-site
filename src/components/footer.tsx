import { Box, Flex, Link, Text } from "@chakra-ui/react"
import { useLayoutEffect, useRef, useState } from "react"
import {
  footerLegalLinks,
  footerPrimaryLinks,
} from "../content/site-content"
import { colors } from "../theme/tokens"

const footerLinkStyles = {
  fontSize: "13px",
  lineHeight: "19.5px",
  color: "warmMuted",
  textDecoration: "none",
  transitionProperty: "colors",
  transitionDuration: "150ms",
  _hover: { color: "warmSoft" },
} as const

const footerBgGradient = `linear-gradient(180deg, ${colors.surface.value} 0%, ${colors.surface.value} 2.57%, #4E0000 63.93%, #7B0000 100%)`

const footerWordmarkGradient =
  "linear-gradient(180deg, #D99F71 0%, #A85616 32.69%, #6A0803 67.31%, #300402 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.91), rgba(0, 0, 0, 0.91)), linear-gradient(180deg, #F9E1CD -11.68%, #B1774E 68.17%, #891913 106.95%)"

const WORDMARK_TEXT = "KYD Labs"
const WORDMARK_PULL_DOWN = "20px"

const footerWordmarkGrain = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>',
)}")`

interface WordmarkLayout {
  marginLeft: number
  width: number
}

interface GradientLayout {
  footerHeight: number
  wordmarkOffset: number
}

function fitFontSizeToWidth({
  textElement,
  targetWidth,
}: {
  textElement: HTMLElement
  targetWidth: number
}): number {
  if (targetWidth <= 0) return 16

  let low = 1
  let high = 600
  let best = low

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    textElement.style.fontSize = `${mid}px`
    const width = textElement.scrollWidth

    if (width <= targetWidth) {
      best = mid
      low = mid + 1
    } else {
      high = mid - 1
    }
  }

  return best
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const leftAnchorRef = useRef<HTMLAnchorElement>(null)
  const rightAnchorRef = useRef<HTMLParagraphElement>(null)
  const wordmarkRef = useRef<HTMLParagraphElement>(null)
  const [wordmarkLayout, setWordmarkLayout] = useState<WordmarkLayout>({
    marginLeft: 0,
    width: 0,
  })
  const [fontSize, setFontSize] = useState(16)
  const [gradientLayout, setGradientLayout] = useState<GradientLayout>({
    footerHeight: 0,
    wordmarkOffset: 0,
  })

  useLayoutEffect(() => {
    const footerElement = footerRef.current
    const contentElement = contentRef.current
    const leftAnchor = leftAnchorRef.current
    const rightAnchor = rightAnchorRef.current
    const wordmarkElement = wordmarkRef.current

    if (
      !footerElement ||
      !contentElement ||
      !leftAnchor ||
      !rightAnchor ||
      !wordmarkElement
    ) {
      return
    }

    const updateLayout = () => {
      const contentRect = contentElement.getBoundingClientRect()
      const left = leftAnchor.getBoundingClientRect().left - contentRect.left
      const right = rightAnchor.getBoundingClientRect().right - contentRect.left
      const width = Math.max(0, right - left)

      setWordmarkLayout({ marginLeft: left, width })

      const fittedSize = fitFontSizeToWidth({
        textElement: wordmarkElement,
        targetWidth: width,
      })
      setFontSize(fittedSize)

      const footerRect = footerElement.getBoundingClientRect()
      const wordmarkRect = wordmarkElement.getBoundingClientRect()
      setGradientLayout({
        footerHeight: footerRect.height,
        wordmarkOffset: wordmarkRect.top - footerRect.top,
      })
    }

    const runUpdate = () => {
      updateLayout()
    }

    runUpdate()

    const resizeObserver = new ResizeObserver(runUpdate)
    resizeObserver.observe(contentElement)
    resizeObserver.observe(footerElement)
    resizeObserver.observe(wordmarkElement)

    const fontLoadPromise = document.fonts?.ready
    if (fontLoadPromise) {
      void fontLoadPromise.then(runUpdate)
    }

    return () => resizeObserver.disconnect()
  }, [])

  return (
    <Box
      as="footer"
      ref={footerRef}
      pt="12"
      w="full"
      overflow="hidden"
      backgroundImage={footerBgGradient}
    >
      <Box ref={contentRef} w="full">
        <Flex
          direction={{ base: "column", lg901: "row" }}
          align={{ base: "flex-start", lg901: "center" }}
          justify="space-between"
          gap={{ base: "6", lg901: "8" }}
          px={{ base: "6", lg901: "12" }}
          py="6"
          w="full"
        >
          <Flex
            as="nav"
            aria-label="Footer"
            flexWrap="wrap"
            gap="6"
            listStyleType="none"
          >
            {footerPrimaryLinks.map((link, index) => (
              <Link
                key={link.label}
                ref={index === 0 ? leftAnchorRef : undefined}
                href={link.href}
                fontWeight="medium"
                {...footerLinkStyles}
              >
                {link.label}
              </Link>
            ))}
          </Flex>

          <Flex
            direction={{ base: "column", lg901: "row" }}
            align={{ base: "flex-start", lg901: "center" }}
            flexWrap="wrap"
            gap="6"
          >
            {footerLegalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                fontWeight="normal"
                {...footerLinkStyles}
              >
                {link.label}
              </Link>
            ))}
            <Text
              ref={rightAnchorRef}
              fontSize="12px"
              lineHeight="18px"
              color="warmMuted"
              whiteSpace="nowrap"
            >
              © 2025 KYD Labs. All rights reserved.
            </Text>
          </Flex>
        </Flex>

        <Link
          href="#"
          display="block"
          ml={`${wordmarkLayout.marginLeft}px`}
          w={wordmarkLayout.width > 0 ? `${wordmarkLayout.width}px` : "full"}
          textDecoration="none"
          aria-label="KYD Labs home"
          transform={`translateY(${WORDMARK_PULL_DOWN})`}
        >
          <Text
            ref={wordmarkRef}
            fontFamily="cossetteTitre"
            fontWeight="bold"
            fontSize={`${fontSize}px`}
            lineHeight="0.8"
            whiteSpace="nowrap"
            w="full"
            textAlign="left"
            css={{
              position: "relative",
              backgroundImage: footerWordmarkGradient,
              backgroundSize:
                gradientLayout.footerHeight > 0
                  ? `100% ${gradientLayout.footerHeight}px`
                  : "100% 100%",
              backgroundPosition: `0 -${gradientLayout.wordmarkOffset}px`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              "&::after": {
                content: '""',
                position: "absolute",
                inset: 0,
                backgroundImage: footerWordmarkGrain,
                backgroundRepeat: "repeat",
                backgroundSize: "180px 180px",
                opacity: 0.35,
                mixBlendMode: "overlay",
                pointerEvents: "none",
                WebkitMask: "linear-gradient(#fff 0 0)",
                WebkitMaskClip: "text",
                mask: "linear-gradient(#fff 0 0)",
                maskClip: "text",
              },
            }}
          >
            {WORDMARK_TEXT}
          </Text>
        </Link>
      </Box>
    </Box>
  )
}
