"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Wine } from "@/lib/content";
import { FALLBACK_IMAGE, localizedWines } from "@/lib/content";
import { formatPrice } from "@/components/cart/CartProvider";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

export function FeaturedWines({ wines: winesEn }: { wines: Wine[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const tr = useT();
  const wines = localizedWines(winesEn, locale);

  return (
    <section ref={ref} className="overflow-hidden bg-bone-warm py-20 md:py-24">
      <div className="container-x">
        <SectionHeading tone="dark" eyebrow={tr("wines.eyebrow")} title={tr("wines.featuredTitle")} />

        {/* Horizontal scroll container */}
        <div className="mt-16 overflow-x-auto">
          <div className="flex gap-8 pl-6 md:pl-16 pb-4">
            {wines.map((w) => (
              <WineCard key={w.slug} wine={w} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WineCard({ wine, locale }: { wine: Wine; locale: "en" | "es" }) {
  return (
    <Link href={localizedPath(`/wines/${wine.slug}`, locale)} className="group relative flex shrink-0 flex-col w-[78vw] sm:w-[46vw] lg:w-[30vw]">
      <div className="relative aspect-[3/4] overflow-hidden bg-oxblood-deep/40">
        <Image
          src={wine.image?.src || FALLBACK_IMAGE}
          alt={wine.name}
          fill
          sizes="(max-width:640px) 78vw, (max-width:1024px) 46vw, 30vw"
          className="object-contain p-10 transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-5 top-5 font-sans text-[11px] uppercase tracking-[0.14em] text-bone/60">
          {wine.vintage}
        </span>
        <span className="absolute bottom-5 right-5 font-sans text-[11px] uppercase tracking-[0.14em] text-oxblood opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          View →
        </span>
      </div>
      <div className="mt-5">
        <p className="eyebrow">{wine.varietal}</p>
        <p className="mt-1 font-serif text-2xl leading-tight">{wine.name}</p>
        <p className="mt-3 font-sans text-sm text-charcoal-soft">{formatPrice(wine.price, wine.currency)}</p>
      </div>
    </Link>
  );
}
