import type { Metadata } from "next";

export const metadata: Metadata = { title: "活动中心" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
