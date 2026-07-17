import type { Metadata } from "next";
import { FeriaView } from "@/components/pages/FeriaView";

export const metadata: Metadata = {
  title: "Vinos de la Feria",
  description: "¿Probaste nuestros vinos en una feria? Pide las mismas botellas online.",
  alternates: { canonical: "/es/feria", languages: { en: "/feria", es: "/es/feria", pt: "/pt/feria", zh: "/zh/feria" } },
};

export default function FeriaPageEs() {
  return <FeriaView locale="es" />;
}
