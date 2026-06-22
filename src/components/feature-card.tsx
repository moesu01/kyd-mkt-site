import { Box, Flex, Heading, Text } from "@chakra-ui/react"

interface FeatureCardProps {
  icon: string
  title: string
  body: string
  layout?: "default" | "compact"
}

function FeatureCardIcon({ icon }: { icon: string }) {
  return (
    <Flex
      align="center"
      justify="center"
      h="11"
      w="11"
      borderRadius="12px"
      border="1px solid"
      borderColor="border"
      fontSize="lg"
      color="accent"
      opacity="0.5"
    >
      {icon}
    </Flex>
  )
}

export function FeatureCard({
  icon,
  title,
  body,
  layout = "default",
}: FeatureCardProps) {
  return (
    <Box as="article">
      {layout === "default" ? (
        <Flex
          align="center"
          justify="center"
          minH="320px"
          borderRadius="16px"
          bg="surfaceRaised"
          mb="6"
          aria-hidden
        >
          <FeatureCardIcon icon={icon} />
        </Flex>
      ) : (
        <>
          {/* TEMP: audience column icons hidden
          <Flex mb="4" aria-hidden>
            <FeatureCardIcon icon={icon} />
          </Flex>
          */}
        </>
      )}

      <Heading
        as="h3"
        fontFamily={layout === "compact" ? "cossetteTexte" : undefined}
        fontSize={layout === "compact" ? "22px" : "20px"}
        fontWeight={layout === "compact" ? "normal" : "500"}
        lineHeight="28px"
        letterSpacing="-0.5px"
        color={layout === "compact" ? "warmDisplay" : "fg"}
        textWrap="balance"
      >
        {title}
      </Heading>

      <Text
        as="p"
        pt="2"
        fontFamily={layout === "compact" ? "sans" : undefined}
        fontSize="14px"
        lineHeight={layout === "compact" ? "1.4" : "1.6"}
        letterSpacing="0"
        color={layout === "compact" ? "warmMuted" : "fgMuted"}
        textWrap="pretty"
      >
        {body}
      </Text>
    </Box>
  )
}
