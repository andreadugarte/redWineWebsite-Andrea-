import type { Metadata } from "next";
import { TradeView } from "@/components/pages/TradeView";

export const metadata: Metadata = {
  title: "Venda por Atacado",
  description:
    "Restaurantes, lojas e distribuidores: trabalhe diretamente com uma cooperativa certificada Fairtrade de pequenos produtores do Vale de Colchagua.",
  alternates: {
    canonical: "/pt/trade",
    languages: { en: "/trade", es: "/es/trade", pt: "/pt/trade", zh: "/zh/trade" },
  },
};

export default function TradePagePt() {
  return <TradeView locale="pt" />;
}
