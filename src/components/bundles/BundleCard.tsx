"use client";

import Image from "next/image";
import Link from "next/link";
import type { Bundle } from "@/lib/content";
import { bundlePrice, bundleWines, localizeBundle, FALLBACK_BOTTLE_IMAGE } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

export function BundleCard({ bundle }: { bundle: Bundle }) {
  const locale = useLocale();
  const tr = useT();
  const b = localizeBundle(bundle, locale);
  const ws = bundleWines(bundle);
  const price = bundlePrice(bundle);
  const href = localizedPath(`/packs/${bundle.slug}`, locale);

  return (
    <Link href={href} className="group block border border-charcoal/10 bg-bone-warm transition-transform duration-500 ease-out-expo hover:-translate-y-1.5">
      {/* Bottle line-up */}
      <div className="relative flex h-56 items-end justify-center gap-1 overflow-hidden bg-oxblood-deep/5 px-6 pb-0 pt-6">
        {ws.slice(0, 6).map((w) => (
          <div key={w.slug} className="relative h-44 w-12">
            <Image
              src={w.image?.src || FALLBACK_BOTTLE_IMAGE}
              alt={w.name}
              fill
              sizes="10vw"
              className="object-contain object-bottom"
            />
          </div>
        ))}
        <span className="absolute left-4 top-4 bg-oxblood px-2 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-bone">
          {ws.length} {tr("packs.bottles")}
        </span>
      </div>

      <div className="p-6">
        <p className="font-serif text-2xl leading-tight">{b.name}</p>
        <p className="mt-2 line-clamp-2 font-sans text-sm leading-relaxed text-charcoal-soft">{b.description}</p>
        <div className="mt-4 flex items-baseline justify-between">
          <span className="flex items-baseline gap-2">
            <span className="font-serif text-xl text-oxblood">{formatPrice(price.final, price.currency)}</span>
            {price.final < price.full && (
              <span className="font-sans text-xs text-charcoal/40 line-through">{formatPrice(price.full, price.currency)}</span>
            )}
          </span>
          <span className="link-underline font-sans text-xs uppercase tracking-[0.14em] text-oxblood">
            {tr("packs.viewPack")} →
          </span>
        </div>
        {price.final < price.full && (
          <p className="mt-1 font-sans text-xs text-vine">
            {tr("packs.save")} {formatPrice(price.full - price.final, price.currency)} {tr("packs.vsSeparately")}
          </p>
        )}
        <p className="mt-3 font-sans text-[11px] uppercase tracking-[0.12em] text-charcoal/50">
          {tr(`packs.valueAdd.${bundle.valueAdd}`)}
        </p>
      </div>
    </Link>
  );
}
