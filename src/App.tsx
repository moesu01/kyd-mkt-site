import { Box } from "@chakra-ui/react"
import { AboutSection } from "./components/about-section"
import { FanSection } from "./components/fan-section"
import { FeaturesSection } from "./components/features-section"
import { Footer } from "./components/footer"
import { HeroSplit } from "./components/hero-split"
import { Nav } from "./components/nav"
import { PressSection } from "./components/press-section"
import { SocialProofSection } from "./components/social-proof-section"
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
      <AboutSection />
      <VenuesSection />
      <FeaturesSection />
      <FanSection />
      <SocialProofSection />
      <PressSection />
      <Footer />
    </>
  )
}

export default App
