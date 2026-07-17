import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WineGrid } from "@/components/wines/WineGrid";
import { listedWines, localizedWines } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Os Vinhos",
  description:
    "O catálogo completo da Red del Vino — vinhos de comércio justo de nove marcas de pequenos produtores do Vale de Colchagua, Chile.",
  alternates: {
    canonical: "/pt/wines",
    languages: { en: "/wines", es: "/es/wines", pt: "/pt/wines", zh: "/zh/wines" },
  },
};

export default function WinesPagePt() {
  return (
    <>
      <PageHero
        eyebrow="Vinhos de Comércio Justo"
        title="Os Vinhos"
        image={IMG.bottlesLine}
        intro="Elaborados à mão pelas famílias produtoras da Red del Vino — uma cooperativa fundada em 2004 por dezenove famílias do Vale de Colchagua. Vinhos honestos que carregam o caráter de sua terra."
      />
      <WineGrid wines={localizedWines(listedWines, "pt")} />
    </>
  );
}
