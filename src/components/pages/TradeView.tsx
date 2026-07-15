import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { TradeForm } from "@/components/landings/TradeForm";
import { t, localizedPath, type Locale } from "@/lib/i18n";
import { IMG } from "@/lib/images";

export function TradeView({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero
        eyebrow={t("trade.eyebrow", locale)}
        title={t("trade.title", locale)}
        image={IMG.bottlesLine}
        intro={t("trade.intro", locale)}
      />
      <div className="container-x grid gap-16 py-16 md:py-24 lg:grid-cols-2">
        <div>
          <p className="max-w-md font-sans text-base leading-relaxed text-charcoal-soft">
            {locale === "es"
              ? "Nuestra cartera reúne nueve marcas de pequeños productores del Valle de Colchagua, todas bajo certificación de comercio justo. Explora el catálogo completo y cuéntanos qué vinos te interesan."
              : "Our portfolio brings together nine small-producer brands from the Colchagua Valley, all under Fairtrade certification. Browse the full catalogue and tell us which wines interest you."}
          </p>
          <Link
            href={localizedPath("/wines", locale)}
            className="mt-6 inline-block link-underline font-sans text-sm uppercase tracking-[0.14em] text-oxblood"
          >
            {t("nav.wines", locale)} →
          </Link>
        </div>
        <TradeForm />
      </div>
    </>
  );
}
