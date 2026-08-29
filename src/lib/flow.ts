import crypto from "crypto";

/**
 * Flow.cl payment gateway (replaces the never-wired Stripe placeholder —
 * Stripe doesn't support Chile as an account country). Reads credentials
 * from FLOW_API_KEY / FLOW_SECRET_KEY env vars only — never hardcode them.
 * https://www.flow.cl/docs/api.html
 */

const FLOW_BASE_URL =
  process.env.FLOW_SANDBOX === "true" ? "https://sandbox.flow.cl/api" : "https://www.flow.cl/api";

export function flowConfigured(): boolean {
  return Boolean(process.env.FLOW_API_KEY && process.env.FLOW_SECRET_KEY);
}

/** Flow signs by sorting params alphabetically, concatenating key+value pairs
 *  with no separator, then HMAC-SHA256 with the secret key (hex digest). */
function sign(params: Record<string, string | number>, secretKey: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((k) => `${k}${params[k]}`)
    .join("");
  return crypto.createHmac("sha256", secretKey).update(toSign).digest("hex");
}

function credentials() {
  const apiKey = process.env.FLOW_API_KEY;
  const secretKey = process.env.FLOW_SECRET_KEY;
  if (!apiKey || !secretKey) throw new Error("Flow is not configured (FLOW_API_KEY / FLOW_SECRET_KEY missing)");
  return { apiKey, secretKey };
}

export type FlowPaymentCreated = { url: string; token: string; flowOrder: number };

export async function createFlowPayment(input: {
  commerceOrder: string;
  subject: string;
  amount: number;
  email: string;
  urlConfirmation: string;
  urlReturn: string;
}): Promise<FlowPaymentCreated> {
  const { apiKey, secretKey } = credentials();
  const params: Record<string, string | number> = {
    apiKey,
    commerceOrder: input.commerceOrder,
    subject: input.subject,
    currency: "CLP",
    amount: Math.round(input.amount),
    email: input.email,
    urlConfirmation: input.urlConfirmation,
    urlReturn: input.urlReturn,
  };
  const s = sign(params, secretKey);
  const body = new URLSearchParams({ ...(params as Record<string, string>), s });

  const res = await fetch(`${FLOW_BASE_URL}/payment/create`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Flow payment/create failed (${res.status}): ${text}`);
  }
  return res.json();
}

/** Flow status codes: 1 = pendiente, 2 = pagada, 3 = rechazada, 4 = anulada.
 *  https://developers.flow.cl/en/docs/tutorial-basics/status */
export type FlowStatus = {
  flowOrder: number;
  commerceOrder: string;
  status: 1 | 2 | 3 | 4;
  subject: string;
  currency: string;
  amount: number;
  payer: string;
};

export async function getFlowStatus(token: string): Promise<FlowStatus> {
  const { apiKey, secretKey } = credentials();
  const params: Record<string, string | number> = { apiKey, token };
  const s = sign(params, secretKey);
  const qs = new URLSearchParams({ ...(params as Record<string, string>), s });

  const res = await fetch(`${FLOW_BASE_URL}/payment/getStatus?${qs.toString()}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Flow payment/getStatus failed (${res.status}): ${text}`);
  }
  return res.json();
}
