import type { Metadata } from "next";
import { VisitaView } from "@/components/pages/VisitaView";

export const metadata: Metadata = {
  title: "Los vinos de tu visita",
  description: "Marca los vinos que probaste en tu tour por Colchagua y pídelos online.",
  alternates: { canonical: "/es/visita", languages: { en: "/visita", es: "/es/visita", pt: "/pt/visita", zh: "/zh/visita" } },
};

export default function VisitaPageEs() {
  return <VisitaView locale="es" />;
}
