"use client";

import Link from "next/link";
import type { Wine } from "@/lib/content";
import { WineCard } from "@/components/wines/WineCard";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

export function FeaturedGrid({ wines }: { wines: Wine[] }) {
  const tr = useT();
  const locale = useLocale();
  return (
    <section className="bg-bone pb-14 md:pb-16">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{tr("home.featured.eyebrow")}</p>
            <h2 className="mt-3 font-serif text-3xl text-charcoal md:text-4xl">{tr("home.featured.title")}</h2>
          </div>
          <Link href={localizedPath("/wines", locale)} className="link-underline shrink-0 font-condensed text-sm font-bold uppercase tracking-eyebrow text-oxblood">
            {tr("home.viewAllWines")}
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {wines.map((w) => (
            <WineCard key={w.slug} wine={w} />
          ))}
        </div>
      </div>
    </section>
  );
}
