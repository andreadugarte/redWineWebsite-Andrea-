import type { Metadata } from "next";
import { PacksView } from "@/components/pages/PacksView";

export const metadata: Metadata = {
  title: "葡萄酒套装",
  description:
    "科尔查瓜山谷公平贸易生产家庭精选的葡萄酒套装——按场合、按预算，或一箱囊括整个合作社的风味。",
  alternates: {
    canonical: "/zh/packs",
    languages: { en: "/packs", es: "/es/packs", pt: "/pt/packs", zh: "/zh/packs" },
  },
};

export default function PacksPageZh() {
  return <PacksView locale="zh" />;
}
