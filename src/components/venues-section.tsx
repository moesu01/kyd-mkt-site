import { Box, Flex, Grid, Text, chakra } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import { SlotText } from "slot-text/react"
import "slot-text/style.css"
import { links, stats } from "../content/site-content"
import {
  BookCallCtaContent,
  bookCallButtonCss,
  Button,
} from "./ui/button"
import { Container } from "./ui/container"
import { Reveal, RevealGroup } from "./ui/reveal"
import { SectionHeading } from "./ui/section-heading"

function StatRow({
  value,
  label,
  isFirst,
  hasBottomBorder = true,
}: {
  value: string
  label: string
  isFirst: boolean
  hasBottomBorder?: boolean
}) {
  return (
    <Flex
      align="center"
      gap={{ base: "4", lg901: "6" }}
      minH={{ base: "102px", lg901: "122px" }}
      px="25px"
      pt={{ base: "5", lg901: "8" }}
      pb={hasBottomBorder ? { base: "5", lg901: "8" } : "0"}
      borderTop={isFirst ? "3px solid" : undefined}
      borderBottom={hasBottomBorder ? "3px solid" : undefined}
      borderColor="rgba(255, 255, 255, 0.1)"
      w="full"
    >
      <Text
        flexShrink={0}
        fontFamily="cossetteTitre"
        fontSize={{ base: "3rem", lg901: "72px" }}
        fontWeight="100"
        lineHeight="1"
        letterSpacing="0"
        color="warmSoft"
        css={{ fontFeatureSettings: '"cv01" 1' }}
      >
        {value}
      </Text>
      <Text
        flex="1"
        minW="0"
        textStyle="touringCategory"
        textAlign="right"
        color="warmSoft"
      >
        {label}
      </Text>
    </Flex>
  )
}

function TicketRevenueCalculator() {
  const [monthlyTicketRevenue, setMonthlyTicketRevenue] = useState(50000)
  const projectedRevenue = monthlyTicketRevenue * REVENUE_GROWTH_MULTIPLIER
  const additionalRevenue = projectedRevenue - monthlyTicketRevenue
  const sliderProgress =
    ((monthlyTicketRevenue - MINIMUM_MONTHLY_REVENUE) /
      (MAXIMUM_MONTHLY_REVENUE - MINIMUM_MONTHLY_REVENUE)) *
    100
  const previousProjectedRevenueRef = useRef(projectedRevenue)
  const revenueDirection =
    projectedRevenue >= previousProjectedRevenueRef.current ? "up" : "down"
  const projectedRevenueDisplay = formatAnimatedCurrency(projectedRevenue)
  const additionalRevenueDisplay = formatAnimatedCurrency(additionalRevenue)

  useEffect(() => {
    previousProjectedRevenueRef.current = projectedRevenue
  }, [projectedRevenue])

  return (
    <Flex
      direction="column"
      gap="0"
      px="25px"
      pt="25px"
      pb="25px"
      borderRadius="16px"
      bg="frameBg"
      boxShadow="frame"
      position="relative"
      overflow="hidden"
    >
      <Box position="relative" zIndex="1">
        <Flex align="center" justify="space-between" mb="2">
          <Text
            fontFamily="sans"
            fontSize="12px"
            fontWeight="600"
            lineHeight="1"
            letterSpacing="0.1em"
            textTransform="uppercase"
            color="warmSoft"
          >
            Current monthly ticket revenue
          </Text>
          <Text
            fontFamily="mono"
            fontSize={{ base: "16px", lg901: "18px" }}
            fontWeight="600"
            lineHeight="1.2"
            color="warmSoft"
            css={{ fontVariantNumeric: "tabular-nums" }}
          >
            {formatCurrency(monthlyTicketRevenue)}
          </Text>
        </Flex>
        <chakra.input
          type="range"
          min={MINIMUM_MONTHLY_REVENUE}
          max={MAXIMUM_MONTHLY_REVENUE}
          step={1000}
          value={monthlyTicketRevenue}
          onChange={(event) =>
            setMonthlyTicketRevenue(Number(event.currentTarget.value))
          }
          aria-label="Current monthly ticket revenue"
          w="full"
          h="40px"
          cursor="pointer"
          css={{
            appearance: "none",
            background: "transparent",
            "&::-webkit-slider-runnable-track": {
              height: "6px",
              borderRadius: "999px",
              background: `linear-gradient(to right, var(--chakra-colors-warm-soft) 0%, var(--chakra-colors-warm-soft) ${sliderProgress}%, color-mix(in oklab, var(--chakra-colors-warm-soft) 15%, transparent) ${sliderProgress}%, color-mix(in oklab, var(--chakra-colors-warm-soft) 15%, transparent) 100%)`,
              boxShadow: "var(--chakra-shadows-frame)",
            },
            "&::-webkit-slider-thumb": {
              appearance: "none",
              width: "20px",
              height: "20px",
              marginTop: "-8px",
              border: "none",
              borderRadius: "999px",
              background: "var(--chakra-colors-accent)",
              boxShadow: "0 0 2px 1px rgba(0, 0, 0, 0.25)",
            },
            "&:focus-visible::-webkit-slider-thumb": {
              boxShadow:
                "0 0 2px 1px rgba(0, 0, 0, 0.25), 0 0 0 3px color-mix(in oklab, var(--chakra-colors-warm-soft) 35%, transparent)",
            },
            "&::-moz-range-track": {
              height: "6px",
              border: "none",
              borderRadius: "999px",
              background:
                "color-mix(in oklab, var(--chakra-colors-warm-soft) 15%, transparent)",
              boxShadow: "var(--chakra-shadows-frame)",
            },
            "&::-moz-range-progress": {
              height: "6px",
              borderRadius: "999px 0 0 999px",
              background: "var(--chakra-colors-warm-soft)",
            },
            "&::-moz-range-thumb": {
              width: "20px",
              height: "20px",
              border: "none",
              borderRadius: "999px",
              background: "var(--chakra-colors-accent)",
              boxShadow: "0 0 2px 1px rgba(0, 0, 0, 0.25)",
            },
            "&:focus-visible::-moz-range-thumb": {
              boxShadow:
                "0 0 2px 1px rgba(0, 0, 0, 0.25), 0 0 0 3px color-mix(in oklab, var(--chakra-colors-warm-soft) 35%, transparent)",
            },
          }}
        />
      </Box>

      <Flex
        position="relative"
        zIndex="1"
        align="stretch"
        justify="space-between"
        gap="4"
        borderTop="1px solid"
        borderColor="border"
        pt="5"
      >
        <Box>
          <Text
            fontFamily="sans"
            fontSize="12px"
            fontWeight="600"
            lineHeight="1"
            letterSpacing="0.1em"
            textTransform="uppercase"
            color="warmMuted"
          >
            Ticket revenue simulator
          </Text>
          <Flex align="flex-end" gap="6px" mt="4">
            <Text
              fontFamily="cossetteTitre"
              fontSize={{ base: "34px", lg901: "42px" }}
              fontWeight="100"
              lineHeight="1"
              w="3.25em"
              flexShrink={0}
              color="warmSoft"
              css={{ fontVariantNumeric: "tabular-nums lining-nums" }}
            >
              <SlotText
                text={projectedRevenueDisplay.amount}
                aria-label={formatCurrency(projectedRevenue)}
                options={{
                  direction: revenueDirection,
                  duration: 140,
                  stagger: 10,
                  exitOffset: 10,
                  bounce: 0,
                  skipUnchanged: true,
                  interrupt: false,
                }}
              />
              <SlotText
                text={projectedRevenueDisplay.suffix}
                aria-hidden="true"
                options={{
                  direction: revenueDirection,
                  duration: 140,
                  stagger: 10,
                  exitOffset: 10,
                  bounce: 0,
                  skipUnchanged: true,
                  interrupt: false,
                }}
              />
            </Text>
            <Text
              alignSelf="flex-end"
              transform="translateY(-7px)"
              fontSize="12px"
              lineHeight="1.25"
              color="warmMuted"
              whiteSpace="nowrap"
            >
              Projected
              <br />
              monthly rev
            </Text>
          </Flex>
        </Box>

        <Flex direction="column" textAlign="right" flexShrink={0}>
          <Flex align="center" justify="flex-end" gap="2">
            <Text
              fontFamily="sans"
              fontSize="12px"
              fontWeight="600"
              lineHeight="1"
              letterSpacing="0.1em"
              textTransform="uppercase"
              color="warmMuted"
            >
              30% Uplift
            </Text>
            <Box
              w="10px"
              h="10px"
              flexShrink={0}
              borderRadius="full"
              bg="success"
              boxShadow="0 0 8px color-mix(in oklab, var(--chakra-colors-success) 45%, transparent)"
              aria-hidden
            />
          </Flex>
          <Text
            flex="1"
            display="flex"
            alignItems="flex-end"
            justifyContent="flex-end"
            fontFamily="cossetteTitre"
            fontSize={{ base: "28px", lg901: "32px" }}
            lineHeight="1"
            minW="3.8em"
            color="success"
            css={{ fontVariantNumeric: "tabular-nums lining-nums" }}
          >
            <SlotText
              text={`+${additionalRevenueDisplay.amount}`}
              aria-label={`+${formatCurrency(additionalRevenue)}`}
              options={{
                direction: revenueDirection,
                duration: 140,
                stagger: 10,
                exitOffset: 10,
                bounce: 0,
                skipUnchanged: true,
                interrupt: false,
              }}
            />
            <SlotText
              text={additionalRevenueDisplay.suffix}
              aria-hidden="true"
              options={{
                direction: revenueDirection,
                duration: 140,
                stagger: 10,
                exitOffset: 10,
                bounce: 0,
                skipUnchanged: true,
                interrupt: false,
              }}
            />
          </Text>
        </Flex>
      </Flex>
    </Flex>
  )
}

export function VenuesSection() {
  return (
    <Box
      as="section"
      id="venues"
      bg="pageBg"
      px={{ base: "6", lg901: "12" }}
      pt={{ base: "20", lg901: "28" }}
      pb={{ base: "20", lg901: "28" }}
    >
      <RevealGroup>
        <Container>
          <Grid
            templateColumns={{ base: "1fr", lg901: "1fr 1fr" }}
            alignItems={{ base: "start", lg901: "stretch" }}
            gap={{ base: "14", lg901: "24" }}
          >
            <Flex
              direction="column"
              justify={{ base: "flex-start", lg901: "space-between" }}
              h={{ base: "auto", lg901: "full" }}
              gap={{ base: "10", lg901: 0 }}
            >
              <Reveal order={0}>
                <SectionHeading
                  eyebrowVariant="prominent"
                  headingTextStyle="cossetteDisplayHeading"
                  headingTextTransform="none"
                  headingFontWeight="bold"
                  label="For Venues & Artists"
                  headline={"Stop renting your audience.\nIt's already yours."}
                />
              </Reveal>
              <Reveal order={1}>
                <Text
                  maxW="bodyCopy"
                  fontFamily="sans"
                  fontWeight="normal"
                  fontSize="18px"
                  lineHeight="27px"
                  letterSpacing="-0.36px"
                  color="warmMuted"
                >
                  A next-gen, whitelabel ticketing and marketing platform for
                  independent artists, touring acts, and venues. Own your
                  ticketing. Keep your fan data. Automate your marketing.
                  Drive 30% more ticket sales &mdash; and never rent your
                  audience again.
                </Text>
              </Reveal>
              <Reveal order={2} alignSelf="flex-start">
                <Button
                  href={links.getInTouch}
                  size="hero"
                  css={bookCallButtonCss}
                >
                  <BookCallCtaContent />
                </Button>
              </Reveal>
            </Flex>

            <Box w="full">
              <Reveal order={1}>
                <TicketRevenueCalculator />
              </Reveal>
              <Reveal order={2}>
                <StatRow
                  value={stats[0].value}
                  label={stats[0].label}
                  isFirst={false}
                />
              </Reveal>
              {stats.slice(1).map((stat, index) => (
                <Reveal key={stat.label} order={index + 3}>
                  <StatRow value={stat.value} label={stat.label} isFirst={false} />
                </Reveal>
              ))}
            </Box>
          </Grid>
        </Container>
      </RevealGroup>
    </Box>
  )
}

function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

function formatAnimatedCurrency(value: number): AnimatedCurrency {
  const parts = animatedCurrencyFormatter.formatToParts(value)
  const suffix = parts.find((part) => part.type === "compact")?.value ?? ""
  const amount = parts
    .filter((part) => part.type !== "compact")
    .map((part) => part.value)
    .join("")

  return { amount, suffix }
}

const REVENUE_GROWTH_MULTIPLIER = 1.3
const MINIMUM_MONTHLY_REVENUE = 30000
const MAXIMUM_MONTHLY_REVENUE = 999000
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
})
const animatedCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})

interface AnimatedCurrency {
  amount: string
  suffix: string
}
