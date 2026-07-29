import type { Metadata } from "next";
import { FeriaView } from "@/components/pages/FeriaView";

export const metadata: Metadata = {
  title: "Feria Wines",
  description: "Tasted our wines at a feria? Order the same bottles online.",
};

export default function Page() {
  return <FeriaView locale="en" />;
}
