import {
  FeatureStatsMarquee,
  type FeatureStatGroup,
} from "./feature-stats-marquee"

export function MetaAdsVisual({ shouldAnimate }: MetaAdsVisualProps) {
  return (
    <FeatureStatsMarquee
      groups={metaStatGroups}
      shouldAnimate={shouldAnimate}
    />
  )
}

export const metaAdsVisualTitle = "On-Platform Meta Ads"

const metaStatGroups: FeatureStatGroup[] = [
  {
    title: "Campaign Performance",
    metrics: [
      { label: "Reach", value: "84.2K" },
      { label: "Spend", value: "$1,240" },
      { label: "ROAS", value: "3.4X", isAttributed: true },
      { label: "Sales", value: "$4,216", isAttributed: true },
    ],
  },
  {
    title: "Delivery",
    metrics: [
      { label: "Impressions", value: "312K" },
      { label: "CTR", value: "1.8%" },
      { label: "CPC", value: "$0.42" },
      { label: "Conv. Rate", value: "2.1%" },
    ],
  },
]

interface MetaAdsVisualProps {
  shouldAnimate: boolean
}
