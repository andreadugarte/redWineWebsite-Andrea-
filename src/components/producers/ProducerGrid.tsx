"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Producer } from "@/lib/content";
import { FALLBACK_IMAGE } from "@/lib/content";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

const tc = (s: string) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export function ProducerGrid({ producers }: { producers: Producer[] }) {
  const tr = useT();
  const locale = useLocale();
  const varietals = useMemo(
    () => ["All", ...Array.from(new Set(producers.flatMap((p) => p.varietals))).sort()],
    [producers]
  );
  const [filter, setFilter] = useState("All");
  const filtered = producers.filter((p) => filter === "All" || p.varietals.includes(filter));

  return (
    <div className="container-x py-16 md:py-24">
      <div className="mb-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-charcoal/15 pb-8">
        <span className="eyebrow text-charcoal/40">{tr("filter.varietal")}</span>
        {varietals.map((v) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={`font-sans text-sm transition-colors ${filter === v ? "text-oxblood" : "text-charcoal/50 hover:text-charcoal"}`}
          >
            {v === "All" ? tr("filter.all") : v}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div key={p.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Link href={localizedPath(`/producers/${p.slug}`, locale)} className="group block transition-transform duration-500 ease-out-expo hover:-translate-y-1.5">
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5">
                  <Image
                    src={p.portrait?.src || FALLBACK_IMAGE}
                    alt={tc(p.name)}
                    fill
                    sizes="(max-width:640px) 50vw, 25vw"
                    className="object-cover grayscale transition-all duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/55 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-bone">{tr("common.view")} →</span>
                  </div>
                </div>
                <p className="mt-4 font-serif text-xl leading-tight">{tc(p.name)}</p>
                {p.winery && <p className="font-serif text-sm italic text-charcoal/60">{p.winery}</p>}
                {p.role === "grower" ? (
                  <p className="font-sans text-xs uppercase tracking-[0.12em] text-gold">{tr("producers.grower")}</p>
                ) : (
                  <p className="font-sans text-xs uppercase tracking-[0.12em] text-charcoal/50">{p.varietals.join(" · ")}</p>
                )}
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
