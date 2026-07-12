"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { useT } from "@/components/i18n/LocaleProvider";
import type { Wine } from "@/lib/content";
import { FALLBACK_IMAGE } from "@/lib/content";

export function AddToCart({ wine }: { wine: Wine }) {
  const { add, open } = useCart();
  const tr = useT();
  const [qty, setQty] = useState(1);

  if (wine.stock === 0) {
    return (
      <div className="inline-block border border-charcoal/25 bg-charcoal/5 px-6 py-3 font-sans text-sm uppercase tracking-[0.14em] text-charcoal/50">
        {tr("wines.soldOut")}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-stretch gap-4">
      <div className="flex items-center border border-charcoal/25">
        <button className="px-4 py-3 text-lg hover:text-oxblood" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
        <span className="w-10 text-center font-sans text-sm">{qty}</span>
        <button className="px-4 py-3 text-lg hover:text-oxblood" onClick={() => setQty((q) => q + 1)} aria-label="Increase quantity">+</button>
      </div>
      <button
        className="btn-primary flex-1 sm:flex-none"
        onClick={() => {
          add(
            {
              slug: wine.slug,
              name: wine.name,
              varietal: wine.varietal,
              price: wine.price,
              image: wine.image?.src || FALLBACK_IMAGE,
            },
            qty
          );
          open();
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
