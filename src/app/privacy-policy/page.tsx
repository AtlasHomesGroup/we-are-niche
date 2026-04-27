import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/pages/PageHero";
import { Prose } from "@/components/pages/Prose";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";

const meta = pagesByRoute["/privacy-policy"];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="Temporary placeholder pending final legal review."
      />
      <section className="py-8 sm:py-10">
        <Container width="narrow">
          <div className="mb-8 rounded-[var(--radius-niche)] border border-[var(--color-accent)]/40 bg-[var(--color-accent-tint)] p-5 text-sm text-[var(--color-text)]">
            <strong>Notice:</strong> This Privacy Policy is a placeholder and
            will be replaced with final legal content. It should not be treated
            as final legal advice or final compliance language.
          </div>
          <Prose>
            <p>
              We Are Niche operates this website as the umbrella site for the
              Niche real estate ecosystem. We respect your privacy and aim to
              be transparent about how this website handles information.
            </p>
            <p>
              When you visit this site, basic technical information may be
              collected (such as browser type, device type, and pages viewed)
              for the purpose of operating and improving the site.
            </p>
            <p>
              If you contact us through email or social channels listed on this
              site, we will use that information only to respond to your
              inquiry.
            </p>
            <p>
              External brand websites linked from this umbrella site (Niche
              Solutions, Niche Data, Niche CRM, Get Niche Now, Niche Space,
              Niche Acquisitions, JV With Niche, Niche Home Help) operate
              independently and may have their own privacy policies. Please
              review those policies on the individual websites.
            </p>
            <p>
              A finalized Privacy Policy will be posted here following review
              with legal counsel.
            </p>
          </Prose>
        </Container>
      </section>
    </>
  );
}
