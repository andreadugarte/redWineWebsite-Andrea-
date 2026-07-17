import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProducerGrid } from "@/components/producers/ProducerGrid";
import { activeProducers } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "生产者",
  description:
    "认识Red del Vino背后的公平贸易生产家庭——一个由智利科尔查瓜山谷十九个家庭于2004年创立的合作社。",
  alternates: {
    canonical: "/zh/producers",
    languages: { en: "/producers", es: "/es/producers", pt: "/pt/producers", zh: "/zh/producers" },
  },
};

export default function ProducersPageZh() {
  return (
    <>
      <PageHero
        eyebrow="美酒背后的人们"
        title="我们的生产者"
        image={IMG.producers}
        intro="Red del Vino由十九个葡萄种植家庭于2004年共同创立。如今，一些家庭酿造并装瓶自己的葡萄酒，另一些则种植使之成为可能的葡萄——这些正是悉心照料葡萄园的双手。"
      />
      <ProducerGrid producers={activeProducers} />
    </>
  );
}
