import { HomeView } from "@/components/home/HomeView";
import { getPage } from "@/lib/content";

function firstText(slug: string): string {
  const page = getPage(slug);
  const block = page?.blocks.find((b) => b.type === "text");
  return block && block.type === "text" ? block.paragraphs[0] : "";
}

export default function HomePage() {
  const home = getPage("home");
  const heading = home?.hero_heading || "Maintaining the traditions of rural wine farmers in Chile";
  const intro = firstText("home") || firstText("about-us");
  return <HomeView locale="en" heading={heading} storyBody={intro} />;
}
