import { Box } from "@chakra-ui/react"
import { Container } from "./ui/container"
import { Reveal, RevealGroup } from "./ui/reveal"
import { TouringArtistsList } from "./touring-artists-list"
import { UsedByCarousel, UsedBySection } from "./used-by-section"

export function UsedByPageSection() {
  return (
    <Box
      as="section"
      px={{ base: "6", lg901: "12" }}
      pt={{ base: "20", lg901: "28" }}
      pb={{ base: "10", lg901: "14" }}
      bg="pageBg"
    >
      <RevealGroup>
        <Container>
          <Reveal order={0}>
            <UsedBySection />
          </Reveal>
        </Container>

        <Reveal order={1} mt="72px">
          <UsedByCarousel />
        </Reveal>
      </RevealGroup>

      <RevealGroup>
        <Container mt="4">
          <Reveal order={0}>
            <TouringArtistsList />
          </Reveal>
        </Container>
      </RevealGroup>
    </Box>
  )
}
