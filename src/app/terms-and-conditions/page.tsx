import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/pages/PageHero";
import { Prose } from "@/components/pages/Prose";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";

const meta = pagesByRoute["/terms-and-conditions"];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        subtitle="Temporary placeholder pending final legal review."
      />
      <section className="py-8 sm:py-10">
        <Container width="narrow">
          <div className="mb-8 rounded-[var(--radius-niche)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-tint)] p-5 text-sm text-[var(--color-text)]">
            <strong>Notice:</strong> These Terms &amp; Conditions are
            placeholders and will be replaced with final legal content. They
            should not be treated as final legal advice or final contractual
            language.
          </div>
          <Prose>
            <p>
              By using this website, you agree to use it for informational
              purposes related to the Niche real estate ecosystem.
            </p>
            <p>
              The content on this umbrella site is provided for general
              informational purposes and does not constitute legal, financial,
              or real estate advice.
            </p>
            <p>
              External brand websites linked from this site — including Niche
              Solutions, Niche Data, Niche CRM, Get Niche Now, Niche Space,
              Niche Acquisitions, JV With Niche, and Niche Home Help — operate
              independently and may have their own terms of service.
            </p>
            <p>
              Final Terms &amp; Conditions, including specific use, liability,
              and dispute resolution provisions, will be posted here following
              review with legal counsel.
            </p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
