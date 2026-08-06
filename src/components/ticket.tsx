import { Box, Flex, Grid, Image, Text, VStack, chakra } from "@chakra-ui/react"
import { useEffect, useState, type KeyboardEvent } from "react"

/**
 * Self-contained marketing ticket card.
 * No app contexts, Motion, DialKit, or shared CSS required.
 */
export function Ticket({
  posterUrl,
  subtitle,
  title,
  ticketType,
  quantity,
  date,
  time,
  venue,
  city,
  ctaLabel = "Claim Ticket on KYD Labs",
  onClaim,
  isCtaDisabled = false,
  maxWidth = "330px",
  className,
  colors = DEFAULT_TICKET_COLORS,
}: TicketProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldFloat = IS_TICKET_FLOAT_ENABLED && !prefersReducedMotion
  const quantityLabel = `${quantity}x`
  const { dayLabel, dateLabel } = getDateParts({ date })

  const handleClaimClick = () => {
    if (isCtaDisabled) return
    onClaim?.()
  }

  const handleClaimKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (isCtaDisabled) return
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    onClaim?.()
  }

  return (
    <Box
      className={className}
      w="full"
      maxW={maxWidth}
      mx="auto"
      position="relative"
      overflow="visible"
      css={{ WebkitFontSmoothing: "antialiased" }}
    >
      <style>{TICKET_STYLES}</style>

      <Box className="ticket-shell" w="full">
        <Box className="ticket-translator">
          <Box
            className={shouldFloat ? "ticket-rotator ticket-rotator--float" : "ticket-rotator"}
          >
            <Box className="ticket-content">
              <Box
                position="relative"
                bg={colors.surfaceBg}
                borderWidth="1px"
                borderStyle="solid"
                borderColor={colors.borderColor}
                borderBottom="none"
                borderTopRadius="8px"
                borderBottomRadius="16px"
                overflow="hidden"
              >
                <Box py="12px" px="12px">
                  <VStack gap="12px" align="stretch" w="full">
                    <Grid
                      templateColumns="minmax(0, 1fr) 100px"
                      gap="12px"
                      alignItems="center"
                    >
                      <VStack gap="6px" align="stretch" minW={0}>
                        <Text
                          fontFamily="cossetteTitre"
                          fontSize="36px"
                          fontWeight="700"
                          lineHeight="1"
                          color={colors.titleColor}
                          css={{ textWrap: "balance" }}
                          pointerEvents="none"
                        >
                          {title}
                        </Text>
                        {subtitle && (
                          <Text
                            fontFamily="cossetteTexte"
                            fontSize="15px"
                            fontWeight="500"
                            lineHeight="1"
                            color={colors.titleColor}
                            pointerEvents="none"
                          >
                            {subtitle}
                          </Text>
                        )}
                      </VStack>
                      <Box
                        w="100px"
                        h="100px"
                        borderRadius="8px"
                        overflow="hidden"
                        flexShrink={0}
                        outline="1px solid rgba(0,0,0,0.1)"
                        outlineOffset="-1px"
                      >
                        <Image
                          src={posterUrl}
                          alt=""
                          w="full"
                          h="full"
                          objectFit="cover"
                          objectPosition="center"
                          draggable={false}
                          pointerEvents="none"
                        />
                      </Box>
                    </Grid>

                    <VStack gap="0" align="stretch" w="full">
                      <TicketDetailRow
                        label="TICKET"
                        primaryValue={ticketType}
                        secondaryValue={quantityLabel}
                        colors={colors}
                      />
                      <TicketDetailRow
                        label="VENUE"
                        primaryValue={venue}
                        secondaryValue={city}
                        colors={colors}
                      />
                      <Grid
                        templateColumns="minmax(0, 1fr) 140px"
                        gap="12px"
                        borderTop="1px solid"
                        borderColor={colors.borderColor}
                      >
                        <VStack
                          align="stretch"
                          justify="center"
                          gap="0"
                          minW={0}
                          borderBottom="1px solid"
                          borderColor={colors.borderColor}
                        >
                          <TicketDetailBlock
                            label="DATE"
                            value={dayLabel}
                            secondaryValue={dateLabel}
                            colors={colors}
                          />
                          <TicketDetailBlock
                            label="TIME"
                            value={time}
                            colors={colors}
                            hasTopBorder
                          />
                        </VStack>
                        <Flex
                          align="center"
                          justify="center"
                          w="140px"
                          h="140px"
                          mt="4px"
                          borderRadius="8px"
                          bg="#ffffff"
                          p="10px"
                          overflow="hidden"
                          boxShadow="inset 0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.08), 0 10px 24px rgba(0, 0, 0, 0.08)"
                          aria-label="Ticket QR code"
                        >
                          <TicketQrCode />
                        </Flex>
                      </Grid>
                    </VStack>
                  </VStack>
                </Box>
              </Box>

              <Box
                position="relative"
                bg={colors.surfaceBg}
                borderWidth="1px"
                borderStyle="solid"
                borderColor={colors.borderColor}
                borderTopRadius="16px"
                borderBottomRadius="2px"
                overflow="hidden"
              >
                <Box p="12px">
                  <ClaimButton
                    label={ctaLabel}
                    isDisabled={isCtaDisabled}
                    onClick={handleClaimClick}
                    onKeyDown={handleClaimKeyDown}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function TicketDetailRow({
  label,
  primaryValue,
  secondaryValue,
  colors,
}: TicketDetailRowProps) {
  return (
    <VStack
      align="stretch"
      gap="4px"
      pt="12px"
      pb="8px"
      borderTop="1px solid"
      borderColor={colors.borderColor}
      w="full"
    >
      <Text
        fontSize="12px"
        fontWeight="500"
        lineHeight="1"
        color={colors.labelColor}
      >
        {label}
      </Text>

      <Flex align="center" justify="space-between" gap="8px" w="full">
        <Text
          fontSize="14px"
          fontWeight="600"
          lineHeight="1.25"
          color={colors.valueColor}
          flex="1"
          minW={0}
        >
          {primaryValue}
        </Text>
        <Text
          fontSize="14px"
          fontWeight="600"
          lineHeight="1.25"
          color={colors.valueColor}
          flexShrink={0}
          whiteSpace="nowrap"
          fontVariantNumeric="tabular-nums"
          letterSpacing="-0.42px"
        >
          {secondaryValue}
        </Text>
      </Flex>
    </VStack>
  )
}

function TicketDetailBlock({
  label,
  value,
  secondaryValue,
  colors,
  hasTopBorder = false,
}: TicketDetailBlockProps) {
  return (
    <VStack
      align="stretch"
      gap="4px"
      minW={0}
      pt="12px"
      pb="8px"
      borderTop={hasTopBorder ? "1px solid" : undefined}
      borderColor={hasTopBorder ? colors.borderColor : undefined}
    >
      <Text
        fontSize="12px"
        fontWeight="500"
        lineHeight="1"
        color={colors.labelColor}
      >
        {label}
      </Text>
      <Text
        fontSize="14px"
        fontWeight="600"
        lineHeight={secondaryValue ? "1.45" : "1.25"}
        color={colors.valueColor}
        minW={0}
        css={{ textWrap: "pretty" }}
      >
        {value}
        {secondaryValue && (
          <>
            <br />
            {secondaryValue}
          </>
        )}
      </Text>
    </VStack>
  )
}

function getDateParts({ date }: { date: string }) {
  const [dayLabel, ...dateParts] = date.split("•").map((part) => part.trim())
  const dateLabel = dateParts.join(" • ")

  if (!dateLabel) return { dayLabel: date, dateLabel: undefined }
  return { dayLabel, dateLabel }
}

function ClaimButton({ label, isDisabled, onClick, onKeyDown }: ClaimButtonProps) {
  return (
    <ClaimButtonRoot
      type="button"
      aria-label={label}
      aria-disabled={isDisabled}
      tabIndex={0}
      cursor={isDisabled ? "default" : "pointer"}
      onClick={onClick}
      onKeyDown={onKeyDown}
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      py="10px"
      pl="16px"
      pr="14px"
      borderRadius="8px"
      bg="#000000"
      color="#ffffff"
      border="none"
      boxShadow="0 1px 1.5px rgba(0,0,0,0.08)"
      transition="transform 0.15s ease"
      transitionProperty="transform"
      _active={isDisabled ? undefined : { transform: "scale(0.96)" }}
    >
      <Text
        fontSize="14px"
        fontWeight="600"
        lineHeight="19.2px"
        color="#ffffff"
        letterSpacing="-0.14px"
        whiteSpace="nowrap"
        pointerEvents="none"
      >
        {label}
      </Text>
      <Flex
        align="center"
        justify="center"
        flexShrink={0}
        w="25px"
        h="14px"
        pointerEvents="none"
        aria-hidden
      >
        <TransferIcon />
      </Flex>
    </ClaimButtonRoot>
  )
}

export function TicketQrCode({
  backgroundColor = "#ffffff",
  foregroundColor = "#000000",
}: TicketQrCodeProps = {}) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 33 33"
      role="img"
      aria-label="Ticket QR code"
    >
      <path
        fill={backgroundColor}
        d="M0 0h33v33H0z"
        shapeRendering="crispEdges"
      />
      <path
        fill={foregroundColor}
        d="M0 0h7v1H0zM9 0h4v1H9zM14 0h1v1H14zM17 0h3v1H17zM21 0h4v1H21zM26 0h7v1H26zM0 1h1v1H0zM6 1h1v1H6zM8 1h2v1H8zM14 1h2v1H14zM21 1h1v1H21zM26 1h1v1H26zM32 1h1v1H32zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM9 2h3v1H9zM16 2h1v1H16zM19 2h3v1H19zM23 2h2v1H23zM26 2h1v1H26zM28 2h3v1H28zM32 2h1v1H32zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM8 3h1v1H8zM11 3h3v1H11zM17 3h2v1H17zM20 3h1v1H20zM22 3h1v1H22zM26 3h1v1H26zM28 3h3v1H28zM32 3h1v1H32zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM9 4h4v1H9zM14 4h1v1H14zM19 4h1v1H19zM21 4h1v1H21zM23 4h2v1H23zM26 4h1v1H26zM28 4h3v1H28zM32 4h1v1H32zM0 5h1v1H0zM6 5h1v1H6zM8 5h2v1H8zM12 5h2v1H12zM15 5h1v1H15zM18 5h1v1H18zM22 5h1v1H22zM26 5h1v1H26zM32 5h1v1H32zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18 6h1v1H18zM20 6h1v1H20zM22 6h1v1H22zM24 6h1v1H24zM26 6h7v1H26zM9 7h1v1H9zM18 7h2v1H18zM21 7h1v1H21zM0 8h5v1H0zM6 8h4v1H6zM12 8h2v1H12zM15 8h4v1H15zM20 8h1v1H20zM22 8h4v1H22zM27 8h1v1H27zM29 8h1v1H29zM31 8h1v1H31zM0 9h2v1H0zM4 9h1v1H4zM7 9h1v1H7zM11 9h1v1H11zM14 9h1v1H14zM19 9h1v1H19zM21 9h1v1H21zM23 9h2v1H23zM26 9h2v1H26zM29 9h2v1H29zM32 9h1v1H32zM3 10h1v1H3zM6 10h1v1H6zM8 10h1v1H8zM10 10h1v1H10zM14 10h4v1H14zM21 10h2v1H21zM25 10h2v1H25zM31 10h1v1H31zM3 11h2v1H3zM8 11h1v1H8zM14 11h1v1H14zM21 11h1v1H21zM24 11h2v1H24zM30 11h1v1H30zM0 12h2v1H0zM4 12h1v1H4zM6 12h2v1H6zM9 12h2v1H9zM23 12h1v1H23zM28 12h2v1H28zM0 13h2v1H0zM4 13h2v1H4zM7 13h2v1H7zM11 13h1v1H11zM21 13h7v1H21zM30 13h3v1H30zM4 14h4v1H4zM9 14h1v1H9zM21 14h1v1H21zM24 14h2v1H24zM9 15h1v1H9zM11 15h1v1H11zM21 15h4v1H21zM29 15h2v1H29zM3 16h5v1H3zM9 16h1v1H9zM24 16h1v1H24zM27 16h2v1H27zM31 16h1v1H31zM0 17h1v1H0zM3 17h1v1H3zM5 17h1v1H5zM7 17h1v1H7zM9 17h1v1H9zM11 17h1v1H11zM21 17h3v1H21zM25 17h2v1H25zM29 17h2v1H29zM32 17h1v1H32zM2 18h3v1H2zM6 18h1v1H6zM9 18h2v1H9zM24 18h2v1H24zM27 18h1v1H27zM29 18h3v1H29zM1 19h3v1H1zM5 19h1v1H5zM9 19h1v1H9zM11 19h1v1H11zM21 19h1v1H21zM24 19h5v1H24zM30 19h1v1H30zM0 20h4v1H0zM6 20h3v1H6zM10 20h1v1H10zM23 20h1v1H23zM25 20h1v1H25zM28 20h2v1H28zM31 20h1v1H31zM0 21h2v1H0zM3 21h1v1H3zM7 21h5v1H7zM13 21h2v1H13zM19 21h1v1H19zM21 21h4v1H21zM26 21h2v1H26zM30 21h2v1H30zM0 22h1v1H0zM4 22h3v1H4zM8 22h2v1H8zM15 22h1v1H15zM18 22h1v1H18zM20 22h1v1H20zM22 22h1v1H22zM25 22h1v1H25zM28 22h1v1H28zM30 22h2v1H30zM0 23h1v1H0zM2 23h4v1H2zM9 23h1v1H9zM11 23h1v1H11zM15 23h1v1H15zM18 23h1v1H18zM20 23h3v1H20zM24 23h1v1H24zM26 23h2v1H26zM29 23h4v1H29zM0 24h1v1H0zM2 24h1v1H2zM5 24h4v1H5zM10 24h1v1H10zM13 24h1v1H13zM15 24h2v1H15zM20 24h1v1H20zM23 24h6v1H23zM31 24h1v1H31zM8 25h5v1H8zM14 25h1v1H14zM19 25h1v1H19zM21 25h4v1H21zM28 25h1v1H28zM30 25h2v1H30zM0 26h7v1H0zM8 26h3v1H8zM12 26h2v1H12zM15 26h1v1H15zM23 26h2v1H23zM26 26h1v1H26zM28 26h1v1H28zM31 26h1v1H31zM0 27h1v1H0zM6 27h1v1H6zM9 27h2v1H9zM14 27h1v1H14zM18 27h1v1H18zM21 27h2v1H21zM24 27h1v1H24zM28 27h4v1H28zM0 28h1v1H0zM2 28h3v1H2zM6 28h1v1H6zM8 28h3v1H8zM13 28h2v1H13zM16 28h3v1H16zM20 28h1v1H20zM24 28h5v1H24zM31 28h2v1H31zM0 29h1v1H0zM2 29h3v1H2zM6 29h1v1H6zM8 29h1v1H8zM11 29h2v1H11zM19 29h1v1H19zM21 29h5v1H21zM28 29h3v1H28zM0 30h1v1H0zM2 30h3v1H2zM6 30h1v1H6zM8 30h2v1H8zM12 30h2v1H12zM15 30h1v1H15zM17 30h2v1H17zM20 30h1v1H20zM23 30h1v1H23zM26 30h2v1H26zM31 30h1v1H31zM0 31h1v1H0zM6 31h1v1H6zM8 31h3v1H8zM14 31h1v1H14zM18 31h2v1H18zM21 31h2v1H21zM30 31h1v1H30zM0 32h7v1H0zM8 32h3v1H8zM12 32h7v1H12zM20 32h1v1H20zM24 32h3v1H24zM28 32h1v1H28zM31 32h1v1H31z"
        shapeRendering="crispEdges"
      />
      <g transform="translate(12.257 12.257) scale(.217)">
        <path
          d="M39.1033 21.8792V16.6432H25.9637L35.2365 7.49978L31.5281 3.74838L22.2549 12.8917V0H16.8484L16.8795 12.8L7.67142 3.74838L3.86676 7.49978L13.1707 16.6432H0V21.8792H39.1033Z"
          transform="translate(0 9)"
          fill={foregroundColor}
        />
      </g>
    </svg>
  )
}

interface TicketQrCodeProps {
  backgroundColor?: string
  foregroundColor?: string
}

function TransferIcon() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 25 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      focusable="false"
      style={{ display: "block", overflow: "visible" }}
    >
      <path
        d="M25 14V10.6495H16.5994L22.5279 4.79894L20.1569 2.39849L14.2283 8.2491V0H10.7717L10.7916 8.19046L4.90458 2.39849L2.47213 4.79894L8.42044 10.6495H0V14H25Z"
        fill="white"
      />
    </svg>
  )
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}

const ClaimButtonRoot = chakra("button")
const IS_TICKET_FLOAT_ENABLED = true

const DEFAULT_TICKET_COLORS: TicketColors = {
  titleColor: "oklch(0.35 0.08 268)",
  labelColor: "oklch(0.35 0.08 268 / 0.75)",
  valueColor: "oklch(0.35 0.08 268 / 0.9)",
  borderColor: "oklch(0.35 0.08 268 / 0.15)",
  surfaceBg: "oklch(0.96 0.012 268)",
}

/** Matches post-claim idle float (6s, 4px Y, 1.5deg). */
const TICKET_STYLES = `
.ticket-shell {
  --ticket-perspective: 200px;
  --ticket-float-duration: 6s;
  --ticket-float-y: 4px;
  --ticket-float-rotate: 1.5deg;
  position: relative;
  width: 100%;
  overflow: visible;
  transform: translate3d(0, 0, 0.01px);
}

.ticket-translator {
  display: grid;
  overflow: visible;
  perspective: var(--ticket-perspective);
  transform-origin: center;
  transform-style: preserve-3d;
}

.ticket-rotator {
  position: relative;
  display: grid;
  overflow: visible;
  transform-origin: center;
  transform-style: preserve-3d;
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.16),
    0 18px 32px rgba(0, 0, 0, 0.18),
    0 36px 64px rgba(0, 0, 0, 0.12);
}

.ticket-rotator--float {
  animation: ticketIdleFloat var(--ticket-float-duration) ease-in-out infinite;
}

.ticket-content {
  position: relative;
  z-index: 1;
  grid-area: 1 / 1;
  overflow: visible;
  transform: translate3d(0, 0, 0.01px);
}

@keyframes ticketIdleFloat {
  0%,
  100% {
    transform: rotateY(0deg) rotateX(0deg) translateY(calc(var(--ticket-float-y) * -1));
  }

  50% {
    transform: rotateY(var(--ticket-float-rotate))
      rotateX(calc(var(--ticket-float-rotate) * -1))
      translateY(var(--ticket-float-y));
  }
}

@media (prefers-reduced-motion: reduce) {
  .ticket-rotator--float {
    animation: none;
  }

  .ticket-translator,
  .ticket-rotator {
    transform: none;
  }
}
`

export interface TicketColors {
  titleColor: string
  labelColor: string
  valueColor: string
  borderColor: string
  surfaceBg: string
}

export interface TicketProps {
  posterUrl: string
  subtitle?: string
  title: string
  ticketType: string
  quantity: number
  date: string
  time: string
  venue: string
  city: string
  ctaLabel?: string
  onClaim?: () => void
  isCtaDisabled?: boolean
  maxWidth?: string
  className?: string
  colors?: TicketColors
}

interface TicketDetailRowProps {
  label: string
  primaryValue: string
  secondaryValue: string
  colors: TicketColors
}

interface TicketDetailBlockProps {
  label: string
  value: string
  secondaryValue?: string
  colors: TicketColors
  hasTopBorder?: boolean
}

interface ClaimButtonProps {
  label: string
  isDisabled: boolean
  onClick: () => void
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void
}
