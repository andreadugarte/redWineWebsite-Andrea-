"use client";

import { useCart } from "@/components/cart/CartProvider";
import { useT } from "@/components/i18n/LocaleProvider";
import type { Bundle } from "@/lib/content";
import { bundleWines, FALLBACK_IMAGE } from "@/lib/content";

export function AddBundleToCart({ bundle }: { bundle: Bundle }) {
  const { add, open } = useCart();
  const tr = useT();
  const ws = bundleWines(bundle).filter((w) => w.stock !== 0);

  return (
    <button
      className="btn-primary"
      onClick={() => {
        ws.forEach((w) =>
          add({
            slug: w.slug,
            name: w.name,
            varietal: w.varietal,
            price: w.price,
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
