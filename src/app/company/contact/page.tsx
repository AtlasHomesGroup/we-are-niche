import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/pages/PageHero";
import { siteConfig } from "@/lib/site-config";
import { pagesByRoute } from "@/lib/pages";
import { buildMetadata } from "@/lib/seo";

const meta = pagesByRoute["/company/contact"];

export const metadata: Metadata = buildMetadata({
  title: meta.title,
  description: meta.description,
  path: meta.route,
  keywords: [...meta.keywords],
});

export default function ContactPage() {
  const mapEmbed = `https://www.google.com/maps?q=${siteConfig.contact.mapEmbedQuery}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${siteConfig.contact.mapEmbedQuery}`;
  const emails = Object.values(siteConfig.contact.emails);

  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Contact"
        subtitle="Reach the Niche team for general questions, data support, or community access."
      />
      <section className="py-12 sm:py-16">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
            <div className="flex flex-col gap-10">
              <ContactBlock label="Corporate phone">
                <a
                  href={siteConfig.contact.phoneHref}
                  className="text-xl font-medium text-[var(--color-text)] hover:text-[var(--color-accent)]"
                >
                  {siteConfig.contact.phone}
                </a>
              </ContactBlock>

              <ContactBlock label="Office">
                <p className="text-base text-[var(--color-text)]">
                  {siteConfig.contact.address}
                </p>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-[var(--color-accent)] underline-offset-4 hover:underline"
                >
                  Open in Google Maps
                  <span aria-hidden>↗</span>
                </a>
              </ContactBlock>

              <ContactBlock label="Email">
                <ul className="flex flex-col gap-2.5">
                  {emails.map((e) => (
                    <li key={e.value} className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                        {e.label}
                      </span>
                      <a
                        href={`mailto:${e.value}`}
                        className="text-base text-[var(--color-text)] hover:text-[var(--color-accent)]"
                      >
                        {e.value}
                      </a>
                    </li>
                  ))}
                </ul>
              </ContactBlock>

              <ContactBlock label="Follow the Niche ecosystem">
                <ul className="flex flex-wrap gap-2">
                  {siteConfig.social.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="niche-focus-ring inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-3.5 py-1.5 text-xs text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </ContactBlock>
            </div>

            <div>
              <div className="overflow-hidden rounded-[var(--radius-niche-lg)] border border-[var(--color-border-soft)] bg-white shadow-[var(--shadow-niche-soft)]">
                <iframe
                  src={mapEmbed}
                  title={`Map of ${siteConfig.contact.address}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[420px] w-full border-0"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-xs text-[var(--color-text-soft)]">
                {siteConfig.contact.address}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
        {label}
      </p>
      {children}
    </div>
  );
}
