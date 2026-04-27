"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { menuGroups } from "@/lib/navigation";
import { siteConfig } from "@/lib/site-config";

interface MenuPanelProps {
  open: boolean;
  onClose: () => void;
}

const groupVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.08 },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
  },
};

export function MenuPanel({ open, onClose }: MenuPanelProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

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
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50">
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-[rgba(12,37,54,0.35)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-white shadow-2xl"
            initial={prefersReduced ? { x: 0 } : { x: "-100%" }}
            animate={{ x: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { x: "-100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36, mass: 0.9 }}
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
              <motion.ul
                className="flex flex-col gap-9"
                variants={groupVariants}
                initial="hidden"
                animate="show"
              >
                {menuGroups.map((group) => (
                  <li key={group.label}>
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                      {group.label}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {group.links.map((link) => (
                        <motion.li key={link.href} variants={linkVariants}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="niche-focus-ring -mx-2 inline-block rounded-md px-2 py-1.5 text-lg text-[var(--color-text)] transition-colors hover:text-[var(--color-accent)]"
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      ))}
                    </ul>
                  </li>
                ))}
              </motion.ul>
            </nav>

            <div className="border-t border-[var(--color-border-soft)] px-7 py-5 text-xs text-[var(--color-text-muted)]">
              {siteConfig.motto}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
