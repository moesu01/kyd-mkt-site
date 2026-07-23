import { Box } from "@chakra-ui/react"
import { useCallback, useState } from "react"
import { AboutSection } from "./components/about-section"
import { AlternateNav } from "./components/alternate-nav"
import { BackedBySection } from "./components/backed-by-section"
// TEMP: Fan section hidden — restore import and <FanSection /> below when ready.
// import { FanSection } from "./components/fan-section"
import { FeaturesSectionInteractive } from "./components/features-section-interactive"
// TODO: Original FeaturesSection is hidden while evaluating the interactive
// version above. If we commit to the interactive view, delete this import,
// <FeaturesSection /> below, and src/components/features-section.tsx.
// import { FeaturesSection } from "./components/features-section"
import { Footer } from "./components/footer"
import { HeroAboutBackground } from "./components/hero-about-background"
import { HeroSection } from "./components/hero-section"
import type { HeroLayout } from "./components/hero-split"
// TEMP: Press section hidden — restore import and <PressSection /> below when ready.
// import { PressSection } from "./components/press-section"
import { SocialProofSection } from "./components/social-proof-section"
import { UsedByPageSection } from "./components/used-by-page-section"
import { VenuesSection } from "./components/venues-section"

function App() {
  const [isHeroIntroVisible, setIsHeroIntroVisible] = useState(false)
  // TEMP: layout A/B via "Find my tickets" — remove after choosing a hero.
  const [heroLayout, setHeroLayout] = useState<HeroLayout>("centered")

  const handleHeroSettled = useCallback(() => {
    setIsHeroIntroVisible(true)
  }, [])

  const handleToggleHeroLayout = useCallback(() => {
    // Keep nav/copy settled across swaps; don't replay the logo intro.
    setIsHeroIntroVisible(true)
    setHeroLayout((previous) =>
      previous === "centered" ? "split" : "centered",
    )
  }, [])

  return (
    <>
      <Box position="relative" zIndex={1}>
        <Box
          position="sticky"
          top="5"
          zIndex="100"
          px={{ base: "6", lg901: "10" }}
          display="flex"
          justifyContent="center"
          mb="-70px"
        >
          <AlternateNav isIntroVisible={isHeroIntroVisible} />
        </Box>
        <Box position="relative">
          <HeroAboutBackground isHeroIntroVisible={isHeroIntroVisible} />
          <Box position="relative" zIndex={1}>
            <HeroSection
              layout={heroLayout}
              onToggleLayout={handleToggleHeroLayout}
              onHeroSettled={handleHeroSettled}
              isIntroSettled={isHeroIntroVisible}
            />
            <AboutSection />
          </Box>
        </Box>
        <BackedBySection />
        <VenuesSection />
        <FeaturesSectionInteractive />
        {/* TODO: Hidden pending decision on interactive vs. original Platform
            section. Remove FeaturesSection entirely if unused. */}
        {/* <FeaturesSection /> */}
        <UsedByPageSection />
        <SocialProofSection />
        {/* TEMP: Press section hidden — <PressSection /> */}
        {/* TEMP: Fan section hidden — <FanSection /> */}
      </Box>
      <Footer />
    </>
  )
}

export default App
