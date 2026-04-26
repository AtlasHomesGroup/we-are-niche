"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { menuGroups } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

interface MenuPanelProps {
  open: boolean;
  onClose: () => void;
}

export function MenuPanel({ open, onClose }: MenuPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className="absolute inset-0 bg-[rgba(12,37,54,0.35)] backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[var(--color-border-soft)] px-7 py-5">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2"
            aria-label="We Are Niche home"
          >
            <Image
              src={siteConfig.brand.iconLogo}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
            <span className="text-[12px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text)]">
              We Are Niche
            </span>
          </Link>
          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="niche-focus-ring flex h-10 w-10 items-center justify-center rounded-md text-[var(--color-text)] hover:text-[var(--color-accent)]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-7 py-8">
          <ul className="flex flex-col gap-9">
            {menuGroups.map((group) => (
              <li key={group.label}>
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                  {group.label}
                </p>
                <ul className="flex flex-col gap-1.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="niche-focus-ring -mx-2 inline-block rounded-md px-2 py-1.5 text-lg text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-[var(--color-border-soft)] px-7 py-5 text-xs text-[var(--color-text-muted)]">
          {siteConfig.motto}
        </div>
      </aside>
    </div>
  );
}
