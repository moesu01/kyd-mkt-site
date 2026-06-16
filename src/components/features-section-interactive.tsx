import { Box, Flex, Grid, Heading, Image, Text, chakra } from "@chakra-ui/react"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type KeyboardEvent,
} from "react"
import { features, links } from "../content/site-content"
import platformVisualBg from "../assets/images/platform-visual-temp.jpg"
import unscalpableVisual from "../assets/images/feature-unscalpable.jpg"
import dataOwnershipVisual from "../assets/images/feature-data-ownership.jpg"
import { Button } from "./ui/button"
import { Container } from "./ui/container"

const platformEyebrowGradient =
  "linear-gradient(to right, #cccccc 19.928%, #888888 91.667%)"

const dwellMs = 6000
const iconEase = "cubic-bezier(0.2, 0, 0, 1)"
const visualBgEnterDurationMs = 300
const featureCount = features.length
const featureBodyMinH = "7.5rem"

const featureVisuals: Record<string, string> = {
  Unscalpable: unscalpableVisual,
  "Data Ownership": dataOwnershipVisual,
}

function getFeatureVisualSrc(title: string) {
  return featureVisuals[title] ?? platformVisualBg
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
          <Image
            key={isActive ? `${feature.title}-${contentKey}` : feature.title}
            position="absolute"
            inset="0"
            w="full"
            h="full"
            src={getFeatureVisualSrc(feature.title)}
            alt=""
            objectFit="cover"
            objectPosition="center"
            aria-hidden={!isActive}
            draggable={false}
            className={isActive && !motionless ? "feature-visual-bg-enter" : undefined}
            css={{
              opacity: isExiting ? 1 : motionless ? 1 : undefined,
              zIndex: isActive ? 2 : 1,
            }}
          />
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

function PlatformInteractiveHeader() {
  return (
    <Box>
      <Flex align="center" gap="1.5">
        <Image
          src="/icons/kyd-dashboard-mark.svg"
          alt=""
          h="11px"
          w="19px"
          flexShrink={0}
          aria-hidden
        />
        <Text
          fontSize="16px"
          fontWeight="semibold"
          lineHeight="18px"
          whiteSpace="nowrap"
          css={{
            backgroundImage: platformEyebrowGradient,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          KYD Dashboard
        </Text>
      </Flex>
      <Heading
        as="h2"
        pt="6"
        color="fg"
        textStyle="platformHeading"
        textWrap="balance"
      >
        Ticketing,
        <br />
        built for control.
      </Heading>
    </Box>
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
        fontSize="16px"
        fontWeight={isActive ? "semibold" : "medium"}
        lineHeight="22.4px"
        letterSpacing={isActive ? "0.16px" : "0"}
        css={{
          transitionProperty: "opacity, letter-spacing, transform",
          transitionDuration: motionless ? "0ms" : "200ms",
          transitionTimingFunction: iconEase,
          opacity: isActive ? 1 : 0.75,
          _hover: { opacity: 1 },
          _active: motionless ? undefined : { transform: "scale(0.98)" },
        }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {title}
      </chakra.button>
      <Box minH={isActive ? featureBodyMinH : 0} overflow="hidden">
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
              fontSize="14px"
              lineHeight="22.4px"
              color="fgFeature"
              textWrap="pretty"
              pb="2"
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

  const navigateTo = useCallback(
    (index: number, direction: NavDirection) => {
      if (index === activeIndex) return

      setEnterDirection(direction)
      setExitDirection(direction)
      setExitingIndex(activeIndex)
      setActiveIndex(index)
      setCycleKey((key) => key + 1)

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
      id="platform-interactive"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
    >
      <Container maxW="containerFramed">
        <Box
          w="full"
          border="1px solid"
          borderColor="frameBorder"
          borderRadius="32px"
          bg="black"
          p="25px"
        >
          <Grid
            templateColumns={{ base: "1fr", lg901: "2fr 3fr" }}
            gap={{ base: "12", lg901: "16" }}
            alignItems="stretch"
          >
          <Flex
            direction="column"
            h="full"
            minH="0"
          >
            <PlatformInteractiveHeader />

            <Flex mt="8" flexShrink={0}>
              <Button href={links.getInTouch} variant="outline">
                Get in touch →
              </Button>
            </Flex>

            <Box
              flex="1"
              minH={{ base: 0, lg901: "10" }}
              display={{ base: "none", lg901: "block" }}
              aria-hidden
            />

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
            bg="bg"
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
            {features.map((feature, index) => (
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
            ))}
          </Box>
        </Grid>
        </Box>
      </Container>
    </Box>
  )
}
