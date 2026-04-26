import { Button } from "@/components/ui/Button";

interface VisitWebsiteButtonProps {
  label: string;
  href: string;
  externalLabel: string;
}

export function VisitWebsiteButton({
  label,
  href,
  externalLabel,
}: VisitWebsiteButtonProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <Button href={href} external size="lg">
        {label}
      </Button>
      <span className="text-sm text-[var(--color-text-soft)]">{externalLabel}</span>
    </div>
  );
}
