"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Wine } from "@/lib/content";
import { FALLBACK_IMAGE } from "@/lib/content";
import { formatPrice } from "@/components/cart/CartProvider";
import { useT } from "@/components/i18n/LocaleProvider";

export function WineGrid({ wines }: { wines: Wine[] }) {
  const tr = useT();
  const varietals = useMemo(() => ["All", ...Array.from(new Set(wines.map((w) => w.varietal)))], [wines]);
  const colors = ["All", "red", "white"];
  const [varietal, setVarietal] = useState("All");
  const [color, setColor] = useState("All");

  const filtered = wines.filter(
    (w) => (varietal === "All" || w.varietal === varietal) && (color === "All" || w.color === color)
  );

  return (
    <div className="container-x py-16 md:py-24">
      <div className="mb-12 flex flex-col gap-6 border-b border-charcoal/15 pb-8 md:flex-row md:items-end md:justify-between">
        <Filter label={tr("filter.varietal")} options={varietals} value={varietal} onChange={setVarietal} />
        <Filter label={tr("filter.style")} options={colors} value={color} onChange={setColor} cap />
      </div>

      <motion.div layout className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((w) => (
            <motion.div
              key={w.slug}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/wines/${w.slug}`} className="group block transition-transform duration-500 ease-out-expo hover:-translate-y-1.5">
                <div className="relative aspect-[3/4] overflow-hidden bg-bone-warm">
                  <Image
                    src={w.image?.src || FALLBACK_IMAGE}
                    alt={w.name}
                    fill
                    sizes="(max-width:640px) 100vw, 33vw"
                    className="object-contain p-10 transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                  <span className="absolute left-5 top-5 font-sans text-[11px] uppercase tracking-[0.14em] text-charcoal/40">
                    {w.vintage}
                  </span>
                  <span className="absolute bottom-5 right-5 font-sans text-[11px] uppercase tracking-[0.14em] text-oxblood opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    {tr("common.view")} →
                  </span>
                </div>
                <div className="mt-5 flex items-baseline justify-between">
                  <div>
                    <p className="eyebrow">{w.varietal}</p>
                    <p className="mt-1 font-serif text-2xl leading-tight">{w.name}</p>
                  </div>
                  <span className="font-sans text-sm text-charcoal-soft">{formatPrice(w.price, w.currency)}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-20 text-center font-serif text-2xl text-charcoal/50">{tr("wines.noMatch")}</p>
      )}
    </div>
  );
}

const OPTION_KEY: Record<string, string> = { All: "filter.all", red: "filter.red", white: "filter.white" };

function Filter({
  label,
  options,
  value,
  onChange,
  cap,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  cap?: boolean;
}) {
  const tr = useT();
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="eyebrow text-charcoal/40">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`font-sans text-sm transition-colors ${value === o ? "text-oxblood" : "text-charcoal/50 hover:text-charcoal"} ${cap ? "capitalize" : ""}`}
        >
          {OPTION_KEY[o] ? tr(OPTION_KEY[o]) : o}
          {value === o && <span className="ml-1 inline-block h-1 w-1 rounded-full bg-oxblood align-middle" />}
        </button>
      ))}
    </div>
  );
}
