import type { Metadata } from "next";
import { TradeView } from "@/components/pages/TradeView";

export const metadata: Metadata = {
  title: "批发业务",
  description:
    "餐厅、商店与经销商：直接与获Fairtrade认证的科尔查瓜山谷小型家庭生产者合作社合作。",
  alternates: {
    canonical: "/zh/trade",
    languages: { en: "/trade", es: "/es/trade", pt: "/pt/trade", zh: "/zh/trade" },
  },
};

export default function TradePageZh() {
  return <TradeView locale="zh" />;
}
