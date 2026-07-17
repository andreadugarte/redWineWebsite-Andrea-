import type { Metadata } from "next";
import { VisitaView } from "@/components/pages/VisitaView";

export const metadata: Metadata = {
  title: "您游览中品尝的美酒",
  description: "选择您在科尔查瓜游览中品尝过的葡萄酒，并线上订购。",
  alternates: {
    canonical: "/zh/visita",
    languages: { en: "/visita", es: "/es/visita", pt: "/pt/visita", zh: "/zh/visita" },
  },
};

export default function VisitaPageZh() {
  return <VisitaView locale="zh" />;
}
