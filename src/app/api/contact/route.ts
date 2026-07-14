import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  const d = await req.json().catch(() => ({}));
  const to = process.env.CONTACT_TO_EMAIL || "info@reddelvino.com";
  const isTrade = d.variant === "trade";
  const body = [
    isTrade ? `New TRADE / wholesale enquiry` : `New contact message`,
    `Name: ${d.name || ""}`,
    `Email: ${d.email || ""}`,
    d.phone ? `Phone: ${d.phone}` : "",
    isTrade ? `Business type: ${d.businessType || "—"}` : "",
    isTrade ? `Location: ${d.location || "—"}` : "",
    isTrade ? `Expected monthly volume: ${d.volume || "—"}` : "",
    isTrade ? `Wines of interest: ${d.interest || "—"}` : "",
    "",
    `${d.message || ""}`,
  ]
    .filter(Boolean)
    .join("\n");

  const result = await sendMail({
    to,
    subject: `${isTrade ? "Trade enquiry" : "Contact"} · ${d.name || "Website"}`,
    body,
  });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
