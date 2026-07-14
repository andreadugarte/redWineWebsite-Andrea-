"use client";

// QR PLACEMENT: end of vineyard tours / tasting room / Hostal del Vino.
// CAPTURES: which wines the guest tasted (their selection), cart adds.
// FOLLOW-UP: none automated yet — purchase itself is the conversion.

import { useState } from "react";
import Image from "next/image";
import type { Wine } from "@/lib/content";
import { FALLBACK_IMAGE, localizeWine } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";

export function VisitaLanding({ wines }: { wines: Wine[] }) {
  const { add, open } = useCart();
  const locale = useLocale();
  const tr = useT();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (slug: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const addAll = () => {
    wines
      .filter((w) => selected.has(w.slug))
      .forEach((w) =>
        add({
          slug: w.slug,
          name: w.name,
          varietal: w.varietal,
          price: w.price,
          image: w.image?.src || FALLBACK_IMAGE,
        })
      );
    open();
  };

  return (
    <div className="container-x py-16 md:py-24">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {wines
          .filter((w) => w.stock !== 0)
          .map((raw) => {
            const w = localizeWine(raw, locale);
            const on = selected.has(w.slug);
            return (
              <button
                key={w.slug}
                onClick={() => toggle(w.slug)}
                aria-pressed={on}
                className={`border p-4 text-left transition-colors ${on ? "border-oxblood bg-oxblood/5" : "border-charcoal/15 hover:border-charcoal/40"}`}
              >
                <div className="relative aspect-[3/4] bg-bone-warm">
                  <Image src={w.image?.src || FALLBACK_IMAGE} alt={w.name} fill sizes="25vw" className="object-contain p-4" />
                  {on && (
                    <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-oxblood text-xs text-bone">✓</span>
                  )}
                </div>
                <p className="mt-3 font-serif text-sm leading-tight">{w.name}</p>
                <p className="mt-1 font-sans text-xs text-charcoal-soft">{formatPrice(w.price, w.currency)}</p>
              </button>
            );
          })}
      </div>

      <div className="sticky bottom-6 mt-10 text-center">
        <button onClick={addAll} disabled={selected.size === 0} className="btn-primary disabled:opacity-50">
          {tr("visita.addSelected")} {selected.size > 0 ? `(${selected.size})` : ""}
        </button>
      </div>
    </div>
  );
}
