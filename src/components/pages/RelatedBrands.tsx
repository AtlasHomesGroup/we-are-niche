import Link from "next/link";
import { brands, type BrandSlug } from "@/lib/brands";
import { RevealStack, RevealItem } from "@/components/ui/Reveal";

export function RelatedBrands({ slugs }: { slugs: BrandSlug[] }) {
  return (
    <section className="mt-12">
      <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
        Related Niche brands
      </p>
      <RevealStack
        as="ul"
        className="grid grid-cols-1 gap-3 sm:grid-cols-3"
      >
        {slugs.map((slug) => {
          const b = brands[slug];
          return (
            <RevealItem key={slug} as="li">
              <Link
                href={b.route}
                className="niche-focus-ring flex h-full flex-col gap-2 rounded-[var(--radius-niche)] border border-[var(--color-border-soft)] bg-white p-5 transition-all hover:border-[var(--color-accent)] hover:shadow-[var(--shadow-niche-card)]"
              >
                <span className="text-sm font-semibold text-[var(--color-text)]">
                  {b.name}
                </span>
                <span className="text-xs text-[var(--color-text-muted)]">
                  {b.shortDescription}
                </span>
              </Link>
            </RevealItem>
          );
        })}
      </RevealStack>
    </section>
  );
}
