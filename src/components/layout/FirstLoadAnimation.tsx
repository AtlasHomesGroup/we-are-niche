"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "niche.intro.played";

export function FirstLoadAnimation() {
  const [show, setShow] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    let alreadyPlayed = false;
    try {
      alreadyPlayed = !!sessionStorage.getItem(STORAGE_KEY);
      if (!alreadyPlayed) sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      alreadyPlayed = true;
    }
    if (alreadyPlayed || prefersReduced) return;

    const showT = window.requestAnimationFrame(() => setShow(true));
    const hideT = window.setTimeout(() => setShow(false), 1400);
    return () => {
      window.cancelAnimationFrame(showT);
      window.clearTimeout(hideT);
    };
  }, [prefersReduced]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          aria-hidden
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex h-24 w-24 items-center justify-center"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.04, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
          >
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(238,90,36,0.28), transparent 70%)",
              }}
              initial={{ scale: 0.95, opacity: 0.6 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <Image
              src={siteConfig.brand.iconLogo}
              alt=""
              width={64}
              height={64}
              priority
              className="relative h-16 w-16 object-contain"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
