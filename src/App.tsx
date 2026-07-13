import { Box } from "@chakra-ui/react"
import { AboutSection } from "./components/about-section"
import { BackedBySection } from "./components/backed-by-section"
import { FanSection } from "./components/fan-section"
import { FeaturesSectionInteractive } from "./components/features-section-interactive"
// TODO: Original FeaturesSection is hidden while evaluating the interactive
// version above. If we commit to the interactive view, delete this import,
// <FeaturesSection /> below, and src/components/features-section.tsx.
// import { FeaturesSection } from "./components/features-section"
import { Footer } from "./components/footer"
import { HeroSplit } from "./components/hero-split"
import { Nav } from "./components/nav"
// TEMP: Press section hidden — restore import and <PressSection /> below when ready.
// import { PressSection } from "./components/press-section"
import { SocialProofSection } from "./components/social-proof-section"
import { UsedByPageSection } from "./components/used-by-page-section"
import { VenuesSection } from "./components/venues-section"

function App() {
  return (
    <>
      <Box
        position="sticky"
        top="0"
        zIndex="100"
        pt="5"
        px={{ base: "6", lg901: "10" }}
        display="flex"
        justifyContent="center"
        mb="-70px"
      >
        <Nav />
      </Box>
      <HeroSplit />
      <BackedBySection />
      <AboutSection />
      <VenuesSection />
      <FeaturesSectionInteractive />
      {/* TODO: Hidden pending decision on interactive vs. original Platform
          section. Remove FeaturesSection entirely if unused. */}
      {/* <FeaturesSection /> */}
      <UsedByPageSection />
      <SocialProofSection />
      {/* TEMP: Press section hidden — <PressSection /> */}
      <FanSection />
      <Footer />
    </>
  )
}

export default App
