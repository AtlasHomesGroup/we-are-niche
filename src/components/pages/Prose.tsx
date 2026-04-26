import type { ReactNode } from "react";

export function Prose({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-[17px] [&_a]:text-[var(--color-accent)] [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-[var(--color-text)] [&_p]:my-5 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-[var(--color-text)] [&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[var(--color-text)] [&_strong]:text-[var(--color-text)] [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1.5 ${className}`}
    >
      {children}
    </div>
  );
}
