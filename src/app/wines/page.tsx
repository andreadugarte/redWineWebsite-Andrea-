import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WineGrid } from "@/components/wines/WineGrid";
import { listedWines } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "The Wines",
  description: "The Campesino line — Cabernet Sauvignon, Carménère and Chardonnay, crafted by the fair-trade producers of Colchagua Valley.",
};

export default function WinesPage() {
  return (
    <>
      <PageHero
        eyebrow="The Campesino Line"
        title="The Wines"
        image={IMG.bottlesLine}
        intro="Handcrafted by our nineteen producer families in the Colchagua Valley — honest wines that carry the character of their land."
      />
      <WineGrid wines={listedWines} />
    </>
  );
}
