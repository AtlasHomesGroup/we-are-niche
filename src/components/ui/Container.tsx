import type { HTMLAttributes } from "react";

type Width = "default" | "narrow" | "wide";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: Width;
}

const widthClass: Record<Width, string> = {
  narrow: "max-w-3xl",
  default: "max-w-5xl",
  wide: "max-w-6xl",
};

export function Container({
  width = "default",
  className = "",
  children,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 sm:px-8 ${widthClass[width]} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
