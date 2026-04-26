export type PageCategory =
  | "Home"
  | "Ecosystem"
  | "Community"
  | "Acquisitions"
  | "Company"
  | "Legal";

export interface PageMeta {
  title: string;
  route: string;
  category: PageCategory;
  description: string;
  keywords: string[];
}

export const pages: PageMeta[] = [
  {
    title: "We Are Niche",
    route: "/",
    category: "Home",
    description:
      "We Are Niche is the umbrella website for the Niche real estate ecosystem, connecting technology, data, CRM, education, acquisitions, partnerships, and community.",
    keywords: [
      "Niche",
      "real estate ecosystem",
      "Niche Solutions",
      "Niche Data",
      "Niche CRM",
    ],
  },
  {
    title: "Niche Solutions",
    route: "/ecosystem/niche-solutions",
    category: "Ecosystem",
    description:
      "Niche Solutions is the technology development company behind the Niche ecosystem, building the infrastructure that powers Niche Data, Niche CRM, and connected platforms.",
    keywords: ["Niche Solutions", "real estate technology", "CRM development"],
  },
  {
    title: "Niche Data",
    route: "/ecosystem/niche-data",
    category: "Ecosystem",
    description:
      "Niche Data is a real estate data creation and intelligence platform — property data, parcel data, list building, skip tracing, foreclosure data, and more.",
    keywords: [
      "Niche Data",
      "real estate data",
      "property data",
      "skip tracing",
      "foreclosure data",
    ],
  },
  {
    title: "Niche CRM",
    route: "/ecosystem/niche-crm",
    category: "Ecosystem",
    description:
      "Niche CRM is an acquisition-focused real estate CRM built on Salesforce, with custom workflows, lead management, and native Niche Data integration.",
    keywords: ["Niche CRM", "real estate CRM", "Salesforce", "acquisitions CRM"],
  },
  {
    title: "Get Niche Now",
    route: "/community/get-niche-now",
    category: "Community",
    description:
      "Get Niche Now is the primary landing page for joining the Niche community led by Michael Franke — coaching, education, recordings, and community access.",
    keywords: [
      "Get Niche Now",
      "real estate community",
      "Michael Franke",
      "real estate coaching",
    ],
  },
  {
    title: "Niche Space",
    route: "/community/niche-space",
    category: "Community",
    description:
      "Niche Space is the Niche office building in Independence, Missouri — home to in-person masterminds, education, and community gatherings.",
    keywords: ["Niche Space", "real estate mastermind", "Independence Missouri"],
  },
  {
    title: "Niche Acquisitions",
    route: "/acquisitions/niche-acquisitions",
    category: "Acquisitions",
    description:
      "Niche Acquisitions is the real estate acquisition arm of Niche — turning Niche Data leads into closed deals and supporting JV partnerships.",
    keywords: [
      "Niche Acquisitions",
      "real estate acquisitions",
      "JV partnerships",
    ],
  },
  {
    title: "JV With Niche",
    route: "/acquisitions/jv-with-niche",
    category: "Acquisitions",
    description:
      "JV With Niche is an automated deal submission portal for real estate professionals to submit leads and joint venture with Niche.",
    keywords: ["JV With Niche", "joint venture", "real estate deals"],
  },
  {
    title: "Niche Home Help",
    route: "/acquisitions/niche-home-help",
    category: "Acquisitions",
    description:
      "Niche Home Help is the homeowner-facing intake for property owners seeking practical real estate solutions in difficult situations.",
    keywords: [
      "Niche Home Help",
      "sell my house",
      "homeowner help",
      "foreclosure help",
    ],
  },
  {
    title: "About Us",
    route: "/company/about",
    category: "Company",
    description:
      "Niche connects real estate technology, data, CRM, education, acquisitions, and community under one ecosystem led by Michael Franke.",
    keywords: ["About Niche", "Niche ecosystem", "Michael Franke"],
  },
  {
    title: "Michael Franke",
    route: "/company/michael-franke",
    category: "Company",
    description:
      "Michael Franke, Founder of Niche — over 10 years of real estate experience and 1,000+ closed deals. Educator, coach, investor, and operator.",
    keywords: ["Michael Franke", "Founder of Niche", "real estate coach"],
  },
  {
    title: "Contact",
    route: "/company/contact",
    category: "Company",
    description:
      "Contact We Are Niche — corporate phone, office address, and emails for the Niche real estate ecosystem.",
    keywords: ["Contact Niche", "Niche office", "Independence Missouri"],
  },
  {
    title: "Privacy Policy",
    route: "/privacy-policy",
    category: "Legal",
    description:
      "Privacy Policy placeholder for We Are Niche, pending final legal review.",
    keywords: ["Privacy Policy"],
  },
  {
    title: "Terms & Conditions",
    route: "/terms-and-conditions",
    category: "Legal",
    description:
      "Terms & Conditions placeholder for We Are Niche, pending final legal review.",
    keywords: ["Terms and Conditions"],
  },
  {
    title: "Sitemap",
    route: "/sitemap",
    category: "Legal",
    description:
      "Sitemap of the We Are Niche umbrella website, organized by category with internal pages and external brand websites.",
    keywords: ["Sitemap", "Niche websites"],
  },
];

export const pagesByRoute: Record<string, PageMeta> = pages.reduce(
  (acc, p) => {
    acc[p.route] = p;
    return acc;
  },
  {} as Record<string, PageMeta>,
);
