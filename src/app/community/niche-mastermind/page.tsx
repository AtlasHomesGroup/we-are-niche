import type { Metadata } from "next";
import Link from "next/link";
import { brands } from "@/lib/brands";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";
import { BrandPageLayout } from "@/components/pages/BrandPageLayout";
import { Prose } from "@/components/pages/Prose";

const brand = brands["niche-mastermind"];
const meta = pagesByRoute[brand.route];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function NicheMastermindPage() {
  return (
    <BrandPageLayout
      brand={brand}
      eyebrow="Community"
      subtitle="Strategy games built around Michael Franke's real estate books — turning his frameworks into interactive learning for the Niche community."
      body={
        <Prose>
          <p>
            <strong>Niche Mastermind</strong> brings Michael Franke&apos;s real
            estate books to life through games. The frameworks, deal scenarios,
            and decision patterns from the books become playable — so members
            can practice the thinking behind real deals, not just read about
            it.
          </p>
          <p>
            Niche Mastermind sits inside the broader Niche community as a
            learning layer. You can{" "}
            <a href={brand.externalUrl} target="_blank" rel="noopener noreferrer">
              explore the Niche Mastermind games
            </a>{" "}
            and use them alongside the rest of the Niche education stack.
          </p>
        </Prose>
      }
      fit={
        <p>
          Niche Mastermind extends the{" "}
          <Link href="/community/get-niche-now">Niche community</Link> with
          interactive, book-driven learning, and pairs with{" "}
          <Link href="/community/niche-space">Niche Space</Link> for in-person
          masterminds and gatherings.
        </p>
      }
    />
  );
}
