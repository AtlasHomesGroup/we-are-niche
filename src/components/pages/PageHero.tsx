import { Container } from "@/components/ui/Container";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="niche-gradient-bg pb-12 pt-12 sm:pb-16 sm:pt-20">
      <Container width="wide">
        <div className="max-w-3xl niche-anim-fade-in">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            {eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 max-w-2xl text-balance text-lg text-[var(--color-text-muted)] sm:text-xl">
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
