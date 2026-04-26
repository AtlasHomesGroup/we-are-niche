export type BrandSlug =
  | "niche-solutions"
  | "niche-data"
  | "niche-crm"
  | "get-niche-now"
  | "niche-space"
  | "niche-acquisitions"
  | "jv-with-niche"
  | "niche-home-help";

export type BrandCategory = "ecosystem" | "community" | "acquisitions";

export interface Brand {
  slug: BrandSlug;
  name: string;
  category: BrandCategory;
  route: string;
  externalUrl: string;
  externalLabel: string;
  shortDescription: string;
  ctaLabel: string;
  related: BrandSlug[];
}

export const brands: Record<BrandSlug, Brand> = {
  "niche-solutions": {
    slug: "niche-solutions",
    name: "Niche Solutions",
    category: "ecosystem",
    route: "/ecosystem/niche-solutions",
    externalUrl: "https://www.nichesolutions.ai/",
    externalLabel: "nichesolutions.ai",
    shortDescription:
      "The technology development company behind the Niche ecosystem.",
    ctaLabel: "Visit Niche Solutions",
    related: ["niche-data", "niche-crm", "get-niche-now"],
  },
  "niche-data": {
    slug: "niche-data",
    name: "Niche Data",
    category: "ecosystem",
    route: "/ecosystem/niche-data",
    externalUrl: "https://nichedata.ai/",
    externalLabel: "nichedata.ai",
    shortDescription:
      "A real estate data creation and intelligence platform for investors and acquisition teams.",
    ctaLabel: "Visit Niche Data",
    related: ["niche-crm", "niche-acquisitions", "get-niche-now"],
  },
  "niche-crm": {
    slug: "niche-crm",
    name: "Niche CRM",
    category: "ecosystem",
    route: "/ecosystem/niche-crm",
    externalUrl: "https://www.nichecrm.ai/",
    externalLabel: "nichecrm.ai",
    shortDescription:
      "An acquisition-focused real estate CRM built on Salesforce, natively integrated with Niche Data.",
    ctaLabel: "Visit Niche CRM",
    related: ["niche-data", "niche-solutions", "niche-acquisitions"],
  },
  "get-niche-now": {
    slug: "get-niche-now",
    name: "Get Niche Now",
    category: "community",
    route: "/community/get-niche-now",
    externalUrl: "https://www.getnichenow.com/",
    externalLabel: "getnichenow.com",
    shortDescription:
      "The primary landing page for joining the Niche community, led by Michael Franke.",
    ctaLabel: "Visit Get Niche Now",
    related: ["niche-space", "niche-data", "niche-crm"],
  },
  "niche-space": {
    slug: "niche-space",
    name: "Niche Space",
    category: "community",
    route: "/community/niche-space",
    externalUrl: "https://www.niche-space.com/",
    externalLabel: "niche-space.com",
    shortDescription:
      "The Niche office building in Independence, Missouri — home to in-person masterminds and community gatherings.",
    ctaLabel: "Visit Niche Space",
    related: ["get-niche-now", "niche-acquisitions", "niche-solutions"],
  },
  "niche-acquisitions": {
    slug: "niche-acquisitions",
    name: "Niche Acquisitions",
    category: "acquisitions",
    route: "/acquisitions/niche-acquisitions",
    externalUrl: "https://www.nicheacquisition.com/",
    externalLabel: "nicheacquisition.com",
    shortDescription:
      "The real estate acquisition arm of Niche, turning Niche Data leads into closed deals.",
    ctaLabel: "Visit Niche Acquisitions",
    related: ["niche-data", "jv-with-niche", "niche-home-help"],
  },
  "jv-with-niche": {
    slug: "jv-with-niche",
    name: "JV With Niche",
    category: "acquisitions",
    route: "/acquisitions/jv-with-niche",
    externalUrl: "https://jvwithniche.com/",
    externalLabel: "jvwithniche.com",
    shortDescription:
      "An automated deal submission portal for joint venturing real estate opportunities with Niche.",
    ctaLabel: "Visit JV With Niche",
    related: ["niche-acquisitions", "niche-home-help", "get-niche-now"],
  },
  "niche-home-help": {
    slug: "niche-home-help",
    name: "Niche Home Help",
    category: "acquisitions",
    route: "/acquisitions/niche-home-help",
    externalUrl: "https://www.nichehomehelp.com/",
    externalLabel: "nichehomehelp.com",
    shortDescription:
      "The homeowner-facing intake for property owners seeking practical real estate solutions.",
    ctaLabel: "Visit Niche Home Help",
    related: ["niche-acquisitions", "jv-with-niche", "niche-data"],
  },
};

export const brandsByCategory: Record<BrandCategory, Brand[]> = {
  ecosystem: [brands["niche-solutions"], brands["niche-data"], brands["niche-crm"]],
  community: [brands["get-niche-now"], brands["niche-space"]],
  acquisitions: [
    brands["niche-acquisitions"],
    brands["jv-with-niche"],
    brands["niche-home-help"],
  ],
};

export const allBrands: Brand[] = Object.values(brands);
