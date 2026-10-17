"use client";

import { useEffect, useMemo, useState } from "react";
import type { Wine } from "@/lib/content";
import { useT } from "@/components/i18n/LocaleProvider";
import { WineCard } from "@/components/wines/WineCard";

export function WineGrid({ wines }: { wines: Wine[] }) {
  const tr = useT();
  const varietals = useMemo(() => ["All", ...Array.from(new Set(wines.map((w) => w.varietal)))], [wines]);
  const brands = useMemo(
    () => ["All", ...Array.from(new Set(wines.map((w) => w.brand).filter((b): b is string => Boolean(b)))).sort()],
    [wines]
  );
  const colors = ["All", "red", "white", "rose"];
  // Occasion filter: genuinely useful categories only (CRO brief) — no
  // grape-variety duplication, no fabricated "best sellers" (no sales data yet).
  const occasions = ["All", "beginner", "asado", "light", "rich"];
  const [varietal, setVarietal] = useState("All");
  const [color, setColor] = useState("All");
  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("color");
    if (c && ["red", "white", "rose"].includes(c)) setColor(c);
  }, []);
  const [brand, setBrand] = useState("All");
  const [occasion, setOccasion] = useState("All");

  const filtered = wines.filter(
    (w) =>
      (varietal === "All" || w.varietal === varietal) &&
      (color === "All" || w.color === color) &&
      (brand === "All" || w.brand === brand) &&
      (occasion === "All" || w.occasions?.includes(occasion))
  );

  // Available wines first; sold-out ones live in their own section so a first-time
  // buyer isn't met with a catalog that looks mostly empty.
  const inStock = filtered.filter((w) => w.stock !== 0);
  const soldOut = filtered.filter((w) => w.stock === 0);

  const hasActiveFilters = varietal !== "All" || color !== "All" || brand !== "All" || occasion !== "All";
  const clearFilters = () => {
    setVarietal("All");
    setColor("All");
    setBrand("All");
    setOccasion("All");
  };

  return (
    <div className="container-x py-16 md:py-24">
      <div className="mb-10 flex flex-wrap items-end gap-x-5 gap-y-4 border-b border-charcoal/15 pb-6">
        {brands.length > 1 && <Filter label={tr("filter.brand")} options={brands} value={brand} onChange={setBrand} />}
        <Filter label={tr("filter.varietal")} options={varietals} value={varietal} onChange={setVarietal} />
        <Filter label={tr("filter.style")} options={colors} value={color} onChange={setColor} />
        <Filter label={tr("filter.occasion")} options={occasions} value={occasion} onChange={setOccasion} />
        {hasActiveFilters && (
          <button onClick={clearFilters} className="pb-2 font-sans text-xs uppercase tracking-[0.14em] text-oxblood link-underline">
            {tr("filter.clear")}
          </button>
        )}
      </div>

      <WineCards wines={inStock} />

      {soldOut.length > 0 && (
        <section className="mt-24 border-t border-charcoal/15 pt-12">
          <h2 className="font-serif text-3xl">{tr("wines.soldOutTitle")}</h2>
          <p className="mt-3 max-w-2xl font-sans text-sm text-charcoal-soft">{tr("wines.soldOutNote")}</p>
          <div className="mt-10">
            <WineCards wines={soldOut} />
          </div>
        </section>
      )}

      {filtered.length === 0 && (
        <p className="py-20 text-center font-serif text-2xl text-charcoal/50">{tr("wines.noMatch")}</p>
      )}
    </div>
  );
}

function WineCards({ wines }: { wines: Wine[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {wines.map((w) => (
        <WineCard key={w.slug} wine={w} />
      ))}
    </div>
  );
}

const OPTION_KEY: Record<string, string> = {
  All: "filter.all",
  red: "filter.red",
  white: "filter.white",
  rose: "filter.rose",
  beginner: "occasion.beginner",
  asado: "occasion.asado",
  light: "occasion.light",
  rich: "occasion.rich",
};

function Filter({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  cap?: boolean;
}) {
  const tr = useT();
  return (
    <label className="flex min-w-[140px] flex-col gap-1">
      <span className="font-condensed text-[11px] font-bold uppercase tracking-eyebrow text-charcoal/55">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-b border-charcoal/30 bg-transparent py-2 pr-6 font-sans text-sm text-charcoal focus:border-oxblood focus:outline-none"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {OPTION_KEY[o] ? tr(OPTION_KEY[o]) : o}
          </option>
        ))}
      </select>
    </label>
  );
}
