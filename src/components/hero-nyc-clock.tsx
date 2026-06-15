import { Box, Flex, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface NycTimeParts {
  hours: string
  minutes: string
  seconds: string
  label: string
}

function getNycTimeParts(): NycTimeParts {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  const parts = formatter.formatToParts(new Date())
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00"

  return {
    hours: get("hour"),
    minutes: get("minute"),
    seconds: get("second"),
    label: formatter.format(new Date()),
  }
}

export function HeroNycClock() {
  const [time, setTime] = useState<NycTimeParts>(() => getNycTimeParts())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTime(getNycTimeParts())
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  return (
    <Flex
      align="center"
      gap="1"
      fontFamily="mono"
      fontSize="10px"
      letterSpacing="-0.2px"
      textTransform="uppercase"
      color="fg"
      aria-live="polite"
      aria-label={`Current time in New York City: ${time.label}`}
    >
      <Text as="span">[</Text>
      <Box
        w="1"
        h="1"
        borderRadius="full"
        bg="red.500"
        flexShrink={0}
        aria-hidden
      />
      <Text as="span">{time.hours}</Text>
      <Text as="span">:</Text>
      <Text as="span">{time.minutes}</Text>
      <Text as="span">:</Text>
      <Text as="span">{time.seconds}</Text>
      <Text as="span">]</Text>
    </Flex>
  )
}
