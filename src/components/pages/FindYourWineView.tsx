import { PageHero } from "@/components/PageHero";
import { WineQuiz } from "@/components/quiz/WineQuiz";
import { listedWines, bundles } from "@/lib/content";
import { t, type Locale } from "@/lib/i18n";
import { IMG } from "@/lib/images";

export function FindYourWineView({ locale = "en" }: { locale?: Locale }) {
  return (
    <>
      <PageHero
        eyebrow={t("quiz.eyebrow", locale)}
        title={t("quiz.title", locale)}
        image={IMG.tourGlass}
        intro={t("quiz.intro", locale)}
      />
      <div className="container-x py-16 md:py-24">
        <WineQuiz wines={listedWines} bundles={bundles} />
      </div>
    </>
  );
}
