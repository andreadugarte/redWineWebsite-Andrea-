"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** A hairline gold bar at the very top that tracks read progress down the page. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[80] h-0.5 origin-left bg-gold"
    />
  );
}
