"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { Wine } from "@/lib/content";
import { FALLBACK_IMAGE } from "@/lib/content";
import { formatPrice } from "@/components/cart/CartProvider";
import { SectionHeading } from "@/components/layout/SectionHeading";

/**
 * Signature interaction: a pinned section where the wines scroll HORIZONTALLY
 * as the user scrolls vertically — bottles drift across the frame.
 */
export function FeaturedWines({ wines }: { wines: Wine[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
    // travel across ~ (n panels). Keep the last card fully visible.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section ref={ref} className="relative bg-charcoal text-bone" style={{ height: reduce ? "auto" : "300vh" }}>
      <div className={reduce ? "py-24" : "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"}>
        <div className="container-x flex items-end justify-between pb-10">
          <SectionHeading tone="dark" eyebrow="The Campesino Line" title="Four wines, nineteen families, one valley." />
          <Link href="/wines" className="link-underline hidden font-sans text-sm uppercase tracking-[0.14em] text-bone/80 md:block">
            View all wines
          </Link>
        </div>

        <motion.div style={{ x: reduce ? 0 : x }} className={reduce ? "container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4" : "flex gap-8 pl-6 md:pl-16"}>
          {wines.map((w) => (
            <WineCard key={w.slug} wine={w} horizontal={!reduce} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WineCard({ wine, horizontal }: { wine: Wine; horizontal: boolean }) {
  return (
    <Link
      href={`/wines/${wine.slug}`}
      className={`group relative flex shrink-0 flex-col ${horizontal ? "w-[78vw] sm:w-[46vw] lg:w-[30vw]" : "w-full"}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-oxblood-deep/40">
        <Image
          src={wine.image?.src || FALLBACK_IMAGE}
          alt={wine.name}
          fill
          sizes="(max-width:768px) 78vw, 30vw"
          className="object-contain p-8 transition-transform duration-700 ease-out-expo group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>
      <div className="mt-5 flex items-baseline justify-between border-t border-bone/15 pt-4">
        <div>
          <p className="eyebrow text-gold-soft">{wine.varietal}</p>
          <p className="mt-1 font-serif text-2xl">{wine.name}</p>
        </div>
        <span className="font-sans text-sm text-bone/70">{formatPrice(wine.price, wine.currency)}</span>
      </div>
    </Link>
  );
}
