import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useState } from "react"

interface TestimonialBlockProps {
  quote: string
  attribution: string
  role?: string
  logoSrc?: string
  placeholder?: boolean
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
        borderColor="borderStrong"
        bg="color-mix(in oklch, fgGhost 20%, transparent)"
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

export function TestimonialBlock({
  quote,
  attribution,
  role = "",
  logoSrc,
  placeholder = false,
}: TestimonialBlockProps) {
  return (
    <Flex
      as="article"
      direction="column"
      flex="0 0 auto"
      flexShrink={0}
      w="full"
      maxW="testimonialCard"
      h={{ base: "480px", lg901: "550px" }}
      borderRadius="8px"
      border={placeholder ? "1px dashed" : "1px solid"}
      borderColor={placeholder ? "borderStrong" : "border"}
      bg={placeholder ? "surface" : "surfaceRaised"}
      p="8"
      overflow="hidden"
    >
      <TestimonialLogo logoSrc={logoSrc} attribution={attribution} />

      <Flex flex="1" direction="column" justify="center" py={{ base: "8", lg901: "12" }}>
        <Text
          as="p"
          fontFamily="sans"
          fontSize="24px"
          fontWeight="200"
          lineHeight="1.3"
          letterSpacing="-0.24px"
          color={placeholder ? "fgFaint" : "#fafafa"}
          fontStyle={placeholder ? "italic" : undefined}
          wordBreak="break-word"
          textWrap="pretty"
          css={testimonialQuoteStyles}
        >
          &ldquo;{quote}&rdquo;
        </Text>
      </Flex>

      <Box>
        <Text
          fontFamily="sans"
          fontSize="18px"
          lineHeight="23.4px"
          color={placeholder ? "fgFaint" : "fg"}
          css={testimonialFontFeatures}
        >
          {attribution}
        </Text>
        {role ? (
          <Text
            fontFamily="sans"
            mt="1"
            fontSize="13px"
            lineHeight="15.6px"
            letterSpacing="-0.26px"
            color={placeholder ? "fgFaint" : "fg"}
            opacity={placeholder ? 1 : 0.6}
            css={testimonialFontFeatures}
          >
            {role}
          </Text>
        ) : null}
      </Box>
    </Flex>
  )
}
