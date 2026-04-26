import type { HTMLAttributes } from "react";
import { Container } from "./Container";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  containerWidth?: "default" | "narrow" | "wide";
  bare?: boolean;
}

export function Section({
  containerWidth = "default",
  bare = false,
  className = "",
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={`py-16 sm:py-24 ${className}`} {...rest}>
      {bare ? children : <Container width={containerWidth}>{children}</Container>}
    </section>
  );
}
