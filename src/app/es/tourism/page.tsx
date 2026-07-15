import type { Metadata } from "next";
import { TourismView } from "@/components/pages/TourismView";

export const metadata: Metadata = {
  title: "Enoturismo",
  description: "Catas, tours vitivinícolas, arriendo de bicicletas y kayaks en el Valle de Colchagua con Red del Vino.",
  alternates: {
    canonical: "/es/tourism",
    languages: { en: "/tourism", es: "/es/tourism" },
  },
};

export default function TourismPageEs() {
  return <TourismView locale="es" />;
}
