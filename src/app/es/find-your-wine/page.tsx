import type { Metadata } from "next";
import FindYourWinePage from "@/app/find-your-wine/page";

export const metadata: Metadata = {
  title: "Encuentra tu Vino",
  description:
    "Cuatro preguntas rápidas y te recomendamos el vino de Colchagua ideal para ti — sin vocabulario de vino.",
  alternates: {
    canonical: "/es/find-your-wine",
    languages: { en: "/find-your-wine", es: "/es/find-your-wine" },
  },
};

export default function FindYourWinePageEs() {
  return <FindYourWinePage locale="es" />;
}
