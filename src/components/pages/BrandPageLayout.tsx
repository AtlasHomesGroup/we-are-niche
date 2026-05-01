import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "./PageHero";
import { VisitWebsiteButton } from "./VisitWebsiteButton";
import { EcosystemFit } from "./EcosystemFit";
import { RelatedBrands } from "./RelatedBrands";
import type { Brand } from "@/lib/brands";

export type Capability = string | { label: string; href: string };

interface BrandPageLayoutProps {
  brand: Brand;
  eyebrow: string;
  subtitle: string;
  body: ReactNode;
  fit: ReactNode;
  capabilitiesTitle?: string;
  capabilities?: Capability[];
}

export function BrandPageLayout({
  brand,
  eyebrow,
  subtitle,
  body,
  fit,
  capabilitiesTitle,
  capabilities,
}: BrandPageLayoutProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={brand.name} subtitle={subtitle} />
      <section className="py-10 sm:py-12">
        <Container width="wide">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              {body}
              <VisitWebsiteButton
                label={brand.ctaLabel}
                href={brand.externalUrl}
                externalLabel={brand.externalLabel}
              />
              <EcosystemFit>{fit}</EcosystemFit>
              <RelatedBrands slugs={[...brand.related]} />
            </div>
            {capabilities && capabilities.length > 0 && (
              <aside className="lg:pt-2">
                <div className="sticky top-24 rounded-[var(--radius-niche-lg)] border border-[var(--color-border-soft)] bg-white p-6 shadow-[var(--shadow-niche-soft)]">
                  <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    {capabilitiesTitle ?? "Highlights"}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {capabilities.map((c) => {
                      const isLink = typeof c !== "string";
                      const label = isLink ? c.label : c;
                      return (
                        <li
                          key={label}
                          className="flex items-start gap-2.5 text-sm text-[var(--color-text-muted)]"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[var(--color-accent)]" />
                          {isLink ? (
                            <a
                              href={c.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[var(--color-text)] underline-offset-2 transition-colors hover:text-[var(--color-accent)] hover:underline"
                            >
                              {label}
                            </a>
                          ) : (
                            <span>{label}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
