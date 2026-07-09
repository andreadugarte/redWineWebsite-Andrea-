import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  const d = await req.json().catch(() => ({}));
  if (!d.email || typeof d.email !== "string") {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const to = process.env.CONTACT_TO_EMAIL || "info@reddelvino.com";
  await sendMail({ to, subject: "New Wine Club signup", body: `New subscriber: ${d.email}` });
  return NextResponse.json({ ok: true });
}
