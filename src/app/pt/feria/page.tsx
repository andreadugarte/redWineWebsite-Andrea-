import type { Metadata } from "next";
import { FeriaView } from "@/components/pages/FeriaView";

export const metadata: Metadata = {
  title: "Vinhos da Feira",
  description: "Provou nossos vinhos em uma feira? Peça as mesmas garrafas online.",
  alternates: {
    canonical: "/pt/feria",
    languages: { en: "/feria", es: "/es/feria", pt: "/pt/feria", zh: "/zh/feria" },
  },
};

export default function FeriaPagePt() {
  return <FeriaView locale="pt" />;
}
