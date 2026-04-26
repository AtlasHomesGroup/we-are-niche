"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuPanel } from "./MenuPanel";
import { SearchOverlay } from "./SearchOverlay";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-30 w-full transition-all duration-200 ${
          scrolled
            ? "border-b border-[var(--color-border-soft)] bg-white/85 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="niche-focus-ring -ml-2 flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-text)] hover:text-[var(--color-accent)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M4 8h16M4 16h16"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <Link
            href="/"
            className="niche-focus-ring text-[13px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text)] hover:text-[var(--color-accent)]"
          >
            We Are Niche
          </Link>

          <button
            type="button"
            aria-label="Open search"
            onClick={() => setSearchOpen(true)}
            className="niche-focus-ring -mr-2 flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-text)] hover:text-[var(--color-accent)]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="m20 20-3.4-3.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </header>

      <MenuPanel open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
