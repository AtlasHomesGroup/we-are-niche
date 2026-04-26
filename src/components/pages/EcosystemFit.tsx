import type { ReactNode } from "react";

export function EcosystemFit({ children }: { children: ReactNode }) {
  return (
    <section className="mt-16 rounded-[var(--radius-niche-lg)] border border-[var(--color-border-soft)] bg-white p-7 shadow-[var(--shadow-niche-soft)] sm:p-10">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
        How it fits into the Niche ecosystem
      </p>
      <div className="text-base leading-relaxed text-[var(--color-text-muted)] sm:text-[17px]">
        {children}
      </div>
    </section>
  );
}
