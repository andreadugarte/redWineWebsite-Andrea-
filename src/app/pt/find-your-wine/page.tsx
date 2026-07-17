import type { Metadata } from "next";
import { FindYourWineView } from "@/components/pages/FindYourWineView";

export const metadata: Metadata = {
  title: "Encontre seu Vinho",
  description:
    "Quatro perguntas rápidas e recomendamos o vinho de Colchagua ideal para você — sem necessidade de vocabulário de vinho.",
  alternates: {
    canonical: "/pt/find-your-wine",
    languages: {
      en: "/find-your-wine",
      es: "/es/find-your-wine",
      pt: "/pt/find-your-wine",
      zh: "/zh/find-your-wine",
    },
  },
};

export default function FindYourWinePagePt() {
  return <FindYourWineView locale="pt" />;
}
