import type { Metadata } from "next";
import { TourismView } from "@/components/pages/TourismView";

export const metadata: Metadata = {
  title: "Enoturismo",
  description: "Passeios guiados pelos vinhedos no Vale de Colchagua com a Red del Vino.",
  alternates: {
    canonical: "/pt/tourism",
    languages: { en: "/tourism", es: "/es/tourism", pt: "/pt/tourism", zh: "/zh/tourism" },
  },
};

export default function TourismPagePt() {
  return <TourismView locale="pt" />;
}
