"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Word-by-word reveal of a brand quote — sets the tone and vibe. */
export function QuoteBand({ quote, attribution }: { quote: string; attribution: string }) {
  const reduce = useReducedMotion();
  const words = quote.split(" ");

  return (
    <section className="bg-oxblood py-28 text-bone md:py-40">
      <div className="container-x max-w-4xl text-center">
        <p className="flex flex-wrap justify-center font-serif text-3xl font-light leading-snug md:text-5xl md:leading-tight">
          {words.map((w, i) => (
            <motion.span
              key={i}
              className="mr-[0.28em]"
              initial={{ opacity: reduce ? 1 : 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              {w}
            </motion.span>
          ))}
        </p>
        <p className="mt-10 font-sans text-xs uppercase tracking-[0.24em] text-gold-soft">— {attribution}</p>
      </div>
    </section>
  );
}
