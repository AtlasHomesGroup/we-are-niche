import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/brands";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { BrandPageLayout } from "@/components/pages/BrandPageLayout";
import { Prose } from "@/components/pages/Prose";

const brand = brands["niche-data"];
const meta = pagesByRoute[brand.route];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

const capabilities = [
  "Property lookup",
  "Parcel data",
  "List building",
  "Skip tracing",
  "Foreclosure data",
  "Probate and pre-probate data",
  "Predictive foreclosure data",
  "Equity estimates",
  "Mortgage and ownership insights",
  "Neighbor skip tracing",
  "Map-based search",
  "Advanced filters",
  "County-based data access",
  "Token-based usage system",
];

export default function NicheDataPage() {
  return (
    <BrandPageLayout
      brand={brand}
      eyebrow="Ecosystem"
      subtitle="A real estate data creation and intelligence platform built for investors, wholesalers, and acquisition teams."
      capabilitiesTitle="Platform capabilities"
      capabilities={capabilities}
      body={
        <Prose>
          <p>
            <strong>Niche Data</strong> is a real estate data creation and
            intelligence platform built for investors, wholesalers, acquisition
            teams, and real estate professionals who need reliable and
            actionable information.
          </p>
          <p>
            Niche Data collects, cleans, optimizes, enriches, and delivers
            unique property data designed to help users identify opportunities,
            build targeted lists, analyze properties, and support smarter real
            estate decisions. You can{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              explore Niche Data
            </a>{" "}
            and{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              view real estate data solutions
            </a>{" "}
            directly on the platform.
          </p>
          <p>
            The platform is designed to serve as a centralized data solution for
            real estate professionals who need more than disconnected
            spreadsheets, generic property lists, or scattered data sources.
          </p>
        </Prose>
      }
      fit={
        <p>
          Niche Data supports the technology and acquisitions side of Niche by
          helping real estate professionals identify property opportunities,
          organize information, and connect data-driven leads into{" "}
          <Link href="/ecosystem/niche-crm">Niche CRM</Link> and{" "}
          <Link href="/acquisitions/niche-acquisitions">acquisition workflows</Link>.
        </p>
      }
    />
  );
}
