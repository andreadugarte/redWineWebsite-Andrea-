import type { Metadata } from "next";
import { PacksView } from "@/components/pages/PacksView";

export const metadata: Metadata = {
  title: "Kits de Vinho",
  description:
    "Kits de vinho selecionados das famílias produtoras de comércio justo do Vale de Colchagua — por ocasião, por orçamento ou para descobrir toda a cooperativa.",
  alternates: {
    canonical: "/pt/packs",
    languages: { en: "/packs", es: "/es/packs", pt: "/pt/packs", zh: "/zh/packs" },
  },
};

export default function PacksPagePt() {
  return <PacksView locale="pt" />;
}
