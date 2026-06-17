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

export const heroFooterLinks = [
  { label: "For Venues & Artists", href: "#venues", showIcon: false },
  { label: "Platform", href: "#platform", showIcon: true },
  { label: "Press", href: "#press", showIcon: true },
] as const

export const aboutSection = {
  eyebrow: "About KYD",
  curvedTagline:
    "Control Your Data. Keep Your Fans. Maximize Your Profit.",
  headline: "Built for the People Who Actually Create Value.",
  body: "Live events are the beating heart of culture. For too long, venues and artists have been cut off from the fans and revenue they generate. KYD is the infrastructure to change that.",
} as const

export const navMenuLinks = [
  { label: "About kyd", href: "#about" },
  { label: "For venues & artists", href: "#venues" },
  { label: "Platform", href: "#platform" },
  { label: "For fans", href: "#fans" },
  { label: "Press", href: "#press" },
] as const

export const stats = [
  { value: "10X", label: "Return on ad spend" },
  { value: "15X", label: "Fan reach" },
  { value: "100%", label: "Audience ownership" },
  { value: "0", label: "Middlemen" },
] as const

export const venueAudiences = [
  {
    icon: "◆",
    title: "For Venues",
    body: "Looking for ticketing that you control. See what KYD offers and why teams get in touch.",
  },
  {
    icon: "◎",
    title: "For Agents",
    body: "Understand KYD's role across ticketing, resale, data, and live-event infrastructure.",
  },
  {
    icon: "✦",
    title: "For Artists",
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
    body: "Capture resale activity wherever tickets go. Every resale runs through your platform, so the upside stays with the venue, not the secondary market.",
  },
  {
    icon: "◎",
    title: "Data Ownership",
    body: "Own your ticketing, resale, and customer data. Build direct relationships with your audience instead of renting access from middlemen.",
  },
  {
    icon: "✦",
    title: "AI-Powered Activation",
    body: "Models trained on your data drive higher-converting ads, email, and ticketing. Spend smarter and sell more with every show.",
  },
  {
    icon: "⚡",
    title: "Comprehensive Ticketing",
    body: "Launch events, configure pricing, manage box office, and track performance, all in one place. Your fan CRM and analytics are built in.",
  },
] as const

export const usedBy = [
  {
    name: "Le Poisson Rouge",
    subtitle: "New York City, NY",
    href: "#",
    imageSrc: "/images/used-by/le-poisson-rouge.jpg",
  },
  {
    name: "The Brooklyn Monarch",
    subtitle: "Brooklyn, NY",
    href: "#",
    imageSrc: "/images/used-by/brooklyn-monarch.jpg",
  },
  {
    name: "SOB's",
    subtitle: "New York City, NY",
    href: "#",
    imageSrc: "/images/used-by/sobs.jpg",
  },
  {
    name: "The Ideal Theater & Bar",
    subtitle: "Cedar Rapids, IA",
    href: "#",
    imageSrc: "/images/used-by/ideal-theater-bar.jpg",
  },
  {
    name: "Pangea Sound",
    subtitle: "Los Angeles, CA",
    href: "#",
    imageSrc: "/images/used-by/pangea-sound.png",
  },
  {
    name: "Action Bronson",
    subtitle: "Touring Artist",
    href: "#",
    imageSrc: "/images/used-by/action-bronson.jpg",
    objectPosition: "center top",
  },
] as const

export const testimonials = [
  {
    quote:
      "Seems to me KYD is the bleeding edge. Then again, I don't want to talk to everybody.",
    attribution: "Bob Lefsetz",
    role: "The Lefsetz Letter",
    logoSrc: "/logos/testimonials/bob-lefsetz.svg",
    placeholder: false,
  },
  {
    quote:
      "We switched our entire tour to KYD and finally stopped fighting our own box office. Fans get in faster, we see real data, and nobody is refreshing a broken checkout page at 10:01 a.m.",
    attribution: "mock up",
    role: "place holder",
    logoSrc: "/logos/testimonials/placeholder.svg",
    placeholder: false,
  },
  {
    quote:
      "Most platforms treat venues like an afterthought. KYD built the tools we actually use night of show, from door lists and comps to last-minute holds, without making our team learn a new religion.",
    attribution: "mock up",
    role: "place holder",
    logoSrc: "/logos/testimonials/placeholder.svg",
    placeholder: false,
  },
] as const

export const backers = [
  {
    name: "a16z crypto",
    logoSrc: "/logos/a16z-crypto.png",
    maxH: "2.25rem",
    maxW: "9.9rem",
  },
  {
    name: "Comcast Ventures",
    logoSrc: "/logos/comcast-ventures.png",
    maxH: "2.125rem",
    maxW: "10.2rem",
  },
  {
    name: "Techstars",
    logoSrc: "/logos/techstars.png",
    maxH: "2.25rem",
    maxW: "8.5rem",
  },
] as const

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
