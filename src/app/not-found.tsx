import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="niche-gradient-bg flex flex-1 items-center justify-center py-24 sm:py-32">
      <Container width="narrow" className="text-center">
        <Image
          src={siteConfig.brand.iconLogo}
          alt=""
          width={56}
          height={56}
          className="mx-auto mb-8 h-14 w-14 object-contain"
        />
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
          404
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-[var(--color-text)] sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base text-[var(--color-text-muted)]">
          This page may have moved, or the link may no longer exist.
        </p>
        <div className="mt-9 flex justify-center">
          <Button href="/" size="lg">
            Back to Home
          </Button>
        </div>
      </Container>
    </section>
  );
}
