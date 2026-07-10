import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProducerGrid } from "@/components/producers/ProducerGrid";
import { activeProducers } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "The Producers",
  description: "Meet the nineteen fair-trade producer families behind Red del Vino in the Colchagua Valley, Chile.",
};

export default function ProducersPage() {
  return (
    <>
      <PageHero
        eyebrow="The People Behind the Wine"
        title="Our Producers"
        image={IMG.producers}
        intro="Red del Vino was formed in 2004 by a group of nineteen small wine-growing families. These are the hands that tend the vines."
      />
      <ProducerGrid producers={activeProducers} />
    </>
  );
}
