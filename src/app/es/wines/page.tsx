import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WineGrid } from "@/components/wines/WineGrid";
import { wines, localizedWines } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Los Vinos",
  description:
    "La línea Campesino — Cabernet Sauvignon, Carménère y Chardonnay, elaborados por los productores de comercio justo del Valle de Colchagua.",
  alternates: {
    canonical: "/es/wines",
    languages: { en: "/wines", es: "/es/wines" },
  },
};

export default function WinesPageEs() {
  return (
    <>
      <PageHero
        eyebrow="La Línea Campesino"
        title="Los Vinos"
        image={IMG.bottlesLine}
        intro="Elaborados a mano por nuestras diecinueve familias productoras en el Valle de Colchagua — vinos honestos que llevan el carácter de su tierra."
      />
      <WineGrid wines={localizedWines(wines, "es")} />
    </>
  );
}
