import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WineGrid } from "@/components/wines/WineGrid";
import { listedWines, localizedWines } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Los Vinos",
  description:
    "El catálogo completo de Red del Vino — vinos de comercio justo de nueve marcas de pequeños productores del Valle de Colchagua, Chile.",
  alternates: {
    canonical: "/es/wines",
    languages: { en: "/wines", es: "/es/wines" },
  },
};

export default function WinesPageEs() {
  return (
    <>
      <PageHero
        eyebrow="Vinos de Comercio Justo"
        title="Los Vinos"
        image={IMG.bottlesLine}
        intro="Elaborados a mano por las familias productoras de Red del Vino — una cooperativa fundada en 2004 por diecinueve familias del Valle de Colchagua. Vinos honestos que llevan el carácter de su tierra."
      />
      <WineGrid wines={localizedWines(listedWines, "es")} />
    </>
  );
}
