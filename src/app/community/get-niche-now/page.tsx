import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/brands";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { BrandPageLayout } from "@/components/pages/BrandPageLayout";
import { Prose } from "@/components/pages/Prose";

const brand = brands["get-niche-now"];
const meta = pagesByRoute[brand.route];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

const capabilities = [
  "Community access",
  "Coaching with Michael Franke",
  "Live education sessions",
  "Previous recordings",
  "Educational bot support",
  "Member case studies",
  "Success stories and testimonials",
  "Access to the broader Niche ecosystem",
];

export default function GetNicheNowPage() {
  return (
    <BrandPageLayout
      brand={brand}
      eyebrow="Community"
      subtitle="The primary landing page for joining the Niche community led by Michael Franke."
      capabilitiesTitle="Inside the community"
      capabilities={capabilities}
      body={
        <Prose>
          <p>
            <strong>Get Niche Now</strong> is the primary landing page for real
            estate professionals who want to join the Niche community.
          </p>
          <p>
            The Niche community is led by{" "}
            <Link href="/company/michael-franke">Michael Franke</Link> and gives
            members access to real estate education, coaching, community
            resources, previous recordings, educational support tools, and a
            network of real estate professionals focused on growth.
          </p>
          <p>
            Get Niche Now also presents testimonials, success stories, and case
            studies from members and participants across the Niche ecosystem.
            You can{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              join the Niche community
            </a>{" "}
            or{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              explore member success stories
            </a>{" "}
            on the official site.
          </p>
        </Prose>
      }
      fit={
        <p>
          Get Niche Now is the community entry point. It connects real estate
          professionals with education, coaching, shared resources, and access
          to the broader Niche ecosystem — including{" "}
          <Link href="/ecosystem/niche-data">Niche Data</Link>,{" "}
          <Link href="/ecosystem/niche-crm">Niche CRM</Link>, and acquisition
          opportunities.
        </p>
      }
    />
  );
}
