import { Box, Flex, Text } from "@chakra-ui/react"
import { useDialKit } from "dialkit"
import { useEffect, useRef, useState } from "react"
import { aboutSection } from "../../content/site-content"
import { AboutCurvedTagline } from "./about-curved-tagline"
import {
  aboutCurvedTaglineDialConfig,
  getEmblemStackMetrics,
  getMarkWidthPx,
} from "./about-curved-tagline-dial"
import { AboutKydMark } from "./about-kyd-mark"
import { useAboutCurvedTaglineParams } from "./use-about-curved-tagline-params"
import { prominentEyebrowTextProps } from "../ui/prominent-eyebrow-styles"

export function AboutEmblem() {
  const dial = useDialKit("About curved tagline", aboutCurvedTaglineDialConfig)
  const { typography, path, mark, stack } = useAboutCurvedTaglineParams(dial)
  const emblemRef = useRef<HTMLDivElement>(null)
  const [emblemWidth, setEmblemWidth] = useState(stack.referenceWidth)

  useEffect(() => {
    const element = emblemRef.current
    if (!element) return

    const updateWidth = () => {
      setEmblemWidth(element.getBoundingClientRect().width)
    }

    updateWidth()
    const observer = new ResizeObserver(updateWidth)
    observer.observe(element)
    return () => observer.disconnect()
  }, [stack.referenceWidth])

  const markWidthPx = getMarkWidthPx({
    emblemWidthPx: emblemWidth,
    mark,
  })
  const { eyebrowGapPx, eyebrowFontSizePx } = getEmblemStackMetrics({
    emblemWidthPx: emblemWidth,
    stack,
  })

  return (
    <Box
      ref={emblemRef}
      position="relative"
      w="full"
      maxW={`${dial.emblem.maxWidthRem}rem`}
      aspectRatio={`${dial.emblem.aspectRatioW}/${dial.emblem.aspectRatioH}`}
      overflow="visible"
    >
      <AboutCurvedTagline
        position="absolute"
        top={{
          base: `${dial.container.topPercentMobile}%`,
          lg901: `${dial.container.topPercentDesktop}%`,
        }}
        left={{
          base: "50%",
          lg901: `${dial.container.leftPercentDesktop}%`,
        }}
        transform={{ base: "translateX(-50%)", lg901: "none" }}
        w={{
          base: `${dial.container.widthPercentMobile}%`,
          lg901: `${dial.container.widthPercentDesktop}%`,
        }}
        maxW={`${dial.container.maxWidthRem}rem`}
        aspectRatio={`${path.viewBoxWidth}/${path.viewBoxHeight}`}
        path={path}
        typography={typography}
      />
      <Flex
        position="absolute"
        bottom={`${stack.bottomPercent}%`}
        left="50%"
        transform="translateX(-50%)"
        direction="column"
        align="center"
        gap={`${eyebrowGapPx}px`}
        zIndex="1"
      >
        <Text
          {...prominentEyebrowTextProps}
          fontSize={`${eyebrowFontSizePx}px`}
        >
          {aboutSection.eyebrow}
        </Text>
        <AboutKydMark widthPx={markWidthPx} />
      </Flex>
    </Box>
  )
}
