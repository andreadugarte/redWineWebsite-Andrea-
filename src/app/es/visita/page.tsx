import type { Metadata } from "next";
import VisitaPage from "@/app/visita/page";

export const metadata: Metadata = {
  title: "Los vinos de tu visita",
  description: "Marca los vinos que probaste en tu tour por Colchagua y pídelos online.",
  alternates: { canonical: "/es/visita", languages: { en: "/visita", es: "/es/visita" } },
};

export default function VisitaPageEs() {
  return <VisitaPage locale="es" />;
}
