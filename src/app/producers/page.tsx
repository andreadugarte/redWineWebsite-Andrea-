import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProducerGrid } from "@/components/producers/ProducerGrid";
import { activeProducers } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "The Producers",
  description: "Meet the fair-trade producer families behind Red del Vino — a cooperative founded in 2004 by nineteen families in the Colchagua Valley, Chile.",
};

export default function ProducersPage() {
  return (
    <>
      <PageHero
        eyebrow="The People Behind the Wine"
        title="Our Producers"
        image={IMG.producers}
        intro="Red del Vino was founded in 2004 by nineteen small wine-growing families. Today some bottle their own wine and others grow the grapes behind it — these are the hands that tend the vines."
      />
      <ProducerGrid producers={activeProducers} />
    </>
  );
}
