import { useDialKit } from "dialkit"
import { AboutCurvedTagline } from "./about-curved-tagline"
import { aboutCurvedTaglineDialConfig } from "./about-curved-tagline-dial"
import { type AboutLogoLoopMode } from "./about-logo-loop"
import { type AboutHeroPresentation } from "./about-hero-transition"
import { useAboutCurvedTaglineParams } from "./use-about-curved-tagline-params"

interface AboutEmblemProps {
  presentation?: Pick<
    AboutHeroPresentation,
    | "emblemScale"
    | "heroAnimationOpacity"
    | "aboutAnimationOpacity"
    | "aboutAnimationProgress"
  >
  mode?: AboutLogoLoopMode
  skipIntro?: boolean
  /** Hide curved tagline (hero). Defaults to shown unless revealCurvedText. */
  curvedTextOpacity?: number
  /** Use section Reveal stagger for the curved tagline. */
  revealCurvedText?: boolean
  onHeroSettled?: () => void
}

export function AboutEmblem({
  presentation,
  mode = "about",
  skipIntro = false,
  curvedTextOpacity,
  revealCurvedText = false,
  onHeroSettled,
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
      heroAnimationOpacity={presentation?.heroAnimationOpacity ?? 0}
      aboutAnimationOpacity={presentation?.aboutAnimationOpacity ?? 1}
      aboutAnimationProgress={presentation?.aboutAnimationProgress ?? 1}
      mode={mode}
      skipIntro={skipIntro}
      onHeroSettled={onHeroSettled}
    />
  )
}
