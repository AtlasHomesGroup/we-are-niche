import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 niche-focus-ring disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-soft)] shadow-[0_8px_20px_-10px_rgba(238,90,36,0.6)]",
  secondary:
    "bg-white text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
  ghost:
    "text-[var(--color-text)] hover:text-[var(--color-accent)]",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  external?: boolean;
  children: ReactNode;
  className?: string;
}

interface ButtonAsLink
  extends CommonProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children" | "className"> {
  href: string;
}

interface ButtonAsButton
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> {
  href?: undefined;
}

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "" } = props;
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if ("href" in props && props.href) {
    const { href, external, children, variant: _v, size: _s, className: _c, ...rest } = props;
    void _v; void _s; void _c;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cls}
          {...rest}
        >
          {children}
          <svg
            aria-hidden
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      );
    }
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }

  const { children, variant: _v, size: _s, className: _c, ...rest } =
    props as ButtonAsButton;
  void _v; void _s; void _c;
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
