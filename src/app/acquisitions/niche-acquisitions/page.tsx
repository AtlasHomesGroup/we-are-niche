import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/brands";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { BrandPageLayout } from "@/components/pages/BrandPageLayout";
import { Prose } from "@/components/pages/Prose";

const brand = brands["niche-acquisitions"];
const meta = pagesByRoute[brand.route];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function NicheAcquisitionsPage() {
  return (
    <BrandPageLayout
      brand={brand}
      eyebrow="Acquisitions"
      subtitle="The real estate acquisition arm of Niche — turning Niche Data leads into real property opportunities and closed deals."
      body={
        <Prose>
          <p>
            <strong>Niche Acquisitions</strong> is the real estate acquisition
            arm of Niche. The company focuses on turning{" "}
            <Link href="/ecosystem/niche-data">Niche Data</Link> leads into real
            property opportunities and completed deals.
          </p>
          <p>
            Niche Acquisitions works in the market actively and supports deal
            execution across the ecosystem. It also collaborates with JV
            partners inside and outside the Niche community to evaluate,
            structure, and execute real estate opportunities. You can{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              explore Niche Acquisitions
            </a>{" "}
            and{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              learn how Niche turns data into deals
            </a>
            .
          </p>
          <p>
            <Link href="/company/michael-franke">Michael Franke</Link> is not
            only a coach or educator. He is actively in the market and involved
            in real estate deals every week through the Niche ecosystem.
          </p>
        </Prose>
      }
      fit={
        <p>
          Niche Acquisitions is the execution layer of the ecosystem. It
          connects real estate data, community knowledge, lead flow, and{" "}
          <Link href="/acquisitions/jv-with-niche">JV opportunities</Link> into
          real acquisition activity.
        </p>
      }
    />
  );
}
