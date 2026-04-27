import { Container } from "@/components/ui/Container";

const blocks = [
  {
    label: "Technology",
    body: "Niche builds real estate technology products, including data tools and CRM systems that help investors identify opportunities, manage leads, and scale operations.",
  },
  {
    label: "Community",
    body: "Niche connects real estate professionals through education, coaching, office space, events, previous recordings, educational tools, and shared access to systems built for active investors.",
  },
  {
    label: "Acquisitions",
    body: "Niche supports property acquisition, homeowner solutions, and JV opportunities through connected deal flow and real estate execution.",
  },
];

export function SummaryBlocks() {
  return (
    <section className="niche-gradient-soft py-10 sm:py-14">
      <Container width="wide">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {blocks.map((b) => (
            <div key={b.label} className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  {b.label}
                </p>
              </div>
              <p className="text-base leading-relaxed text-[var(--color-text-muted)]">
                {b.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
