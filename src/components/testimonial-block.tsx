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
      w={{ base: "min(63.75vw, 555px)", lg901: "555px" }}
      minW={{ base: "min(63.75vw, 555px)", lg901: "555px" }}
      maxW={{ base: "min(63.75vw, 555px)", lg901: "555px" }}
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
          fontSize={{ base: "clamp(1.375rem, 2.5vw, 2rem)", lg901: "32px" }}
          lineHeight={{ base: "1.35", lg901: "41.6px" }}
          letterSpacing="-0.32px"
          color={placeholder ? "fgFaint" : "fg"}
          fontStyle={placeholder ? "italic" : undefined}
          wordBreak="break-word"
        >
          &ldquo;{quote}&rdquo;
        </Text>
      </Flex>

      <Box>
        <Text
          fontSize="18px"
          lineHeight="23.4px"
          color={placeholder ? "fgFaint" : "fg"}
        >
          {attribution}
        </Text>
        {role ? (
          <Text
            mt="1"
            fontSize="13px"
            lineHeight="15.6px"
            letterSpacing="-0.26px"
            color={placeholder ? "fgFaint" : "fg"}
            opacity={placeholder ? 1 : 0.6}
          >
            {role}
          </Text>
        ) : null}
      </Box>
    </Flex>
  )
}
