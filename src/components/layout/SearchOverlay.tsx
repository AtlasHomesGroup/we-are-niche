"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { searchPages, type SearchEntry } from "@/lib/search-index";
import { pages } from "@/lib/pages";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  if (!open) return null;
  return <SearchOverlayInner onClose={onClose} />;
}

function SearchOverlayInner({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results: SearchEntry[] = useMemo(() => {
    if (!query.trim()) {
      return pages.slice(0, 8).map((p) => ({ ...p, haystack: "" }));
    }
    return searchPages(query);
  }, [query]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = "";
      window.clearTimeout(t);
    };
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(0);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const target = results[activeIndex];
      if (target) {
        window.location.href = target.route;
        onClose();
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50"
      onKeyDown={handleKey}
    >
      <div
        className="absolute inset-0 bg-[rgba(12,37,54,0.4)] backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="absolute inset-x-0 top-[10vh] mx-auto w-full max-w-2xl px-4 niche-anim-fade-in"
      >
        <div className="overflow-hidden rounded-[var(--radius-niche-lg)] border border-[var(--color-border)] bg-white shadow-2xl">
          <div className="flex items-center gap-3 border-b border-[var(--color-border-soft)] px-5 py-4">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="m20 20-3.4-3.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={handleQueryChange}
              placeholder="Search the Niche ecosystem"
              className="flex-1 bg-transparent text-base text-[var(--color-text)] placeholder:text-[var(--color-text-soft)] focus:outline-none"
              aria-label="Search the Niche ecosystem"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="niche-focus-ring rounded-md px-2 py-1 text-xs uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-accent)]"
            >
              Esc
            </button>
          </div>
          <ul className="max-h-[60vh] overflow-y-auto py-2">
            {results.length === 0 && (
              <li className="px-5 py-8 text-center text-sm text-[var(--color-text-muted)]">
                No matching pages.
              </li>
            )}
            {results.map((r, i) => (
              <li key={r.route}>
                <Link
                  href={r.route}
                  onClick={onClose}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`flex flex-col gap-0.5 px-5 py-3 transition-colors ${
                    i === activeIndex
                      ? "bg-[var(--color-accent-tint)]"
                      : "hover:bg-[var(--color-bg-soft)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      {r.title}
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                      {r.category}
                    </span>
                  </div>
                  <span className="line-clamp-1 text-xs text-[var(--color-text-muted)]">
                    {r.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="border-t border-[var(--color-border-soft)] px-5 py-3 text-[11px] text-[var(--color-text-soft)]">
            <span className="hidden sm:inline">Use ↑ ↓ to navigate, ↵ to open, Esc to close.</span>
            <span className="sm:hidden">Tap a result to open.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
