"use client";

import Image from "next/image";
import Link from "next/link";
import { IMG } from "@/lib/images";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

/** Compact, static hero: one image, one line, two clear buttons. No scroll cue, no staged animation. */
export function Hero({ heading }: { heading: string }) {
  const locale = useLocale();
  const tr = useT();
  return (
    <section className="relative flex min-h-[56svh] w-full items-center overflow-hidden pt-[104px]">
      <Image src={IMG.heroHome} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-r from-oxblood-deep/85 via-oxblood-deep/55 to-charcoal/10" />
      <div className="container-x relative z-10 py-14">
        <p className="eyebrow text-gold-pale">{tr("hero.eyebrow")}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-display-md font-light text-bone">{heading}</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={localizedPath("/wines", locale)} className="btn bg-bone px-8 py-4 text-charcoal hover:bg-gold-deep hover:text-bone">
            {tr("hero.exploreWines")}
          </Link>
          <Link href={localizedPath("/packs", locale)} className="btn border border-bone/70 px-8 py-4 text-bone hover:bg-bone hover:text-charcoal">
            {tr("hero.viewPacks")}
          </Link>
        </div>
      </div>
    </section>
  );
}
