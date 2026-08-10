import { Box, Flex, Grid, Text, chakra } from "@chakra-ui/react"
import { useState } from "react"
import { SlotText } from "slot-text/react"
import "slot-text/style.css"
import {
  links,
  stats,
  testimonials,
  venuesSection,
} from "../content/site-content"
import {
  BookCallCtaContent,
  bookCallButtonCss,
  Button,
} from "./ui/button"
import { Container } from "./ui/container"
import { Reveal, RevealGroup } from "./ui/reveal"
import { SectionHeading } from "./ui/section-heading"
import { TestimonialBlock } from "./testimonial-block"

function StatCard({
  value,
  label,
  iconSrc,
}: {
  value: string
  label: string
  iconSrc: string
}) {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap={{ base: "2", xl1600: "4" }}
      flex="1"
      minW="0"
      minH={{ base: "auto", xl1600: "290px" }}
      px={{ base: "3", sm: "4", xl1600: "6" }}
      py={{ base: "5", xl1600: "6" }}
      borderRadius="16px"
      bg="pageBg"
      boxShadow="0 0 1px 1px rgba(255, 255, 255, 0.1)"
      overflow="hidden"
    >
      <Box
        w={{ base: "28px", xl1600: "36px" }}
        h={{ base: "28px", xl1600: "36px" }}
        flexShrink={0}
        overflow="clip"
        aria-hidden
      >
        <chakra.img
          src={iconSrc}
          alt=""
          w="100%"
          h="100%"
          display="block"
        />
      </Box>
      <Text
        pt={{ base: "0", xl1600: "6" }}
        fontFamily="cossetteTitre"
        fontSize={{ base: "2.5rem", sm: "3rem", xl1600: "91px" }}
        fontWeight="100"
        lineHeight={{ base: "1", xl1600: "72px" }}
        letterSpacing="0"
        color="warmSoft"
        whiteSpace="nowrap"
        css={{ fontFeatureSettings: '"cv01" 1' }}
      >
        {value}
      </Text>
      <Text
        fontFamily="cossetteTexte"
        fontSize={{ base: "15px", xl1600: "20px" }}
        fontWeight="normal"
        lineHeight="1.35"
        color="warmMuted"
        whiteSpace="nowrap"
      >
        {label}
      </Text>
    </Flex>
  )
}

function TicketRevenueCalculator() {
  const [monthlyTicketRevenue, setMonthlyTicketRevenue] = useState(50000)
  const [revenueDirection, setRevenueDirection] =
    useState<RevenueDirection>("up")
  const projectedRevenue = monthlyTicketRevenue * REVENUE_GROWTH_MULTIPLIER
  const additionalRevenue = projectedRevenue - monthlyTicketRevenue
  const sliderProgress =
    ((monthlyTicketRevenue - MINIMUM_MONTHLY_REVENUE) /
      (MAXIMUM_MONTHLY_REVENUE - MINIMUM_MONTHLY_REVENUE)) *
    100
  const projectedRevenueDisplay = formatAnimatedCurrency(projectedRevenue)
  const additionalRevenueDisplay = formatAnimatedCurrency(additionalRevenue)

  const handleMonthlyTicketRevenueChange = (nextRevenue: number) => {
    const nextProjectedRevenue = nextRevenue * REVENUE_GROWTH_MULTIPLIER
    setRevenueDirection(
      nextProjectedRevenue >= projectedRevenue ? "up" : "down",
    )
    setMonthlyTicketRevenue(nextRevenue)
  }

  return (
    <Flex
      direction="column"
      w="full"
      minH={{ base: "auto", xl1600: "290px" }}
      p={{ base: "18px", xl1600: "6" }}
      borderRadius="16px"
      bg="#0e0a07"
      boxShadow="0 0 1px 1px rgba(255, 255, 255, 0.1), 0 2px 12px 1px rgba(0, 0, 0, .35)"
      position="relative"
      overflow="hidden"
    >
      <Flex
        align="center"
        justify={{ base: "center", md700: "flex-start" }}
        position="relative"
        zIndex="1"
      >
        <Text
          fontFamily="cossetteTexte"
          fontSize={{ base: "13px", lg901: "14px" }}
          fontWeight="bold"
          lineHeight="1"
          letterSpacing="0.1em"
          textTransform="uppercase"
          color="warmMuted"
          whiteSpace="nowrap"
        >
          Ticket revenue simulator
        </Text>
      </Flex>

      <Flex
        direction="column"
        gap="1.5"
        py="4"
        position="relative"
        zIndex="1"
        w="full"
      >
        <Flex align="center" justify="space-between" w="full" gap="4">
          <Text
            fontFamily="cossetteTexte"
            fontSize={{ base: "15px", xl1600: "20px" }}
            fontWeight="normal"
            lineHeight="1.35"
            color="warmMuted"
          >
            Current monthly ticket revenue
          </Text>
          <Text
            fontFamily="cossetteTexte"
            fontSize={{ base: "28px", xl1600: "36px" }}
            fontWeight="normal"
            lineHeight="1.2"
            color="warmSoft"
            whiteSpace="nowrap"
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
            handleMonthlyTicketRevenueChange(Number(event.currentTarget.value))
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
      </Flex>

      <Flex
        position="relative"
        zIndex="1"
        align="center"
        justify="space-between"
        gap="3"
        borderTop="1px solid"
        borderColor="border"
        pt="4"
        w="full"
      >
        <Text
          flex="1"
          minW="0"
          fontFamily="cossetteTexte"
          fontSize={{ base: "15px", xl1600: "20px" }}
          fontWeight="normal"
          lineHeight="1.35"
          color="warmMuted"
        >
          Ticket Revenue with KYD Labs
        </Text>

        <Flex
          direction={{ base: "column-reverse", md700: "row" }}
          align={{ base: "flex-end", md700: "center" }}
          justify="flex-end"
          gap={{ base: "2", md700: "3" }}
          flexShrink={0}
        >
          <Flex
            align="center"
            h={{ base: "28px", xl1600: "33px" }}
            pl="6px"
            pr="10px"
            borderRadius="21px"
            bg="success"
            color="pageBg"
            fontFamily={{ base: "sans", xl1600: "cossetteTitre" }}
            fontSize={{ base: "14px", xl1600: "24px" }}
            fontWeight={{ base: "semibold", xl1600: "normal" }}
            lineHeight="1"
            whiteSpace="nowrap"
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
          </Flex>

          <Text
            fontFamily="cossetteTitre"
            fontSize={{ base: "34px", xl1600: "42px" }}
            fontWeight="100"
            lineHeight="1"
            color="success"
            whiteSpace="nowrap"
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
        </Flex>
      </Flex>
    </Flex>
  )
}

function VenuesPressCards() {
  return (
    <Box pt={{ base: "12", md700: "180px" }} pb={{ base: "12", md700: "20px" }}>
      <RevealGroup>
        <Grid
          templateColumns={{
            base: "1fr",
            md700: "repeat(2, minmax(0, 440px))",
          }}
          justifyContent="center"
          alignItems="start"
          gap={{ base: "10", md700: "clamp(32px, 10vw, 147px)" }}
          w="full"
          maxW="1027px"
          mx="auto"
        >
          {venuesPressTestimonials.map((testimonial, index) => {
            const isForbes = testimonial.attribution === "Forbes"

            return (
              <Reveal
                key={`${testimonial.attribution}-${testimonial.quote}`}
                order={index}
                w={{ base: "calc(100vw - 60px)", md700: "full" }}
                maxW="testimonialCard"
                mx="auto"
              >
                <Box
                  transform={{
                    base: isForbes ? "rotate(1.5deg)" : "none",
                    md700: isForbes
                      ? "translateY(-80px) rotate(1.5deg)"
                      : "none",
                  }}
                >
                  <TestimonialBlock
                    quote={testimonial.quote}
                    attribution={testimonial.attribution}
                    role={testimonial.role}
                    logoSrc={testimonial.logoSrc}
                    placeholder={testimonial.placeholder}
                  />
                </Box>
              </Reveal>
            )
          })}
        </Grid>
      </RevealGroup>
    </Box>
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
      pb={{ base: "10", lg901: "14" }}
    >
      <RevealGroup>
        <Container>
          <Flex direction="column" gap="9" align="stretch" w="full">
            <Reveal order={0}>
              <SectionHeading
                eyebrowVariant="prominent"
                headingTextStyle="cossetteDisplayHeading"
                headingTextTransform="uppercase"
                headingFontWeight="normal"
                label={venuesSection.label}
                headline={
                  <>
                    {venuesSection.headlineLine1}
                    <br />
                    <Text as="span" color="warmMuted">
                      {venuesSection.headlineLine2}
                    </Text>
                  </>
                }
                textAlign="center"
                mx="auto"
                w="full"
                maxW="722px"
                css={{
                  "& > p": { mb: "3", mx: "auto" },
                  "& > h2": {
                    fontSize: { base: "2rem", md700: "59px" },
                    lineHeight: "1.2",
                    letterSpacing: "0.01em",
                    color: "warmDisplay",
                  },
                }}
              />
            </Reveal>

            <Reveal order={1}>
              <Flex
                direction="column"
                gap="3"
                p="3"
                w="full"
                borderRadius="27px"
                bg="rgba(227, 221, 215, 0.04)"
              >
                <Flex
                  direction={{ base: "column", md700: "row" }}
                  align="center"
                  justify="space-between"
                  gap={{ base: "5", md700: "6" }}
                  px={{ base: "0", md700: "6" }}
                  py="6"
                >
                  <Text
                    maxW={{ base: "full", md700: "610px" }}
                    fontFamily="cossetteTexte"
                    fontSize={{ base: "16px", xl1600: "24px" }}
                    fontWeight="normal"
                    lineHeight="1.4"
                    color="warmMuted"
                    textAlign={{ base: "center", md700: "left" }}
                    textWrap="pretty"
                  >
                    {venuesSection.groupIntro}
                  </Text>
                  <Box flexShrink={0}>
                    <Button
                      href={links.getInTouch}
                      size="hero"
                      css={bookCallButtonCss}
                    >
                      <BookCallCtaContent />
                    </Button>
                  </Box>
                </Flex>

                <Grid
                  templateColumns={{
                    base: "1fr",
                    md700: "minmax(0, 1.09fr) minmax(0, 1fr)",
                  }}
                  gap="3"
                  alignItems="stretch"
                >
                  <TicketRevenueCalculator />
                  <Flex
                    direction="row"
                    gap="3"
                    minW="0"
                    h={{ base: "auto", md700: "full" }}
                  >
                    {stats.map((stat) => (
                      <StatCard
                        key={stat.label}
                        value={stat.value}
                        label={stat.label}
                        iconSrc={stat.iconSrc}
                      />
                    ))}
                  </Flex>
                </Grid>
              </Flex>
            </Reveal>

            <Reveal order={2}>
              <Text
                mx="auto"
                maxW="bodyCopy"
                fontFamily="sans"
                fontWeight="normal"
                fontSize={{ base: "16px", lg901: "18px" }}
                lineHeight={{ base: "1.4", lg901: "27px" }}
                letterSpacing={{ base: "0", lg901: "-0.36px" }}
                color="warmMuted"
                textAlign="center"
              >
                {venuesSection.body}
              </Text>
            </Reveal>

            <VenuesPressCards />
          </Flex>
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
const venuesPressTestimonials = testimonials.filter(
  (testimonial) =>
    testimonial.attribution === "Billboard" ||
    testimonial.quote.startsWith("Platforms like KYD"),
)
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

type RevenueDirection = "up" | "down"
