export const links = {
  tickets: "https://kydlabs.com/tickets",
  getInTouch: "#",
  waitlist: "#",
  refund: "#",
  forFans: "#",
  forVenues: "#",
  tix: "#",
  terms: "#",
  privacy: "#",
  contact: "#",
  pressEmail: "mailto:press@kydlabs.com",
} as const

export const stats = [
  { value: "10X", label: "return on ad spend" },
  { value: "15X", label: "fan reach" },
  { value: "100%", label: "audience ownership" },
  { value: "0", label: "middlemen" },
] as const

export const venueAudiences = [
  {
    title: "Venues",
    body: "Looking for ticketing that you control. See what KYD offers and why teams get in touch.",
  },
  {
    title: "Agents",
    body: "Understand KYD's role across ticketing, resale, data, and live-event infrastructure.",
  },
  {
    title: "Artists",
    body: "Run your own touring and ticketing. Keep your fans, your data, and your revenue.",
  },
] as const

export const features = [
  {
    icon: "◆",
    title: "Unscalpable",
    body: "Tickets stay in fans' hands. KYD reduces unwanted scalping and gives venues control over how and where tickets move.",
  },
  {
    icon: "↻",
    title: "Resale Capture",
    body: "Capture resale activity wherever tickets go. Every resale runs through your platform — the upside stays with the venue, not the secondary market.",
  },
  {
    icon: "◎",
    title: "Data Ownership",
    body: "Own your ticketing, resale, and customer data. Build direct relationships with your audience instead of renting access from middlemen.",
  },
  {
    icon: "✦",
    title: "AI-Powered Activation",
    body: "Models trained on your data drive higher-converting ads, email, and ticketing campaigns. Spend smarter and sell more with every show.",
  },
  {
    icon: "⚡",
    title: "Comprehensive Ticketing",
    body: "Launch events, configure pricing, manage box office, and track performance — all in one place. Your fan CRM and analytics are built in.",
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

export const pressCoverage = [
  {
    outlet: "Forbes",
    headline: "[Headline placeholder — coverage coming soon]",
    date: "[Month Year]",
    href: "#",
    placeholder: true,
  },
  {
    outlet: "Billboard",
    headline: "[Headline placeholder — coverage coming soon]",
    date: "[Month Year]",
    href: "#",
    placeholder: true,
  },
  {
    outlet: "TechCrunch",
    headline: "[Headline placeholder — coverage coming soon]",
    date: "[Month Year]",
    href: "#",
    placeholder: true,
  },
  {
    outlet: "Variety",
    headline: "[Headline placeholder — coverage coming soon]",
    date: "[Month Year]",
    href: "#",
    placeholder: true,
  },
] as const

export const footerLinks = [
  { label: "For Fans", href: links.forFans },
  { label: "For Venues & Artists", href: links.forVenues },
  { label: "TIX", href: links.tix },
  { label: "Terms of Service", href: links.terms },
  { label: "Privacy Policy", href: links.privacy },
  { label: "Contact us", href: links.contact },
  { label: "Press", href: links.pressEmail },
] as const
