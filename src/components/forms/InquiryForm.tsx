"use client";

import { useState } from "react";
import { useT } from "@/components/i18n/LocaleProvider";

type Variant = "reservation" | "contact" | "event";

const CONFIG: Record<Variant, { fields: string[]; ctaKey: string; endpoint: string }> = {
  reservation: { fields: ["phone", "date", "group", "message"], ctaKey: "form.cta.reservation", endpoint: "/api/reservation" },
  event: { fields: ["phone", "date", "group", "message"], ctaKey: "form.cta.event", endpoint: "/api/reservation" },
  contact: { fields: ["message"], ctaKey: "form.cta.contact", endpoint: "/api/contact" },
};

export function InquiryForm({ variant = "contact", subject }: { variant?: Variant; subject?: string }) {
  const cfg = CONFIG[variant];
  const tr = useT();
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch(cfg.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, subject, variant }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done")
    return (
      <div className="border border-vine/40 bg-vine/5 p-8 text-center">
        <p className="font-serif text-2xl">{tr("form.thankYou")}</p>
        <p className="mt-2 font-sans text-sm text-charcoal-soft">{tr("form.thankYouBody")}</p>
      </div>
    );

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field name="name" label={tr("form.name")} required />
        <Field name="email" label={tr("form.email")} type="email" required />
      </div>
      {cfg.fields.includes("phone") && <Field name="phone" label={tr("form.phone")} type="tel" />}
      {cfg.fields.includes("date") && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field name="date" label={tr("form.date")} type="date" />
          <Field name="group" label={tr("form.group")} type="number" placeholder="6" />
        </div>
      )}
      {cfg.fields.includes("message") && <Field name="message" label={tr("form.message")} textarea />}
      <button type="submit" disabled={state === "loading"} className="btn-primary justify-self-start disabled:opacity-60">
        {state === "loading" ? tr("form.sending") : tr(cfg.ctaKey)}
      </button>
      {state === "error" && <p className="font-sans text-sm text-oxblood">{tr("form.error")}</p>}
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
  textarea,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}) {
  const cls =
    "w-full border-b border-charcoal/25 bg-transparent py-2.5 font-sans text-sm focus:border-oxblood focus:outline-none";
  return (
    <label className="block">
      <span className="eyebrow text-charcoal/50">{label}{required && " *"}</span>
      <div className="mt-2">
        {textarea ? (
          <textarea name={name} rows={4} required={required} placeholder={placeholder} className={cls} />
        ) : (
          <input name={name} type={type} required={required} placeholder={placeholder} className={cls} />
        )}
      </div>
    </label>
  );
}
