import { Box, Flex, Image, Text } from "@chakra-ui/react"
import type { ReactNode } from "react"
import platformVisualBg from "../assets/images/platform-visual-temp.jpg"

export function EmailCampaignVisual({
  shouldAnimate,
}: EmailCampaignVisualProps) {
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
      <CampaignPreview shouldAnimate={shouldAnimate} />
      <Flex
        position="absolute"
        inset="0 50% 0 0"
        direction="column"
        justify="space-between"
        p="3.25cqw"
        fontFamily="sans"
        containerType="inline-size"
      >
        <Text
          className={getEnterClassName({ shouldAnimate })}
          style={getEnterStyle({ delay: 0 })}
          flexShrink={0}
          color="white"
          fontSize={campaignFontSizes.title}
          fontWeight="500"
          lineHeight="1.2"
          letterSpacing="-0.03em"
          whiteSpace="nowrap"
        >
          Campaign Review
        </Text>

        <MetricSection
          title="Email Ticket Sales"
          delay={60}
          shouldAnimate={shouldAnimate}
        >
          <Box display="grid" gridTemplateColumns="repeat(2, minmax(0, 1fr))" gap="3.4cqw" p="1px">
            {ticketSalesMetrics.map((metric, index) => (
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
          title="Email Metrics"
          delay={350}
          shouldAnimate={shouldAnimate}
        >
          <Flex direction="column" gap="3.4cqw" p="1px">
            {emailMetricRows.map((row, rowIndex) => (
              <Box
                key={row.map((metric) => metric.label).join("-")}
                display="grid"
                gridTemplateColumns={`repeat(${row.length}, minmax(0, 1fr))`}
                gap="3.4cqw"
              >
                {row.map((metric, metricIndex) => (
                  <MetricCard
                    key={metric.label}
                    metric={metric}
                    delay={410 + (rowIndex * 3 + metricIndex) * 45}
                    shouldAnimate={shouldAnimate}
                    isCompact
                  />
                ))}
              </Box>
            ))}
          </Flex>
        </MetricSection>
      </Flex>
    </Box>
  )
}

function CampaignPreview({ shouldAnimate }: CampaignPreviewProps) {
  return (
    <Box
      position="absolute"
      top="12px"
      right="12px"
      bottom="12px"
      left="calc(50% + 12px)"
      overflow="hidden"
      border="1px solid rgba(255, 255, 255, 0.28)"
      borderRadius="44px"
      bg="rgba(8, 8, 8, 0.58)"
      boxShadow="inset 0 0 0 5px rgba(5, 5, 5, 0.72), inset 0 0 0 6px rgba(255, 255, 255, 0.08), 0 18px 42px rgba(0, 0, 0, 0.22)"
      className={shouldAnimate ? "campaign-preview-enter" : undefined}
    >
      <Box
        position="absolute"
        inset="0"
        overflow="hidden"
        borderRadius="inherit"
        bg="rgba(0, 0, 0, 0.48)"
      >
        <Image
          position="absolute"
          inset="6px"
          w="calc(100% - 12px)"
          h="calc(100% - 12px)"
          borderRadius="38px"
          src="/images/feat/email_cmpgn2.png"
          alt=""
          objectFit="cover"
          objectPosition="top"
          draggable={false}
          css={{
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 78%, rgba(0, 0, 0, 0.72) 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 78%, rgba(0, 0, 0, 0.72) 88%, transparent 100%)",
          }}
        />
        <Box
          position="absolute"
          inset="auto 0 0"
          h="22%"
          bg="linear-gradient(to bottom, transparent, rgba(8, 8, 8, 0.5))"
          pointerEvents="none"
        />
      </Box>
      <Box
        position="absolute"
        bottom="7px"
        left="50%"
        w="30px"
        h="3px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.3)"
        transform="translateX(-50%)"
      />
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
        color="white"
        fontSize={campaignFontSizes.sectionHeading}
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
            src="/images/feat/metric-dot.svg"
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
          fontSize={campaignFontSizes.metricLabel}
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
            ? campaignFontSizes.compactMetricValue
            : campaignFontSizes.metricValue
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
          src="/images/feat/attributed-sales.svg"
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

export const emailCampaignVisualTitle = "Email Campaigns"

const campaignFontSizes = {
  title: "10cqw",
  sectionHeading: "7.5cqw",
  metricLabel: "4.75cqw",
  metricValue: "8cqw",
  compactMetricValue: "7cqw",
} as const

const ticketSalesMetrics: Metric[] = [
  { label: "Tickets Sold", value: "72" },
  { label: "Avg. Order Size", value: "$24.31" },
  { label: "ROAS", value: "2.7X", isAttributed: true },
  { label: "Revenue", value: "$1750.32", isAttributed: true },
]

const emailMetricRows: Metric[][] = [
  [
    { label: "Delivered", value: "113.4K" },
    { label: "Opened", value: "10.6K" },
    { label: "Open Rate", value: "14.92%" },
  ],
  [
    { label: "Clicked", value: "292" },
    { label: "CTR", value: "0.21%" },
  ],
  [
    { label: "Unsubscribed", value: "209" },
    { label: "Unsubscribe Rate", value: "0.18%" },
  ],
]

interface EmailCampaignVisualProps {
  shouldAnimate: boolean
}

interface CampaignPreviewProps {
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
