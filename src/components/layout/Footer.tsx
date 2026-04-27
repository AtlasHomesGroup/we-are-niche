import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { legalLinks } from "@/lib/navigation";
import { FooterDivider } from "./FooterDivider";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  return (
    <footer className="pb-4">
      <FooterDivider />
      <div className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-5 px-6 sm:px-8 lg:grid-cols-2 lg:gap-12">
        <div className="flex flex-row items-center justify-center gap-4 lg:flex-col lg:items-start lg:justify-start lg:gap-5">
          <Link
            href="/"
            aria-label="We Are Niche home"
            className="inline-block flex-shrink-0"
          >
            <Image
              src={siteConfig.brand.horizontalLogo}
              alt="Niche"
              width={180}
              height={80}
              className="h-10 w-auto object-contain lg:h-12"
            />
          </Link>
          <p className="max-w-[180px] text-xs text-[var(--color-text-muted)] lg:max-w-md lg:text-sm">
            {siteConfig.motto}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 lg:items-end lg:gap-6">
          <div className="flex flex-col items-center gap-3 lg:items-end">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
              Follow the Niche ecosystem
            </p>
            <ul className="flex flex-wrap justify-center gap-2 lg:justify-end">
              {siteConfig.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="niche-focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-muted)] transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                  >
                    <SocialIcon name={s.label} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs text-[var(--color-text-muted)] lg:justify-end">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="niche-focus-ring rounded-sm hover:text-[var(--color-accent)]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-3 max-w-6xl px-6 text-center text-xs text-[var(--color-text-soft)] sm:px-8">
        {siteConfig.copyright}
      </p>
    </footer>
  );
}
