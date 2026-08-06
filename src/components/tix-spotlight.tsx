import { Box, Flex, Grid, Heading, Image, Text } from "@chakra-ui/react"
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

function buildConnectorPath(start: ConnectorPoint, end: ConnectorPoint) {
  const dx = Math.max(end.x - start.x, 24)
  const controlOffset = dx * 0.55
  const c1x = start.x + controlOffset
  const c2x = end.x - controlOffset
  return `M ${start.x} ${start.y} C ${c1x} ${start.y}, ${c2x} ${end.y}, ${end.x} ${end.y}`
}

function RuleCard({
  label,
  value,
  showFlag = false,
  cardRef,
}: {
  label: string
  value: string
  showFlag?: boolean
  cardRef: (node: HTMLDivElement | null) => void
}) {
  return (
    <Box
      ref={cardRef}
      as="article"
      position="relative"
      w="full"
      maxW={{ base: "full", lg901: "420px" }}
      p="3"
      borderRadius="16px"
      bg="frameBg"
      boxShadow="frame"
      _before={{
        content: '""',
        position: "absolute",
        inset: "0",
        borderRadius: "inherit",
        p: "1px",
        bgImage:
          "linear-gradient(to left, oklch(0.78 0.16 195 / 0.8), rgba(255, 255, 255, 0.05) 58%, transparent 100%)",
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        pointerEvents: "none",
      }}
    >
      <Text
        as="p"
        fontSize="14px"
        fontWeight="medium"
        lineHeight="1.2"
        color="rgba(236, 242, 241, 0.7)"
        mb="1"
      >
        {label}
      </Text>
      <Flex align="center" gap="3" minW="0">
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
          fontSize="17px"
          fontWeight="medium"
          lineHeight="1.2"
          letterSpacing="-0.34px"
          color="#ecf2f1"
          textWrap="pretty"
          minW="0"
        >
          {value}
        </Text>
      </Flex>
    </Box>
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
    const endX = ticketRect.left - containerRect.left + 8
    const ticketCenterY =
      ticketRect.top - containerRect.top + ticketRect.height * 0.42

    const nextPaths: ConnectorPath[] = []
    cardRefs.current.forEach((card, index) => {
      if (!card) return
      const cardRect = card.getBoundingClientRect()
      const startX = cardRect.right - containerRect.left
      const startY =
        cardRect.top - containerRect.top + cardRect.height / 2
      const spread = (index - (tixSpotlight.rules.length - 1) / 2) * 28
      nextPaths.push({
        id: tixSpotlight.rules[index]?.label ?? `rule-${index}`,
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
      maxW="964px"
      mx="auto"
    >
      {isDesktop && paths.length > 0 ? (
        <Box
          position="absolute"
          inset="0"
          pointerEvents="none"
          overflow="visible"
          zIndex="1"
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
                strokeLinecap="round"
                filter="url(#tix-connector-glow)"
              />
            ))}
          </svg>
        </Box>
      ) : null}

      <Grid
        templateColumns={{
          base: "1fr",
          lg901: "minmax(0, 420px) minmax(96px, 1fr) minmax(0, 360px)",
        }}
        gap={{ base: "8", lg901: "0" }}
        alignItems="start"
        position="relative"
        zIndex="2"
      >
        <Flex
          direction="column"
          align="stretch"
          gap="8"
          w="full"
          gridColumn={{ lg901: 1 }}
        >
          <BenefitIntro
            title={tixSpotlight.benefits[0].title}
            body={tixSpotlight.benefits[0].body}
          />
          {tixSpotlight.rules.map((rule, index) => (
            <RuleCard
              key={rule.label}
              label={rule.label}
              value={rule.value}
              showFlag={"showFlag" in rule ? rule.showFlag : false}
              cardRef={setCardRef(index)}
            />
          ))}
        </Flex>

        <Flex
          direction="column"
          align={{ base: "center", lg901: "stretch" }}
          gap="6"
          justifySelf={{ base: "center", lg901: "end" }}
          w="full"
          maxW={{ base: "280px", md: "320px", lg901: "360px" }}
          gridColumn={{ lg901: 3 }}
        >
          <BenefitIntro
            title={tixSpotlight.benefits[1].title}
            body={tixSpotlight.benefits[1].body}
          />
          <Box ref={ticketRef} w="full">
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
        </Flex>
      </Grid>
    </Box>
  )
}

function BenefitIntro({ title, body }: { title: string; body: string }) {
  return (
    <Box as="header" w="full">
      <Heading
        as="h4"
        fontFamily="cossetteTexte"
        fontSize="22px"
        fontWeight="normal"
        lineHeight="28px"
        letterSpacing="-0.5px"
        color="warmDisplay"
        textWrap="balance"
      >
        {title}
      </Heading>
      <Text
        as="p"
        pt="2"
        fontSize="14px"
        lineHeight="1.4"
        letterSpacing="-0.36px"
        color="warmMuted"
        textWrap="pretty"
      >
        {body}
      </Text>
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
          gap={{ base: "8", lg901: "8" }}
          w="full"
        >
          <Flex
            direction="column"
            align="center"
            gap="6"
            w="full"
            textAlign="center"
          >
            <Text as="p" {...prominentEyebrowTextProps}>
              {tixSpotlight.eyebrow}
            </Text>

            <Heading
              as="h3"
              id="tix-spotlight-heading"
              color="warmDisplay"
              fontFamily="cossetteTitre"
              fontSize={{
                base: "32px",
                md: "44px",
                lg901: "clamp(2.75rem, 4.2vw, 3.6875rem)",
              }}
              fontWeight="normal"
              lineHeight="1.2"
              letterSpacing="0.01em"
              textTransform="uppercase"
              textWrap="balance"
              maxW={{ base: "18ch", md: "22ch", lg901: "26ch" }}
            >
              {tixSpotlight.headlineLine1}
              <Box as="br" />
              {tixSpotlight.headlineLine2}
            </Heading>

            <Image
              src={assetUrl(tixSpotlight.brandImageSrc)}
              alt={tixSpotlight.brandImageAlt}
              mt={{ base: "-5", md: "-6", lg901: "-8" }}
              w={{ base: "220px", md: "280px", lg901: "320px" }}
              h="auto"
              objectFit="contain"
              draggable={false}
            />

            {/* TEMP: supporting body hidden while evaluating headline-only header
            <Text
              as="p"
              fontSize={{ base: "15px", md: "18px" }}
              lineHeight={{ base: "1.5", md: "27px" }}
              letterSpacing="-0.36px"
              color="warmMuted"
              textWrap="pretty"
              maxW="540px"
            >
              {tixSpotlight.body}
            </Text>
            */}
          </Flex>

          <TicketDiagram />
        </Flex>
      </Box>
    </Reveal>
  )
}
