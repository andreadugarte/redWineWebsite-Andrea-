import { Hero } from "@/components/home/Hero";
import { StoryIntro } from "@/components/home/StoryIntro";
import { FeaturedPacks, QuizBanner } from "@/components/home/FeaturedPacks";
import { FeaturedWines } from "@/components/home/FeaturedWines";
import { FeatureBand } from "@/components/home/FeatureBand";
import { QuoteBand } from "@/components/home/QuoteBand";
import { ProducersStrip } from "@/components/home/ProducersStrip";
import { Seam } from "@/components/layout/Seam";
import { winesByBrand, activeProducers, localizedWines } from "@/lib/content";
import { IMG } from "@/lib/images";

export default function HomePagePt() {
  return (
    <>
      <Hero heading="Preservando as tradições e a identidade dos viticultores camponeses no Chile" />
      <StoryIntro body="A Red del Vino nasceu em 2004 como uma iniciativa de comércio justo para conectar as famílias produtoras do Vale de Colchagua com o mundo, honrando seu legado e sua terra." />
      <FeaturedPacks />
      <Seam from="bone" to="charcoal" />
      <FeaturedWines wines={localizedWines(winesByBrand("Campesino").filter((w) => !w.pending), "pt")} />
      <QuizBanner />

      <QuoteBand
        quote="Vinhos de alta qualidade, feitos sem prejudicar o meio ambiente, honrando a terra e as famílias que a cultivam."
        attribution="A missão da Red del Vino"
      />

      <FeatureBand
        image={IMG.sustainability}
        eyebrow="Sustentabilidade"
        heading="Parte da mudança rumo a um mundo mais sustentável."
        body="Corredores de biodiversidade, nosso próprio composto, ovelhas para controlar o mato, hortas orgânicas e um inventário documentado da flora e fauna do vale — pequenos produtores que cuidam da terra que os sustenta."
        cta={{ label: "Nosso compromisso", href: "/pt/sustainability" }}
        align="left"
      />

      <ProducersStrip producers={activeProducers} />

      <FeatureBand
        image={IMG.tourism}
        eyebrow="Enoturismo"
        heading="Prove o vale onde o vinho nasce."
        body="Degustações, passeios pelos vinhedos, bicicletas e caiaques em Colchagua — e um Centro de Eventos a poucos minutos de Santa Cruz para casamentos e celebrações entre as vinhas."
        cta={{ label: "Planeje sua visita", href: "/pt/tourism" }}
        align="right"
      />
    </>
  );
}
