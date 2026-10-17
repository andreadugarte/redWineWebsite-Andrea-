import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "智利科尔查瓜山谷公平贸易葡萄酒", template: "%s · Red del Vino" },
  description: "来自智利科尔查瓜山谷小型生产者的公平贸易葡萄酒。线上购买,6瓶起圣地亚哥免费配送。",
  openGraph: { title: "智利科尔查瓜山谷公平贸易葡萄酒", description: "来自智利科尔查瓜山谷小型生产者的公平贸易葡萄酒。线上购买,6瓶起圣地亚哥免费配送。", locale: "zh", type: "website" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
