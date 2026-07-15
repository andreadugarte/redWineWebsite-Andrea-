import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { producers, getProducer, listedWines, FALLBACK_IMAGE } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { t, localizedPath, type Locale } from "@/lib/i18n";

const tc = (s: string) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase());

export function ProducerDetailView({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const p = getProducer(slug, locale);
  if (!p) notFound();

  // Growers supply grapes to the cooperative's winemakers — they don't bottle
  // their own wine, so no wine grid is shown for them (Rodrigo, Jul 10 2026).
  const isGrower = p.role === "grower";
  const theirWines = isGrower
    ? []
    : listedWines.filter((w) => (w.producerSlug ? w.producerSlug === p.slug : p.varietals.includes(w.varietal)));
  const idx = producers.findIndex((x) => x.slug === p.slug);
  const next = producers[(idx + 1) % producers.length];

  return (
    <article className="pt-24">
      <div className="container-x grid gap-14 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div>
          <Parallax className="relative aspect-[4/5] overflow-hidden bg-charcoal/5 lg:sticky lg:top-28" distance={40}>
            <Image src={p.portrait?.src || FALLBACK_IMAGE} alt={tc(p.name)} fill priority className="scale-110 object-cover" sizes="(max-width:1024px) 100vw, 45vw" />
          </Parallax>
        </div>

        <div className="lg:py-6">
          <Link href={localizedPath("/producers", locale)} className="link-underline font-sans text-xs uppercase tracking-[0.16em] text-charcoal/50">
            ← {t("producer.allProducers", locale)}
          </Link>
          <p className="eyebrow mt-6">{t("producers.detailEyebrow", locale)}</p>
          <h1 className="mt-3 font-serif text-display-md font-light">{tc(p.name)}</h1>
          {p.winery && <p className="mt-2 font-serif text-2xl font-light italic text-charcoal/70">{p.winery}</p>}
          {isGrower && (
            <p className="mt-2 inline-block border border-gold/50 bg-gold/10 px-3 py-1 font-sans text-xs uppercase tracking-[0.12em] text-charcoal/70">
              {t("producers.grower", locale)}
            </p>
          )}
          {p.status === "inactive" && (
            <div className="mt-6 border-l-2 border-oxblood bg-oxblood/5 px-4 py-3">
              <p className="font-sans text-sm leading-relaxed text-oxblood">{t("producers.inactiveNotice", locale)}</p>
            </div>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            {p.varietals.map((v) => (
              <span key={v} className="border border-oxblood/30 px-3 py-1 font-sans text-xs uppercase tracking-[0.1em] text-oxblood">{v}</span>
            ))}
          </div>
          {isGrower && (
            <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-charcoal/60">
              {t("producers.growerNote", locale)}
            </p>
          )}

          <div className="mt-10 space-y-5">
            {p.bio.map((para, i) => (
              <Reveal as="div" key={i} delay={i * 0.05}>
                <p className="max-w-2xl font-sans text-base leading-relaxed text-charcoal-soft">{para}</p>
              </Reveal>
            ))}
          </div>

          {theirWines.length > 0 && (
            <div className="mt-12 border-t border-charcoal/10 pt-8">
              <p className="eyebrow text-charcoal/40">{t("producers.theirWines", locale)}</p>
              <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-3">
                {theirWines.map((w) => (
                  <Link key={w.slug} href={localizedPath(`/wines/${w.slug}`, locale)} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-bone-warm">
                      <Image src={w.image?.src || FALLBACK_IMAGE} alt={w.name} fill sizes="33vw" className="object-contain p-6 transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <p className="mt-3 font-serif text-base leading-tight">{w.name}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-charcoal/10">
        <Link href={localizedPath(`/producers/${next.slug}`, locale)} className="container-x flex items-center justify-between py-10 transition-colors hover:text-oxblood">
          <span className="eyebrow text-charcoal/40">{t("producers.next", locale)}</span>
          <span className="font-serif text-2xl md:text-4xl">{tc(next.name)} →</span>
        </Link>
      </div>
    </article>
  );
}
