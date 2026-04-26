import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/brands";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { BrandPageLayout } from "@/components/pages/BrandPageLayout";
import { Prose } from "@/components/pages/Prose";

const brand = brands["jv-with-niche"];
const meta = pagesByRoute[brand.route];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function JvWithNichePage() {
  return (
    <BrandPageLayout
      brand={brand}
      eyebrow="Acquisitions"
      subtitle="An automated deal submission portal for joint venturing real estate opportunities with Niche."
      body={
        <Prose>
          <p>
            <strong>JV With Niche</strong> is an automated deal submission
            portal for people who want to submit real estate leads and
            potential opportunities to joint venture with Niche.
          </p>
          <p>
            Through the portal, real estate professionals, investors,
            wholesalers, and community members can submit leads for review.
            Submitted opportunities may be evaluated and potentially handled
            through{" "}
            <Link href="/acquisitions/niche-acquisitions">Niche Acquisitions</Link>.
            You can{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              submit a JV opportunity
            </a>{" "}
            or{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              learn how JV With Niche works
            </a>{" "}
            on the official portal.
          </p>
          <p>
            JV With Niche creates a structured path for collaboration between
            Niche and people who have opportunities but want support evaluating,
            negotiating, or executing the deal.
          </p>
        </Prose>
      }
      fit={
        <p>
          JV With Niche connects external and internal deal flow to{" "}
          <Link href="/acquisitions/niche-acquisitions">Niche Acquisitions</Link>.
          It gives people a formal way to submit opportunities and potentially
          partner with Niche on real estate deals.
        </p>
      }
    />
  );
}
