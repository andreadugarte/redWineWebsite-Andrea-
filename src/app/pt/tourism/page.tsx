import type { Metadata } from "next";
import { TourismView } from "@/components/pages/TourismView";

export const metadata: Metadata = {
  title: "Enoturismo",
  description: "Degustações, passeios pelos vinhedos, aluguel de bicicletas e caiaques no Vale de Colchagua com a Red del Vino.",
  alternates: {
    canonical: "/pt/tourism",
    languages: { en: "/tourism", es: "/es/tourism", pt: "/pt/tourism", zh: "/zh/tourism" },
  },
};

export default function TourismPagePt() {
  return <TourismView locale="pt" />;
}
