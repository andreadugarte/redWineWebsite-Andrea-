import type { Metadata } from "next";

export const metadata: Metadata = { title: "Centro de eventos" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
