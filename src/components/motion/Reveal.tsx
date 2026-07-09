"use client";

import { motion, useReducedMotion, type Variant } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "section" | "li" | "figure";
  once?: boolean;
};

/** Fade + rise reveal on scroll. Honors prefers-reduced-motion. */
export function Reveal({ children, className, delay = 0, y = 28, as = "div", once = true }: Props) {
  const reduce = useReducedMotion();
  const hidden: Variant = { opacity: 0, y: reduce ? 0 : y };
  const shown: Variant = { opacity: 1, y: 0 };
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      variants={{ hidden, shown }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggered container: children using <Reveal> or motion variants animate in sequence. */
export function StaggerText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(/\n/).length > 1 ? text.split(/\n/) : [text];
  return (
    <span className={className}>
      {words.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden"
          initial={{ opacity: 0, y: reduce ? 0 : "0.5em" }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {line}
        </motion.span>
      ))}
    </span>
  );
}
