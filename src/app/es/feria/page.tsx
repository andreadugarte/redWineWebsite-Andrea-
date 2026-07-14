import type { Metadata } from "next";
import FeriaPage from "@/app/feria/page";

export const metadata: Metadata = {
  title: "Vinos de la Feria",
  description: "¿Probaste nuestros vinos en una feria? Pide las mismas botellas online.",
  alternates: { canonical: "/es/feria", languages: { en: "/feria", es: "/es/feria" } },
};

export default function FeriaPageEs() {
  return <FeriaPage locale="es" />;
}
