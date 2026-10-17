"use client";

import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

export function VisitBand() {
  const tr = useT();
  const locale = useLocale();
  return (
    <section className="bg-bone py-14 md:py-16">
      <div className="container-x grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={IMG.tourism} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
        </div>
        <div>
          <p className="eyebrow">{tr("home.visit.eyebrow")}</p>
          <h2 className="mt-3 font-serif text-3xl text-charcoal md:text-4xl">{tr("home.visit.title")}</h2>
          <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-charcoal-soft">{tr("home.visit.body")}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={localizedPath("/tourism", locale)} className="btn-primary">{tr("home.visit.tours")}</Link>
            <Link href={localizedPath("/contact", locale)} className="btn-outline text-charcoal">{tr("home.visit.contact")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
