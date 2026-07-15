import { PageHero } from "@/components/PageHero";
import { BundleCard } from "@/components/bundles/BundleCard";
import { bundles } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";
import { IMG } from "@/lib/images";

export function PacksView({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero
        eyebrow={t("packs.eyebrow", locale)}
        title={t("packs.title", locale)}
        image={IMG.bottlesLine}
        intro={t("packs.intro", locale)}
      />
      <div className="container-x py-16 md:py-24">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {bundles.map((b) => (
            <BundleCard key={b.slug} bundle={b} />
          ))}
        </div>
      </div>
    </>
  );
}
