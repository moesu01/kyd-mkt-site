import { useCallback, useState } from "react"
import { AboutSection } from "./components/about-section"
import { FanSection } from "./components/fan-section"
import { FeaturesSection } from "./components/features-section"
import { Footer } from "./components/footer"
import { HeroSplit } from "./components/hero-split"
import { HeroType } from "./components/hero-type"
import { Nav } from "./components/nav"
import { SocialProofSection } from "./components/social-proof-section"
import { VenuesSection } from "./components/venues-section"
import { VersionToggle } from "./components/version-toggle"

function App() {
  const [version, setVersion] = useState<1 | 2>(1)

  const handleVersionChange = useCallback((nextVersion: 1 | 2) => {
    setVersion(nextVersion)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <>
      <VersionToggle version={version} onVersionChange={handleVersionChange} />
      <Nav />
      {version === 1 ? <HeroSplit /> : <HeroType />}
      <FanSection />
      <VenuesSection />
      <FeaturesSection version={version} />
      <SocialProofSection />
      <AboutSection />
      <Footer />
    </>
  )
}

export default App
