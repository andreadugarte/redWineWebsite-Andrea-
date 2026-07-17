import type { Metadata } from "next";
import { VisitaView } from "@/components/pages/VisitaView";

export const metadata: Metadata = {
  title: "Os vinhos da sua visita",
  description: "Marque os vinhos que você provou no seu passeio por Colchagua e peça-os online.",
  alternates: {
    canonical: "/pt/visita",
    languages: { en: "/visita", es: "/es/visita", pt: "/pt/visita", zh: "/zh/visita" },
  },
};

export default function VisitaPagePt() {
  return <VisitaView locale="pt" />;
}
