// Shared data for all three formats
const NICHE_DATA = {
  headline: "One ecosystem. Three connected branches.",
  kicker: "The Map",
  lede: "Niche connects technology, community, and acquisitions through a shared set of products, people, and platforms.",
  branches: [
    {
      id: "ecosystem",
      label: "Ecosystem",
      number: "01",
      tagline: "Technology that powers the network.",
      description: "Operating software, data infrastructure, and the CRM backbone that every Niche venture runs on.",
      nodes: [
        { name: "Niche Solutions", role: "Operating platform", note: "Workflow + automation" },
        { name: "Niche Data",      role: "Intelligence layer", note: "Market signal & enrichment" },
        { name: "Niche CRM",       role: "Relationship engine", note: "Pipeline & retention" },
      ],
    },
    {
      id: "community",
      label: "Community",
      number: "02",
      tagline: "Where the network gathers.",
      description: "The membership, education and live programming that turn customers into operators and operators into partners.",
      nodes: [
        { name: "Get Niche Now", role: "Membership",   note: "Daily access & deals" },
        { name: "Niche Space",   role: "Convening",    note: "Events & residency" },
      ],
    },
    {
      id: "acquisitions",
      label: "Acquisitions",
      number: "03",
      tagline: "Capital that compounds the flywheel.",
      description: "Direct buys, joint ventures, and homeowner-side products that turn the ecosystem into ownership.",
      nodes: [
        { name: "Niche Acquisitions", role: "Direct purchase", note: "On-market & off-market" },
        { name: "JV With Niche",      role: "Joint venture",   note: "Capital + operations" },
        { name: "Niche Home Help",    role: "Homeowner care",  note: "Distress to disposition" },
      ],
    },
  ],
};

window.NICHE_DATA = NICHE_DATA;
