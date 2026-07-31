import { useDialKit } from "dialkit"
import { AboutCurvedTagline } from "./about-curved-tagline"
import { aboutCurvedTaglineDialConfig } from "./about-curved-tagline-dial"
import { type AboutHeroPresentation } from "./about-hero-transition"
import { useAboutCurvedTaglineParams } from "./use-about-curved-tagline-params"

interface AboutEmblemProps {
  presentation?: Pick<
    AboutHeroPresentation,
    | "emblemScale"
    | "aboutAnimationOpacity"
    | "aboutAnimationProgress"
  >
  /** Hide curved tagline (hero). Defaults to shown unless revealCurvedText. */
  curvedTextOpacity?: number
  /** Use section Reveal stagger for the curved tagline. */
  revealCurvedText?: boolean
}

export function AboutEmblem({
  presentation,
  curvedTextOpacity,
  revealCurvedText = false,
}: AboutEmblemProps) {
  const dial = useDialKit("About curved tagline", aboutCurvedTaglineDialConfig)
  const { typography, path, mark, layout } = useAboutCurvedTaglineParams(dial)

  return (
    <AboutCurvedTagline
      w="full"
      maxW="full"
      mx="auto"
      path={path}
      typography={typography}
      mark={mark}
      markGap={layout.markGap}
      markAlign={layout.markAlign}
      logoLoopScale={layout.logoLoopScale}
      emblemScale={presentation?.emblemScale ?? 1}
      curvedTextOpacity={curvedTextOpacity ?? 1}
      revealCurvedText={revealCurvedText}
      aboutAnimationOpacity={presentation?.aboutAnimationOpacity ?? 1}
      aboutAnimationProgress={presentation?.aboutAnimationProgress ?? 1}
    />
  )
}
