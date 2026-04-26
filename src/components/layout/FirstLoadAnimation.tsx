"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

const STORAGE_KEY = "niche.intro.played";

export function FirstLoadAnimation() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let alreadyPlayed = false;
    try {
      alreadyPlayed = !!sessionStorage.getItem(STORAGE_KEY);
      if (!alreadyPlayed) sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      alreadyPlayed = true;
    }
    if (alreadyPlayed) return;

    const showT = window.requestAnimationFrame(() => setShow(true));
    const hideT = window.setTimeout(() => setShow(false), 1500);
    return () => {
      window.cancelAnimationFrame(showT);
      window.clearTimeout(hideT);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-bg)]"
      style={{ animation: "niche-intro-veil 1.5s ease forwards" }}
    >
      <div
        className="relative flex h-24 w-24 items-center justify-center"
        style={{ animation: "niche-intro-fade 1.5s ease forwards" }}
      >
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(238,90,36,0.28), transparent 70%)",
            animation: "niche-pulse-ring 1.4s ease-out forwards",
          }}
        />
        <Image
          src={siteConfig.brand.iconLogo}
          alt=""
          width={64}
          height={64}
          priority
          className="relative h-16 w-16 object-contain"
        />
      </div>
    </div>
  );
}
