import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/pages/PageHero";
import { brandsByCategory } from "@/lib/brands";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";

const meta = pagesByRoute["/sitemap"];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="Everything in the Niche ecosystem"
        subtitle="Internal pages and external brand websites, organized by category."
      />
      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <SitemapGroup title="Home">
              <SitemapInternal href="/" label="We Are Niche Home" />
            </SitemapGroup>

            <SitemapGroup title="Ecosystem">
              {brandsByCategory.ecosystem.map((b) => (
                <BrandRow key={b.slug} name={b.name} route={b.route} url={b.externalUrl} />
              ))}
            </SitemapGroup>

            <SitemapGroup title="Community">
              {brandsByCategory.community.map((b) => (
                <BrandRow key={b.slug} name={b.name} route={b.route} url={b.externalUrl} />
              ))}
            </SitemapGroup>

            <SitemapGroup title="Acquisitions">
              {brandsByCategory.acquisitions.map((b) => (
                <BrandRow key={b.slug} name={b.name} route={b.route} url={b.externalUrl} />
              ))}
            </SitemapGroup>

            <SitemapGroup title="Company">
              <SitemapInternal href="/company/about" label="About Us" />
              <SitemapInternal href="/company/michael-franke" label="Michael Franke" />
              <SitemapInternal href="/company/contact" label="Contact" />
            </SitemapGroup>

            <SitemapGroup title="Legal">
              <SitemapInternal href="/privacy-policy" label="Privacy Policy" />
              <SitemapInternal href="/terms-and-conditions" label="Terms & Conditions" />
            </SitemapGroup>
          </div>
        </Container>
      </section>
    </>
  );
}

function SitemapGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5 border-l border-[var(--color-border-soft)] pl-5">
        {children}
      </ul>
    </div>
  );
}

function SitemapInternal({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link
        href={href}
        className="niche-focus-ring inline-block text-base text-[var(--color-text)] hover:text-[var(--color-accent)]"
      >
        {label}
      </Link>
    </li>
  );
}

function BrandRow({
  name,
  route,
  url,
}: {
  name: string;
  route: string;
  url: string;
}) {
  return (
    <>
      <li>
        <Link
          href={route}
          className="niche-focus-ring inline-block text-base text-[var(--color-text)] hover:text-[var(--color-accent)]"
        >
          {name} <span className="text-[var(--color-text-soft)]">— internal page</span>
        </Link>
      </li>
      <li>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="niche-focus-ring inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
        >
          {name} website
          <span aria-hidden>↗</span>
        </a>
      </li>
    </>
  );
}
