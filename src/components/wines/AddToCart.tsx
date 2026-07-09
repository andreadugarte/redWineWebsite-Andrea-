"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { Wine } from "@/lib/content";
import { FALLBACK_IMAGE } from "@/lib/content";

export function AddToCart({ wine }: { wine: Wine }) {
  const { add, open } = useCart();
  const [qty, setQty] = useState(1);

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
