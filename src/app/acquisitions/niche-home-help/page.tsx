import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/brands";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { BrandPageLayout } from "@/components/pages/BrandPageLayout";
import { Prose } from "@/components/pages/Prose";

const brand = brands["niche-home-help"];
const meta = pagesByRoute[brand.route];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function NicheHomeHelpPage() {
  return (
    <BrandPageLayout
      brand={brand}
      eyebrow="Acquisitions"
      subtitle="The homeowner-facing intake for property owners seeking practical real estate solutions."
      body={
        <Prose>
          <p>
            <strong>Niche Home Help</strong> is the homeowner-facing landing
            page where property owners in difficult or distressed situations
            can submit a request for help.
          </p>
          <p>
            These requests are reviewed through the Niche acquisition process,
            with the goal of understanding the homeowner&apos;s situation and
            identifying practical real estate solutions where appropriate.
          </p>
          <p>
            Niche Home Help supports homeowners facing difficult property
            situations, including foreclosure, inherited property, vacant
            homes, landlord challenges, relocation, financial hardship,
            divorce, major repairs, or unwanted property ownership. The goal
            is to provide a practical path forward, not pressure homeowners
            into one specific option.
          </p>
          <p>
            You can{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              request homeowner help
            </a>{" "}
            or{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              learn how Niche Home Help works
            </a>{" "}
            on the dedicated site.
          </p>
        </Prose>
      }
      fit={
        <p>
          Niche Home Help is the homeowner intake layer of the acquisition
          ecosystem. It connects homeowners with{" "}
          <Link href="/acquisitions/niche-acquisitions">Niche Acquisitions</Link>{" "}
          and helps convert qualified homeowner requests into real estate
          solutions and potential deals.
        </p>
      }
    />
  );
}
