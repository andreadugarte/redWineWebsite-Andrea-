import type { Metadata } from "next";
import { TradeView } from "@/components/pages/TradeView";

export const metadata: Metadata = {
  title: "Ventas Mayoristas",
  description:
    "Restaurantes, tiendas y distribuidores: trabaja directamente con una cooperativa certificada Fairtrade de pequeños productores del Valle de Colchagua.",
  alternates: { canonical: "/es/trade", languages: { en: "/trade", es: "/es/trade" } },
};

export default function TradePageEs() {
  return <TradeView locale="es" />;
}
