import { Suspense } from "react";
import { PageHero } from "@/components/PageHero";
import { FeriaLanding } from "@/components/landings/FeriaLanding";
import { bundles, listedWines } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";
import { IMG } from "@/lib/images";

export function FeriaView({ locale = "en" }: { locale?: Locale }) {
  const feriaBundle = bundles.find((b) => b.type === "feria");
  return (
    <>
      <PageHero
        eyebrow={t("feria.eyebrow", locale)}
        title={t("feria.title", locale)}
        image={IMG.bottlesLine}
        intro={t("feria.intro", locale)}
      />
      <Suspense>
        <FeriaLanding feriaBundle={feriaBundle} wines={listedWines} />
      </Suspense>
    </>
  );
}
