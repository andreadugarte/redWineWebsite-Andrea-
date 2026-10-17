"use client";

import Image from "next/image";
import Link from "next/link";
import type { Wine } from "@/lib/content";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

/** Shop-by-type tiles using real bottle shots; each links to the catalog pre-filtered. */
export function CategoryTiles({ bySlug }: { bySlug: Record<string, Wine | undefined> }) {
  const tr = useT();
  const locale = useLocale();
  const tiles = [
    { label: tr("home.cat.red"), href: `/wines?color=red`, img: bySlug["don-dago-merlot"]?.image?.src },
    { label: tr("home.cat.white"), href: `/wines?color=white`, img: bySlug["campesino-chardonnay-gran-reserva"]?.image?.src },
    { label: tr("home.cat.rose"), href: `/wines?color=rose`, img: bySlug["don-clemente-rose"]?.image?.src },
    { label: tr("home.cat.packs"), href: `/packs`, img: bySlug["cea-mito-carmenere"]?.image?.src },
  ];
  return (
    <section className="bg-bone py-14 md:py-16">
      <div className="container-x">
        <p className="eyebrow">{tr("home.cat.eyebrow")}</p>
        <h2 className="mt-3 font-serif text-3xl text-charcoal md:text-4xl">{tr("home.cat.title")}</h2>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {tiles.map((t) => (
            <Link
              key={t.href}
              href={localizedPath(t.href.split("?")[0], locale) + (t.href.includes("?") ? "?" + t.href.split("?")[1] : "")}
              className="group flex flex-col items-center border border-charcoal/10 bg-white/60 px-4 pb-5 pt-6 text-center transition-colors hover:border-oxblood"
            >
              <div className="relative h-40 w-full md:h-48">
                {t.img && <Image src={t.img} alt="" fill sizes="(max-width:768px) 45vw, 22vw" className="object-contain" />}
              </div>
              <span className="mt-4 font-condensed text-sm font-bold uppercase tracking-eyebrow text-charcoal group-hover:text-oxblood">{t.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
