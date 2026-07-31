import { Box, Flex, Grid, Heading, Image, Text, chakra } from "@chakra-ui/react"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type KeyboardEvent,
} from "react"
import { features } from "../content/site-content"
import platformVisualBg from "../assets/images/platform-visual-temp.jpg"
import unscalpableVisual from "../assets/images/feature-unscalpable.jpg"
import dataOwnershipVisual from "../assets/images/feature-data-ownership.jpg"
import {
  EmailCampaignVisual,
  emailCampaignVisualTitle,
} from "./email-campaign-visual"
import { Container } from "./ui/container"
import { Reveal, RevealGroup } from "./ui/reveal"
import { VenueAudiencesGrid } from "./venue-audiences-grid"

const dwellMs = 6000
const iconEase = "cubic-bezier(0.2, 0, 0, 1)"
const visualBgEnterDurationMs = 300
const featureCount = features.length

const featureVisuals: Record<string, string> = {
  "Unscalpable Resale Capture": unscalpableVisual,
  "Data Ownership": dataOwnershipVisual,
}

function getFeatureVisualSrc(title: string) {
  return featureVisuals[title] ?? platformVisualBg
}

const kydMarkSmPath =
  "M19 11V8.3675H12.6155L17.1212 3.7706L15.3192 1.88453L10.8135 6.48143V0H8.18652L8.2016 6.43536L3.72748 1.88453L1.87882 3.7706L6.39954 8.3675H0V11H19Z"

function KydMarkSm({ color }: { color: string }) {
  return (
    <Box
      as="span"
      aria-hidden
      display="inline-flex"
      flexShrink={0}
      color={color}
    >
      <chakra.svg width="19px" height="11px" viewBox="0 0 19 11" fill="none">
        <path d={kydMarkSmPath} fill="currentColor" />
      </chakra.svg>
    </Box>
  )
}

interface FeatureVisualBackgroundProps {
  activeIndex: number
  exitingIndex: number | null
  contentKey: number
  prefersReducedMotion: boolean
}

function FeatureVisualBackground({
  activeIndex,
  exitingIndex,
  contentKey,
  prefersReducedMotion,
}: FeatureVisualBackgroundProps) {
  const motionless = prefersReducedMotion

  return (
    <>
      {features.map((feature, index) => {
        const isActive = activeIndex === index
        const isExiting = exitingIndex === index

        if (!isActive && !isExiting) return null

        return (
          <Box
            key={isActive ? `${feature.title}-${contentKey}` : feature.title}
            position="absolute"
            inset="0"
            aria-hidden={!isActive}
            css={{ zIndex: isActive ? 2 : 1 }}
          >
            {feature.title === emailCampaignVisualTitle ? (
              <EmailCampaignVisual shouldAnimate={isActive && !motionless} />
            ) : (
              <Image
                position="absolute"
                inset="0"
                w="full"
                h="full"
                src={getFeatureVisualSrc(feature.title)}
                alt=""
                objectFit="cover"
                objectPosition="center"
                draggable={false}
                className={
                  isActive && !motionless ? "feature-visual-bg-enter" : undefined
                }
                css={{
                  opacity: isExiting ? 1 : motionless ? 1 : undefined,
                }}
              />
            )}
          </Box>
        )
      })}
    </>
  )
}

type NavDirection = "up" | "down" | "none"

function getEnterOffset(direction: NavDirection) {
  if (direction === "down") return "12px"
  if (direction === "up") return "-12px"
  return "8px"
}

function getExitOffset(direction: NavDirection) {
  if (direction === "down") return "-12px"
  if (direction === "up") return "12px"
  return "-8px"
}

function PlatformSectionLabel({
  label,
  headingAs = "h5",
}: {
  label: string
  headingAs?: "h5" | "p"
}) {
  return (
    <Heading
      as={headingAs}
      display="flex"
      alignItems="center"
      gap="1.5"
      w={headingAs === "h5" ? "full" : undefined}
      flexShrink={0}
      fontFamily="cossetteTexte"
      fontSize="14px"
      fontWeight="bold"
      lineHeight="1.2"
      letterSpacing="0"
      color="warmMuted"
      textAlign="left"
    >
      <KydMarkSm color="inherit" />
      {label}
    </Heading>
  )
}

function PlatformInteractiveHeader() {
  return (
    <Flex
      direction="column"
      flex={{ base: "initial", lg901: "1" }}
      minH={{ base: "auto", lg901: "10" }}
      minW="0"
      w="full"
    >
      <PlatformSectionLabel label="KYD Labs Platform" headingAs="p" />
      <Flex flex="1" align="center" minH="0" minW="0" w="full">
        <Heading
          as="h3"
          py="3"
          w="full"
          maxW="100%"
          color="warmDisplay"
          fontFamily="cossetteTitre"
          fontSize={{
            base: "32px",
            md: "40px",
            lg901: "clamp(2rem, 2.6vw, 2.75rem)",
            xl: "clamp(2.25rem, 3.2vw, 3.375rem)",
          }}
          fontWeight="700"
          lineHeight="1.1"
          letterSpacing="0"
          textWrap="balance"
        >
          Ticketing,
          <Box as="br" display={{ base: "none", lg: "inline" }} />
          built for control.
        </Heading>
      </Flex>
    </Flex>
  )
}

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
      bg="rgba(255, 255, 255, 0.1)"
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
          className={
            animateProgress
              ? "feature-progress-fill"
              : "feature-progress-fill feature-progress-fill--complete"
          }
          style={
            animateProgress
              ? ({ ["--feature-dwell-ms" as string]: `${dwellMs}ms` } as const)
              : undefined
          }
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
  enterDirection: NavDirection
  contentKey: number
  prefersReducedMotion: boolean
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
  enterDirection,
  contentKey,
  prefersReducedMotion,
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

  const motionless = prefersReducedMotion
  const enterOffset = getEnterOffset(enterDirection)

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
        color="fg"
        fontFamily="cossetteTexte"
        fontSize="16px"
        fontWeight={isActive ? "700" : "400"}
        lineHeight="22.4px"
        letterSpacing={isActive ? "0.16px" : "0"}
        css={{
          transitionProperty: "opacity, letter-spacing, transform",
          transitionDuration: motionless ? "0ms" : "200ms",
          transitionTimingFunction: iconEase,
          opacity: isActive ? 1 : 0.75,
          _hover: { opacity: 1 },
          _active: motionless ? undefined : { transform: "scale(0.96)" },
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {title}
      </chakra.button>
      <Box overflow="hidden">
        {isActive ? (
          <Box
            key={contentKey}
            id={`platform-interactive-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`platform-interactive-tab-${index}`}
            className={motionless ? undefined : "feature-body-enter"}
            style={
              motionless
                ? undefined
                : ({ ["--feature-enter-y" as string]: enterOffset } as const)
            }
          >
            <Text
              as="p"
              fontFamily="sans"
              fontSize={{ base: "13px", lg: "14px" }}
              lineHeight="1.4"
              letterSpacing="0"
              color="warmMuted"
              textWrap="pretty"
              pb={{ base: "1rem", lg: "2rem" }}
            >
              {body}
            </Text>
          </Box>
        ) : null}
      </Box>
    </Box>
  )
}

interface FeatureVisualPlaceholderProps {
  index: number
  title: string
  icon: string
  isActive: boolean
  isExiting: boolean
  enterDirection: NavDirection
  exitDirection: NavDirection
  contentKey: number
  prefersReducedMotion: boolean
  onExitComplete: (index: number) => void
}

function FeatureVisualPlaceholder({
  index,
  title,
  icon,
  isActive,
  isExiting,
  enterDirection,
  exitDirection,
  contentKey,
  prefersReducedMotion,
  onExitComplete,
}: FeatureVisualPlaceholderProps) {
  const motionless = prefersReducedMotion
  const enterOffset = getEnterOffset(enterDirection)
  const exitOffset = getExitOffset(exitDirection)

  function handleVisualExitEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.animationName !== "feature-visual-exit") return
    onExitComplete(index)
  }

  if (isExiting) {
    return (
      <Flex
        position="absolute"
        inset="0"
        direction="column"
        align="center"
        justify="center"
        gap="4"
        p="8"
        zIndex="1"
        aria-hidden
        className={motionless ? undefined : "feature-visual-exit"}
        style={
          motionless
            ? undefined
            : ({ ["--feature-exit-y" as string]: exitOffset } as const)
        }
        onAnimationEnd={handleVisualExitEnd}
      >
        <FeatureVisualContent index={index} title={title} icon={icon} />
      </Flex>
    )
  }

  if (!isActive) return null

  return (
    <Flex
      key={contentKey}
      position="absolute"
      inset="0"
      direction="column"
      align="center"
      justify="center"
      gap="4"
      p="8"
      zIndex="1"
      aria-hidden={false}
      className={motionless ? undefined : "feature-body-enter"}
      style={
        motionless
          ? undefined
          : ({ ["--feature-enter-y" as string]: enterOffset } as const)
      }
    >
      <FeatureVisualContent index={index} title={title} icon={icon} />
    </Flex>
  )
}

function FeatureVisualContent({
  index,
  title,
  icon,
}: {
  index: number
  title: string
  icon: string
}) {
  return (
    <>
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
    </>
  )
}

export function FeaturesSectionInteractive() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [exitingIndex, setExitingIndex] = useState<number | null>(null)
  const [enterDirection, setEnterDirection] = useState<NavDirection>("none")
  const [exitDirection, setExitDirection] = useState<NavDirection>("none")
  const [cycleKey, setCycleKey] = useState(0)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const cycleKeyRef = useRef(cycleKey)
  const animateProgress = !prefersReducedMotion

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    function handleChange() {
      setPrefersReducedMotion(mediaQuery.matches)
    }

    handleChange()
    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const navigateTo = useCallback(
    (index: number, direction: NavDirection) => {
      if (index === activeIndex) return

      setEnterDirection(direction)
      setExitDirection(direction)
      setExitingIndex(activeIndex)
      setActiveIndex(index)
      cycleKeyRef.current += 1
      setCycleKey(cycleKeyRef.current)

      if (prefersReducedMotion) {
        setExitingIndex(null)
      }
    },
    [activeIndex, prefersReducedMotion],
  )

  const advanceToNext = useCallback(() => {
    if (prefersReducedMotion) return

    setActiveIndex((current) => {
      setExitingIndex(current)
      setEnterDirection("down")
      setExitDirection("down")
      return (current + 1) % featureCount
    })
    cycleKeyRef.current += 1
    setCycleKey(cycleKeyRef.current)
  }, [prefersReducedMotion])

  const handleProgressComplete = useCallback(
    (completedCycleKey: number) => {
      if (prefersReducedMotion) return
      if (completedCycleKey !== cycleKeyRef.current) return
      advanceToNext()
    },
    [advanceToNext, prefersReducedMotion],
  )

  const handleSelect = useCallback(
    (index: number) => {
      const direction: NavDirection =
        index > activeIndex ? "down" : index < activeIndex ? "up" : "none"
      navigateTo(index, direction)
    },
    [activeIndex, navigateTo],
  )

  const handleExitComplete = useCallback((index: number) => {
    setExitingIndex((current) => (current === index ? null : current))
  }, [])

  useEffect(() => {
    if (exitingIndex === null || prefersReducedMotion) return

    const timeoutId = window.setTimeout(() => {
      handleExitComplete(exitingIndex)
    }, visualBgEnterDurationMs + 50)

    return () => window.clearTimeout(timeoutId)
  }, [exitingIndex, handleExitComplete, prefersReducedMotion])

  return (
    <Box
      as="section"
      id="platform"
      bg="pageBg"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "10", lg901: "14" }}
    >
      <Flex direction="column" gap="12" w="full">
        <RevealGroup w="full" px="25px">
          <Container>
            <Reveal order={0}>
              <Heading
                as="h2"
                textStyle="cossetteDisplayHeading"
                fontWeight="normal"
                textTransform="uppercase"
                color="warmDisplay"
                textWrap="balance"
              >
                Our Platform
              </Heading>
            </Reveal>
            <Box mt="12">
              <VenueAudiencesGrid />
            </Box>
          </Container>
        </RevealGroup>

        <RevealGroup w="full">
        <Container maxW="containerFramed">
        <Reveal order={0}>
        <Box
          w="full"
          borderRadius="32px"
          bg="frameBg"
          p="25px"
          boxShadow="frame"
        >
          <Grid
            templateColumns={{ base: "1fr", lg901: "2fr 3fr" }}
            gap={{ base: "6", lg901: "6" }}
            alignItems="stretch"
          >
          <Flex
            direction="column"
            h="full"
            minH="0"
          >
            <PlatformInteractiveHeader />

            <Box
              as="ul"
              role="tablist"
              aria-label="Platform features"
              m="0"
              p="0"
              mt={{ base: "10", lg901: 0 }}
              flexShrink={0}
            >
              {features.map((feature, index) => (
                <FeatureListItem
                  key={feature.title}
                  index={index}
                  title={feature.title}
                  body={feature.body}
                  isActive={activeIndex === index}
                  enterDirection={enterDirection}
                  contentKey={cycleKey}
                  prefersReducedMotion={prefersReducedMotion}
                  cycleKey={cycleKey}
                  animateProgress={animateProgress}
                  onSelect={handleSelect}
                  onProgressComplete={handleProgressComplete}
                />
              ))}
            </Box>
          </Flex>

          <Box
            position="relative"
            w="full"
            aspectRatio="1/1"
            alignSelf={{ base: "auto", lg901: "start" }}
            borderRadius="16px"
            bg="pageBg"
            overflow="hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            <FeatureVisualBackground
              activeIndex={activeIndex}
              exitingIndex={exitingIndex}
              contentKey={cycleKey}
              prefersReducedMotion={prefersReducedMotion}
            />
            {features.map((feature, index) => {
              if (feature.title === emailCampaignVisualTitle) return null

              return (
                <FeatureVisualPlaceholder
                  key={feature.title}
                  index={index}
                  title={feature.title}
                  icon={feature.icon}
                  isActive={activeIndex === index}
                  isExiting={exitingIndex === index}
                  enterDirection={enterDirection}
                  exitDirection={exitDirection}
                  contentKey={cycleKey}
                  prefersReducedMotion={prefersReducedMotion}
                  onExitComplete={handleExitComplete}
                />
              )
            })}
          </Box>
          </Grid>
        </Box>
        </Reveal>
      </Container>
        </RevealGroup>
      </Flex>
    </Box>
  )
}
