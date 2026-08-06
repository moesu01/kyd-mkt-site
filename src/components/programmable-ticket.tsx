import { Box, Flex, Grid, Text, VStack } from "@chakra-ui/react"
import { TicketQrCode } from "./ticket"

export function ProgrammableTicket({
  eyebrow,
  title,
  venue,
  city,
  ticketType,
  date,
  time,
  admit,
  tixId,
  maxWidth = "360px",
}: ProgrammableTicketProps) {
  return (
    <Box
      w="full"
      maxW={maxWidth}
      mx="auto"
      position="relative"
      borderRadius="18px"
      filter="drop-shadow(0 0 12px oklch(0.82 0.14 190 / 0.36)) drop-shadow(0 0 34px oklch(0.72 0.15 190 / 0.24)) drop-shadow(0 0 72px oklch(0.65 0.12 190 / 0.14))"
      css={{ WebkitFontSmoothing: "antialiased" }}
      aria-label={`Programmable ticket for ${title}`}
    >
      <Box
        position="absolute"
        inset="-10px"
        borderRadius="26px"
        bg="oklch(0.75 0.14 190 / 0.06)"
        filter="blur(14px)"
        pointerEvents="none"
        aria-hidden
      />

      <VStack gap="0" align="stretch" position="relative">
        <Box
          position="relative"
          overflow="hidden"
          borderTopRadius="18px"
          borderBottomRadius="18px"
          border="1px solid rgba(236, 255, 252, 0.35)"
          bgImage={ticketSurfaceGradient}
          boxShadow={ticketSurfaceShadow}
        >
          <Box p={{ base: "16px", md: "18px" }}>
            <Text
              fontSize={{ base: "12px", md: "13px" }}
              fontWeight="500"
              lineHeight="1.2"
              color={ticketLabelColor}
            >
              {eyebrow}
            </Text>
            <Text
              mt="4px"
              fontFamily="cossetteTexte"
              fontSize={{ base: "20px", md: "23px" }}
              fontWeight="bold"
              lineHeight="1.12"
              letterSpacing="-0.4px"
              color={ticketValueColor}
              textWrap="balance"
            >
              {title}
            </Text>

            <VStack mt="28px" gap="0" align="stretch">
              <ProgrammableDetailRow
                label="VENUE"
                value={`${venue} · ${city}`}
              />
              <ProgrammableDetailRow
                label="TICKET"
                value={`${admit}x - ${ticketType}`}
              />
            </VStack>
          </Box>
        </Box>

        <Box
          position="relative"
          mt="-2px"
          overflow="hidden"
          borderTopRadius="18px"
          borderBottomRadius="18px"
          border="1px solid rgba(236, 255, 252, 0.31)"
          bgImage={ticketSurfaceGradient}
          boxShadow={ticketSurfaceShadow}
        >
          <Grid
            templateColumns="minmax(0, 0.92fr) minmax(0, 1.08fr)"
            gap={{ base: "12px", md: "16px" }}
            p={{ base: "14px", md: "18px" }}
            alignItems="start"
          >
            <Flex direction="column" minW="0">
              <TicketInfoBlock label="DATE" value={date} />
              <TicketInfoBlock label="TIME" value={time} isLast />
              <Box
                mt="12px"
                pt="12px"
                borderTop="1px solid rgba(236, 255, 252, 0.18)"
              >
                <Text
                  fontSize={{ base: "10px", md: "11px" }}
                  fontWeight="500"
                  color={ticketLabelColor}
                >
                  OWNER
                </Text>
                <Text
                  mt="3px"
                  fontSize={{ base: "13px", md: "14px" }}
                  fontWeight="bold"
                  color={ticketValueColor}
                >
                  Verified
                </Text>
                <Text
                  mt="6px"
                  fontFamily="mono"
                  fontSize="9px"
                  lineHeight="1"
                  color="rgba(236, 242, 241, 0.5)"
                >
                  {tixId}
                </Text>
              </Box>
            </Flex>

            <Flex
              align="center"
              justify="center"
              w="full"
              maxW="full"
              minW="0"
              aspectRatio="1"
              borderRadius="12px"
              bg="#ffffff"
              p={{ base: "10px", md: "12px" }}
              overflow="hidden"
              boxShadow="inset 0 0 0 1px rgba(0, 0, 0, 0.12), 0 2px 6px rgba(0, 0, 0, 0.2), 0 14px 32px rgba(0, 0, 0, 0.16)"
              aria-label="Ticket QR code"
            >
              <TicketQrCode />
            </Flex>
          </Grid>
        </Box>
      </VStack>
    </Box>
  )
}

function ProgrammableDetailRow({
  label,
  value,
}: ProgrammableDetailRowProps) {
  return (
    <Grid
      templateColumns="minmax(0, 1fr) auto"
      gap="12px"
      alignItems="center"
      py="10px"
      borderTop="1px solid rgba(236, 255, 252, 0.18)"
    >
      <Text
        fontSize={{ base: "11px", md: "12px" }}
        fontWeight="500"
        lineHeight="1.2"
        color={ticketLabelColor}
      >
        {label}
      </Text>
      <Text
        fontSize={{ base: "12px", md: "14px" }}
        fontWeight="bold"
        lineHeight="1.2"
        color={ticketValueColor}
        textAlign="right"
      >
        {value}
      </Text>
    </Grid>
  )
}

function TicketInfoBlock({
  label,
  value,
  isLast = false,
}: TicketInfoBlockProps) {
  return (
    <Box
      pb={isLast ? "0" : "10px"}
      mb={isLast ? "0" : "10px"}
      borderBottom={isLast ? undefined : "1px solid rgba(236, 255, 252, 0.18)"}
    >
      <Text
        fontSize={{ base: "10px", md: "11px" }}
        fontWeight="500"
        lineHeight="1.2"
        color={ticketLabelColor}
      >
        {label}
      </Text>
      <Text
        mt="3px"
        fontSize={{ base: "13px", md: "14px" }}
        fontWeight="bold"
        lineHeight="1.2"
        color={ticketValueColor}
        fontVariantNumeric="tabular-nums"
      >
        {value}
      </Text>
    </Box>
  )
}

const ticketSurfaceGradient =
  "linear-gradient(145deg, rgba(106, 121, 130, 0.9) 0%, rgba(55, 66, 74, 0.96) 22%, rgba(29, 38, 44, 0.98) 62%, rgba(47, 59, 66, 0.98) 100%)"

const ticketSurfaceShadow =
  "inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 12px 22px rgba(255, 255, 255, 0.16), inset 12px 0 24px rgba(182, 255, 245, 0.06), inset -14px -18px 28px rgba(0, 0, 0, 0.38), 0 0 0 1px rgba(120, 255, 235, 0.2)"

const ticketLabelColor = "rgba(236, 242, 241, 0.68)"
const ticketValueColor = "#ecf2f1"

interface ProgrammableTicketProps {
  eyebrow: string
  title: string
  venue: string
  city: string
  ticketType: string
  date: string
  time: string
  admit: number
  tixId: string
  maxWidth?: string
}

interface ProgrammableDetailRowProps {
  label: string
  value: string
}

interface TicketInfoBlockProps {
  label: string
  value: string
  isLast?: boolean
}
