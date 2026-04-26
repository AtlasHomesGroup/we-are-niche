import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/pages/PageHero";
import { Prose } from "@/components/pages/Prose";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";

const meta = pagesByRoute["/company/about"];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

const relatedLinks = [
  { label: "Michael Franke", href: "/company/michael-franke" },
  { label: "Niche Data", href: "/ecosystem/niche-data" },
  { label: "Niche CRM", href: "/ecosystem/niche-crm" },
  { label: "Niche Acquisitions", href: "/acquisitions/niche-acquisitions" },
  { label: "Get Niche Now", href: "/community/get-niche-now" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="About Niche"
        subtitle="A connected real estate ecosystem built around technology, data, CRM, education, acquisitions, partnerships, and community."
      />
      <section className="py-16 sm:py-20">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_280px]">
            <Prose>
              <h2>The story of Niche</h2>
              <p>
                <strong>Niche</strong> was built to connect the pieces real
                estate professionals need to grow: technology, data, CRM
                systems, education, community, acquisitions, and partnerships.
              </p>
              <p>
                The ecosystem brings together software development, real estate
                intelligence, community education, acquisition execution, JV
                opportunities, and homeowner-facing solutions under one
                connected Niche brand.
              </p>

              <h2>Mission</h2>
              <p>
                The mission of Niche is to help real estate professionals access
                better tools, better information, better education, and better
                systems for building and scaling real estate businesses.
              </p>

              <h2>Vision</h2>
              <p>
                The vision is to continue building a national real estate
                ecosystem where data, technology, education, community, and
                real deal execution work together.
              </p>

              <h2>The ecosystem</h2>
              <p>
                Niche connects technology, community, and acquisitions through a
                shared set of products and platforms — including{" "}
                <Link href="/ecosystem/niche-solutions">Niche Solutions</Link>,{" "}
                <Link href="/ecosystem/niche-data">Niche Data</Link>,{" "}
                <Link href="/ecosystem/niche-crm">Niche CRM</Link>,{" "}
                <Link href="/community/get-niche-now">Get Niche Now</Link>,{" "}
                <Link href="/community/niche-space">Niche Space</Link>,{" "}
                <Link href="/acquisitions/niche-acquisitions">Niche Acquisitions</Link>,{" "}
                <Link href="/acquisitions/jv-with-niche">JV With Niche</Link>,
                and{" "}
                <Link href="/acquisitions/niche-home-help">Niche Home Help</Link>.
              </p>

              <h2>Michael Franke&apos;s role</h2>
              <p>
                Niche is led publicly by{" "}
                <Link href="/company/michael-franke">Michael Franke</Link>,
                Founder of Niche, whose background as an educator and active
                real estate operator helps shape the practical, action-oriented
                nature of the community.
              </p>
            </Prose>

            <aside>
              <div className="sticky top-24 rounded-[var(--radius-niche-lg)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[var(--shadow-niche-soft)]">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Explore further
                </p>
                <ul className="flex flex-col gap-2">
                  {relatedLinks.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="niche-focus-ring flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        <span>{l.label}</span>
                        <span aria-hidden className="text-[var(--color-text-soft)]">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </>
  );
}
