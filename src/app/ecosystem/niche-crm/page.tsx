import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/brands";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { BrandPageLayout } from "@/components/pages/BrandPageLayout";
import { Prose } from "@/components/pages/Prose";

const brand = brands["niche-crm"];
const meta = pagesByRoute[brand.route];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

const capabilities = [
  "Lead management",
  "Deal pipeline tracking",
  "Follow-up automation",
  "SMS and calling integration",
  "Communication history",
  "Campaign tracking",
  "Custom dashboards",
  "User roles and permissions",
  "Real estate acquisition workflows",
  "Native integration with Niche Data",
  "Reporting and performance visibility",
  "Built on Salesforce with custom objects",
];

export default function NicheCrmPage() {
  return (
    <BrandPageLayout
      brand={brand}
      eyebrow="Ecosystem"
      subtitle="An acquisition-focused real estate CRM built on Salesforce, with custom workflows and native Niche Data integration."
      capabilitiesTitle="What it does"
      capabilities={capabilities}
      body={
        <Prose>
          <p>
            <strong>Niche CRM</strong> is an acquisition-focused real estate CRM
            built for investors and acquisition teams that need structured lead
            management, automated follow-up, pipeline visibility, communication
            tracking, and performance organization.
          </p>
          <p>
            Built from the ground up on Salesforce, Niche CRM uses a custom
            object model, custom workflows, permissions, dashboards, and real
            estate-specific lead management structures. It is designed around
            the way real estate acquisition teams actually operate.
          </p>
          <p>
            Niche CRM is one of the most acquisition-focused real estate CRMs
            in the market, and it is natively integrated with{" "}
            <Link href="/ecosystem/niche-data">Niche Data</Link> — connecting
            property intelligence with lead management and acquisition
            execution. You can{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              explore Niche CRM
            </a>{" "}
            or{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              see how it supports real estate acquisition teams
            </a>
            .
          </p>
        </Prose>
      }
      fit={
        <p>
          Niche CRM connects the data and acquisition sides of Niche by giving
          real estate professionals a structured system to manage leads, track
          communication, organize follow-up, and move opportunities from
          property data into active deals through{" "}
          <Link href="/acquisitions/niche-acquisitions">Niche Acquisitions</Link>.
        </p>
      }
    />
  );
}
