"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Producer } from "@/lib/content";
import { FALLBACK_IMAGE } from "@/lib/content";

const tc = (s: string) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export function ProducerGrid({ producers }: { producers: Producer[] }) {
  const varietals = useMemo(
    () => ["All", ...Array.from(new Set(producers.flatMap((p) => p.varietals))).sort()],
    [producers]
  );
  const [filter, setFilter] = useState("All");
  const filtered = producers.filter((p) => filter === "All" || p.varietals.includes(filter));

  return (
    <div className="container-x py-16 md:py-24">
      <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-charcoal/15 pb-8">
        <span className="eyebrow text-charcoal/40">Varietal</span>
        {varietals.map((v) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={`font-sans text-sm transition-colors ${filter === v ? "text-oxblood" : "text-charcoal/50 hover:text-charcoal"}`}
          >
            {v}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Link href={`/producers/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5">
                  <Image
                    src={p.portrait?.src || FALLBACK_IMAGE}
                    alt={tc(p.name)}
                    fill
                    sizes="(max-width:640px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-4 font-serif text-xl leading-tight">{tc(p.name)}</p>
                {p.winery && <p className="font-serif text-sm italic text-charcoal/60">{p.winery}</p>}
                <p className="font-sans text-xs uppercase tracking-[0.12em] text-charcoal/50">{p.varietals.join(" · ")}</p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
