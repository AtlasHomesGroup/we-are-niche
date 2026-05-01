import { brands, type BrandSlug } from "./brands";

export type EcosystemBranchId = "ecosystem" | "community" | "acquisitions";

export interface EcosystemNode {
  slug: BrandSlug;
  name: string;
  route: string;
  role: string;
  note: string;
}

export interface EcosystemBranch {
  id: EcosystemBranchId;
  label: string;
  number: string;
  tagline: string;
  description: string;
  nodes: EcosystemNode[];
}

export interface EcosystemMapData {
  kicker: string;
  headline: string;
  headlineEmphasis: string;
  headlineLead: string;
  headlineTrail: string;
  lede: string;
  branches: EcosystemBranch[];
}

const node = (slug: BrandSlug, role: string, note: string): EcosystemNode => ({
  slug,
  name: brands[slug].name,
  route: brands[slug].route,
  role,
  note,
});

export const ecosystemMapData: EcosystemMapData = {
  kicker: "The Map · Index 00",
  headline: "One ecosystem. Three connected branches.",
  headlineLead: "One ecosystem. ",
  headlineEmphasis: "Three",
  headlineTrail: " connected branches.",
  lede: "Niche connects technology, community, and acquisitions through a shared set of products, people, and platforms.",
  branches: [
    {
      id: "ecosystem",
      label: "Ecosystem",
      number: "01",
      tagline: "Technology that powers the network.",
      description:
        "Operating software, data infrastructure, and the CRM backbone that every Niche venture runs on.",
      nodes: [
        node("niche-solutions", "Operating platform", "Workflow + automation"),
        node("niche-data", "Intelligence layer", "Market signal & enrichment"),
        node("niche-crm", "Relationship engine", "Pipeline & retention"),
      ],
    },
    {
      id: "community",
      label: "Community",
      number: "02",
      tagline: "Where the network gathers.",
      description:
        "The membership, education and live programming that turn customers into operators and operators into partners.",
      nodes: [
        node("get-niche-now", "Membership", "Daily access & deals"),
        node("niche-space", "Convening", "Events & residency"),
        node("niche-mastermind", "Learning games", "Strategy from books"),
      ],
    },
    {
      id: "acquisitions",
      label: "Acquisitions",
      number: "03",
      tagline: "Capital that compounds the flywheel.",
      description:
        "Direct buys, joint ventures, and homeowner-side products that turn the ecosystem into ownership.",
      nodes: [
        node("niche-acquisitions", "Direct purchase", "On-market & off-market"),
        node("jv-with-niche", "Joint venture", "Capital + operations"),
        node("niche-home-help", "Homeowner care", "Distress to disposition"),
      ],
    },
  ],
};
