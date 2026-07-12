"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { IMG } from "@/lib/images";

export function Hero({ heading }: { heading: string }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const lines = heading.split("\n");

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Image src={IMG.heroHome} alt="Vineyards of the Colchagua Valley at harvest" fill priority className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-oxblood-deep/50 via-charcoal/20 to-oxblood-deep/80" />

      <motion.div className="relative z-10 flex h-full items-center">
        <div className="container-x">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="eyebrow text-gold-pale"
          >
            Colchagua Valley · Chile · Since 2004
          </motion.p>
          <h1 className="mt-6 max-w-5xl font-serif font-light text-bone text-display-lg">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link href="/wines" className="btn bg-bone px-8 py-4 text-charcoal hover:bg-gold hover:text-bone">
              Explore the Wines
            </Link>
            <Link href="/story" className="btn border border-bone/60 px-8 py-4 text-bone hover:bg-bone hover:text-charcoal">
              Our Fair-Trade Story
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-bone/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <motion.span
            className="block h-10 w-px bg-bone/50"
            animate={{ scaleY: [0.3, 1, 0.3], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
