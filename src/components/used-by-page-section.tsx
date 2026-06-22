import { Box } from "@chakra-ui/react"
import { Container } from "./ui/container"
import { TouringArtistsList } from "./touring-artists-list"
import { UsedByCarousel, UsedBySection } from "./used-by-section"

export function UsedByPageSection() {
  return (
    <Box
      as="section"
      px={{ base: "6", lg901: "12" }}
      py={{ base: "20", lg901: "28" }}
      bg="pageBg"
    >
      <Container>
        <UsedBySection />
      </Container>

      <Box mt="72px">
        <UsedByCarousel />
      </Box>

      <Container mt="4">
        <TouringArtistsList />
      </Container>
    </Box>
  )
}
