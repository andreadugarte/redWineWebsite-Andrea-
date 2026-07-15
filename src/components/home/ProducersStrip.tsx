"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/layout/SectionHeading";
import type { Producer } from "@/lib/content";
import { FALLBACK_IMAGE } from "@/lib/content";
import { useLocale, useT } from "@/components/i18n/LocaleProvider";
import { localizedPath } from "@/lib/i18n";

export function ProducersStrip({ producers }: { producers: Producer[] }) {
  const locale = useLocale();
  const tr = useT();
  const featured = producers.filter((p) => p.portrait).slice(0, 5);

  return (
    <section className="section-y bg-bone">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={tr("producers.eyebrow")} title={tr("producers.stripTitle")} />
          <Link href={localizedPath("/producers", locale)} className="link-underline shrink-0 font-sans text-sm uppercase tracking-[0.14em] text-oxblood">
            {tr("producers.meet")}
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} as="div">
              <Link href={localizedPath(`/producers/${p.slug}`, locale)} className="group block transition-transform duration-500 ease-out-expo hover:-translate-y-1.5">
                <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/5">
                  <Image
                    src={p.portrait?.src || FALLBACK_IMAGE}
                    alt={p.name}
                    fill
                    sizes="(max-width:640px) 50vw, 20vw"
                    className="object-cover grayscale transition-all duration-700 ease-out-expo group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
                <p className="mt-3 font-serif text-lg leading-tight">{p.name.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())}</p>
                {p.winery && <p className="font-serif text-sm italic text-charcoal/60">{p.winery}</p>}
                <p className="font-sans text-xs uppercase tracking-[0.12em] text-charcoal/50">{p.varietals[0]}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
