import type { Metadata } from "next";
import PacksPage from "@/app/packs/page";

export const metadata: Metadata = {
  title: "Packs de Vino",
  description:
    "Packs de vino seleccionados de las familias productoras de comercio justo del Valle de Colchagua — por ocasión, por presupuesto o para descubrir toda la cooperativa.",
  alternates: {
    canonical: "/es/packs",
    languages: { en: "/packs", es: "/es/packs" },
  },
};

export default function PacksPageEs() {
  return <PacksPage locale="es" />;
}
