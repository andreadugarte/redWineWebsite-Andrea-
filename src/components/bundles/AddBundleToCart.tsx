"use client";

import { useCart } from "@/components/cart/CartProvider";
import { useT } from "@/components/i18n/LocaleProvider";
import type { Bundle } from "@/lib/content";
import { bundleWines, FALLBACK_IMAGE } from "@/lib/content";

export function AddBundleToCart({ bundle }: { bundle: Bundle }) {
  const { add, open } = useCart();
  const tr = useT();
  const ws = bundleWines(bundle).filter((w) => w.stock !== 0);
  const factor = 1 - bundle.discountPercent / 100;

  return (
    <button
      type="button"
      className="btn-primary"
      onClick={() => {
        // Add each bottle at its bundle-discounted price so the cart total
        // matches the advertised pack price, and every bottle still counts
        // toward the free-shipping threshold.
        ws.forEach((w) =>
          add({
            slug: w.slug,
            name: w.name,
            varietal: w.varietal,
            price: Math.round(w.price * factor),
            image: w.image?.src || FALLBACK_IMAGE,
          })
        );
        open();
      }}
    >
      {tr("packs.addAll")}
    </button>
  );
}
