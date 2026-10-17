import { Hero } from "@/components/home/Hero";
import { BenefitStrip } from "@/components/home/BenefitStrip";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { PacksGrid } from "@/components/home/PacksGrid";
import { StoryIntro } from "@/components/home/StoryIntro";
import { ProducersStrip } from "@/components/home/ProducersStrip";
import { VisitBand } from "@/components/home/VisitBand";
import { activeProducers, localizedWines, listedWines } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

const FEATURED = ["campesino-carmenere", "cea-mito-carmenere", "un-buen-caballero-cabernet-sauvignon", "campesino-chardonnay-gran-reserva"];

/** One shared homepage for every locale: only the hero line and story paragraph differ per language. */
export function HomeView({ locale, heading, storyBody }: { locale: Locale; heading: string; storyBody: string }) {
  const all = localizedWines(listedWines, locale);
  const bySlug = Object.fromEntries(all.map((w) => [w.slug, w]));
  const featured = FEATURED.map((s) => bySlug[s]).filter((w) => w && w.stock !== 0) as typeof all;
  return (
    <>
      <Hero heading={heading} />
      <BenefitStrip />
      <CategoryTiles bySlug={bySlug} />
      <FeaturedGrid wines={featured} />
      <PacksGrid />
      <StoryIntro body={storyBody} />
      <ProducersStrip producers={activeProducers} />
      <VisitBand />
    </>
  );
}
