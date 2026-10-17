import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nossa história" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
