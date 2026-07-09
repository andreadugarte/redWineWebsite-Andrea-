import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  const d = await req.json().catch(() => ({}));
  const to = process.env.CONTACT_TO_EMAIL || "info@reddelvino.com";
  const body = [
    `New contact message`,
    `Name: ${d.name || ""}`,
    `Email: ${d.email || ""}`,
    "",
    `${d.message || ""}`,
  ].join("\n");

  const result = await sendMail({ to, subject: `Contact · ${d.name || "Website"}`, body });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
