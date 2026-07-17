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

export default function HomePageZh() {
  return (
    <>
      <Hero heading="传承智利乡村葡萄种植者的传统与身份" />
      <StoryIntro body="Red del Vino于2004年作为一项公平贸易倡议诞生，旨在将科尔查瓜山谷的生产家庭与世界连接起来，传承他们的家业与这片土地。" />
      <FeaturedPacks />
      <Seam from="bone" to="charcoal" />
      <FeaturedWines wines={localizedWines(winesByBrand("Campesino").filter((w) => !w.pending), "zh")} />
      <QuizBanner />

      <QuoteBand
        quote="高品质的葡萄酒，在不损害环境的前提下酿造，敬畏这片土地及耕耘它的家庭。"
        attribution="Red del Vino的使命"
      />

      <FeatureBand
        image={IMG.sustainability}
        eyebrow="可持续发展"
        heading="致力于迈向更可持续的世界。"
        body="生物多样性廊道、自制堆肥、用于杂草控制的绵羊、有机菜园，以及记录山谷动植物的详尽名录——悉心守护赖以生存的这片土地的小生产者们。"
        cta={{ label: "我们的承诺", href: "/zh/sustainability" }}
        align="left"
      />

      <ProducersStrip producers={activeProducers} />

      <FeatureBand
        image={IMG.tourism}
        eyebrow="葡萄酒旅游"
        heading="品味美酒诞生的山谷。"
        body="在科尔查瓜体验品鉴、葡萄园游览、自行车与皮划艇——距圣克鲁斯仅几分钟车程的活动中心，是婚礼与庆典的理想之地，就在葡萄园之间。"
        cta={{ label: "规划您的行程", href: "/zh/tourism" }}
        align="right"
      />
    </>
  );
}
