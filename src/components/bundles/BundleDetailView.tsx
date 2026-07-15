import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBundle, bundleWines, bundlePrice, localizeBundle, FALLBACK_IMAGE } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import { AddBundleToCart } from "@/components/bundles/AddBundleToCart";
import { t, localizedPath, type Locale } from "@/lib/i18n";

export function BundleDetailView({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const raw = getBundle(slug);
  if (!raw) notFound();
  const b = localizeBundle(raw, locale);
  const ws = bundleWines(raw);
  const price = bundlePrice(raw);

  return (
    <article className="pt-24">
      <div className="container-x grid gap-14 py-12 lg:grid-cols-2 lg:py-20">
        {/* Bottle line-up */}
        <div className="relative">
          <div className="sticky top-28 flex h-[420px] items-end justify-center gap-2 bg-bone-warm px-8 pb-8">
            {ws.map((w) => (
              <Link key={w.slug} href={localizedPath(`/wines/${w.slug}`, locale)} className="relative h-80 w-20 transition-transform hover:-translate-y-2">
                <Image src={w.image?.src || FALLBACK_IMAGE} alt={w.name} fill sizes="15vw" className="object-contain object-bottom" />
              </Link>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:py-6">
          <Link href={localizedPath("/packs", locale)} className="link-underline font-sans text-xs uppercase tracking-[0.16em] text-charcoal/50">
            ← {t("packs.eyebrow", locale)}
          </Link>
          <p className="eyebrow mt-6">
            {ws.length} {t("packs.bottles", locale)}
          </p>
          <h1 className="mt-3 font-serif text-display-md font-light">{b.name}</h1>
          <div className="mt-5 flex items-baseline gap-3">
            <p className="font-serif text-3xl text-oxblood">{formatPrice(price.final, price.currency)}</p>
            {price.final < price.full && (
              <p className="font-sans text-sm text-charcoal/40 line-through">{formatPrice(price.full, price.currency)}</p>
            )}
          </div>
          {price.final < price.full && (
            <p className="mt-1 font-sans text-sm text-vine">
              {t("packs.save", locale)} {formatPrice(price.full - price.final, price.currency)} {t("packs.vsSeparately", locale)}
            </p>
          )}
          <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-charcoal/40">
            {t(`packs.valueAdd.${raw.valueAdd}`, locale)}
          </p>
          {raw.type === "feria" && (
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-charcoal/40">
              {t("packs.feriaRotates", locale)}
            </p>
          )}

          <p className="mt-6 max-w-lg font-sans text-base leading-relaxed text-charcoal-soft">{b.description}</p>

          <div className="mt-8">
            <AddBundleToCart bundle={raw} />
          </div>

          <div className="mt-12 border-t border-charcoal/10 pt-8">
            <p className="eyebrow text-charcoal/40">{t("packs.includes", locale)}</p>
            <ul className="mt-4 divide-y divide-charcoal/10">
              {ws.map((w) => (
                <li key={w.slug}>
                  <Link href={localizedPath(`/wines/${w.slug}`, locale)} className="group flex items-baseline justify-between py-3">
                    <span>
                      <span className="font-serif text-lg group-hover:text-oxblood">{w.name}</span>
                      <span className="ml-3 font-sans text-xs uppercase tracking-[0.12em] text-charcoal/50">{w.varietal}</span>
                    </span>
                    <span className="font-sans text-sm text-charcoal-soft">{formatPrice(w.price, w.currency)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
