import { useDialKit } from "dialkit"
import { AboutCurvedTagline } from "./about-curved-tagline"
import { aboutCurvedTaglineDialConfig } from "./about-curved-tagline-dial"
import { useAboutCurvedTaglineParams } from "./use-about-curved-tagline-params"

export function AboutEmblem() {
  const dial = useDialKit("About curved tagline", aboutCurvedTaglineDialConfig)
  const { typography, path, mark, layout } = useAboutCurvedTaglineParams(dial)

  return (
    <AboutCurvedTagline
      w="full"
      maxW={`${layout.maxWidthRem}rem`}
      mx="auto"
      path={path}
      typography={typography}
      mark={mark}
      markGap={layout.markGap}
      markAlign={layout.markAlign}
    />
  )
}
