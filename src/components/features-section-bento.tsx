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
  const shouldAnimate = !prefersReducedMotion

  return (
    <RevealGroup w="full" minW="0" maxW="100%">
      <Flex direction="column" gap="25px" w="full" minW="0" maxW="100%">
        <Grid
          w="full"
          minW="0"
          maxW="100%"
          templateColumns={{ base: "minmax(0, 1fr)", lg901: "minmax(0, 7fr) minmax(0, 3fr)" }}
          gap="25px"
          alignItems="stretch"
        >
          <Reveal order={0} h="full" minH="0" minW="0" w="full">
            <LargeFeatureTile
              title={emailFeature.title}
              body={emailFeature.body}
              backgroundSrc={assetUrl("/images/feat/feat_w_04.png")}
              backgroundPosition="bottom"
              radii={bentoRadii.topLeft}
            >
              <EmailCampaignVisual shouldAnimate={shouldAnimate} />
            </LargeFeatureTile>
          </Reveal>

          <Reveal order={1} h="full" minH="0" minW="0" w="full">
            <SmallFeatureTile
              icon={dataFeature.icon}
              title={dataFeature.title}
              body={dataFeature.body}
              backgroundSrc={assetUrl("/images/feat/feat_w_03.png")}
              radii={bentoRadii.topRight}
            />
          </Reveal>
        </Grid>

        <Grid
          w="full"
          minW="0"
          maxW="100%"
          templateColumns={{
            base: "minmax(0, 1fr)",
            lg901: "minmax(0, 3fr) minmax(0, 7fr)",
          }}
          gap="25px"
          alignItems="stretch"
        >
          <Reveal order={2} h="full" minH="0" minW="0" w="full">
            <SmallFeatureTile
              iconSrc={assetUrl("/icons/kyd-mark-sm.svg")}
              invertIcon
              title={ticketsFeature.title}
              body={ticketsFeature.body}
              backgroundSrc={assetUrl("/images/feat/feat_w_05.png")}
              radii={bentoRadii.bottomLeft}
            />
          </Reveal>

          <Reveal order={3} h="full" minH="0" minW="0" w="full">
            <LargeFeatureTile
              title={metaFeature.title}
              body={metaFeature.body}
              backgroundSrc={assetUrl("/images/feat/feat_w_01.png")}
              backgroundPosition="top"
              radii={bentoRadii.bottomRight}
            >
              <MetaAdsVisual shouldAnimate={shouldAnimate} />
            </LargeFeatureTile>
          </Reveal>
        </Grid>
      </Flex>
    </RevealGroup>
  )
}

function BentoTile({ children, p = "25px", overflow, radii }: BentoTileProps) {
  return (
    <Box
      as="article"
      h="full"
      minH="0"
      minW="0"
      w="full"
      borderTopLeftRadius={radii.topLeft}
      borderTopRightRadius={radii.topRight}
      borderBottomRightRadius={radii.bottomRight}
      borderBottomLeftRadius={radii.bottomLeft}
      bg="frameBg"
      p={p}
      overflow={overflow}
      boxShadow="frame"
    >
      {children}
    </Box>
  )
}

function SmallFeatureTile({
  icon,
  iconSrc,
  invertIcon,
  title,
  body,
  backgroundSrc,
  radii,
}: SmallFeatureTileProps) {
  return (
    <BentoTile p="0" overflow="hidden" radii={radii}>
      <Box position="relative" h="full" minH="0" minW="0" w="full">
        <Image
          position="absolute"
          inset="0"
          w="full"
          h="full"
          src={backgroundSrc}
          alt=""
          objectFit="cover"
          objectPosition="top"
          opacity="0.05"
          draggable={false}
          pointerEvents="none"
        />
        <Box
          position="absolute"
          inset="0"
          pointerEvents="none"
          bg="linear-gradient(to bottom, oklch(0.15 0.01 63.9) 0%, transparent 55%)"
        />
        <Flex
          position="relative"
          direction="column"
          justify="space-between"
          gap="5"
          h="full"
          minH="0"
          p="25px"
        >
          <Flex
            align="center"
            justify="center"
            alignSelf="flex-start"
            fontSize="2xl"
            color="accent"
            lineHeight="1"
            aria-hidden
          >
            {iconSrc ? (
              <Image
                src={iconSrc}
                alt=""
                w="7"
                h="7"
                objectFit="contain"
                filter={invertIcon ? "invert(1)" : undefined}
                draggable={false}
              />
            ) : (
              icon
            )}
          </Flex>
          <Flex direction="column" gap="2">
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
        </Flex>
      </Box>
    </BentoTile>
  )
}

function LargeFeatureTile({
  title,
  body,
  backgroundSrc,
  backgroundPosition = "top",
  radii,
  children,
}: LargeFeatureTileProps) {
  return (
    <BentoTile p="0" overflow="hidden" radii={radii}>
      <Box position="relative" h="full" minH="0" minW="0" w="full">
        <Image
          position="absolute"
          inset="0"
          w="full"
          h="full"
          src={backgroundSrc}
          alt=""
          objectFit="cover"
          objectPosition={backgroundPosition}
          opacity="0.18"
          draggable={false}
          pointerEvents="none"
        />
        <Box
          position="absolute"
          inset="0"
          pointerEvents="none"
          bg="linear-gradient(to top, oklch(0.15 0.01 63.9) 0%, transparent 55%)"
        />
        <Flex position="relative" direction="column" h="full" minH="0" minW="0" w="full">
          <Box position="relative" w="full" minW="0" overflow="hidden" flex="1">
            {children}
          </Box>
          <Box px="25px" pt="5" pb="25px">
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
              color="warmMuted"
              textWrap="pretty"
            >
              {body}
            </Text>
          </Box>
        </Flex>
      </Box>
    </BentoTile>
  )
}

interface BentoCornerRadii {
  topLeft: string
  topRight: string
  bottomRight: string
  bottomLeft: string
}

interface BentoTileProps {
  children: ReactNode
  p?: string
  overflow?: "hidden" | "visible"
  radii: BentoCornerRadii
}

interface SmallFeatureTileProps {
  icon?: string
  iconSrc?: string
  invertIcon?: boolean
  title: string
  body: string
  backgroundSrc: string
  radii: BentoCornerRadii
}

interface LargeFeatureTileProps {
  title: string
  body: string
  backgroundSrc: string
  backgroundPosition?: "top" | "bottom" | "center"
  radii: BentoCornerRadii
  children: ReactNode
}

const outerRadius = "32px"
const innerRadius = "16px"

const bentoRadii = {
  topLeft: {
    topLeft: outerRadius,
    topRight: innerRadius,
    bottomRight: innerRadius,
    bottomLeft: innerRadius,
  },
  topRight: {
    topLeft: innerRadius,
    topRight: outerRadius,
    bottomRight: innerRadius,
    bottomLeft: innerRadius,
  },
  bottomLeft: {
    topLeft: innerRadius,
    topRight: innerRadius,
    bottomRight: innerRadius,
    bottomLeft: outerRadius,
  },
  bottomRight: {
    topLeft: innerRadius,
    topRight: innerRadius,
    bottomRight: outerRadius,
    bottomLeft: innerRadius,
  },
} as const satisfies Record<string, BentoCornerRadii>
