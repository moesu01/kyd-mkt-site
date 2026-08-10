import { Box, Flex, Grid, Image, Text, VStack } from "@chakra-ui/react"
import { assetUrl } from "../lib/asset-url"
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
      overflow="hidden"
      borderRadius="16px"
      bg="#0e0a07"
      boxShadow="0 0 1px 1px rgba(255, 255, 255, 0.1), 0 10px 20px 1px #14100d"
      css={{ WebkitFontSmoothing: "antialiased" }}
      aria-label={`Programmable ticket for ${title}`}
    >
      <Grid
        templateColumns={{
          base: "minmax(0, 1fr) 82px",
          md: "minmax(0, 1fr) 110px",
        }}
      >
        <Flex direction="column" minW="0">
          <Flex
            direction="column"
            gap="1"
            px={{ base: "3", md: "4.5" }}
            pt="16px"
            pb="12px"
          >
            <Text
              fontFamily="cossetteTexte"
              fontSize="20px"
              fontWeight="medium"
              lineHeight="1.288"
              letterSpacing="0.25px"
              color={ticketValueColor}
              whiteSpace="nowrap"
            >
              {title}
            </Text>
            <Text
              fontSize="13px"
              fontWeight="500"
              lineHeight="1.2"
              color={ticketLabelColor}
              whiteSpace="nowrap"
            >
              {eyebrow}
            </Text>
          </Flex>
          <VStack mt="auto" gap="0" align="stretch">
            <ProgrammableDetailRow
              label="TICKET"
              value={`${admit}x - ${ticketType}`}
            />
            <ProgrammableDetailRow
              label="DATE"
              value={`${date} • ${time}`}
            />
            <ProgrammableDetailRow
              label="VENUE"
              value={city ? `${venue} · ${city}` : venue}
            />
            <ProgrammableDetailRow label="TX" value={tixId} isMono />
          </VStack>
        </Flex>

        <Flex
          direction="column"
          align="center"
          justify="space-between"
          pt="3"
          pb="1.5"
          pe="0"
          borderLeft="1px dashed rgba(255, 255, 255, 0.1)"
        >
          <Flex flex="1" w="full" align="center" justify="center">
            <Image
              src={assetUrl("/icons/tix_logo.svg")}
              alt=""
              w="5"
              h="5"
              opacity="0.9"
              filter="drop-shadow(0 0 4px rgba(130, 255, 238, 0.75)) drop-shadow(0 0 9px rgba(130, 255, 238, 0.4))"
              aria-hidden
            />
          </Flex>
          <Flex
            align="center"
            justify="center"
            w={{ base: "70px", md: "96px" }}
            h={{ base: "70px", md: "96px" }}
            borderRadius="12px"
            bg="transparent"
            p={{ base: "1.5", md: "2.5" }}
            overflow="hidden"
            aria-label="Ticket QR code"
          >
            <TicketQrCode
              backgroundColor="transparent"
              foregroundColor="#ccc5be"
            />
          </Flex>
        </Flex>
      </Grid>
    </Box>
  )
}

function ProgrammableDetailRow({
  label,
  value,
  isMono = false,
}: ProgrammableDetailRowProps) {
  return (
    <Grid
      templateColumns="minmax(44px, 1fr) minmax(0, 145px)"
      gap="2"
      alignItems="center"
      h="8"
      px={{ base: "3", md: "4.5" }}
      borderTop="1px solid rgba(255, 255, 255, 0.1)"
    >
      <Text
        fontSize="11px"
        fontWeight="500"
        lineHeight="1.2"
        color={ticketLabelColor}
      >
        {label}
      </Text>
      <Text
        overflow="hidden"
        fontFamily={isMono ? "mono" : undefined}
        fontSize={isMono ? "9px" : "11px"}
        fontWeight={isMono ? "normal" : "semibold"}
        lineHeight={isMono ? "1" : "1.5"}
        color={isMono ? "rgba(236, 242, 241, 0.5)" : ticketValueColor}
        textAlign="right"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        fontVariantNumeric="tabular-nums"
      >
        {value}
      </Text>
    </Grid>
  )
}

const ticketLabelColor = "rgba(236, 242, 241, 0.68)"
const ticketValueColor = "#ccc5be"

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
  isMono?: boolean
}
