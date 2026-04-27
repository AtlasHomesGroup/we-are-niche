import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/pages/PageHero";
import { Prose } from "@/components/pages/Prose";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";

const meta = pagesByRoute["/company/michael-franke"];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

const background = [
  "Founder of Niche",
  "Former high school algebra teacher",
  "More than 10 years of real estate experience",
  "More than 1,000 successfully closed deals",
  "Active in the market every week",
  "Coach, educator, investor, and operator",
];

const related = [
  { label: "Get Niche Now", href: "/community/get-niche-now" },
  { label: "Niche Acquisitions", href: "/acquisitions/niche-acquisitions" },
  { label: "JV With Niche", href: "/acquisitions/jv-with-niche" },
  { label: "Niche Space", href: "/community/niche-space" },
];

export default function MichaelFrankePage() {
  return (
    <>
      <PageHero
        eyebrow="Founder of Niche"
        title="Michael Franke"
        subtitle="Educator, investor, and operator — connecting real estate education, data, CRM, acquisitions, and community under one ecosystem."
      />
      <section className="py-10 sm:py-12">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_300px]">
            <Prose>
              <p>
                <strong>Michael Franke, Founder of Niche,</strong> brings
                together more than 10 years of real estate experience, over
                1,000 successfully closed deals, and a background as a high
                school algebra teacher.
              </p>
              <p>
                Before building the Niche ecosystem, Michael taught algebra at
                the high school level. His teaching background and education
                experience continue to shape how the Niche community learns
                today: practical, structured, step-by-step, and focused on
                real-world understanding.
              </p>
              <p>
                Michael is not only an educator or coach. He is actively in the
                real estate market and continues to work on real opportunities
                and deals through the Niche ecosystem every week.
              </p>
              <p>
                Through Niche, Michael connects education, data, CRM systems,
                acquisition strategy, community, and real-world deal execution
                into one operating ecosystem for real estate professionals.
              </p>
            </Prose>

            <aside className="flex flex-col gap-6">
              <div className="rounded-[var(--radius-niche-lg)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[var(--shadow-niche-soft)]">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Background
                </p>
                <ul className="flex flex-col gap-2.5">
                  {background.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-accent)]" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[var(--radius-niche-lg)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[var(--shadow-niche-soft)]">
                <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  Where to go next
                </p>
                <ul className="flex flex-col gap-2">
                  {related.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="niche-focus-ring flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm text-[var(--color-text)] hover:text-[var(--color-accent)]"
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
