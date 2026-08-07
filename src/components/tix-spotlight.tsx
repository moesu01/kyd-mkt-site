import { Box, Flex, Grid, Heading, Image, Link, Text } from "@chakra-ui/react"
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react"
import { tixSpotlight } from "../content/site-content"
import { assetUrl } from "../lib/asset-url"
import { ProgrammableTicket } from "./programmable-ticket"
import { prominentEyebrowTextProps } from "./ui/prominent-eyebrow-styles"
import { Reveal } from "./ui/reveal"

interface ConnectorPoint {
  x: number
  y: number
}

interface ConnectorPath {
  id: string
  start: ConnectorPoint
  end: ConnectorPoint
}

const visibleTixRules = tixSpotlight.rules.filter(
  (rule) => !("isHidden" in rule && rule.isHidden),
)

function buildConnectorPath(start: ConnectorPoint, end: ConnectorPoint) {
  const dx = Math.max(end.x - start.x, 24)
  const dy = end.y - start.y
  const midX = start.x + dx * 0.5

  if (Math.abs(dy) < 2) return `M ${start.x} ${start.y} L ${end.x} ${end.y}`

  // Cap at 20px, but never larger than half the run so both turns fit.
  const corner = Math.min(20, Math.abs(dy) / 2, dx / 2)
  const dir = dy > 0 ? 1 : -1

  return [
    `M ${start.x} ${start.y}`,
    `L ${midX - corner} ${start.y}`,
    `Q ${midX} ${start.y} ${midX} ${start.y + dir * corner}`,
    `L ${midX} ${end.y - dir * corner}`,
    `Q ${midX} ${end.y} ${midX + corner} ${end.y}`,
    `L ${end.x} ${end.y}`,
  ].join(" ")
}

function RuleCard({
  label,
  value,
  valueSuffix,
  secondaryValue,
  markSrc,
  shouldInvertMark = false,
  hasMarkGlow = false,
  showFlag = false,
  cardRef,
}: {
  label: string
  value: string
  valueSuffix?: string
  secondaryValue?: string
  markSrc?: string
  shouldInvertMark?: boolean
  hasMarkGlow?: boolean
  showFlag?: boolean
  cardRef: (node: HTMLDivElement | null) => void
}) {
  return (
    <Flex
      ref={cardRef}
      as="article"
      position="relative"
      align="center"
      gap="4"
      w="full"
      maxW={{ base: "full", lg901: "420px" }}
      px="4"
      py="3"
      overflow="hidden"
      borderRadius="16px"
      bg="#0e0a07"
      boxShadow="0 0 1px 1px rgba(255, 255, 255, 0.1), 0 2px 12px 1px rgba(0, 0, 0, .35)"
    >
      {markSrc ? (
        <Image
          src={assetUrl(markSrc)}
          alt=""
          flexShrink={0}
          w="5"
          h="5"
          objectFit="contain"
          opacity={hasMarkGlow ? "0.9" : "0.65"}
          filter={[
            shouldInvertMark ? "invert(1)" : "",
            hasMarkGlow
              ? "drop-shadow(0 0 4px rgba(130, 255, 238, 0.75)) drop-shadow(0 0 9px rgba(130, 255, 238, 0.4))"
              : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden
        />
      ) : null}
      <Box flex="1" minW="0">
        <Text
          as="p"
          fontSize="12px"
          fontWeight="medium"
          lineHeight="1.4"
          color="rgba(236, 242, 241, 0.7)"
        >
          {label}
        </Text>
        <Flex align="center" gap="3" minW="0" flexWrap="nowrap">
          {showFlag ? (
            <Box
              as="span"
              flexShrink={0}
              w="8"
              h="8"
              borderRadius="full"
              overflow="hidden"
              boxShadow="0 0 0 1px rgba(255,255,255,0.15)"
              aria-hidden
              bgImage="linear-gradient(to bottom, #009c3b 0%, #009c3b 33%, #ffdf00 33%, #ffdf00 66%, #002776 66%, #002776 100%)"
            />
          ) : null}
          <Text
            as="p"
            flex="1"
            minW="0"
            overflow="hidden"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            fontSize="15px"
            fontWeight="medium"
            lineHeight="1.36"
            letterSpacing="-0.34px"
            color="#ecf2f1"
          >
            {value}
            {valueSuffix ? (
              <Box as="span" opacity="0.65">
                {" "}
                {valueSuffix}
              </Box>
            ) : null}
          </Text>
          {secondaryValue ? (
            <Text
              as="p"
              flexShrink={0}
              maxW="40%"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontFamily="mono"
              fontSize="10px"
              lineHeight="1.2"
              color="rgba(236, 242, 241, 0.5)"
              textAlign="right"
            >
              {secondaryValue}
            </Text>
          ) : null}
        </Flex>
      </Box>
    </Flex>
  )
}

function useConnectorPaths({
  containerRef,
  cardRefs,
  ticketRef,
  isEnabled,
}: {
  containerRef: RefObject<HTMLDivElement | null>
  cardRefs: RefObject<(HTMLDivElement | null)[]>
  ticketRef: RefObject<HTMLDivElement | null>
  isEnabled: boolean
}) {
  const [paths, setPaths] = useState<ConnectorPath[]>([])

  const measure = useCallback(() => {
    const container = containerRef.current
    const ticket = ticketRef.current
    if (!container || !ticket || !isEnabled) {
      setPaths([])
      return
    }

    const containerRect = container.getBoundingClientRect()
    const ticketRect = ticket.getBoundingClientRect()
    const endX = ticketRect.left - containerRect.left
    const ticketCenterY =
      ticketRect.top - containerRect.top + ticketRect.height / 2

    const nextPaths: ConnectorPath[] = []
    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const cardRect = card.getBoundingClientRect()
      const startX = cardRect.right - containerRect.left
      const startY =
        cardRect.top - containerRect.top + cardRect.height / 2
      const spread = (index - (visibleTixRules.length - 1) / 2) * 28
      nextPaths.push({
        id: visibleTixRules[index]?.label ?? `rule-${index}`,
        start: { x: startX, y: startY },
        end: { x: endX, y: ticketCenterY + spread },
      })
    })

    setPaths(nextPaths)
  }, [cardRefs, containerRef, isEnabled, ticketRef])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    if (!isEnabled) return

    const container = containerRef.current
    if (!container) return

    const observer = new ResizeObserver(() => {
      measure()
    })

    observer.observe(container)
    if (ticketRef.current) observer.observe(ticketRef.current)
    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [cardRefs, containerRef, isEnabled, measure, ticketRef])

  return paths
}

function TicketDiagram() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const ticketRef = useRef<HTMLDivElement | null>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 901px)")

    function handleChange() {
      setIsDesktop(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const setCardRef = useCallback((index: number) => {
    return (node: HTMLDivElement | null) => {
      cardRefs.current[index] = node
    }
  }, [])

  const paths = useConnectorPaths({
    containerRef,
    cardRefs,
    ticketRef,
    isEnabled: isDesktop,
  })

  return (
    <Box
      ref={containerRef}
      position="relative"
      w="full"
    >
      {isDesktop && paths.length > 0 ? (
        <Box
          position="absolute"
          inset="0"
          pointerEvents="none"
          overflow="visible"
          zIndex="3"
          aria-hidden
        >
          <svg
            width="100%"
            height="100%"
            style={{ overflow: "visible", display: "block" }}
          >
            <defs>
              <linearGradient
                id="tix-connector-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop
                  offset="0%"
                  stopColor="oklch(0.72 0.14 195)"
                  stopOpacity="0.15"
                />
                <stop
                  offset="45%"
                  stopColor="oklch(0.78 0.16 195)"
                  stopOpacity="0.95"
                />
                <stop
                  offset="100%"
                  stopColor="oklch(0.82 0.14 200)"
                  stopOpacity="0.35"
                />
              </linearGradient>
              <filter
                id="tix-connector-glow"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
              >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {paths.map((path) => (
              <path
                key={path.id}
                d={buildConnectorPath(path.start, path.end)}
                fill="none"
                stroke="url(#tix-connector-gradient)"
                strokeWidth="2"
                strokeLinecap="square"
                strokeLinejoin="miter"
                filter="url(#tix-connector-glow)"
              />
            ))}
          </svg>
        </Box>
      ) : null}

      <Grid
        templateColumns={{
          base: "1fr",
          lg901: "minmax(0, 420px) 64px minmax(0, 408px)",
        }}
        gap={{ base: "8", lg901: "0" }}
        alignItems={{ base: "start", lg901: "stretch" }}
        justifyContent="center"
        position="relative"
        zIndex="2"
      >
        <Flex
          position="relative"
          direction="column"
          justify="space-between"
          align="stretch"
          gap="6"
          w="full"
          maxW={{ base: "408px", lg901: "420px" }}
          p="6"
          overflow="hidden"
          borderRadius="28px"
          bg="frameBg"
          boxShadow="frame"
          justifySelf="center"
          gridColumn={{ lg901: 1 }}
        >
          <Image
            position="absolute"
            inset="0"
            w="full"
            h="full"
            src={assetUrl("/images/feat/feat_sq_1.png")}
            alt=""
            objectFit="cover"
            objectPosition="top"
            opacity="0.1"
            filter="blur(2px)"
            draggable={false}
            pointerEvents="none"
          />
          <Box
            position="absolute"
            inset="0"
            pointerEvents="none"
            bg="linear-gradient(to top, oklch(0.15 0.01 63.9) 0%, transparent 55%)"
          />
          <Flex position="relative" direction="column" gap="3">
            {visibleTixRules.map((rule, index) => (
              <RuleCard
                key={rule.label}
                label={rule.label}
                value={rule.value}
                valueSuffix={"valueSuffix" in rule ? rule.valueSuffix : undefined}
                markSrc={"markSrc" in rule ? rule.markSrc : undefined}
                shouldInvertMark={
                  "shouldInvertMark" in rule
                    ? rule.shouldInvertMark
                    : false
                }
                hasMarkGlow={"hasMarkGlow" in rule ? rule.hasMarkGlow : false}
                secondaryValue={
                  "secondaryValue" in rule ? rule.secondaryValue : undefined
                }
                showFlag={"showFlag" in rule ? rule.showFlag : false}
                cardRef={setCardRef(index)}
              />
            ))}
          </Flex>
          <Flex position="relative" direction="column" gap="2" w="full" textAlign="left">
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
              {tixSpotlight.benefits[0].title}
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
              {tixSpotlight.benefits[0].body}
            </Text>
          </Flex>
        </Flex>

        <Flex
          position="relative"
          direction="column"
          align="stretch"
          gap="8"
          justify="space-between"
          justifySelf={{ base: "center", lg901: "stretch" }}
          w="full"
          maxW={{ base: "408px", lg901: "408px" }}
          p="6"
          overflow="hidden"
          borderRadius="28px"
          bg="frameBg"
          boxShadow="frame"
          gridColumn={{ lg901: 3 }}
        >
          <Image
            position="absolute"
            inset="0"
            w="full"
            h="full"
            src={assetUrl("/images/feat/feat_sq_2.png")}
            alt=""
            objectFit="cover"
            objectPosition="top"
            opacity="0.1"
            filter="blur(2px)"
            draggable={false}
            pointerEvents="none"
          />
          <Box
            position="absolute"
            inset="0"
            pointerEvents="none"
            bg="linear-gradient(to top, oklch(0.15 0.01 63.9) 0%, transparent 55%)"
          />
          <Box position="relative" ref={ticketRef} w="full" maxW="360px" mx="auto">
            <ProgrammableTicket
              eyebrow={tixSpotlight.ticket.eyebrow}
              title={tixSpotlight.ticket.title}
              venue={tixSpotlight.ticket.venue}
              city={tixSpotlight.ticket.city}
              ticketType={tixSpotlight.ticket.ticketType}
              date={tixSpotlight.ticket.date}
              time={tixSpotlight.ticket.time}
              admit={tixSpotlight.ticket.admit}
              tixId={tixSpotlight.ticket.tixId}
            />
          </Box>
          <Flex position="relative" direction="column" gap="2" w="full" textAlign="left">
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
              {tixSpotlight.benefits[1].title}
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
              {tixSpotlight.benefits[1].body}
            </Text>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  )
}

export function TixSpotlight() {
  return (
    <Reveal order={0} w="full">
      <Box
        as="article"
        w="full"
        aria-labelledby="tix-spotlight-heading"
      >
        <Flex
          direction="column"
          align="center"
          gap={{ base: "12", lg901: "16" }}
          w="full"
          pt="12"
        >
          <Flex
            direction="column"
            align="center"
            gap="3"
            w="full"
            maxW="670px"
            textAlign="center"
          >
            <Heading
              as="h3"
              id="tix-spotlight-heading"
              {...prominentEyebrowTextProps}
              pb="12px"
            >
              {tixSpotlight.eyebrow}
            </Heading>
            <Image
              src={assetUrl("/icons/tix_logo.svg")}
              alt=""
              w="38px"
              h="42px"
              objectFit="contain"
              draggable={false}
              aria-hidden
            />
            <Text
              as="p"
              fontFamily="cossetteTitre"
              fontSize="36px"
              fontStyle="normal"
              fontWeight="400"
              lineHeight="1.2"
              letterSpacing="0"
              color="#ccc5be"
              textWrap="pretty"
            >
              {tixSpotlight.headlineLine1}
              <Box as="br" />
              {tixSpotlight.headlineLine2}
            </Text>
            <Text
              as="p"
              fontFamily="sans"
              fontWeight="normal"
              fontSize="18px"
              lineHeight="27px"
              letterSpacing="-0.36px"
              color="warmMuted"
              textWrap="balance"
            >
              {tixSpotlight.body}
            </Text>
            <Link
              href={tixSpotlight.href}
              display="inline-flex"
              alignItems="center"
              fontFamily="sans"
              fontSize="13px"
              fontWeight="medium"
              lineHeight="1.4"
              letterSpacing="0"
              color="#ccc5be"
              textDecoration="underline"
              _hover={{ opacity: 0.8 }}
            >
              Learn about TIX
            </Link>
          </Flex>

          <TicketDiagram />
        </Flex>
      </Box>
    </Reveal>
  )
}
