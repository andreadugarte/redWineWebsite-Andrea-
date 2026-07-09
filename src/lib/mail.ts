/**
 * Sends an email via Resend when RESEND_API_KEY is configured.
 * When no key is present the submission is logged server-side and treated as a
 * successful "inquiry stub" so the site works fully without any secrets.
 */
export async function sendMail({ to, subject, body }: { to: string; subject: string; body: string }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[inquiry-stub] → ${to} | ${subject}\n${body}`);
    return { ok: true, simulated: true };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Red del Vino <noreply@reddelvino.com>",
        to,
        subject,
        text: body,
      }),
    });
    return { ok: res.ok, simulated: false };
  } catch (e) {
    console.error("[mail] send failed", e);
    return { ok: false, simulated: false };
  }
}
