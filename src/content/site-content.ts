import { assetUrl } from "../lib/asset-url"

export const links = {
  tickets: "https://kydlabs.com/tickets",
  getInTouch: "https://calendly.com/kydlabs/new-meeting",
  waitlist: "#",
  refund: "#",
  forFans: "#",
  forVenues: "#",
  tix: "https://tix.xyz",
  terms: "https://www.iubenda.com/terms-and-conditions/22517592",
  privacy: "https://www.iubenda.com/privacy-policy/22517592",
  contact: "https://help.kydlabs.com/en/",
  pressEmail: "mailto:press@kydlabs.com",
} as const

export const heroFooterLinks = [
  { label: "For Venues & Artists", href: "#venues", showIcon: false },
  { label: "Platform", href: "#platform", showIcon: true },
  { label: "Press", href: "#press", showIcon: true },
] as const

export const heroSection = {
  headlineLine1: "Modern Ticketing,",
  headlineLine2: "Built for Venues",
  /** Shortened hero sub-copy (two lines in Figma). */
  bodyLine1: "Own your data. Capture resale.",
  bodyLine2: "Reach fans with built-in marketing.",
  /** Single-line form for footer / other surfaces. */
  body: "Own your data. Capture resale. Reach fans with built-in marketing.",
  primaryCta: "Get in touch",
  secondaryCta: "Find my tickets",
} as const

export const aboutSection = {
  eyebrow: "About KYD",
  curvedTagline: "Own your data. Keep your fans. Keep your distribution.",
  headline: "Built for the People Who Actually Create Value.",
  body: "Live events are the beating heart of culture. For too long, venues and artists have been cut off from the fans and revenue they generate. KYD is the infrastructure to change that.",
} as const

export const navMenuLinks = [
  { label: "For venues", href: "#venues" },
  { label: "Platform", href: "#platform" },
  { label: "Press", href: "#press" },
] as const

export const venuesSection = {
  label: "For Venues & Artists",
  headlineLine1: "Stop renting your audience.",
  headlineLine2: "It's already yours.",
  groupIntro:
    "KYD venues & artists see a 30% increase in ticket revenue on average, compared to previous year.",
  body: "A next-gen, white label ticketing and marketing platform for independent artists, touring acts, and venues. Own your ticketing. Keep your fan data. Automate your marketing.",
} as const

export const stats = [
  {
    value: "+30%",
    label: "Ticket sales",
    iconSrc: assetUrl("/images/venues/trend-up.svg"),
  },
  {
    value: "15X",
    label: "Fan reach",
    iconSrc: assetUrl("/images/venues/users-three.svg"),
  },
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

const tixTicketId = "TIX-012390ZZV9A0D9F80"

/** Platform spotlight for TIX integration — matches Figma programmable-ticket composition. */
export const tixSpotlight = {
  eyebrow: "Powered by TIX",
  brandImageSrc: "/images/kyd_tix.png",
  brandImageAlt: "KYD connected to TIX",
  headlineLine1: "Capture every resale,",
  headlineLine2: "make tickets unscalpable.",
  body: "KYD runs on TIX, the programmable, onchain ticket standard that gives venues and artists control wherever a ticket moves.",
  href: links.tix,
  ticket: {
    eyebrow: "With Saving Grace & Suzi Dian",
    title: "Robert Plant",
    venue: "The Cathedral of St. John the Divine",
    city: "",
    ticketType: "General Admission",
    date: "Jun 13, 2026",
    time: "8:00PM",
    admit: 1,
    tixId: tixTicketId,
  },
  rules: [
    {
      label: "Ticket Info",
      value: "Robert Plant • 1x",
      secondaryValue: tixTicketId,
      markSrc: "/icons/kyd-mark-sm.svg",
      shouldInvertMark: true,
    },
    {
      label: "Resale Royalty",
      value: "10%",
      valueSuffix: "of every secondary sale",
      markSrc: "/icons/tix_logo.svg",
      hasMarkGlow: true,
    },
    {
      label: "Resale Cap",
      value: "120%",
      valueSuffix: "of face value",
      markSrc: "/icons/tix_logo.svg",
      hasMarkGlow: true,
    },
    {
      label: "Payout Account",
      value: "BR18 •••• •••• •••• •••• 4821",
      showFlag: true,
      isHidden: true,
    },
  ],
  benefits: [
    {
      title: "Control & Capture Resale",
      body: "Set resale price caps and royalty rules that follow every ticket. All handled automatically.",
    },
    {
      title: "Unscalpable Tickets",
      body: "Identity-bound tickets with on chain verification, prevents speculative listings and screenshot fraud.",
    },
  ],
} as const

export const features = [
  {
    icon: "◎",
    title: "Data Ownership",
    body: "Own your ticketing, resale, and customer data. Build direct relationships with your audience instead of renting access from middlemen.",
  },
  {
    icon: "✉",
    title: "Email Campaigns",
    body: "Build and send targeted email campaigns using your first-party fan data. Reach the right audience and drive ticket sales from one platform.",
  },
  {
    icon: "✦",
    title: "On-Platform Meta Ads",
    body: "Launch and manage Meta ad campaigns directly from KYD using your first-party fan data. Turn audience insights into targeted promotion without switching tools.",
  },
  {
    icon: "⚡",
    title: "Comprehensive Ticketing",
    body: "Launch events, manage box office, and track performance in one place.",
  },
  {
    icon: "↻",
    title: "Unscalpable Resale Capture",
    body: "Control and capture every resale. Unscalpable tickets stay controlled wherever they move.",
  },
] as const

export const usedBy = [
  {
    name: "The Ideal Theater & Bar",
    subtitle: "Cedar Rapids, IA",
    imageSrc: assetUrl("/images/used-by/ideal-theater-bar.jpg"),
  },
  {
    name: "ANGINE DE POITRINE",
    subtitle: "NYC Debut @ LPR",
    imageSrc: assetUrl("/images/used-by/angine-de-poitrine.webp"),
  },
  {
    name: "Le Poisson Rouge",
    subtitle: "New York City, NY",
    imageSrc: assetUrl("/images/used-by/le-poisson-rouge.jpg"),
  },
  {
    name: "Action Bronson",
    subtitle: "Touring Artist",
    imageSrc: assetUrl("/images/used-by/action-bronson.jpg"),
    objectPosition: "center top",
  },
  {
    name: "The Brooklyn Monarch",
    subtitle: "Brooklyn, NY",
    imageSrc: assetUrl("/images/used-by/brooklyn-monarch.jpg"),
  },
  {
    name: "Pangea Sound",
    subtitle: "Los Angeles, CA",
    imageSrc: assetUrl("/images/used-by/pangea-sound.png"),
  },
  {
    name: "SOB's",
    subtitle: "New York City, NY",
    imageSrc: assetUrl("/images/used-by/sobs.jpg"),
  },
  {
    name: "Robert Plant",
    subtitle: "With Saving Grace & Suzi Dian",
    imageSrc: assetUrl("/images/used-by/robert_plant.png"),
  },
  {
    name: "Adéla",
    subtitle: "NYC Debut @ LPR",
    imageSrc: assetUrl("/images/used-by/adela.webp"),
  },
] as const

export const touringArtists = [
  {
    name: "Action Bronson",
    category: "Touring Artist",
    logoSrc: assetUrl("/images/touring/action-bronson-logo.png"),
    logoMaxH: "61px",
    logoMaxW: "213px",
    showsHref: "#",
  },
  {
    name: "Pangea Sound",
    category: "Touring Group",
    logoSrc: assetUrl("/images/touring/pangea-sound-logo.png"),
    logoMaxH: "64px",
    logoMaxW: "131px",
    logoObjectFit: "cover",
    showsHref: "#",
  },
  {
    name: "DJ Mike Nasty",
    category: "Touring DJ",
    logoSrc: assetUrl("/images/touring/dj-mike-nasty-logo.svg"),
    logoMaxH: "54px",
    logoMaxW: "120px",
    showsHref: "#",
  },
  {
    name: "We Touch Grass",
    category: "Touring Events",
    logoSrc: assetUrl("/images/touring/we-touch-grass-logo.png"),
    logoMaxH: "72px",
    logoMaxW: "134px",
    logoCrop: {
      width: "107.44%",
      height: "200.53%",
      left: "-3.43%",
      top: "-29.67%",
    },
    showsHref: "#",
  },
  {
    name: "+ Many More",
    category: "Want to work with KYD?",
    showsHref: links.getInTouch,
    linkLabel: "Get In Touch",
  },
] as const

export const testimonials = [
  {
    quote:
      "Seems to me KYD is the bleeding edge. Then again, I don't want to talk to everybody.",
    attribution: "Bob Lefsetz",
    role: "The Lefsetz Letter",
    logoSrc: assetUrl("/logos/lefsetz.svg"),
    href: "https://lefsetz.com/wordpress/2023/06/27/tiktok-marketing/",
    placeholder: false,
  },
  {
    quote:
      "Ticketmaster is a bank. When ticketing companies deploy $15 billion across 11,000 exclusive venues, and earn 30 cents per dollar they lend, they\u2019re no longer a software business, but a financial system.",
    attribution: "CCN",
    role: "Ticketing as a Bank?",
    logoSrc: assetUrl("/logos/ccn-g.svg"),
    href: "https://www.ccn.com/education/crypto/ticketing-as-a-bank-tix-ahmed-nimale-live-events/",
    placeholder: false,
  },
  {
    quote:
      "LPR works with blockchain ticketer KYD Labs, which allows them to access more data on their fans, better target ads and track their sales in real time.",
    attribution: "Billboard",
    role: "Feature on (le) poisson rouge, NYC",
    logoSrc: assetUrl("/logos/Billboard_logo2.svg"),
    href: "https://smry.ai/www.billboard.com/pro/indie-venue-of-the-month-march-2026-lpr-new-york-city",
    placeholder: false,
  },
  {
    quote:
      "KYD is DeFi\u2019s largest ticket transfer platform, with more than $8 million in ticket sales, and $2 million in pre-existing financing across more than 300,000 tickets",
    attribution: "The Defiant",
    role: "KYD Labs Launches TIX for Live Events Financing",
    logoSrc: assetUrl("/logos/defiant_1.svg"),
    href: "https://thedefiant.io/news/nfts-and-web3/solana-ticketing-platform-kyd-labs-launches-tix",
    placeholder: false,
  },
  {
    quote:
      "KYD Labs, a blockchain-based platform built by former Ticketmaster veterans, is attempting to rethink how liquidity and ownership function underneath the ticketing economy.",
    attribution: "Forbes",
    role: "The Future of Digital Assets",
    logoSrc: assetUrl("/logos/Forbes_logo2.svg"),
    href: "https://www.forbes.com/sites/azeemkhan/2026/05/22/the-future-of-digital-assets-might-look-more-like-a-drake-party/",
    placeholder: false,
  },
  {
    quote:
      "Platforms like KYD are attempting to rebuild parts of that system in a way that gives more flexibility and economic ownership to venues, organizers, and community-driven curators themselves.",
    attribution: "Forbes",
    role: "The Future of Digital Assets",
    logoSrc: assetUrl("/logos/Forbes_logo2.svg"),
    href: "https://www.forbes.com/sites/azeemkhan/2026/05/22/the-future-of-digital-assets-might-look-more-like-a-drake-party/",
    placeholder: false,
  },
] as const

export const backers = [
  {
    name: "a16z crypto",
    logoSrc: assetUrl("/logos/a16z-crypto.png"),
    maxH: "2.25rem",
    maxW: "9.9rem",
  },
  {
    name: "Comcast Ventures",
    logoSrc: assetUrl("/logos/comcast-ventures.png"),
    maxH: "2rem",
    maxW: "10.2rem",
  },
  {
    name: "Techstars",
    logoSrc: assetUrl("/logos/techstars.png"),
    maxH: "2.25rem",
    maxW: "8.5rem",
  },
] as const

export const footerPrimaryLinks = [
  { label: "For Fans", href: links.forFans },
  { label: "For Venues & Artists", href: links.forVenues },
  { label: "Get Help", href: links.contact },
] as const

export const footerLegalLinks = [
  { label: "Terms of Service", href: links.terms },
  { label: "Privacy Policy", href: links.privacy },
] as const

export const footerUtilityLinks = [
  { label: "TIX", href: links.tix },
  { label: "Get Help", href: links.contact },
] as const
