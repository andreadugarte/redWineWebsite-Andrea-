import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WineGrid } from "@/components/wines/WineGrid";
import { listedWines } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "The Wines",
  description: "The full catalogue of Red del Vino — fair-trade wines from nine small-producer brands of the Colchagua Valley, Chile.",
};

export default function WinesPage() {
  return (
    <>
      <PageHero
        eyebrow="Fair-Trade Wines"
        title="The Wines"
        image={IMG.bottlesLine}
        intro="Handcrafted by the small producer families of Red del Vino — a cooperative founded in 2004 by nineteen families in the Colchagua Valley. Honest wines that carry the character of their land."
      />
      <WineGrid wines={listedWines} />
    </>
  );
}
