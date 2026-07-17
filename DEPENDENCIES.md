# DEPENDENCIES — Requires confirmation from Red del Vino

Everything here is flagged, not silently resolved. Items marked ✉️ were asked
in the July 2026 email thread with Rodrigo ("Respuestas a requerimientos
iniciales y accesos"); the rest are queued for the next email.

## Commerce blockers
- **Stripe account + API keys** ✉️ — checkout runs in clearly-labelled
  simulated mode until keys exist. Business/banking details were received by
  email for Stripe onboarding — they must be entered directly in Stripe's own
  onboarding flow and MUST NOT be committed to this repo in any form.
- **Email delivery (Resend) — approved 2026-07-16, still not wired up.**
  Rodrigo's Jul 16 reply conditionally approved this ("¿tiene costo o es
  gratis? Si es gratis, autorizada ✅"). Checked resend.com/pricing directly:
  the free tier is $0, 3,000 emails/month, 100/day, 1 verified domain — well
  within this site's volume, so his condition is met and this is approved.
  Still needed to actually turn it on: (1) someone creates a Resend account,
  (2) adds `reddelvino.com` as a sending domain and completes DNS
  verification (SPF/DKIM records — needs access to the domain's DNS
  settings, which I don't have), (3) the resulting API key gets added as a
  Vercel env var. Until then, contact/newsletter/reservation/trade forms
  keep working in `simulated: true` / console-log mode with zero data loss.
- **Blue Express business account access** ✉️ — for automated domestic
  shipping (~10 USD/box per Rodrigo; cheaper than Starken). International DHL
  exists but has never been used (box value < shipping cost).
- **Free-shipping threshold** ✉️ — currently 6+ bottles to Santiago (live
  policy). Hardcoded as `FREE_SHIPPING_BOTTLES = 6` in
  `src/components/cart/CartProvider.tsx`.
- **CMS/hosting decision** — Rodrigo raised Shopify as preferable; no
  migration has happened. This Next.js app is the current build target.

## Catalogue / pricing
- **RESOLVED 2026-07-15 — pricing source overturned.** Rodrigo confirmed
  (Jul 15 reply) prices must follow the Plumpton "off-trade RRP" price list
  he already sent as an attachment on Jul 10 — NOT the live WooCommerce
  store prices as previously assumed here. Shaun independently confirmed the
  same (Jul 14) and gave one concrete figure: **Campesino Carménère = CLP
  9,000** (was 7,000 live/here — fixed in `content/site/wines.json`
  2026-07-15). **Do NOT re-ask Rodrigo "are the current prices final" —
  that question is answered (no) and asking it again already caused a
  duplicate/confusing reply on Jul 15.**
  Shaun followed up 2026-07-16 with the actual file: an attachment titled
  "Red Del Vino Pricing Matrix.xlsx", pointing to the tab "Recommended
  Prices", column G = "Off-Trade RRP" (highlighted yellow) — this has every
  wine's real price, not just Carménère. **Blocked: I have no tool to open
  Gmail attachments** (confirmed — searched for an attachment/download tool
  and none exists in this environment). I cannot read the spreadsheet's
  cell values. Someone needs to either open the attachment and paste column
  G's values here, or forward them as plain text — not another image/xlsx,
  since I can't parse either.
- **RESOLVED 2026-07-15 — wines not in the store.** Rodrigo confirmed (Jul
  15): Cea "Enlace", Don Dago Cosecha Tardía Blanco, Parcela 33 "ISIS"/
  "Gestin"/Carménère, La Pascuala Chardonnay, and the 3 Guairabo/Valle
  Herradura Reserva wines have no photos or tasting notes yet. He prefers to
  launch with what's already complete and add these later. Keep them
  excluded from `/wines` — no further action, no need to ask again.
- **RESOLVED 2026-07-15 — Campesino Cabernet Sauvignon Reserva.** Rodrigo
  confirmed: discontinued, no stock. Stays hidden + `pending: true`
  permanently (not "pending confirmation" anymore).
- **Stock** ✉️ — 300/bottle per Rodrigo; Loco Gera and Parcela 33 Ensamblaje
  out of stock (verified on store). RE-CONFIRMED 2026-07-15 ("Correcto").
- **Campesino Chardonnay + Chardonnay Gran Reserva stock** — Rodrigo (Jul 10):
  "los otros 3 quedan muy poco en la tienda". Andrea's decision (Jul 14): ask
  Rodrigo the exact remaining units and set that as the real stock number
  (no low-stock badge or delisting meanwhile). STILL OPEN — Rodrigo's Jul 15
  reply didn't give a number, only re-confirmed which SKUs are affected.
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
- **RESOLVED 2026-07-15 — bottle photos.** Rodrigo sent `Sin Fondo.zip` via
  WeTransfer (32 real bottle photos, white/transparent background) right
  after his Jul 15 reply. Matched by reading each label and cross-checking
  against `content/site/wines.json`; real photos now applied for 15 wines
  that previously used the fallback image: `don-dago-merlot`,
  `cea-mito-carmenere`, `cea-relato-cabernet-sauvignon`,
  `don-clemente-merlot`, `don-clemente-carmenere`, `don-clemente-rose`,
  `don-clemente-chardonnay-late-harvest`,
  `un-buen-caballero-cabernet-sauvignon`, `guairabo-carignan`,
  `guairabo-petit-verdot`, `guairabo-rose-late-harvest`,
  `guairabo-semillon-late-harvest`, `la-pascuala-carmenere`,
  `parcela-33-ensamblaje`, `parcela-33-cabernet-sauvignon-reserva`.
- **RESOLVED 2026-07-16 — remaining 6 bottle photos, via WooCommerce admin.**
  Andrea logged into the WordPress/WooCommerce admin herself (credentials
  Rodrigo sent 2026-07-03) and confirmed his "todas las fotografías... están
  en la tienda virtual" meant his admin dashboard, not the public site (the
  public `post-sitemap.xml` only lists the 4 Campesino products — the other
  27 products live in WooCommerce but were never published as public pages).
  Found and applied real photos for 5 of the 6: `la-pascuala-tinaja`,
  `la-pascuala-cabernet-sauvignon`, `don-clemente-cabernet-sauvignon`,
  `guairabo-cabernet-sauvignon`, `el-huape-loco-gera` (last two are sold-out
  SKUs but now show the correct bottle instead of the fallback image).
  **`la-pascuala-malbec` still has no real photo** — found a genuine data
  bug in Rodrigo's own WooCommerce: the Malbec product's featured image is
  literally the same file (`Cabernet-Sauvignon-1.jpg`) assigned to La
  Pascuala Cabernet Sauvignon, so it's not a real Malbec photo — left on the
  fallback rather than showing a mislabeled bottle. Worth flagging to
  Rodrigo as a backend fix on his end, not something to guess a picture for.
- **NEW (2026-07-15) — bonus photos for wines not yet in the catalogue.**
  The same zip also had real photos for wines Rodrigo said (same email) to
  hold off on adding — Cea "Enlace" Merlot, La Pascuala Chardonnay, Parcela
  33 "ISIS" Chardonnay, Parcela 33 "Gestin". Saved in the WeTransfer archive,
  not yet copied into the repo — ready to add the moment Rodrigo says go.
- **NEW (2026-07-15) — brand-name conflicts spotted on the bottle labels
  themselves**, not invented: (1) the Guairabo Petit Verdot bottle shows TWO
  different labels in the photos — one branded "Guairabo" (matches the
  catalog) and one branded "Papá Viejo" with a portrait illustration, same
  varietal/vintage/reserva tier. (2) The Guairabo late-harvest wines
  (Semillón and Rosé) also appear under a third label, "La Cantora", in
  addition to the "Guairabo" label already used. Unclear if these are
  same-wine relabels across vintages, sub-brands, or a mixup — needs
  Rodrigo's read, not a guess.
- **NEW (2026-07-15) — previously-unknown SKUs found on bottle labels**: a
  Don Dago Cabernet Sauvignon 2023 and a "Viña Don Dago — Libremente Dulce"
  late-harvest Rosé and white (2023), none of which exist in
  `content/site/wines.json` today (only `don-dago-merlot` is catalogued for
  this producer). Also a Guairabo Merlot Reserva 2021 and a La Pascuala
  Petit Verdot, neither in the current 5-SKU Guairabo / 4-SKU La Pascuala
  lists. Flagging only — not adding without Rodrigo confirming these are
  current, sellable products.
- **RESOLVED 2026-07-15 — producer portraits.** Rodrigo sent
  `Desarrollo de Imagen Cultural.zip` via WeTransfer (649 raw photos, one
  folder per producer). Filled in the 9 producers whose folder had an
  unambiguous individual: `osvaldo-diaz-poblete`, `rosa-sanchez-bravo`,
  `gilberto-lopez-arias`, `juan-amador-perez`, `jaime-cea-morales`,
  `luis-orellana-aliaga`, `dagoberto-munoz-diaz`, `adrian-lorca-sandoval`,
  `abelardo-becerra-meneses`.
  **NOT filled in, on purpose:** the 4 Castro brothers (`segundo-`,
  `juan-`, `jose-`, `benito-castro-gaete`) all share the exact same set of
  group photos (verified by file checksum — byte-for-byte identical across
  all 4 folders), so there is no way to tell which face in the photos is
  which brother. Rather than guess an identity, all 4 are left as
  `portrait: null` — needs Rodrigo to label which name goes with which face,
  or send individual photos.
  **Also found, not applied:** two extra folders, "viña manuel caceres" and
  "viña manuel galvez", don't match any producer name as spelled in
  `producers.json` — by elimination they're almost certainly extra/better
  photos of `jose-luis-caceres` and `adan-galvez-leon` (both already have an
  old, low-res portrait from the original WordPress site), suggesting their
  full names may include "Manuel" the way Luis Orellana's included
  "Enrique". Not swapped in without confirming the name match first.

## Producer facts
- **RESOLVED 2026-07-15 — Viña Don Lalo vs "Viña Un Buen Caballero".**
  Rodrigo confirmed: the vineyard name is "Viña Don Lalo" (matches what the
  site already had). Wine brand is "Un Buen Caballero". No change needed.
- **NEW (2026-07-15) — Arado vs La Pascuala**: three of the four Castro
  brothers' bios (Segundo, Juan, Benito — not José) state verbatim they
  "produce Cabernet Sauvignon grapes and sell their wine under the label
  'Arado'", but their `winery` field says "Viña La Pascuala" and the catalog
  sells 4 wines under the "La Pascuala" brand (producerSlug →
  benito-castro-gaete). Same family/vineyard under two different brand
  names, never reconciled — this is a real, pre-existing content conflict
  found on this pass, not invented. NOT resolved — left exactly as-is in the
  data pending a direct answer from Rodrigo: same vineyard (which name is
  current), or genuinely two things merged by mistake. STILL OPEN — not
  covered by Rodrigo's Jul 15 reply.
- **RESOLVED 2026-07-15 — El Huape wine name.** Rodrigo confirmed: the
  vineyard sells "Loco Gera" today; "Quelte" was the name of other, no-
  longer-produced wines from the same (now-inactive) vineyard. Keep "Loco
  Gera" — no rename needed.
- **RESOLVED 2026-07-15 — Valle Herradura producer name.** Rodrigo gave the
  full legal name: "Luis Enrique Orellana Aliaga". Updated
  `content/site/producers.json` (`luis-orellana-aliaga`.name) from "LUIS
  ORELLANA ALIAGA" to "LUIS ENRIQUE ORELLANA ALIAGA" to match — resolves the
  Enrique/Luis conflict, both were the same person's first/middle names.
- **RESOLVED 2026-07-15 — Don Dago succession.** Rodrigo confirmed: yes,
  feature Bárbara Moreno as the next generation alongside Dagoberto Muñoz —
  already implemented in `producers.json`'s `dagoberto-munoz-diaz` bio
  (mentions Bárbara and her mother Magaly, and Bárbara's role as President
  of the Comité de Equidad de Género). No further action needed.
- **RESOLVED 2026-07-15 — producer quotes.** Rodrigo sent real quotes for 7
  more producers (Jaime Cea's "Es todo una vida" was already confirmed
  earlier): Don Clemente (Osvaldo Díaz) "La Calidad es lo más importante" ·
  Parcela 33 (Gilberto López) "100 años de historia" · Don Lalo (Abelardo
  Becerra) "Ser buena gente" · Valle Herradura (Luis Enrique Orellana)
  "Toda una vida de esfuerzo" · El Huape "Hay que escuchar a los viejos" ·
  Don Dago (Dagoberto Muñoz) "Somos pocos los que vamos quedando" · La
  Pascuala (Castro family) "La Familia es lo más importante". He also gave
  the official Red del Vino tagline established by the Universidad de
  Plumpton: "Juntos somos más fuertes" (currently the homepage `QuoteBand`
  shows a different, unattributed mission-statement quote — worth asking
  whether to swap it for this one, but that's a design call, not applying
  it without asking). NOT YET IMPLEMENTED — there is no `quote` field on
  producers in `content/site/producers.json` and no UI slot renders one on
  `ProducerDetailView`; adding one is a small new feature, not a data fix,
  so left for a dedicated pass rather than bundled in here. Still missing:
  a quote from Gilberto López was never actually requested from Rodrigo
  (mixed up with Parcela 33 above — Parcela 33's producer IS Gilberto
  López, so this is actually complete, not missing).

## Contact / channels
- **WhatsApp** ✉️ — sales number confirmed +56 9 9818 6442 twice now (Jul 9
  "solo dejar este número" and re-confirmed Jul 15 "Sí"); site-wide WhatsApp
  button/link not yet added — this specific go-ahead (add a visible button?)
  is a genuinely new, not-yet-answered question, distinct from the number
  itself. WhatsApp Business API vs personal wa.me links also undecided.
- **Form recipient addresses** — reservations default to
  reservas@reddelvino.com, contact/newsletter to info@reddelvino.com (env
  overridable: RESERVATIONS_TO_EMAIL / CONTACT_TO_EMAIL). Confirm.
- **Returns/damaged-bottle policy wording** — not published; needs exact text.
- **Public delivery-time promises** — internal numbers exist (Blu Express
  domestic) but not confirmed as a customer-facing commitment.

## Analytics / tooling
- **GA4 property** — Rodrigo delegated the choice 2026-07-16 ("como sea
  mejor para usted y para el proyecto"). No further question needed; when
  implemented, default to reusing the existing reddelvino.com property
  (one dashboard for Rodrigo, less to manage) unless Andrea prefers a fresh
  one for the redesign. Event wiring (view_item, add_to_cart, quiz_complete,
  etc.) still pending the actual property ID, which I don't have.
- **Booking-calendar platform** for tours — reservation form works today;
  real-time availability calendar is Phase 2.
- **Brand pack reconciliation** — Canva brand pack link received; current
  Tailwind tokens predate it. Reconcile colors/fonts before public launch.
- **BLOCKED 2026-07-16 — logo missing.** Rodrigo noticed the site doesn't
  show "el Logo propuesto por la Universidad de Plumpton (la mujer con el
  canasto)". The only source I have is a Canva brand-pack link from his
  Jul 3 email, and Canva requires login to view it — confirmed by trying
  in-browser, got a login wall, same class of blocker as the WordPress
  admin (except here there's no credential to use at all, Canva access
  wasn't shared). Need Rodrigo to export the logo as a PNG/SVG and send it
  directly, not another link.

## Languages
- **DONE 2026-07-16 — Portuguese and Mandarin implemented.** Andrea asked to
  build both now rather than wait. `/pt` and `/zh` are live: full UI string
  dictionary (`src/lib/i18n.ts`), all 24 wines' notes/descriptions, all 19
  producers' bios, all 5 bundle descriptions, and the tourism page copy are
  translated (facts preserved, not invented — verified against the English/
  Spanish source). Header now has a 4-language dropdown (EN/ES/PT/中文).
  Verified live in the browser: homepage, a wine detail page, a producer
  detail page, and the packs page all render correctly in both languages,
  prices and bundle discounts calculate correctly. `npm run build` passes
  clean for all 4 locales.
- fr — no request for this from either Rodrigo or Shaun; not planned unless
  asked.

## CRO / UX feedback received 2026-07-16 (Rodrigo, in Negrita in his reply)
- Liked: overall visual direction, the brand/ocasión/cepa filters, the pack
  bundling strategy, the new /trade page.
- Requested and **already implemented 2026-07-16**: an "Add to Cart" button
  directly on each Find Your Wine quiz result card (previously only linked
  to the product page) — see `src/components/quiz/WineQuiz.tsx`. Verified
  live in the browser: adds the right wine/price, opens the cart drawer,
  updates the free-shipping bar.
- Messaging suggestion, not yet applied (a copy/positioning decision, not a
  bug): shift the site's core message from "selling wine" to "connecting
  people with the origin and the story behind each bottle." Worth a
  deliberate homepage-copy pass, not a quick edit.
- **Open question from Rodrigo, needs Andrea's call, not mine**: he asked
  whether to send the current site link to Plumpton College now for their
  technical/qualitative input, or wait until this phase is fully finished.
