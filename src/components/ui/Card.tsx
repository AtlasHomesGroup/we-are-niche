import Link from "next/link";
import type { ReactNode } from "react";

interface CardProps {
  href?: string;
  className?: string;
  children: ReactNode;
}

const base =
  "block rounded-[var(--radius-niche-lg)] bg-white border border-[var(--color-border-soft)] shadow-[var(--shadow-niche-card)] p-6 sm:p-7 transition-all duration-200";

export function Card({ href, className = "", children }: CardProps) {
  const interactive =
    "hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_12px_28px_-12px_rgba(12,37,54,0.18)]";
  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${interactive} ${className}`}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={`${base} ${interactive} ${className}`}>
        {children}
      </Link>
    );
  }
  return <div className={`${base} ${className}`}>{children}</div>;
}
