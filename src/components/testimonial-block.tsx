import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useState } from "react"

interface TestimonialBlockProps {
  quote: string
  attribution: string
  role?: string
  logoSrc?: string
  placeholder?: boolean
  rotateDeg?: number
}

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

const testimonialQuoteStyles = {
  ...testimonialQuoteFeatures,
  textIndent: "calc(-0.45 * 1em)",
  hangingPunctuation: "first last",
} as const

const testimonialRotateEase = "cubic-bezier(0.2, 0, 0, 1)"

export function TestimonialBlock({
  quote,
  attribution,
  role = "",
  logoSrc,
  placeholder = false,
  rotateDeg = 0,
}: TestimonialBlockProps) {
  return (
    <Flex
      as="article"
      direction="column"
      flex="0 0 auto"
      flexShrink={0}
      position="relative"
      w="full"
      maxW="testimonialCard"
      h={{ base: "480px", lg901: "550px" }}
      borderRadius="8px"
      border={placeholder ? "1px dashed" : "1px solid"}
      borderColor={placeholder ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0.1)"}
      bg={placeholder ? "#ebebeb" : "#f5f5f5"}
      p="12"
      overflow="hidden"
      transform={`rotate(${rotateDeg}deg)`}
      transitionProperty="transform"
      transitionDuration="300ms"
      transitionTimingFunction={testimonialRotateEase}
      css={foldedPosterCss}
    >
      <TestimonialLogo logoSrc={logoSrc} attribution={attribution} />

      <Flex flex="1" direction="column" justify="center" py={{ base: "8", lg901: "12" }}>
        <Text
          as="p"
          fontFamily="cossetteTexte"
          fontSize="24px"
          fontWeight="bold"
          lineHeight="1.3"
          letterSpacing="-0.24px"
          color={placeholder ? "#737373" : "fgDim"}
          fontStyle={placeholder ? "italic" : undefined}
          wordBreak="break-word"
          textWrap="balance"
          css={testimonialQuoteStyles}
        >
          &ldquo;{quote}&rdquo;
        </Text>
      </Flex>

      <Box>
        <Text
          fontFamily="cossetteTexte"
          fontSize="18px"
          fontWeight="bold"
          lineHeight="23.4px"
          color={placeholder ? "#737373" : "fgDim"}
          css={testimonialFontFeatures}
        >
          {attribution}
        </Text>
        {role ? (
          <Text
            fontFamily="cossetteTexte"
            mt="1"
            fontSize="13px"
            fontWeight="medium"
            lineHeight="15.6px"
            letterSpacing="-0.26px"
            color={placeholder ? "#737373" : "#404040"}
            opacity={placeholder ? 1 : 0.85}
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
      "linear-gradient(177deg, rgba(0, 0, 0, 0.12) 10%, transparent 50%), linear-gradient(-177deg, rgba(0, 0, 0, 0.12) 10%, transparent 50%)",
    backgroundSize: "49% 100%",
    backgroundPosition: "2% 0, 98% 0",
  },
  "&::after": {
    height: "100%",
    top: 0,
    zIndex: 2,
    backgroundRepeat: "no-repeat",
    backgroundImage: [
      "linear-gradient(to right, rgba(255, 255, 255, 0.1) 0.5%, rgba(0, 0, 0, 0.08) 1.2%, transparent 1.2%)",
      "linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0.5%, rgba(0, 0, 0, 0.08) 1.2%, transparent 1.2%)",
      "linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 0.5%, rgba(0, 0, 0, 0.08) 1.2%, transparent 1.2%)",
      "linear-gradient(265deg, rgba(0, 0, 0, 0.1), transparent 10%)",
      "linear-gradient(5deg, rgba(0, 0, 0, 0.1), transparent 15%)",
      "linear-gradient(-5deg, rgba(0, 0, 0, 0.05), transparent 10%)",
      "linear-gradient(5deg, rgba(0, 0, 0, 0.05), transparent 10%)",
      "linear-gradient(-265deg, rgba(0, 0, 0, 0.1), transparent 10%)",
      "linear-gradient(-5deg, rgba(0, 0, 0, 0.1), transparent 15%)",
      "linear-gradient(266deg, rgba(0, 0, 0, 0.1), transparent 10%)",
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
