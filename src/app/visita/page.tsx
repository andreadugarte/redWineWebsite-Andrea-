import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { VisitaLanding } from "@/components/landings/VisitaLanding";
import { listedWines } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Wines from your visit",
  description: "Pick the wines you tasted on your Colchagua tour and order them online.",
};

export default function VisitaPage({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero
        eyebrow={t("visita.eyebrow", locale)}
        title={t("visita.title", locale)}
        image={IMG.tourGlass}
        intro={t("visita.intro", locale)}
      />
      <VisitaLanding wines={listedWines} />
    </>
  );
}
