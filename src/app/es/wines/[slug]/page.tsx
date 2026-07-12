import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { wines, getWine, producers, FALLBACK_IMAGE } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "@/components/wines/AddToCart";
import { Reveal } from "@/components/motion/Reveal";
import { ProductJsonLd } from "@/components/seo/JsonLd";
import { t } from "@/lib/i18n";

export function generateStaticParams() {
  return wines.map((w) => ({ slug: w.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const wine = getWine(params.slug, "es");
  if (!wine) return {};
  return {
    title: wine.name,
    description: wine.description,
    openGraph: { images: wine.image ? [wine.image.src] : [] },
    alternates: {
      canonical: `/es/wines/${params.slug}`,
      languages: { en: `/wines/${params.slug}`, es: `/es/wines/${params.slug}` },
    },
  };
}

function parseNotes(notes: string[]) {
  const out: { label: string; value: string }[] = [];
  for (const n of notes) {
    const idx = n.indexOf(":");
    if (idx > 0 && idx < 30) {
      out.push({ label: n.slice(0, idx).trim(), value: n.slice(idx + 1).trim() });
    } else {
      out.push({ label: "", value: n });
    }
  }
  return out;
}

export default function WineDetailEs({ params }: { params: { slug: string } }) {
  const wine = getWine(params.slug, "es");
  if (!wine) notFound();

  const notes = parseNotes(wine.notes);
  const related = wines.filter((w) => w.slug !== wine.slug).slice(0, 3);
  const growers = producers.filter((p) => p.varietals.includes(wine.varietal)).slice(0, 4);

  return (
    <>
      <ProductJsonLd wine={wine} />
      <article className="pt-24">
        <div className="container-x grid gap-14 py-12 lg:grid-cols-2 lg:py-20">
          <div className="relative">
            <div className="sticky top-28">
              <div className="relative mx-auto aspect-[3/4] max-w-md bg-bone-warm">
                <Image
                  src={wine.image?.src || FALLBACK_IMAGE}
                  alt={wine.name}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="object-contain p-12"
                />
              </div>
            </div>
          </div>

          <div className="lg:py-6">
            <Link href="/es/wines" className="link-underline font-sans text-xs uppercase tracking-[0.16em] text-charcoal/50">
              ← {t("wine.allWines", "es")}
            </Link>
            <p className="eyebrow mt-6">{wine.varietal} · {wine.vintage}</p>
            <h1 className="mt-3 font-serif text-display-md font-light">{wine.name}</h1>
            <p className="mt-5 font-serif text-3xl text-oxblood">{formatPrice(wine.price, wine.currency)}</p>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-charcoal/40">
              {t("wine.indicativePrice", "es")} · {wine.abv} ABV
            </p>
            <div className="mt-8">
              <AddToCart wine={wine} />
            </div>
            <dl className="mt-12 divide-y divide-charcoal/10 border-t border-charcoal/10">
              {notes.map((n, i) => (
                <Reveal as="div" key={i} delay={i * 0.05} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="eyebrow text-oxblood">{n.label || t("wine.note", "es")}</dt>
                  <dd className="font-sans text-sm leading-relaxed text-charcoal-soft">{n.value}</dd>
                </Reveal>
              ))}
            </dl>
            {growers.length > 0 && (
              <div className="mt-12 border-t border-charcoal/10 pt-8">
                <p className="eyebrow text-charcoal/40">{t("wine.grownBy", "es")}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {growers.map((g) => (
                    <Link key={g.slug} href={`/es/producers/${g.slug}`} className="link-underline font-serif text-lg">
                      {g.name.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <section className="bg-bone-warm py-20">
          <div className="container-x">
            <p className="eyebrow">{t("wine.continueTasting", "es")}</p>
            <h2 className="mt-3 font-serif text-display-md font-light">{t("wine.moreFromCellar", "es")}</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {related.map((w) => (
                <Link key={w.slug} href={`/es/wines/${w.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-bone">
                    <Image src={w.image?.src || FALLBACK_IMAGE} alt={w.name} fill sizes="33vw" className="object-contain p-10 transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <p className="mt-4 eyebrow">{w.varietal}</p>
                  <p className="font-serif text-xl">{w.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
