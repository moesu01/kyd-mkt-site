import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { useEffect, useRef } from "react"
import { assetUrl } from "../lib/asset-url"

const marqueeSpeedPxPerSec = 36
const groupGapPx = 48
const metricGapPx = 12

export interface FeatureStatMetric {
  label: string
  value: string
  isAttributed?: boolean
}

export interface FeatureStatGroup {
  title: string
  metrics: FeatureStatMetric[]
}

interface FeatureStatsMarqueeProps {
  groups: FeatureStatGroup[]
  shouldAnimate: boolean
}

export function FeatureStatsMarquee({
  groups,
  shouldAnimate,
}: FeatureStatsMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const primaryRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!shouldAnimate) return

    const viewport = viewportRef.current
    const primary = primaryRef.current
    if (!viewport || !primary) return

    const viewportEl = viewport
    const primaryEl = primary
    let frameId = 0
    let lastTime = performance.now()

    function tick(now: number) {
      const elapsed = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const loopWidth = primaryEl.offsetWidth + groupGapPx
      if (loopWidth <= 0) {
        frameId = window.requestAnimationFrame(tick)
        return
      }

      viewportEl.scrollLeft += marqueeSpeedPxPerSec * elapsed
      if (viewportEl.scrollLeft >= loopWidth) viewportEl.scrollLeft -= loopWidth

      frameId = window.requestAnimationFrame(tick)
    }

    frameId = window.requestAnimationFrame(tick)
    return () => window.cancelAnimationFrame(frameId)
  }, [shouldAnimate, groups])

  return (
    <Box
      ref={viewportRef}
      position="relative"
      w="full"
      minW="0"
      maxW="100%"
      overflowX="hidden"
      overflowY="hidden"
      css={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        "&::-webkit-scrollbar": { display: "none" },
      }}
      aria-label="Feature metrics"
    >
      <Flex
        align="flex-start"
        gap={`${groupGapPx}px`}
        w="max-content"
        px="25px"
        py="16px"
      >
        <Flex
          ref={primaryRef}
          align="flex-start"
          gap={`${groupGapPx}px`}
          flexShrink={0}
        >
          {groups.map((group) => (
            <StatGroup
              key={group.title}
              title={group.title}
              metrics={group.metrics}
            />
          ))}
        </Flex>
        {shouldAnimate ? (
          <Flex align="flex-start" gap={`${groupGapPx}px`} flexShrink={0} aria-hidden>
            {groups.map((group) => (
              <StatGroup
                key={`dup-${group.title}`}
                title={group.title}
                metrics={group.metrics}
              />
            ))}
          </Flex>
        ) : null}
      </Flex>
    </Box>
  )
}

function StatGroup({ title, metrics }: StatGroupProps) {
  return (
    <Flex direction="column" gap="3" flexShrink={0}>
      <Text
        position="sticky"
        left="25px"
        zIndex="1"
        alignSelf="flex-start"
        w="max-content"
        maxW="100%"
        pr="6"
        color="warmMuted"
        fontFamily="sans"
        fontSize="11px"
        fontWeight="700"
        lineHeight="1.2"
        letterSpacing="0.12em"
        textTransform="uppercase"
        whiteSpace="nowrap"
      >
        {title}
      </Text>
      <Flex align="stretch" gap={`${metricGapPx}px`}>
        {metrics.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </Flex>
    </Flex>
  )
}

function MetricCard({ metric }: MetricCardProps) {
  return (
    <Flex
      position="relative"
      direction="column"
      gap="2"
      minW="132px"
      flexShrink={0}
      p="3"
      borderRadius="10px"
      bg="oklch(0.178 0.01 63.9 / 0.30)"
      boxShadow="0 0 0 1px oklch(0.90 0.01 63.9 / 0.125), 0 1px 2px -1px rgba(0, 0, 0, 0.28), 0 4px 10px -2px rgba(0, 0, 0, 0.32)"
      backdropFilter="blur(4px)"
      css={{ WebkitBackdropFilter: "blur(4px)" }}
    >
      <Flex align="center" gap="1.5" minW="0" h="1em">
        {metric.isAttributed ? (
          <Image
            src={assetUrl("/images/feat/metric-dot.svg")}
            alt=""
            display="block"
            w="10px"
            h="10px"
            flexShrink={0}
          />
        ) : null}
        <Text
          minW="0"
          color="rgba(255, 255, 255, 0.64)"
          fontSize="12px"
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
        fontSize="20px"
        fontWeight="400"
        lineHeight="1.2"
        whiteSpace="nowrap"
        pr={metric.isAttributed ? "7" : undefined}
      >
        {metric.value}
      </Text>
      {metric.isAttributed ? (
        <Image
          position="absolute"
          top="2.5"
          right="2.5"
          src={assetUrl("/images/feat/attributed-sales.svg")}
          alt=""
          w="22px"
          h="22px"
        />
      ) : null}
    </Flex>
  )
}

interface StatGroupProps {
  title: string
  metrics: FeatureStatMetric[]
}

interface MetricCardProps {
  metric: FeatureStatMetric
}
