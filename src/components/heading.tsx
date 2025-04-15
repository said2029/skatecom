import clsx from "clsx";

type HeadingProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "lg" | "md" | "sm" | "xs";
  children: React.ReactNode;
  className?: string;
};

export function Heading({
  as: Comp = "h1",
  className,
  children,
  size = "lg",
}: HeadingProps) {
  return (
    <Comp
      className={clsx(
        "font-sans uppercase font-extrabold",
        size === "xl" && "text-4xl",
        size === "lg" && "text-4xl",
        size === "md" && "text-3xl",
        size === "sm" && "text-2xl",
        size === "xs" && "text-lg",
        className,
      )}
    >
      {children}
    </Comp>
  );
}