export const links = {
  tickets: "https://kydlabs.com/tickets",
  useKyd: "#",
  bookCall: "#",
  waitlist: "#",
  refund: "#",
  forFans: "#",
  forVenues: "#",
  terms: "#",
  privacy: "#",
} as const

export const stats = [
  { value: "10X", label: "return on ad spend" },
  { value: "15X", label: "fan reach" },
  { value: "100%", label: "audience ownership" },
  { value: "0", label: "middlemen" },
] as const

export const featuresV1 = [
  {
    icon: "⚡",
    title: "Launch & Manage Events",
    body: "Create events, configure pricing, control resale, and track performance all in one place. Your fan CRM and analytics are built in so you always know who's buying and why.",
  },
  {
    icon: "✉",
    title: "Run Email Campaigns",
    body: "Reach your audience directly. Build segments, send targeted campaigns, and see exactly what drives sales.",
  },
  {
    icon: "◈",
    title: "Run Meta Ads",
    body: "Launch and manage Instagram and Facebook ad campaigns without leaving KYD. Spend smarter, track ROI, and stop guessing what works.",
  },
] as const

export const featuresV2 = [
  {
    icon: "⚡",
    title: "Launch Events",
    body: "Pricing, resale control, CRM, and performance analytics. All in one place.",
  },
  {
    icon: "◎",
    title: "Grow Your Audience",
    body: "Segment your fans, understand who's buying, and build relationships that last past the show.",
  },
  {
    icon: "▶",
    title: "Run Campaigns",
    body: "Email and Meta ads, managed directly through KYD. Track what works and spend where it counts.",
  },
] as const

export const roster = [
  { name: "Action Bronson", type: "artist" as const },
  { name: "[Venue Name]", type: "venue" as const },
  { name: "[Artist]", type: "artist" as const },
  { name: "[Venue Name]", type: "venue" as const },
  { name: "[Artist]", type: "artist" as const },
  { name: "[Venue Name]", type: "venue" as const },
  { name: "[Artist]", type: "artist" as const },
  { name: "[Venue Name]", type: "venue" as const },
] as const

export const testimonials = [
  {
    quote:
      "Seems to me KYD is the bleeding edge. Then again, I don't want to talk to everybody.",
    attribution: "Bob Lefsetz",
    placeholder: false,
  },
  {
    quote: "Testimonial coming soon",
    attribution: "Placeholder",
    placeholder: true,
  },
  {
    quote: "Testimonial coming soon",
    attribution: "Placeholder",
    placeholder: true,
  },
] as const

export const backers = ["a16z", "Comcast", "MBC Group", "Techstars"] as const

export const footerLinks = [
  { label: "For Fans", href: links.forFans },
  { label: "For Venues & Artists", href: links.forVenues },
  { label: "Terms of Service", href: links.terms },
  { label: "Privacy Policy", href: links.privacy },
] as const
