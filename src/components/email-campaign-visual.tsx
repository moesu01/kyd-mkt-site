import {
  FeatureStatsMarquee,
  type FeatureStatGroup,
} from "./feature-stats-marquee"

export function EmailCampaignVisual({
  shouldAnimate,
}: EmailCampaignVisualProps) {
  return (
    <FeatureStatsMarquee
      groups={emailStatGroups}
      shouldAnimate={shouldAnimate}
    />
  )
}

export const emailCampaignVisualTitle = "Email Campaigns"

const emailStatGroups: FeatureStatGroup[] = [
  {
    title: "Email Ticket Sales",
    metrics: [
      { label: "Tickets Sold", value: "72" },
      { label: "Avg. Order Size", value: "$24.31" },
      { label: "ROAS", value: "2.7X", isAttributed: true },
      { label: "Revenue", value: "$1750.32", isAttributed: true },
    ],
  },
  {
    title: "Email Metrics",
    metrics: [
      { label: "Delivered", value: "113.4K" },
      { label: "Opened", value: "10.6K" },
      { label: "Open Rate", value: "14.92%" },
      { label: "Clicked", value: "292" },
      { label: "CTR", value: "0.21%" },
      { label: "Unsubscribed", value: "209" },
      { label: "Unsubscribe Rate", value: "0.18%" },
    ],
  },
]

interface EmailCampaignVisualProps {
  shouldAnimate: boolean
}
