import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/brands";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { BrandPageLayout } from "@/components/pages/BrandPageLayout";
import { Prose } from "@/components/pages/Prose";

const brand = brands["niche-solutions"];
const meta = pagesByRoute[brand.route];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function NicheSolutionsPage() {
  return (
    <BrandPageLayout
      brand={brand}
      eyebrow="Ecosystem"
      subtitle="The technology development company behind the Niche ecosystem."
      body={
        <Prose>
          <p>
            <strong>Niche Solutions</strong> is the technology development
            company behind the Niche ecosystem. It is responsible for building
            and improving the digital infrastructure that powers Niche products,
            including real estate data systems, CRM workflows, software tools,
            automation, and connected web platforms.
          </p>
          <p>
            Through Niche Solutions, the ecosystem continues to develop
            technology that supports real estate professionals, acquisition
            teams, community members, and data-driven investors. You can{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              learn more about Niche Solutions
            </a>{" "}
            and{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              explore the technology behind the Niche ecosystem
            </a>
            .
          </p>
        </Prose>
      }
      fit={
        <p>
          Niche Solutions is the development and infrastructure layer of the
          ecosystem. It supports the platforms, systems, and digital tools used
          by <Link href="/ecosystem/niche-data">Niche Data</Link>,{" "}
          <Link href="/ecosystem/niche-crm">Niche CRM</Link>, community
          operations, acquisition workflows, and other Niche-connected brands.
        </p>
      }
    />
  );
}
