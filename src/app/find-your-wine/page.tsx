import type { Metadata } from "next";
import { FindYourWineView } from "@/components/pages/FindYourWineView";

export const metadata: Metadata = {
  title: "Find Your Wine",
  description:
    "Four quick questions and we'll point you to the right fair-trade Colchagua wine — no wine vocabulary needed.",
};

export default function Page() {
  return <FindYourWineView locale="en" />;
}
