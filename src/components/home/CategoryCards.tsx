import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { menuGroups } from "@/lib/navigation";

export function CategoryCards() {
  return (
    <section className="py-10 sm:py-14">
      <Container width="wide">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
            Where to start
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Explore the Niche ecosystem
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {menuGroups.map((group) => (
            <li key={group.label}>
              <Card className="flex h-full flex-col gap-5">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    {group.label}
                  </p>
                  <span className="text-xs text-[var(--color-text-soft)]">
                    {group.links.length}
                  </span>
                </div>
                <ul className="flex flex-1 flex-col gap-2">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="group flex items-center justify-between gap-2 text-sm text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        <span>{link.label}</span>
                        <svg
                          aria-hidden
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-[var(--color-text-soft)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]"
                        >
                          <path
                            d="M5 12h14m-5-6 6 6-6 6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
