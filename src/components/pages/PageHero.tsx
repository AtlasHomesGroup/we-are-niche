"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/Container";

const EASE = [0.16, 1, 0.3, 1] as const;

interface PageHeroProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  const prefersReduced = useReducedMotion();
  const initial = prefersReduced ? false : { opacity: 0, y: 14 };

  return (
    <section className="niche-gradient-bg pb-8 pt-8 sm:pb-10 sm:pt-12">
      <Container width="wide">
        <div className="max-w-3xl">
          <motion.p
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
            className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]"
            suppressHydrationWarning
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl"
            suppressHydrationWarning
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={initial}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
              className="mt-6 max-w-2xl text-balance text-lg text-[var(--color-text-muted)] sm:text-xl"
              suppressHydrationWarning
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </Container>
    </section>
  );
}
