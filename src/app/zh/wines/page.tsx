import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WineGrid } from "@/components/wines/WineGrid";
import { listedWines, localizedWines } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "葡萄酒",
  description: "Red del Vino完整目录——来自智利科尔查瓜山谷九个小生产者品牌的公平贸易葡萄酒。",
  alternates: {
    canonical: "/zh/wines",
    languages: { en: "/wines", es: "/es/wines", pt: "/pt/wines", zh: "/zh/wines" },
  },
};

export default function WinesPageZh() {
  return (
    <>
      <PageHero
        eyebrow="公平贸易葡萄酒"
        title="葡萄酒"
        image={IMG.bottlesLine}
        intro="由Red del Vino的生产家庭手工酿造——一个由科尔查瓜山谷十九个家庭于2004年创立的合作社。诚实的葡萄酒，承载着这片土地的性格。"
      />
      <WineGrid wines={localizedWines(listedWines, "zh")} />
    </>
  );
}
