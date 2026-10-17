"use client";

import Link from "next/link";
import { BundleCard } from "@/components/bundles/BundleCard";
import { bundles } from "@/lib/content";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

export function PacksGrid() {
  const tr = useT();
  const locale = useLocale();
  const featured = bundles.filter((b) => ["discovery", "occasion", "beginner"].includes(b.type)).slice(0, 3);
  return (
    <section className="border-y border-charcoal/10 bg-bone-warm/50 py-14 md:py-16">
      <div className="container-x">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">{tr("packs.eyebrow")}</p>
            <h2 className="mt-3 font-serif text-3xl text-charcoal md:text-4xl">{tr("packs.featuredTitle")}</h2>
          </div>
          <Link href={localizedPath("/packs", locale)} className="link-underline shrink-0 font-condensed text-sm font-bold uppercase tracking-eyebrow text-oxblood">
            {tr("packs.viewAll")}
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {featured.map((b) => (
            <BundleCard key={b.slug} bundle={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
