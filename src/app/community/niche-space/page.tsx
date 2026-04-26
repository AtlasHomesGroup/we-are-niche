import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/brands";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { BrandPageLayout } from "@/components/pages/BrandPageLayout";
import { Prose } from "@/components/pages/Prose";

const brand = brands["niche-space"];
const meta = pagesByRoute[brand.route];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function NicheSpacePage() {
  return (
    <BrandPageLayout
      brand={brand}
      eyebrow="Community"
      subtitle="The Niche office building in Independence, Missouri — home to in-person masterminds, real estate education, and community gatherings."
      body={
        <Prose>
          <p>
            <strong>Niche Space</strong> is the Niche office building in
            Independence, Missouri. It serves as a physical home for in-person
            masterminds, real estate education, collaboration, and community
            gatherings.
          </p>
          <p>
            As part of the broader Niche ecosystem, Niche Space gives the
            community a real-world place to connect, learn, collaborate, and
            build relationships beyond the digital platform. You can{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              learn about Niche Space
            </a>{" "}
            and{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              explore in-person Niche events and masterminds
            </a>
            .
          </p>
        </Prose>
      }
      fit={
        <p>
          Niche Space connects the online{" "}
          <Link href="/community/get-niche-now">Niche community</Link> with a
          physical location where members and real estate professionals can
          participate in in-person education, masterminds, and collaboration.
        </p>
      }
    />
  );
}
