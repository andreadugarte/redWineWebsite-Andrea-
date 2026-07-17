import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProducerGrid } from "@/components/producers/ProducerGrid";
import { activeProducers } from "@/lib/content";
import { IMG } from "@/lib/images";

export const metadata: Metadata = {
  title: "Os Produtores",
  description:
    "Conheça as famílias produtoras de comércio justo por trás da Red del Vino — uma cooperativa fundada em 2004 por dezenove famílias do Vale de Colchagua, Chile.",
  alternates: {
    canonical: "/pt/producers",
    languages: { en: "/producers", es: "/es/producers", pt: "/pt/producers", zh: "/zh/producers" },
  },
};

export default function ProducersPagePt() {
  return (
    <>
      <PageHero
        eyebrow="As pessoas por trás do vinho"
        title="Nossos Produtores"
        image={IMG.producers}
        intro="A Red del Vino nasceu em 2004 pela mão de dezenove famílias viticultoras. Hoje algumas engarrafam seu próprio vinho e outras cultivam a uva que o torna possível — estas são as mãos que cuidam das vinhas."
      />
      <ProducerGrid producers={activeProducers} />
    </>
  );
}
