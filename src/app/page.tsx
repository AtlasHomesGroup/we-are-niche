import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { EcosystemMap } from "@/components/home/EcosystemMap";
import { CategoryCards } from "@/components/home/CategoryCards";
import { SummaryBlocks } from "@/components/home/SummaryBlocks";
import { buildMetadata } from "@/lib/seo";
import { pagesByRoute } from "@/lib/pages";

const meta = pagesByRoute["/"];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function Home() {
  return (
    <>
      <Hero />
      <EcosystemMap />
      <CategoryCards />
      <SummaryBlocks />
    </>
  );
}
