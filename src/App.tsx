import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { AboutSection } from "./components/about-section"
import { AlternateNav } from "./components/alternate-nav"
import { BackedBySection } from "./components/backed-by-section"
import { FanSection } from "./components/fan-section"
import { FeaturesSectionInteractive } from "./components/features-section-interactive"
// TODO: Original FeaturesSection is hidden while evaluating the interactive
// version above. If we commit to the interactive view, delete this import,
// <FeaturesSection /> below, and src/components/features-section.tsx.
// import { FeaturesSection } from "./components/features-section"
import { HeroAboutBackground } from "./components/hero-about-background"
import { HeroSection } from "./components/hero-section"
// TEMP: Press section hidden — restore import and <PressSection /> below when ready.
// import { PressSection } from "./components/press-section"
import { SocialProofSection } from "./components/social-proof-section"
import { BandSeparatorSection } from "./components/band-separator-section"
import { UsedByPageSection } from "./components/used-by-page-section"
import { VenuesSection } from "./components/venues-section"

function App() {
  const [isHeroNav, setIsHeroNav] = useState(true)

  useEffect(() => {
    const hero = document.getElementById("hero")
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // The default nav has scrolled away by this point; bring in the
        // compact fixed nav once half of the hero remains visible.
        setIsHeroNav(entry.intersectionRatio > 0.5)
      },
      {
        threshold: 0.5,
      },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Box position="relative" zIndex={1}>
        <Box
          position={isHeroNav ? "absolute" : "fixed"}
          top={isHeroNav ? "34px" : "5"}
          left="0"
          right="0"
          zIndex="100"
          px={{
            base: "6",
            lg901: isHeroNav ? "37px" : "10",
          }}
          display="flex"
          justifyContent="center"
          transitionProperty="top, padding"
          transitionDuration="280ms"
          transitionTimingFunction="cubic-bezier(0.2, 0, 0, 1)"
        >
          <AlternateNav variant={isHeroNav ? "hero" : "compact"} />
        </Box>
        <Box position="relative">
          <HeroAboutBackground />
          <Box position="relative" zIndex={1}>
            <HeroSection />
          </Box>
        </Box>
        <BackedBySection />
        <VenuesSection />
        <BandSeparatorSection />
        <FeaturesSectionInteractive />
        {/* TODO: Hidden pending decision on interactive vs. original Platform
            section. Remove FeaturesSection entirely if unused. */}
        {/* <FeaturesSection /> */}
        <UsedByPageSection />
        <SocialProofSection />
        <FanSection />
        <AboutSection />
        {/* TEMP: Press section hidden — <PressSection /> */}
      </Box>
    </>
  )
}

export default App
