import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  const d = await req.json().catch(() => ({}));
  if (!d.email || typeof d.email !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const to = process.env.CONTACT_TO_EMAIL || "info@reddelvino.com";
  // `context` tags where the signup came from (homepage, quiz-results, feria,
  // restock:<wine-slug>) so the list can be segmented later.
  const context = typeof d.context === "string" ? d.context : "homepage";
  const detail = typeof d.detail === "string" ? `\nDetail: ${d.detail}` : "";
  await sendMail({
    to,
    subject: `New signup · ${context}`,
    body: `New subscriber: ${d.email}\nSource: ${context}${detail}`,
  });
  return NextResponse.json({ ok: true });
}
