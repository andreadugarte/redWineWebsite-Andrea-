# DEPENDENCIES — Requires confirmation from Red del Vino

Everything here is flagged, not silently resolved. Items marked ✉️ were asked
in the July 2026 email thread with Rodrigo ("Respuestas a requerimientos
iniciales y accesos"); the rest are queued for the next email.

## Commerce blockers
- **Stripe account + API keys** ✉️ — checkout runs in clearly-labelled
  simulated mode until keys exist. Business/banking details were received by
  email for Stripe onboarding — they must be entered directly in Stripe's own
  onboarding flow and MUST NOT be committed to this repo in any form.
- **Email delivery (Resend) — NOT wired to a real inbox yet.** Verified
  2026-07-15 by POSTing directly to the live `/api/contact` endpoint: it
  returns `{"ok":true,"simulated":true}` — no `RESEND_API_KEY` is set in
  Vercel, so contact, newsletter, tourism-reservation, and trade-enquiry
  forms all currently only `console.log` server-side (`src/lib/mail.ts`),
  they don't reach a real inbox. The code path is otherwise ready — the
  moment a real Resend API key (with a verified sending domain, e.g.
  reddelvino.com) is added as a Vercel env var, all four forms start
  delivering with zero code changes. This is the same class of blocker as
  Stripe: an external credential I cannot obtain or invent on Andrea/
  Rodrigo's behalf.
- **Blue Express business account access** ✉️ — for automated domestic
  shipping (~10 USD/box per Rodrigo; cheaper than Starken). International DHL
  exists but has never been used (box value < shipping cost).
- **Free-shipping threshold** ✉️ — currently 6+ bottles to Santiago (live
  policy). Hardcoded as `FREE_SHIPPING_BOTTLES = 6` in
  `src/components/cart/CartProvider.tsx`.
- **CMS/hosting decision** — Rodrigo raised Shopify as preferable; no
  migration has happened. This Next.js app is the current build target.

## Catalogue / pricing
- **Live-store prices are the source of truth** (verified against the
  WooCommerce store 2026-07-12; all 24 match). The consultancy "recommended
  RRP" matrix is HIGHER (e.g. Campesino Chardonnay 6.000 vs 5.000 live) and
  includes ~9 wines not in the store (Cea Enlace, Don Dago White/Rosé LH,
  Parcela 33 ISIS/Gestin/Carménère, La Pascuala Chardonnay, Valle Herradura
  Merlot/Cab/PV Reserva). Do NOT apply without Rodrigo's sign-off. ✉️ (prices)
- **Campesino Cabernet Sauvignon Reserva** ✉️ — not in the current store;
  flagged `pending: true` in `content/site/wines.json`, excluded from /wines.
- **Stock** ✉️ — 300/bottle per Rodrigo; Loco Gera and Parcela 33 Ensamblaje
  out of stock (verified on store).
- **Campesino Chardonnay + Chardonnay Gran Reserva stock** — Rodrigo (Jul 10):
  "los otros 3 quedan muy poco en la tienda". Andrea's decision (Jul 14): ask
  Rodrigo the exact remaining units and set that as the real stock number
  (no low-stock badge or delisting meanwhile). ADD TO NEXT EMAIL.
- **Guairabo/Valle Herradura wines** — producer closed (Rodrigo, Jul 9 + Jul
  10: "cerró su producción de vino" / "La Viña dejó de funcionar"). REVERSED
  2026-07-15: all 5 Guairabo SKUs now marked `stock: 0` / Sold out sitewide
  (catalog, product pages, filters, quiz, bundles) per explicit instruction —
  supersedes the Jul 14 "keep selling, mirror the store" decision. Still
  matches Rodrigo's own words; the live WooCommerce store not reflecting this
  is Red del Vino's issue to fix on their end, not a reason to keep selling
  a wine from a closed producer here.
- **Castro family pages** — Andrea's decision (Jul 14): keep the 4 individual
  brother pages (matches reddelvino.com's own site; bios are distinct). Still
  open per the new Arado/La Pascuala conflict below — consolidation question
  unresolved either way.
- **Campesino Cabernet Sauvignon Reserva** — Andrea's decision (Jul 14): keep
  hidden + pending (out of all merchandising; data preserved until Rodrigo
  confirms discontinuation).
- **Bundle discount** — set to 10% 2026-07-14 per Andrea's instruction;
  `content/site/bundles.json` — the cart now correctly charges the
  discounted per-bottle price when a pack is added (fixed 2026-07-15; it
  previously added bottles at full price despite the pack page advertising a
  discount). Rodrigo has not yet ratified the 10% figure. Some CRO-suggested
  bundle wines don't exist in the store; substitutions noted per-bundle in
  `internalNote`. Guairabo wines were never in any bundle (re-verified
  2026-07-15).
- **"Producción Limitada" badge** — condition unconfirmed; not implemented.
- **Best-sellers ranking** — no real sales data; not implemented (no fake
  popularity sort).

## Media
- **Bottle photos** ✉️ — only the 4 Campesino wines have real images; the 21
  catalogue additions use the fallback image.
- **Producer portraits** ✉️ — several producers have `portrait: null`.
  Filename mapping received: DSC_0425=Dagoberto Muñoz, DSC_0539=José Becerra,
  DSC_1986=Jaime Cea, DSF7624/7642=Campesino bottles, DSF8335/8342=Fiesta de
  la Vendimia.

## Producer facts
- **Viña Don Lalo vs "Viña Un Buen Caballero"** ✉️ — live site's own page
  says "VIÑA DON LALO" (kept); Rodrigo's email twice says "Viña Un Buen
  Caballero". Wine brand is "Un Buen Caballero" either way.
- **NEW (2026-07-15) — Arado vs La Pascuala**: three of the four Castro
  brothers' bios (Segundo, Juan, Benito — not José) state verbatim they
  "produce Cabernet Sauvignon grapes and sell their wine under the label
  'Arado'", but their `winery` field says "Viña La Pascuala" and the catalog
  sells 4 wines under the "La Pascuala" brand (producerSlug →
  benito-castro-gaete). Same family/vineyard under two different brand
  names, never reconciled — this is a real, pre-existing content conflict
  found on this pass, not invented. NOT resolved — left exactly as-is in the
  data pending a direct answer from Rodrigo: same vineyard (which name is
  current), or genuinely two things merged by mistake.
- **El Huape wine name** ✉️ — store sells "Loco Gera"; consultancy brand doc
  says the brand is "Quelte" (from the Queltehue bird).
- **Valle Herradura producer name** ✉️ — "Enrique Orellana" vs "Luis
  Orellana" conflict is real on Red del Vino's own site; unresolved.
- **Don Dago succession** ✉️ — Bárbara Moreno (granddaughter, President of
  the Comité de Equidad de Género) is taking over from Dagoberto Muñoz (85).
  Feature her on the producer page? (pending Rodrigo's preference)
- **Producer quotes** ✉️ — only Jaime Cea's is confirmed ("Es todo una
  vida."). The other 7 were left as "Incluye una cita aquí" in the
  consultancy doc; UI shows nothing (no placeholder quotes).

## Contact / channels
- **WhatsApp** ✉️ — sales number confirmed +56 9 9818 6442 ("solo dejar este
  número"); site-wide WhatsApp button/link not yet added (awaiting go-ahead).
  WhatsApp Business API vs personal wa.me links also undecided.
- **Form recipient addresses** — reservations default to
  reservas@reddelvino.com, contact/newsletter to info@reddelvino.com (env
  overridable: RESERVATIONS_TO_EMAIL / CONTACT_TO_EMAIL). Confirm.
- **Returns/damaged-bottle policy wording** — not published; needs exact text.
- **Public delivery-time promises** — internal numbers exist (Blu Express
  domestic) but not confirmed as a customer-facing commitment.

## Analytics / tooling
- **GA4 property** ✉️ — reuse the existing reddelvino.com property or create
  a new one? Event wiring (view_item, add_to_cart, quiz_complete, etc.)
  pending the property ID.
- **Booking-calendar platform** for tours — reservation form works today;
  real-time availability calendar is Phase 2.
- **Brand pack reconciliation** — Canva brand pack link received; current
  Tailwind tokens predate it. Reconcile colors/fonts before public launch.

## Languages
- **pt / fr / zh** — planned phase after ES/EN content is final (all UI
  strings centralised in `src/lib/i18n.ts`, ready to extend).
