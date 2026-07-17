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
            {t("trade.portfolioIntro", locale)}
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
