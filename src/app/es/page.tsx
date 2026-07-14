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

export default function HomePageEs() {
  return (
    <>
      <Hero heading="Preservando las tradiciones e identidad de los viñateros campesinos en Chile" />
      <StoryIntro body="Red del Vino nació en 2004 como una iniciativa de comercio justo para conectar a las familias productoras del Valle de Colchagua con el mundo, honrando su legado y su tierra." />
      <FeaturedPacks />
      <Seam from="bone" to="charcoal" />
      <FeaturedWines wines={localizedWines(winesByBrand("Campesino"), "es")} />
      <QuizBanner />

      <QuoteBand
        quote="Vinos de alta calidad, hechos sin dañar el medio ambiente, honrando la tierra y las familias que la cultivan."
        attribution="La misión de Red del Vino"
      />

      <FeatureBand
        image={IMG.sustainability}
        eyebrow="Sostenibilidad"
        heading="Parte del cambio hacia un mundo más sostenible."
        body="Corredores de biodiversidad, nuestro propio compost, ovejas para controlar malezas, huertos orgánicos y un inventario documentado de flora y fauna del valle — pequeños productores que cuidan la tierra que los sustenta."
        cta={{ label: "Nuestro compromiso", href: "/es/sustainability" }}
        align="left"
      />

      <ProducersStrip producers={activeProducers} />

      <FeatureBand
        image={IMG.tourism}
        eyebrow="Enoturismo"
        heading="Prueba el valle donde nace el vino."
        body="Catas, tours por los viñedos, bicicletas y kayaks en Colchagua — y un Centro de Eventos a minutos de Santa Cruz para bodas y celebraciones entre las viñas."
        cta={{ label: "Planifica tu visita", href: "/es/tourism" }}
        align="right"
      />
    </>
  );
}
