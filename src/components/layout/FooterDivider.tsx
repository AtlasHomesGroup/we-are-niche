import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export function FooterDivider() {
  return (
    <div aria-hidden className="relative mx-auto mt-24 max-w-6xl px-6 sm:px-8">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-bg)] p-3">
        <Image
          src={siteConfig.brand.iconLogo}
          alt=""
          width={26}
          height={26}
          className="h-[26px] w-[26px] object-contain"
        />
      </div>
    </div>
  );
}
