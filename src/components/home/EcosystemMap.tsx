import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ecosystemMapBranches } from "@/lib/navigation";

export function EcosystemMap() {
  return (
    <section className="niche-gradient-soft relative overflow-hidden py-20 sm:py-28">
      <Container width="wide">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            The Map
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">
            One ecosystem. Three connected branches.
          </h2>
          <p className="mt-4 text-base text-[var(--color-text-muted)] sm:text-lg">
            Niche connects technology, community, and acquisitions through a
            shared set of products, people, and platforms.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div className="hidden lg:block">
            <DesktopMap />
          </div>
          <div className="lg:hidden">
            <MobileMap />
          </div>
        </div>
      </Container>
    </section>
  );
}

function DesktopMap() {
  const [eco, comm, acq] = ecosystemMapBranches;
  return (
    <div className="relative grid grid-cols-3 items-center gap-6">
      <BranchColumn group={eco} align="right" />

      <div className="relative flex flex-col items-center justify-center">
        <ConnectorLines />
        <div className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full border border-[var(--color-accent)] bg-white shadow-[0_18px_40px_-20px_rgba(238,90,36,0.45)]">
          <span className="absolute inset-3 rounded-full border border-dashed border-[var(--color-accent-soft)] opacity-60" />
          <span className="text-2xl font-semibold tracking-[0.18em] text-[var(--color-text)]">
            NICHE
          </span>
        </div>
        <div className="mt-12 w-full">
          <BranchColumn group={comm} align="center" />
        </div>
      </div>

      <BranchColumn group={acq} align="left" />
    </div>
  );
}

function ConnectorLines() {
  return (
    <svg
      aria-hidden
      className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 text-[var(--color-border)]"
      viewBox="-340 -210 680 420"
      fill="none"
    >
      <line x1="-90" y1="0" x2="-280" y2="-60" stroke="currentColor" strokeWidth="1" />
      <line x1="-90" y1="0" x2="-280" y2="0" stroke="currentColor" strokeWidth="1" />
      <line x1="-90" y1="0" x2="-280" y2="60" stroke="currentColor" strokeWidth="1" />
      <line x1="90" y1="0" x2="280" y2="-60" stroke="currentColor" strokeWidth="1" />
      <line x1="90" y1="0" x2="280" y2="0" stroke="currentColor" strokeWidth="1" />
      <line x1="90" y1="0" x2="280" y2="60" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="90" x2="-110" y2="170" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="90" x2="110" y2="170" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function BranchColumn({
  group,
  align,
}: {
  group: (typeof ecosystemMapBranches)[number];
  align: "left" | "right" | "center";
}) {
  const alignClass =
    align === "left" ? "items-start text-left" : align === "right" ? "items-end text-right" : "items-center text-center";
  const labelOrder = align === "right" ? "" : "";
  void labelOrder;
  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
        {group.label}
      </p>
      <ul className={`flex flex-col gap-2 ${align === "center" ? "lg:flex-row lg:gap-3" : ""}`}>
        {group.links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="niche-focus-ring inline-flex items-center rounded-full border border-[var(--color-border)] bg-white px-4 py-2 text-sm text-[var(--color-text)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[var(--shadow-niche-card)]"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileMap() {
  return (
    <div className="flex flex-col items-center gap-10">
      <div className="flex h-32 w-32 items-center justify-center rounded-full border border-[var(--color-accent)] bg-white shadow-[0_14px_32px_-16px_rgba(238,90,36,0.45)]">
        <span className="text-lg font-semibold tracking-[0.18em] text-[var(--color-text)]">
          NICHE
        </span>
      </div>
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
        {ecosystemMapBranches.map((g) => (
          <div
            key={g.label}
            className="flex flex-col items-center gap-3 rounded-[var(--radius-niche)] border border-[var(--color-border-soft)] bg-white p-5 text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              {g.label}
            </p>
            <ul className="flex flex-col gap-1.5">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="niche-focus-ring text-sm text-[var(--color-text)] hover:text-[var(--color-accent)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
