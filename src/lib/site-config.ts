export const siteConfig = {
  name: "We Are Niche",
  shortName: "Niche",
  url: "https://we-are-niche.com",
  domain: "we-are-niche.com",
  tagline:
    "A connected real estate ecosystem built around technology, data, CRM, education, acquisitions, partnerships, and community.",
  motto: "Driven by real estate. Powered by technology.",
  copyright: "© 2026 We Are Niche",
  defaultDescription:
    "We Are Niche is the umbrella website for the Niche real estate ecosystem, connecting technology, data, CRM, education, acquisitions, partnerships, and community.",
  ogImage: "/brand/og-default.png",
  brand: {
    // Single canonical brand mark — the round orange Niche N. Used at every
    // size: header context, footer, menu panel, divider, intro animation,
    // 404, and as the favicon source.
    horizontalLogo: "/brand/niche-app-logo.svg",
    iconLogo: "/brand/niche-app-logo.svg",
  },
  contact: {
    phone: "816-310-1161",
    phoneHref: "tel:+18163101161",
    address: "3620 Arrowhead Ave, Independence, MO 64057",
    mapEmbedQuery: "3620+Arrowhead+Ave,+Independence,+MO+64057",
    emails: {
      corporate: { label: "General / Corporate", value: "info@nichesolutions.ai" },
      data: { label: "Niche Data Support", value: "support@nichedata.ai" },
      community: { label: "Community Support", value: "support@getnichenow.com" },
    },
  },
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/michael-franke-4ab471248/",
    },
    { label: "Linktree", href: "https://linktr.ee/michaelfranke" },
    { label: "X", href: "https://x.com/nichedataai" },
    {
      label: "Facebook Group",
      href: "https://www.facebook.com/groups/1407032306746592",
    },
    { label: "YouTube", href: "https://www.youtube.com/@michaeldfranke" },
    { label: "Instagram", href: "https://www.instagram.com/michael_franke" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
