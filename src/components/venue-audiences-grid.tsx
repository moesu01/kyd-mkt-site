import { Grid } from "@chakra-ui/react"
import { venueAudiences } from "../content/site-content"
import { FeatureCard } from "./feature-card"

export function VenueAudiencesGrid() {
  return (
    <Grid
      templateColumns={{ base: "1fr", lg901: "repeat(3, 1fr)" }}
      gap={{ base: "12", lg901: "14" }}
    >
      {venueAudiences.map((audience) => (
        <FeatureCard
          key={audience.title}
          layout="compact"
          icon={audience.icon}
          title={audience.title}
          body={audience.body}
        />
      ))}
    </Grid>
  )
}
