import type { Metadata } from "next";
import { TourismView } from "@/components/pages/TourismView";

export const metadata: Metadata = {
  title: "Enoturismo",
  description: "Tours vitivinícolas guiados en el Valle de Colchagua con Red del Vino.",
  alternates: {
    canonical: "/es/tourism",
    languages: { en: "/tourism", es: "/es/tourism", pt: "/pt/tourism", zh: "/zh/tourism" },
  },
};

export default function TourismPageEs() {
  return <TourismView locale="es" />;
}
