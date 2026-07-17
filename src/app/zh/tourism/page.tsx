import type { Metadata } from "next";
import { TourismView } from "@/components/pages/TourismView";

export const metadata: Metadata = {
  title: "葡萄酒旅游",
  description: "与Red del Vino一起在科尔查瓜山谷体验品鉴、葡萄园游览、自行车与皮划艇租赁。",
  alternates: {
    canonical: "/zh/tourism",
    languages: { en: "/tourism", es: "/es/tourism", pt: "/pt/tourism", zh: "/zh/tourism" },
  },
};

export default function TourismPageZh() {
  return <TourismView locale="zh" />;
}
