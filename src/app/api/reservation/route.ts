import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST(req: Request) {
  const d = await req.json().catch(() => ({}));
  const to = process.env.RESERVATIONS_TO_EMAIL || "reservas@reddelvino.com";
  const body = [
    `New ${d.variant || "reservation"} request`,
    d.subject ? `Subject: ${d.subject}` : "",
    `Name: ${d.name || ""}`,
    `Email: ${d.email || ""}`,
    `Date: ${d.date || "—"}`,
    `Group size: ${d.group || "—"}`,
    "",
    `${d.message || ""}`,
  ].filter(Boolean).join("\n");

  const result = await sendMail({ to, subject: `Reservation · ${d.name || "Website"}`, body });
  return NextResponse.json(result, { status: result.ok ? 200 : 500 });
}
