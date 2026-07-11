import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProducerGrid } from "@/components/producers/ProducerGrid";
import { activeProducers } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Los Productores",
  description:
    "Conoce a las diecinueve familias productoras de comercio justo detrás de Red del Vino, en el Valle de Colchagua, Chile.",
  alternates: {
    canonical: "/es/producers",
    languages: { en: "/producers", es: "/es/producers" },
  },
};

export default function ProducersPageEs() {
  return (
    <>
      <PageHero
        eyebrow="La gente detrás del vino"
        title="Nuestros Productores"
        image={IMG.producers}
        intro="Red del Vino nació en 2004 de la mano de un grupo de diecinueve familias viñateras. Estas son las manos que cuidan las viñas."
      />
      <ProducerGrid producers={activeProducers} />
    </>
  );
}
