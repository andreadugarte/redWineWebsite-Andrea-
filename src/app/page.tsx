import { Hero } from "@/components/home/Hero";
import { StoryIntro } from "@/components/home/StoryIntro";
import { FeaturedWines } from "@/components/home/FeaturedWines";
import { FeatureBand } from "@/components/home/FeatureBand";
import { QuoteBand } from "@/components/home/QuoteBand";
import { ProducersStrip } from "@/components/home/ProducersStrip";
import { Seam } from "@/components/layout/Seam";
import { getPage, wines, activeProducers } from "@/lib/content";
import { IMG } from "@/lib/images";

function firstText(slug: string): string {
  const page = getPage(slug);
  const block = page?.blocks.find((b) => b.type === "text");
  return block && block.type === "text" ? block.paragraphs[0] : "";
}

export default function HomePage() {
  const home = getPage("home");
  const heading = home?.hero_heading || "Maintaining the traditions of rural wine farmers in Chile";
  const intro = firstText("home") || firstText("about-us");

  return (
    <>
      <Hero heading={heading} />
      <StoryIntro body={intro} />
      <Seam from="bone" to="charcoal" />
      <FeaturedWines wines={wines} />
      <Seam from="charcoal" to="oxblood" />

      <QuoteBand
        quote="High-quality wines, made without harming the environment, honouring the land and the families who tend it."
        attribution="The mission of Red del Vino"
      />

      <FeatureBand
        image={IMG.sustainability}
        eyebrow="Sustainability"
        heading="Part of the change for a more sustainable world."
        body="Biodiversity corridors, our own compost, sheep to manage weeds, organic gardens and a documented flora and fauna of the valley — small producers caring for the land that sustains them."
        cta={{ label: "Our commitment", href: "/sustainability" }}
        align="left"
      />

      <ProducersStrip producers={activeProducers} />

      <FeatureBand
        image={IMG.tourism}
        eyebrow="Wine Tourism"
        heading="Taste the valley where the wine is born."
        body="Tastings, viticultural tours, bikes and kayaks in Colchagua — and an Event Center minutes from Santa Cruz for weddings and celebrations set among the vines."
        cta={{ label: "Plan your visit", href: "/tourism" }}
        align="right"
      />
    </>
  );
}
