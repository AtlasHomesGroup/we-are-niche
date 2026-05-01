export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavGroup {
  label: string;
  links: NavLink[];
}

export const menuGroups: NavGroup[] = [
  {
    label: "Ecosystem",
    links: [
      { label: "Niche Solutions", href: "/ecosystem/niche-solutions" },
      { label: "Niche Data", href: "/ecosystem/niche-data" },
      { label: "Niche CRM", href: "/ecosystem/niche-crm" },
    ],
  },
  {
    label: "Community",
    links: [
      { label: "Get Niche Now", href: "/community/get-niche-now" },
      { label: "Niche Space", href: "/community/niche-space" },
      { label: "Niche Mastermind", href: "/community/niche-mastermind" },
    ],
  },
  {
    label: "Acquisitions",
    links: [
      { label: "Niche Acquisitions", href: "/acquisitions/niche-acquisitions" },
      { label: "JV With Niche", href: "/acquisitions/jv-with-niche" },
      { label: "Niche Home Help", href: "/acquisitions/niche-home-help" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About Us", href: "/company/about" },
      { label: "Michael Franke", href: "/company/michael-franke" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
];

export const ecosystemMapBranches: NavGroup[] = menuGroups.slice(0, 3);

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Sitemap", href: "/sitemap" },
];
