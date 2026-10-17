import type { Metadata } from "next";

export const metadata: Metadata = { title: "我们的故事" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
