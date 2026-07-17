import type { Metadata } from "next";
import { FeriaView } from "@/components/pages/FeriaView";

export const metadata: Metadata = {
  title: "展会好酒",
  description: "在展会上品尝到我们的美酒了吗？线上即可订购同款。",
  alternates: {
    canonical: "/zh/feria",
    languages: { en: "/feria", es: "/es/feria", pt: "/pt/feria", zh: "/zh/feria" },
  },
};

export default function FeriaPageZh() {
  return <FeriaView locale="zh" />;
}
