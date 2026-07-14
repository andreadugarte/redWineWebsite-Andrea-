"use client";

import Link from "next/link";
import { BundleCard } from "@/components/bundles/BundleCard";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { bundles } from "@/lib/content";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

/** Homepage: 3 featured packs shown BEFORE single-bottle browsing to reduce choice paralysis. */
export function FeaturedPacks() {
  const locale = useLocale();
  const tr = useT();
  const featured = bundles.filter((b) => ["discovery", "occasion", "beginner"].includes(b.type)).slice(0, 3);

  return (
    <section className="section-y bg-bone">
      <div className="container-x">
        <SectionHeading eyebrow={tr("packs.eyebrow")} title={tr("packs.featuredTitle")}>
          <Link
            href={localizedPath("/packs", locale)}
            className="mt-6 inline-block link-underline font-sans text-sm uppercase tracking-[0.14em] text-oxblood"
          >
            {tr("packs.viewAll")}
          </Link>
        </SectionHeading>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((b) => (
            <BundleCard key={b.slug} bundle={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Compact banner catching anyone who scrolled past the hero: guided choice CTA. */
export function QuizBanner() {
  const locale = useLocale();
  const tr = useT();
  return (
    <section className="bg-oxblood py-14">
      <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="font-sans text-xs uppercase tracking-[0.16em] text-bone/60">{tr("quiz.eyebrow")}</p>
          <p className="mt-2 font-serif text-3xl font-light text-bone">
            {locale === "es" ? "¿No sabes qué elegir?" : "Not sure what to choose?"}
          </p>
        </div>
        <Link
          href={localizedPath("/find-your-wine", locale)}
          className="border border-bone/70 px-7 py-3 font-sans text-sm uppercase tracking-[0.14em] text-bone transition-colors hover:bg-bone hover:text-oxblood"
        >
          {tr("quiz.title")}
        </Link>
      </div>
    </section>
  );
}
