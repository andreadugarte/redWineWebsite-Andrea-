"use client";

import Image from "next/image";
import Link from "next/link";
import type { Wine } from "@/lib/content";
import { FALLBACK_IMAGE } from "@/lib/content";
import { formatPrice, useCart } from "@/components/cart/CartProvider";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

/** One product card, shared by the catalog and the homepage: image, name, price, and a visible add-to-cart. */
export function WineCard({ wine: w }: { wine: Wine }) {
  const tr = useT();
  const locale = useLocale();
  const { add, open } = useCart();
  const soldOut = w.stock === 0;
  const href = localizedPath(`/wines/${w.slug}`, locale);

  return (
    <div className="flex h-full flex-col border border-charcoal/10 bg-white/60">
      <Link href={href} className="block">
        <div className="relative aspect-[4/5] bg-bone-warm/60">
          <Image
            src={w.image?.src || FALLBACK_IMAGE}
            alt={w.name}
            fill
            sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
            className={`object-contain p-6 ${soldOut ? "opacity-50" : ""}`}
          />
          {soldOut && (
            <span className="absolute left-3 top-3 bg-charcoal/85 px-2 py-1 font-condensed text-[10px] font-bold uppercase tracking-eyebrow text-bone">
              {tr("wines.soldOut")}
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        {w.brand && <p className="font-condensed text-[11px] font-bold uppercase tracking-eyebrow text-gold-deep">{w.brand}</p>}
        <Link href={href} className="mt-1 font-serif text-lg leading-snug text-charcoal hover:text-oxblood">
          {w.name}
        </Link>
        <p className="mt-1 font-sans text-xs text-charcoal/55">
          {w.varietal}
          {w.vintage ? ` · ${w.vintage}` : ""}
        </p>
        <p className="mt-3 font-sans text-base font-semibold text-charcoal">{formatPrice(w.price, w.currency)}</p>
        <div className="mt-auto pt-4">
          {soldOut ? (
            <Link href={href} className="btn-outline w-full !px-4 !py-3 text-charcoal">
              {tr("common.view")}
            </Link>
          ) : (
            <button
              type="button"
              className="btn-primary w-full !px-4 !py-3"
              onClick={() => {
                add({ slug: w.slug, name: w.name, varietal: w.varietal, price: w.price, image: w.image?.src || FALLBACK_IMAGE });
                open();
              }}
            >
              {tr("cart.add")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
