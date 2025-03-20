import clsx from "clsx";
import React, { CSSProperties, ElementType, ReactNode } from "react";

interface BoundedProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}
export default function Bounded({
  as: Com = "section",
  className,
  children,
  ...reastProps
}: BoundedProps) {
  return (
    <Com
      className={clsx(
        "px-6 p-8 [.header+&]:-pt-44 [.header+&]:md:pt-32",
        className
      )}
      {...reastProps}
    >
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </Com>
  );
}
