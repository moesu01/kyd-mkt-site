import { Box, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react"
import { useEffect, useState, type ReactNode } from "react"
import { features } from "../content/site-content"
import { assetUrl } from "../lib/asset-url"
import {
  EmailCampaignVisual,
  emailCampaignVisualTitle,
} from "./email-campaign-visual"
import {
  MetaAdsVisual,
  metaAdsVisualTitle,
} from "./meta-ads-visual"
import { Reveal, RevealGroup } from "./ui/reveal"

function getFeatureByTitle(title: string) {
  const feature = features.find((entry) => entry.title === title)
  if (!feature) throw new Error(`Missing feature: ${title}`)
  return feature
}

export function PlatformFeaturesBento() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    function handleChange() {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const emailFeature = getFeatureByTitle(emailCampaignVisualTitle)
  const metaFeature = getFeatureByTitle(metaAdsVisualTitle)
  const dataFeature = getFeatureByTitle("Data Ownership")
  const ticketsFeature = getFeatureByTitle("Comprehensive Ticketing")
  const resaleFeature = getFeatureByTitle("Unscalpable Resale Capture")
  const shouldAnimate = !prefersReducedMotion

  return (
    <RevealGroup w="full">
      <Flex direction="column" gap="25px" w="full">
        <Grid
          w="full"
          templateColumns={{ base: "1fr", lg901: "1fr 1fr" }}
          gap="25px"
          alignItems="stretch"
        >
          <Reveal order={0} h="full" minH="0">
            <LargeFeatureTile
              title={emailFeature.title}
              body={emailFeature.body}
            >
              <EmailCampaignVisual shouldAnimate={shouldAnimate} />
            </LargeFeatureTile>
          </Reveal>

          <Reveal order={1} h="full" minH="0">
            <LargeFeatureTile
              title={metaFeature.title}
              body={metaFeature.body}
            >
              <MetaAdsVisual shouldAnimate={shouldAnimate} />
            </LargeFeatureTile>
          </Reveal>
        </Grid>

        <Grid
          w="full"
          templateColumns={{ base: "1fr", lg901: "repeat(3, 1fr)" }}
          gap="25px"
          alignItems="stretch"
        >
          <Reveal order={2} h="full" minH="0">
            <SmallFeatureTile
              icon={dataFeature.icon}
              title={dataFeature.title}
              body={dataFeature.body}
            />
          </Reveal>

          <Reveal order={3} h="full" minH="0">
            <SmallFeatureTile
              icon={ticketsFeature.icon}
              title={ticketsFeature.title}
              body={ticketsFeature.body}
            />
          </Reveal>

          <Reveal order={4} h="full" minH="0">
            <SmallFeatureTile
              iconSrc={assetUrl("/icons/tix_logo.svg")}
              title={resaleFeature.title}
              body={resaleFeature.body}
            />
          </Reveal>
        </Grid>
      </Flex>
    </RevealGroup>
  )
}

function BentoTile({ children, p = "25px", overflow }: BentoTileProps) {
  return (
    <Box
      as="article"
      h="full"
      minH="0"
      borderRadius="32px"
      bg="frameBg"
      p={p}
      overflow={overflow}
      boxShadow="frame"
    >
      {children}
    </Box>
  )
}

function SmallFeatureTile({ icon, iconSrc, title, body }: SmallFeatureTileProps) {
  return (
    <BentoTile>
      <Flex direction="column" gap="5" h="full" minH="0">
        <Flex
          align="center"
          justify="center"
          h="10"
          w="10"
          flexShrink={0}
          fontSize="2xl"
          color="accent"
          aria-hidden
        >
          {iconSrc ? (
            <Image
              src={iconSrc}
              alt=""
              w="7"
              h="7"
              objectFit="contain"
              draggable={false}
            />
          ) : (
            icon
          )}
        </Flex>
        <Heading
          as="h4"
          fontFamily="cossetteTexte"
          fontSize="16px"
          fontWeight="700"
          lineHeight="22.4px"
          letterSpacing="0.16px"
          color="fg"
          textWrap="balance"
        >
          {title}
        </Heading>
        <Text
          as="p"
          fontFamily="sans"
          fontSize={{ base: "13px", lg: "14px" }}
          lineHeight="1.4"
          letterSpacing="0"
          color="warmMuted"
          textWrap="pretty"
        >
          {body}
        </Text>
      </Flex>
    </BentoTile>
  )
}

function LargeFeatureTile({
  title,
  body,
  children,
}: LargeFeatureTileProps) {
  return (
    <BentoTile p="0" overflow="hidden">
      <Flex direction="column" h="full" minH="0">
        <Box px="25px" pt="25px" pb="5">
          <Heading
            as="h4"
            fontFamily="cossetteTexte"
            fontSize="16px"
            fontWeight="700"
            lineHeight="22.4px"
            letterSpacing="0.16px"
            color="fg"
            textWrap="balance"
          >
            {title}
          </Heading>
          <Text
            as="p"
            pt="2"
            fontFamily="sans"
            fontSize={{ base: "13px", lg: "14px" }}
            lineHeight="1.4"
            letterSpacing="0"
            color="fg"
            textWrap="pretty"
          >
            {body}
          </Text>
        </Box>
        <Box
          position="relative"
          w="full"
          flex="1"
          minH="0"
          aspectRatio="4/3"
          bg="frameBg"
          overflow="hidden"
        >
          {children}
        </Box>
      </Flex>
    </BentoTile>
  )
}

interface BentoTileProps {
  children: ReactNode
  p?: string
  overflow?: "hidden" | "visible"
}

interface SmallFeatureTileProps {
  icon?: string
  iconSrc?: string
  title: string
  body: string
}

interface LargeFeatureTileProps {
  title: string
  body: string
  children: ReactNode
}
