import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { listedWines, getWine, producers, bundlesContaining, bundlePrice, localizeBundle, FALLBACK_IMAGE } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { AddToCart } from "@/components/wines/AddToCart";
import { Reveal } from "@/components/motion/Reveal";
import { ProductJsonLd } from "@/components/seo/JsonLd";
import { t, localizedPath, type Locale } from "@/lib/i18n";

const OCCASION_KEY: Record<string, string> = {
  beginner: "occasion.beginner",
  asado: "occasion.asado",
  light: "occasion.light",
  medium: "occasion.medium",
  rich: "occasion.rich",
};

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

export function WineDetailView({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const wine = getWine(slug, locale);
  if (!wine) notFound();

  const notes = parseNotes(wine.notes);
  // Related: same producer/brand first, then same varietal, then the rest.
  const others = listedWines.filter((w) => w.slug !== wine.slug);
  const related = [
    ...others.filter((w) => w.brand && w.brand === wine.brand),
    ...others.filter((w) => w.brand !== wine.brand && w.varietal === wine.varietal),
    ...others.filter((w) => w.brand !== wine.brand && w.varietal !== wine.varietal),
  ].slice(0, 3);
  const inBundles = bundlesContaining(wine.slug);
  // the confirmed producer behind this wine, else the growers of this varietal
  const growers = wine.producerSlug
    ? producers.filter((p) => p.slug === wine.producerSlug)
    : producers.filter((p) => p.varietals.includes(wine.varietal) && p.role !== "grower").slice(0, 4);

  return (
    <>
      <ProductJsonLd wine={wine} />
      <article className="pt-24">
        <div className="container-x grid gap-14 py-12 lg:grid-cols-2 lg:py-20">
          {/* Bottle */}
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

          {/* Details */}
          <div className="lg:py-6">
            <Link href={localizedPath("/wines", locale)} className="link-underline font-sans text-xs uppercase tracking-[0.16em] text-charcoal/50">
              ← {t("wine.allWines", locale)}
            </Link>
            {wine.brand && <p className="mt-6 font-sans text-xs uppercase tracking-[0.16em] text-oxblood/70">{wine.brand}</p>}
            <p className={`eyebrow ${wine.brand ? "mt-2" : "mt-6"}`}>{wine.varietal}{wine.vintage ? ` · ${wine.vintage}` : ""}</p>
            <h1 className="mt-3 font-serif text-display-md font-light">{wine.name}</h1>
            <p className="mt-5 font-serif text-3xl text-oxblood">{formatPrice(wine.price, wine.currency)}</p>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-charcoal/40">
              {t("wine.indicativePrice", locale)}{wine.abv ? ` · ${wine.abv} ABV` : ""}
            </p>

            {/* Choice-helping info first: what the wine is ideal for */}
            {wine.occasions && wine.occasions.length > 0 && (
              <p className="mt-4 font-sans text-sm text-charcoal-soft">
                <span className="eyebrow mr-3 text-oxblood">{t("wine.idealFor", locale)}</span>
                {wine.occasions.map((o) => t(OCCASION_KEY[o] ?? "", locale)).filter(Boolean).join(" · ")}
              </p>
            )}

            <div className="mt-8">
              <AddToCart wine={wine} />
            </div>

            <dl className="mt-12 divide-y divide-charcoal/10 border-t border-charcoal/10">
              {notes.map((n, i) => (
                <Reveal as="div" key={i} delay={i * 0.05} className="grid grid-cols-1 gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                  <dt className="eyebrow text-oxblood">{n.label || t("wine.note", locale)}</dt>
                  <dd className="font-sans text-sm leading-relaxed text-charcoal-soft">{n.value}</dd>
                </Reveal>
              ))}
            </dl>

            {growers.length > 0 && (
              <div className="mt-12 border-t border-charcoal/10 pt-8">
                <p className="eyebrow text-charcoal/40">{t("wine.grownBy", locale)}</p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {growers.map((g) => (
                    <Link key={g.slug} href={localizedPath(`/producers/${g.slug}`, locale)} className="link-underline font-serif text-lg">
                      {g.name.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Upsell: which packs include this wine */}
            {inBundles.length > 0 && (
              <div className="mt-10 border-t border-charcoal/10 pt-8">
                <p className="eyebrow text-charcoal/40">{t("wine.inBundles", locale)}</p>
                <div className="mt-4 space-y-3">
                  {inBundles.map((raw) => {
                    const b = localizeBundle(raw, locale);
                    const price = bundlePrice(raw);
                    return (
                      <Link key={b.slug} href={localizedPath(`/packs/${b.slug}`, locale)} className="flex items-baseline justify-between border border-charcoal/15 px-5 py-4 transition-colors hover:border-oxblood">
                        <span className="font-serif text-lg">{b.name}</span>
                        <span className="font-sans text-sm text-charcoal-soft">{formatPrice(price.final, price.currency)}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related */}
        <section className="bg-bone-warm py-20">
          <div className="container-x">
            <p className="eyebrow">{t("wine.continueTasting", locale)}</p>
            <h2 className="mt-3 font-serif text-display-md font-light">{t("wine.moreFromCellar", locale)}</h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {related.map((w) => (
                <Link key={w.slug} href={localizedPath(`/wines/${w.slug}`, locale)} className="group block">
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
