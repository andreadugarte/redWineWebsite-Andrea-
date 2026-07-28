# DEPENDENCIES — Requires confirmation from Red del Vino

Everything here is flagged, not silently resolved. Items marked ✉️ were asked
in the July 2026 email thread with Rodrigo ("Respuestas a requerimientos
iniciales y accesos"); the rest are queued for the next email.

## 2026-07-28 Plumpton brand pack implementation — result

Source: the two Plumpton consultancy PDFs Rodrigo/Andrea shared (Part 1 —
Organisational Strategy, Part 2 — Shop Rebrand & Channel Strategy), plus
Rodrigo's confirmed 23 Jul decisions. Nothing below was invented — colors were
pixel-sampled from the actual brand-pack page, font names read directly off
the spec page, bios transcribed verbatim (typos silently corrected) from
Part 2's producer-stand appendix.

**Colors** — full palette adopted (`tailwind.config.ts`, `globals.css`,
`Seam.tsx`): dark green `#0f6343` is now the primary accent (was burgundy
`#5a1420`), red-coral `#e84848` reserved for future selective emphasis
(not applied to headings sitewide — that would be a much bigger visual
change than "switch the accent," not requested), yellow `#fec425` for
eyebrow/highlight text, cream `#feefd1` for backgrounds, grey-sage
`#d1d5ce` and pink-blush `#ecc7c2` as secondary contrast tones. Tailwind
token *names* (`oxblood`, `gold`, `bone`, `vine`) were kept as-is so ~35
files didn't need touching — they're now aliases for the new palette, not
literal wine-color names. Worth a follow-up rename for clarity, not urgent.

**Fonts** — brand pack specifies Bookmania (titles), Knockout Welterweight
with mandatory 209 tracking (subheadings), Coco Gothic (body). All three are
commercial fonts; no licensed files were available. Substituted the closest
free equivalents via `next/font/google`: **Fraunces** for `font-serif`
(replacing Cormorant Garamond), **Oswald** for a new `font-condensed`
(used on `.eyebrow` and `.btn`, approximating the wide-tracked condensed
look), kept **Inter** for body (already fits "clean, friendly" brief).
If Rodrigo can get the real font files from Plumpton, swapping them in is a
`layout.tsx` + `tailwind.config.ts` change only — nothing else references
font names directly.

**Tourism** — cut down to tours only: removed Wine Tastings, Kayak Rentals,
and Bike Rentals from `content/site/tourism.json`; unlinked Event Center
from the footer's "Visit" group (`src/lib/site.ts`) and from
`link.eventCenter`/`nav.events` (the `/event-center` page itself was left
in place, not deleted, in case Rodrigo wants to repurpose it — it's just no
longer discoverable from nav). Price CLP 10,000 → 20,000/person; Saturdays
only (was every day). Updated hero copy, homepage teaser, and metadata
descriptions across all 4 locales to drop "tastings, bikes, kayaks, event
center for weddings" language.

**Producer bios** — replaced with Plumpton's winery-level bios (Part 2,
"Producer Stands Bios") for the 8 wineries that have one: Cea, Don Clemente,
Parcela 33, Don Lalo (→ now under "Un Buen Caballero"), Valle Herradura,
El Huape, Don Dago, La Pascuala (applied to all 4 shared family records —
Segundo/Juan/José/Benito Castro Gaete — since Plumpton's bio is one
winery-level text, not per-person; their pages are now near-identical
except name/varietals/portrait — a known side effect of the current
19-individual-producer architecture vs. Plumpton's 8-winery model). Growers
with no Plumpton bio (José Luis Cáceres, José Raimundo López, Carlos Lorca
Sandoval, Rosa Sánchez Bravo, Juan Amador Pérez, Ángel Cáceres, Adrián Lorca
Sandoval, Adán Gálvez León) were left untouched — Plumpton simply didn't
cover them in this appendix, so their existing bios stand.

**Quotes** — deliberately NOT added, including Jaime Cea's confirmed "Es
todo una vida" quote, per Rodrigo's explicit ask for a template/example
first. The UI has no quote-display feature built at all right now.

**Name fixes**:
- Parcela 33 — Gilberto López Arias (founding partner) has passed away;
  record renamed to **Roberto López** (his son), with a short succession
  note prepended to the bio. Slug (`gilberto-lopez-arias`) was **not**
  renamed, to avoid touching every `wineSlugs`/`producerSlug` reference —
  only `name` changed. Portrait was set to `null` (falls back to the
  generic image) rather than keep displaying Gilberto's actual photo under
  Roberto's name — **a real photo of Roberto is needed from Rodrigo.**
- Abelardo Becerra Meneses's `winery` field renamed **Don Lalo → Un Buen
  Caballero** (matches the wine brand name, already correct); the Plumpton
  "Don Lalo" bio text is used under the new name, per Rodrigo's instruction.

**Feria pack** — `vinos-de-la-feria` bundle converted from
`permanence: "campaign"` to `"permanent"`; removed "this selection rotates
with every feria" copy (all 4 locales) and the `packs.feriaRotates` UI key
+ its render block in `BundleDetailView.tsx`. `wineSlugs` is now a fixed
list, not something meant to change per feria event.

**B2B/Trade form** — verified, no code change needed: `TradeForm.tsx` →
`/api/contact` → `sendMail()` → single email to `info@reddelvino.com`
(or `CONTACT_TO_EMAIL` if set). No auto-reply, no automated pricing email
exists anywhere in the code.

**i18n leak found and fixed (new, not from a prior pass):** the tourism
page's editorial body ("Red del Vino invites you to experience...", "Need
more information", etc.) was English-only on `/es`, `/pt`, `/zh` — the
`pages.json`/`tourism.json` content models had no locale variants at all,
unlike `wines.json`/`producers.json`. Added `blocks_es/pt/zh` support to
the `Page` type + `getPage()`, and `name_es/pt/zh` + `body_es/pt/zh` to the
`Tour` type + a new `localizeTour()`, and populated real translations for
the tourism page and the one remaining tour. **Only this one page was
migrated** — the other 9 `pages.json` entries (home, sustainability,
social-responsibility, about-us, privacy-policy, reservation-policy, etc.
— the ones actually rendered) still have the same English-only gap and
would need the same `_es/_pt/_zh` treatment whenever that's prioritized.

Verified end-to-end in a real dev server (colors/fonts across
homepage/wines/producers, tourism page in EN+ES, both renamed producer
pages, the Feria bundle detail page with live-recalculated pricing) and a
clean `next build` + `tsc --noEmit` with zero errors across all 4 locales.

## 2026-07-19 "Fix everything clearly wrong" audit — result

Verified live in a real browser (not just build success), item by item:

**Real bugs found and fixed:**
- Home stat counters ("0/0/0") — real bug: display was continuously tied to
  scroll position (`src/components/animations/StatCounter.tsx`), so it got
  stuck at whatever fraction was showing when the user stopped scrolling,
  including 0 if the page never scrolled that far. Rewrote as a one-shot
  count-up animation triggered once the element becomes visible, decoupled
  from further scroll events. Also fixed the 3rd stat, which was animating
  a nonsensical `n=1` counter for "Valley · Colchagua" — now shows the
  literal text "Colchagua".
- Phantom 4th bottle in the home hero — real, and it's a photo asset issue,
  not a data issue: `Vinos-Campesino-Slider-2.jpg` is a real photo of 4
  actual Campesino bottles including the discontinued Cabernet Sauvignon
  Reserva. Cropped a new version (`Vinos-Campesino-Slider-2-active-line.jpg`)
  showing only the 3 active wines; swapped into both the hero and the
  Open Graph share image (same source file, same bug).
- "VIEW →" hardcoded in English on the Campesino wine cards regardless of
  locale (`FeaturedWines.tsx`) — now uses the `common.view` translation key.
- Checkout (`/checkout`) and the standalone `/cart` page were formatting
  prices as USD ($) instead of CLP — same `formatPrice()`-missing-currency
  bug fixed earlier in the cart drawer, but present in 4 more call sites.
  Fixed all 4.
- "Varietal" → "Variety" (EN only), "Wine Packs"/"Packs" → "Bundles" (EN
  only, nav/titles/labels — ES untouched), filter order changed to
  Brand+Variety before Occasion, Style last.
- Home hero heading, and the hero heading on every EditorialPage-based page
  (Sustainability, Social Responsibility, About/Story, Privacy Policy,
  Reservation Policy) were ALL CAPS in `content/site/pages.json` — the
  Spanish versions were separately hardcoded in sentence case and never
  had this bug. Converted all `hero_heading` values to sentence case.
- Tourism "Need more information" pointed to the old physical Tourism
  Office street address — replaced with the real, already-used contact
  email (`info@reddelvino.com`) and a nudge to the shop, in
  `content/site/pages.json`.

**Checked and did NOT reproduce (left as-is, not "fixed" for a bug that
isn't there):**
- Add to Cart — confirmed via cart localStorage + header badge + drawer
  DOM content that adding a wine from the quiz results correctly populates
  the cart (screenshots looked blank in this specific browser-automation
  tool due to a Framer Motion animation quirk in headless testing — see
  below — but the actual cart state was verified correct via JS).
- Quiz recommending sold-out wines — tested Red → Bold → Over CLP 14,000;
  all 3 results had working "Add to Cart", none were sold-out SKUs.
- Guairabo (5 SKUs) + El Huape Loco Gera sold-out badges — still correct,
  no regression found.
- ES home mission quote wrapping "one word per line" — measured actual
  rendered positions of each word span; they wrap normally, multiple words
  per line. Does not reproduce in the current build.
- Sustainability hero image not loading — loads correctly; an initial
  `naturalWidth: 0` reading was a test-timing artifact, not a real 404/
  broken file (confirmed the JPEG is valid and Next's image endpoint
  returns it with HTTP 200).
- Tourism hero image showing a "non-Red-del-Vino wine" — the image
  (`Red-del-Vino-Tour-Wine-Glass.jpg`) actually shows real Red del Vino
  bottles (Cea "Mito" Carménère label is legible), not a competitor wine.
- ES producer/wine card links dropping into the English site — spot-
  checked all 17 producer card links on `/es/producers`: 100% correctly
  prefixed `/es/...`.

**Known environment limitation (not a site bug):** this session's browser-
automation tool never fires `IntersectionObserver` callbacks and
`window.scrollTo()` never dispatches a real `scroll` event — both are used
by Framer Motion's `whileInView` and by scroll-triggered reveals sitewide.
Real user scrolling (mouse wheel / trackpad / touch) does dispatch real
scroll events and was confirmed working (e.g. the header's scroll-linked
solid/logo state). This made a few sections un-screenshotable in this tool
(they render at `opacity: 0.15` — Framer's initial state — until a real
scroll event fires) even though the underlying code is correct. Flagging
so this isn't mistaken for a future regression.

**Not independently re-audited this pass** (already covered by earlier
fixes in this repo's history, no new report against them): Portuguese/
Mandarin locales, real bottle/producer photos, off-trade RRP pricing table,
the new Plumpton logo.

**Blocked, not code-related:** `git push` is failing with "Invalid username
or token" from the stored GitHub credential (osxkeychain) — all of the
above is committed locally on `content/gmail-and-catalog-corrections` but
not yet pushed/deployed. Needs Andrea to re-authenticate git (e.g.
`gh auth login` or refresh the stored personal access token) before the
live Vercel URL will reflect any of this.

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
  **RESOLVED 2026-07-17** — Andrea shared "Red Del Vino Pricing Matrix.xlsx"
  directly (from her Downloads folder) rather than as a Gmail attachment,
  which I was able to open with a Python script. Read the "Recommended
  Prices" tab, column G = "Off-Trade RRP" in full and applied it to every
  wine currently in the catalogue (17 price changes — see git history on
  `content/site/wines.json` 2026-07-17 for the full old→new list). Confirmed
  Campesino Carménère still comes out to 9,000, matching Shaun's earlier
  figure exactly — good cross-check that the sheet and the read were both
  correct. Bundle prices need no manual update — they're computed live from
  each wine's `price` (`bundlePrice()` in `src/lib/content.ts`), so the 10%
  discount recalculates automatically off the new base prices.
  Guairabo/Valle Herradura and El Huape wines have NO row in the pricing
  sheet at all (consistent with both producers being closed) — their prices
  were left untouched.
  The sheet also prices 9 wines not yet in the catalogue (Cea Enlace CLP
  10,000; Don Dago White LH 6,500; Don Dago Rose LH 6,500; Don Dago Cabernet
  Sauvignon 12,750; La Pascuala Chardonnay 15,000; Parcela 33 ISIS 6,500;
  Parcela 33 Gestin 6,500; Parcela 33 Carménère 12,750) — noted here for
  when Rodrigo says to add them, not applied since those SKUs don't exist
  in `wines.json` yet.
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
- **RESOLVED 2026-07-17 — new logo implemented.** Andrea shared the actual
  Plumpton-designed logo file (`Red del Vino logo design.png`, from her
  Desktop) — the emblem of a woman carrying a grape basket, with the
  "JUNTOS SOMOS MÁS FUERTES" tagline. Replaces the old plain-text wordmark.
  Applied to: the header (shown once the header has a solid background —
  scrolled, or any non-transparent page — since the logo file has an opaque
  white background; kept the original text wordmark for the transparent
  state over hero images, since a white-boxed logo there would look broken)
  and the browser favicon (`src/app/icon.png`, cropped to just the circular
  emblem since the full logo's tagline text is illegible at favicon size).
  Not touched: the footer (dark oxblood background — same white-box problem
  as the transparent header state) and the Open Graph share image (still
  the bottle photo) — a version of the logo with a transparent background
  would resolve both if Rodrigo/Plumpton can provide one.

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
