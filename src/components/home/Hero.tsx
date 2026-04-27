import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="niche-gradient-bg relative overflow-hidden pt-8 sm:pt-12">
      <HeroBackdrop />
      <Container width="wide" className="relative pb-12 pt-8 sm:pb-16 sm:pt-12">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center niche-anim-fade-in">
          <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-3.5 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--color-text-muted)] backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            The Niche Ecosystem
          </span>
          <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-[var(--color-text)] sm:text-6xl md:text-7xl">
            We Are Niche
          </h1>
          <p className="mt-7 max-w-2xl text-balance text-lg leading-relaxed text-[var(--color-text-muted)] sm:text-xl">
            A connected real estate ecosystem built around technology, data, CRM,
            education, acquisitions, partnerships, and community.
          </p>
        </div>
      </Container>
    </section>
  );
}

function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      <svg
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.55]"
        viewBox="0 0 1200 800"
        fill="none"
      >
        <defs>
          <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(238,90,36,0.18)" />
            <stop offset="60%" stopColor="rgba(238,90,36,0.05)" />
            <stop offset="100%" stopColor="rgba(238,90,36,0)" />
          </radialGradient>
        </defs>
        <circle cx="600" cy="420" r="320" fill="url(#heroGlow)" />
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i / 18) * Math.PI * 2;
          const r = 280 + (i % 3) * 30;
          const cx = 600 + Math.cos(angle) * r;
          const cy = 420 + Math.sin(angle) * r * 0.7;
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i % 4 === 0 ? 3 : 2}
              fill="rgba(12,37,54,0.18)"
            />
          );
        })}
      </svg>
    </div>
  );
}
