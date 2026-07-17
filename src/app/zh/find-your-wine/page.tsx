import type { Metadata } from "next";
import { FindYourWineView } from "@/components/pages/FindYourWineView";

export const metadata: Metadata = {
  title: "为您推荐美酒",
  description: "四个简单问题，为您推荐最适合的科尔查瓜美酒——无需任何葡萄酒专业知识。",
  alternates: {
    canonical: "/zh/find-your-wine",
    languages: {
      en: "/find-your-wine",
      es: "/es/find-your-wine",
      pt: "/pt/find-your-wine",
      zh: "/zh/find-your-wine",
    },
  },
};

export default function FindYourWinePageZh() {
  return <FindYourWineView locale="zh" />;
}
