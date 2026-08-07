import { Box, Flex, Image, Text } from "@chakra-ui/react"
import type { ReactNode } from "react"
import platformVisualBg from "../assets/images/platform-visual-temp.jpg"
import { assetUrl } from "../lib/asset-url"

export function MetaAdsVisual({ shouldAnimate }: MetaAdsVisualProps) {
  return (
    <Box position="absolute" inset="0" overflow="hidden">
      <Image
        position="absolute"
        inset="0"
        w="full"
        h="full"
        src={platformVisualBg}
        alt=""
        objectFit="cover"
        opacity="0.18"
        draggable={false}
      />
      <Box
        position="absolute"
        inset="0"
        pointerEvents="none"
        bg="linear-gradient(to bottom, oklch(0.15 0.01 63.9) 0%, transparent 14%)"
      />
      <AdCreativePreview shouldAnimate={shouldAnimate} />
      <Flex
        position="absolute"
        inset="0 50% 0 0"
        direction="column"
        justify="flex-start"
        gap="24px"
        px="25px"
        pt="16px"
        pb="16px"
        fontFamily="sans"
        containerType="inline-size"
      >
        {/* TEMP: title clashes with bento tile headline
        <Text
          className={getEnterClassName({ shouldAnimate })}
          style={getEnterStyle({ delay: 0 })}
          flexShrink={0}
          color="white"
          fontSize={metaFontSizes.title}
          fontWeight="500"
          lineHeight="1.2"
          letterSpacing="-0.03em"
          whiteSpace="nowrap"
        >
          Ad Manager
        </Text>
        */}

        <MetricSection
          title="Campaign Performance"
          delay={60}
          shouldAnimate={shouldAnimate}
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            gap="3.4cqw"
            p="1px"
          >
            {performanceMetrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                delay={120 + index * 55}
                shouldAnimate={shouldAnimate}
              />
            ))}
          </Box>
        </MetricSection>

        <MetricSection
          title="Delivery"
          delay={350}
          shouldAnimate={shouldAnimate}
        >
          <Box
            display="grid"
            gridTemplateColumns="repeat(2, minmax(0, 1fr))"
            gap="3.4cqw"
            p="1px"
          >
            {deliveryMetrics.map((metric, index) => (
              <MetricCard
                key={metric.label}
                metric={metric}
                delay={410 + index * 45}
                shouldAnimate={shouldAnimate}
                isCompact
              />
            ))}
          </Box>
        </MetricSection>
      </Flex>
    </Box>
  )
}

function AdCreativePreview({ shouldAnimate }: AdCreativePreviewProps) {
  const phoneRadius = { base: "16px", md700: "20px", lg901: "24px" }

  return (
    <Box
      position="absolute"
      top="12px"
      right="12px"
      bottom="-48px"
      left="calc(50% + 12px)"
      overflow="hidden"
      border="1px solid rgba(255, 255, 255, 0.28)"
      borderTopLeftRadius={phoneRadius}
      borderTopRightRadius={phoneRadius}
      borderBottomLeftRadius="0"
      borderBottomRightRadius="0"
      bg="rgba(8, 8, 8, 0.72)"
      boxShadow="0 18px 42px rgba(0, 0, 0, 0.22)"
      className={shouldAnimate ? "campaign-preview-enter" : undefined}
      containerType="inline-size"
    >
      <Flex direction="column" h="full" minH="0">
        <Flex align="center" gap="2.8cqw" px="4cqw" py="3.5cqw" flexShrink={0}>
          <Box
            w="8cqw"
            h="8cqw"
            borderRadius="full"
            bg="rgba(255, 255, 255, 0.18)"
            flexShrink={0}
          />
          <Flex direction="column" gap="1cqw" minW="0">
            <Text
              color="white"
              fontSize="4.5cqw"
              fontWeight="600"
              lineHeight="1.2"
              letterSpacing="-0.02em"
              whiteSpace="nowrap"
            >
              KYD Tickets
            </Text>
            <Text
              color="rgba(255, 255, 255, 0.5)"
              fontSize="3.5cqw"
              fontWeight="400"
              lineHeight="1"
              whiteSpace="nowrap"
            >
              Sponsored
            </Text>
          </Flex>
        </Flex>

        <Box position="relative" flex="1" minH="0" overflow="hidden">
          <Image
            position="absolute"
            inset="0"
            w="full"
            h="full"
            src={platformVisualBg}
            alt=""
            objectFit="cover"
            objectPosition="center"
            draggable={false}
          />
          <Box
            position="absolute"
            inset="auto 0 0"
            h="40%"
            bg="linear-gradient(to bottom, transparent, rgba(8, 8, 8, 0.85))"
            pointerEvents="none"
          />
          <Flex
            position="absolute"
            inset="auto 0 0"
            direction="column"
            gap="1.5cqw"
            p="4cqw"
          >
            <Text
              color="white"
              fontSize="5cqw"
              fontWeight="600"
              lineHeight="1.2"
              letterSpacing="-0.03em"
            >
              This weekend only
            </Text>
            <Text
              color="rgba(255, 255, 255, 0.7)"
              fontSize="3.8cqw"
              fontWeight="400"
              lineHeight="1.3"
            >
              Get tickets before they sell out
            </Text>
          </Flex>
        </Box>

        <Flex
          align="center"
          justify="space-between"
          gap="3cqw"
          px="4cqw"
          py="3.5cqw"
          flexShrink={0}
          borderTop="1px solid rgba(255, 255, 255, 0.1)"
        >
          <Text
            color="rgba(255, 255, 255, 0.64)"
            fontSize="3.8cqw"
            fontWeight="500"
            lineHeight="1"
            whiteSpace="nowrap"
          >
            kyd.com
          </Text>
          <Box
            px="3.5cqw"
            py="2cqw"
            borderRadius="1.5cqw"
            bg="rgba(255, 255, 255, 0.14)"
            color="white"
            fontSize="3.5cqw"
            fontWeight="600"
            lineHeight="1"
            whiteSpace="nowrap"
          >
            Get Tickets
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}

function MetricSection({
  title,
  delay,
  shouldAnimate,
  children,
}: MetricSectionProps) {
  return (
    <Flex direction="column" gap="4cqw">
      <Text
        className={getEnterClassName({ shouldAnimate })}
        style={getEnterStyle({ delay })}
        flexShrink={0}
        color="warmMuted"
        fontSize={metaFontSizes.sectionHeading}
        fontWeight="500"
        lineHeight="1.2"
        letterSpacing="-0.03em"
      >
        {title}
      </Text>
      {children}
    </Flex>
  )
}

function MetricCard({
  metric,
  delay,
  shouldAnimate,
  isCompact = false,
}: MetricCardProps) {
  return (
    <Flex
      position="relative"
      direction="column"
      gap="1.4cqw"
      minW="0"
      gridColumn={metric.isAttributed ? "1 / -1" : undefined}
      p="4.25cqw"
      borderRadius="3.55cqw"
      bg="oklch(0.178 0.01 63.9 / 0.30)"
      boxShadow="0 0 0 1px oklch(0.90 0.01 63.9 / 0.125), 0 1px 2px -1px rgba(0, 0, 0, 0.28), 0 4px 10px -2px rgba(0, 0, 0, 0.32)"
      backdropFilter="blur(4px)"
      css={{ WebkitBackdropFilter: "blur(4px)" }}
      className={getEnterClassName({ shouldAnimate })}
      style={getEnterStyle({ delay })}
    >
      <Flex align="center" gap="1.4cqw" minW="0" h="1em">
        {metric.isAttributed ? (
          <Image
            src={assetUrl("/images/feat/metric-dot.svg")}
            alt=""
            display="block"
            w="4cqw"
            h="4cqw"
            flexShrink={0}
          />
        ) : null}
        <Text
          minW="0"
          color="rgba(255, 255, 255, 0.64)"
          fontSize={metaFontSizes.metricLabel}
          fontWeight="500"
          lineHeight="1"
          letterSpacing="-0.03em"
          whiteSpace="nowrap"
        >
          {metric.label}
        </Text>
      </Flex>
      <Text
        color="warmDisplay"
        fontSize={
          isCompact
            ? metaFontSizes.compactMetricValue
            : metaFontSizes.metricValue
        }
        fontWeight="400"
        lineHeight="1.2"
        whiteSpace="nowrap"
      >
        {metric.value}
      </Text>
      {metric.isAttributed ? (
        <Image
          position="absolute"
          top="2.8cqw"
          right="3.2cqw"
          src={assetUrl("/images/feat/attributed-sales.svg")}
          alt=""
          w="9.93cqw"
          h="9.93cqw"
        />
      ) : null}
    </Flex>
  )
}

function getEnterClassName({ shouldAnimate }: GetEnterClassNameOptions) {
  if (!shouldAnimate) return undefined

  return "campaign-ui-enter"
}

function getEnterStyle({ delay }: GetEnterStyleOptions) {
  return { ["--campaign-enter-delay" as string]: `${delay}ms` }
}

export const metaAdsVisualTitle = "On-Platform Meta Ads"

const metaFontSizes = {
  title: "10cqw",
  sectionHeading: "7.5cqw",
  metricLabel: "4.75cqw",
  metricValue: "8cqw",
  compactMetricValue: "7cqw",
} as const

const performanceMetrics: Metric[] = [
  { label: "Reach", value: "84.2K" },
  { label: "Spend", value: "$1,240" },
  { label: "ROAS", value: "3.4X", isAttributed: true },
  { label: "Attributed Sales", value: "$4,216", isAttributed: true },
]

const deliveryMetrics: Metric[] = [
  { label: "Impressions", value: "312K" },
  { label: "CTR", value: "1.8%" },
  { label: "CPC", value: "$0.42" },
  { label: "Conv. Rate", value: "2.1%" },
]

interface MetaAdsVisualProps {
  shouldAnimate: boolean
}

interface AdCreativePreviewProps {
  shouldAnimate: boolean
}

interface MetricSectionProps {
  title: string
  delay: number
  shouldAnimate: boolean
  children: ReactNode
}

interface MetricCardProps {
  metric: Metric
  delay: number
  shouldAnimate: boolean
  isCompact?: boolean
}

interface Metric {
  label: string
  value: string
  isAttributed?: boolean
}

interface GetEnterClassNameOptions {
  shouldAnimate: boolean
}

interface GetEnterStyleOptions {
  delay: number
}
