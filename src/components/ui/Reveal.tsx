"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  className?: string;
  amount?: number;
  once?: boolean;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.65,
  y = 24,
  className,
  amount = 0.15,
  once = true,
}: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -60px 0px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </motion.div>
  );
}

const stackContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const stackItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

interface RevealStackProps {
  children: ReactNode;
  className?: string;
  amount?: number;
  once?: boolean;
  as?: "div" | "ul" | "ol";
}

export function RevealStack({
  children,
  className,
  amount = 0.15,
  once = true,
  as = "div",
}: RevealStackProps) {
  const prefersReduced = useReducedMotion();
  const MotionComp = motion[as];

  if (prefersReduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionComp
      variants={stackContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin: "0px 0px -60px 0px" }}
      className={className}
      suppressHydrationWarning
    >
      {children}
    </MotionComp>
  );
}

interface RevealItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}

export function RevealItem({ children, className, as = "div" }: RevealItemProps) {
  const prefersReduced = useReducedMotion();
  const MotionComp = motion[as];

  if (prefersReduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionComp variants={stackItem} className={className} suppressHydrationWarning>
      {children}
    </MotionComp>
  );
}
