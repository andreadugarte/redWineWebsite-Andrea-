import type { Metadata } from "next";

export const metadata: Metadata = { title: "Nuestra historia" };

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
