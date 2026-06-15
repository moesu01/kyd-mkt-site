import { Box, Flex, Grid, Text, chakra } from "@chakra-ui/react"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type KeyboardEvent,
} from "react"
import { features, links } from "../content/site-content"
import { Button } from "./ui/button"
import { Container } from "./ui/container"
import { SectionHeading } from "./ui/section-heading"

const dwellMs = 6000
const iconEase = "cubic-bezier(0.2, 0, 0, 1)"
const featureCount = features.length

const panelTransition = {
  transitionProperty: "opacity, transform, filter",
  transitionDuration: "300ms",
  transitionTimingFunction: iconEase,
} as const

interface FeatureProgressTrackProps {
  isActive: boolean
  cycleKey: number
  animateProgress: boolean
  onProgressComplete: (cycleKey: number) => void
}

function FeatureProgressTrack({
  isActive,
  cycleKey,
  animateProgress,
  onProgressComplete,
}: FeatureProgressTrackProps) {
  const fallbackTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isActive || !animateProgress) return

    fallbackTimeoutRef.current = window.setTimeout(() => {
      onProgressComplete(cycleKey)
    }, dwellMs + 50)

    return () => {
      if (fallbackTimeoutRef.current) {
        window.clearTimeout(fallbackTimeoutRef.current)
        fallbackTimeoutRef.current = null
      }
    }
  }, [isActive, cycleKey, animateProgress, onProgressComplete])

  function handleAnimationEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.animationName !== "feature-progress-fill") return

    if (fallbackTimeoutRef.current) {
      window.clearTimeout(fallbackTimeoutRef.current)
      fallbackTimeoutRef.current = null
    }

    onProgressComplete(cycleKey)
  }

  return (
    <Box
      position="relative"
      h="1px"
      w="full"
      bg="rgba(255, 255, 255, 0.075)"
      aria-hidden
    >
      {isActive ? (
        <Box
          key={cycleKey}
          position="absolute"
          top="0"
          left="0"
          h="100%"
          w="100%"
          bg="fg"
          className={animateProgress ? "feature-progress-fill" : undefined}
          style={
            animateProgress
              ? ({ ["--feature-dwell-ms" as string]: `${dwellMs}ms` } as const)
              : undefined
          }
          css={animateProgress ? undefined : { transform: "scaleX(1)" }}
          onAnimationEnd={handleAnimationEnd}
        />
      ) : null}
    </Box>
  )
}

interface FeatureListItemProps {
  index: number
  title: string
  body: string
  isActive: boolean
  cycleKey: number
  animateProgress: boolean
  onSelect: (index: number) => void
  onProgressComplete: (cycleKey: number) => void
}

function FeatureListItem({
  index,
  title,
  body,
  isActive,
  cycleKey,
  animateProgress,
  onSelect,
  onProgressComplete,
}: FeatureListItemProps) {
  function handleClick() {
    onSelect(index)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSelect(index)
    }
  }

  return (
    <Box as="li" listStyleType="none">
      <FeatureProgressTrack
        isActive={isActive}
        cycleKey={cycleKey}
        animateProgress={animateProgress}
        onProgressComplete={onProgressComplete}
      />
      <chakra.button
        type="button"
        role="tab"
        id={`platform-interactive-tab-${index}`}
        aria-selected={isActive}
        aria-controls={`platform-interactive-panel-${index}`}
        tabIndex={isActive ? 0 : -1}
        display="block"
        w="full"
        textAlign="left"
        border="none"
        bg="transparent"
        cursor="pointer"
        py="4"
        color={isActive ? "fg" : "fgMuted"}
        fontSize="16px"
        fontWeight={isActive ? "580" : "medium"}
        lineHeight="1.4"
        letterSpacing={isActive ? "0.01em" : "0"}
        css={{
          transitionProperty: "color, font-weight, letter-spacing",
          transitionDuration: "200ms",
          transitionTimingFunction: iconEase,
          _hover: { color: "fg" },
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {title}
      </chakra.button>
      <Box
        id={`platform-interactive-panel-${index}`}
        role="tabpanel"
        aria-labelledby={`platform-interactive-tab-${index}`}
        hidden={!isActive}
        overflow="hidden"
        css={{
          ...panelTransition,
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0)" : "translateY(8px)",
          filter: isActive ? "blur(0px)" : "blur(4px)",
          maxHeight: isActive ? "200px" : "0",
          transitionProperty:
            "opacity, transform, filter, max-height, padding-bottom",
          transitionDuration: "300ms",
          paddingBottom: isActive ? "4" : "0",
        }}
      >
        <Text
          fontSize="14px"
          lineHeight="1.6"
          color="fgMuted"
          textWrap="pretty"
          pb="2"
        >
          {body}
        </Text>
      </Box>
    </Box>
  )
}

interface FeatureVisualPlaceholderProps {
  index: number
  title: string
  icon: string
  isActive: boolean
}

function FeatureVisualPlaceholder({
  index,
  title,
  icon,
  isActive,
}: FeatureVisualPlaceholderProps) {
  return (
    <Flex
      position="absolute"
      inset="0"
      direction="column"
      align="center"
      justify="center"
      gap="4"
      p="8"
      aria-hidden={!isActive}
      css={{
        ...panelTransition,
        opacity: isActive ? 1 : 0,
        transform: isActive ? "translateY(0)" : "translateY(12px)",
        filter: isActive ? "blur(0px)" : "blur(4px)",
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <Flex
        align="center"
        justify="center"
        h="16"
        w="16"
        borderRadius="16px"
        border="1px solid"
        borderColor="border"
        fontSize="2xl"
        color="accent"
        opacity="0.5"
      >
        {icon}
      </Flex>
      <Text fontSize="sm" color="fgGhost" textAlign="center">
        Visual placeholder — {title}
      </Text>
      <Text fontSize="xs" color="fgDim" textAlign="center">
        Slot {index + 1} of {featureCount}
      </Text>
    </Flex>
  )
}

export function FeaturesSectionInteractive() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [cycleKey, setCycleKey] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const cycleKeyRef = useRef(cycleKey)
  const animateProgress = !prefersReducedMotion

  cycleKeyRef.current = cycleKey

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    function handleChange() {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const advanceToNext = useCallback(() => {
    if (prefersReducedMotion) return

    setActiveIndex((current) => (current + 1) % featureCount)
    setCycleKey((key) => key + 1)
  }, [prefersReducedMotion])

  const handleProgressComplete = useCallback(
    (completedCycleKey: number) => {
      if (prefersReducedMotion) return
      if (completedCycleKey !== cycleKeyRef.current) return
      advanceToNext()
    },
    [advanceToNext, prefersReducedMotion],
  )

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index)
    setCycleKey((key) => key + 1)
  }, [])

  return (
    <Box
      as="section"
      id="platform-interactive"
      borderTop="1px solid"
      borderColor="border"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
    >
      <Container>
        <Grid
          templateColumns={{ base: "1fr", lg901: "2fr 3fr" }}
          gap={{ base: "12", lg901: "16" }}
          alignItems="start"
        >
          <Box>
            <Box mb="8">
              <SectionHeading
                label="Platform"
                css={{ "& h2": { fontSize: "clamp(2.5rem, 5vw, 4rem)" } }}
                headline={
                  <>
                    Ticketing,
                    <br />
                    <Text as="span" color="accent">
                      built for control.
                    </Text>
                  </>
                }
              />
            </Box>

            <Flex mb="10">
              <Button href={links.getInTouch} variant="outline">
                Get in touch →
              </Button>
            </Flex>

            <Box
              as="ul"
              role="tablist"
              aria-label="Platform features"
              m="0"
              p="0"
            >
              {features.map((feature, index) => (
                <FeatureListItem
                  key={feature.title}
                  index={index}
                  title={feature.title}
                  body={feature.body}
                  isActive={activeIndex === index}
                  cycleKey={cycleKey}
                  animateProgress={animateProgress}
                  onSelect={handleSelect}
                  onProgressComplete={handleProgressComplete}
                />
              ))}
            </Box>
          </Box>

          <Box
            position="relative"
            alignSelf="stretch"
            h="full"
            minH={{ base: "280px", lg901: "480px" }}
            borderRadius="16px"
            bg="surfaceRaised"
            overflow="hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            {features.map((feature, index) => (
              <FeatureVisualPlaceholder
                key={feature.title}
                index={index}
                title={feature.title}
                icon={feature.icon}
                isActive={activeIndex === index}
              />
            ))}
          </Box>
        </Grid>
      </Container>
    </Box>
  )
}
