import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The single source of truth for a section's eyebrow + title.
 * Every stacked section renders its heading through this so the
 * typography, spacing and entrance animation are identical everywhere.
 */
export function SectionHeading({
  eyebrow,
  title,
  tone = "light",
  align = "left",
  className,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  /** Optional trailing content (e.g. a "view all" link) shown beside the title. */
  children?: ReactNode;
}) {
  const eyebrowColor = tone === "dark" ? "text-gold-soft" : "text-gold";
  const titleColor = tone === "dark" ? "text-bone" : "text-charcoal";
  const alignCls = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <Reveal className={`flex flex-col ${alignCls} ${className ?? ""}`}>
      <p className={`eyebrow ${eyebrowColor}`}>{eyebrow}</p>
      <h2 className={`mt-4 max-w-2xl font-serif text-display-md font-light ${titleColor}`}>{title}</h2>
      {children}
    </Reveal>
  );
}
