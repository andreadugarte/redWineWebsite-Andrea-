# Red del Vino

A modern, editorial, Duckhorn-inspired website for **Red del Vino** — fair-trade wines from the small producers of the Colchagua Valley, Chile. Built with Next.js (App Router), TypeScript, Tailwind and Framer Motion. All content and photography are extracted from the live reddelvino.com site — nothing is invented.

> **Note on pricing & checkout:** wine prices are **placeholder/indicative** values (there are no prices on the current site). Checkout is a **simulated** flow by default — no payment is processed — and is wired so real Stripe payments can be enabled by adding keys. See [Payments](#payments-optional).

---

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

Requires Node 18.17+ and Python 3 (only for re-running the content extraction scripts).

---

## Project structure

```
content/
  raw/            # raw WP REST API dumps (source of truth)
  site/           # cleaned, structured JSON the site renders from
    pages.json    # editorial pages (about, sustainability, contact, …)
    wines.json    # the 4 Campesino wines (+ placeholder prices)
    producers.json# the 19 producer families
    tourism.json  # tastings / tours / bike / kayak
  image-map.json  # original image URL → local path + alt/dimensions
public/images/original/   # all 98 downloaded images (optimized at build by next/image)
scripts/          # extract.py, download_images.py, transform.py
src/
  app/            # routes (App Router) + api routes + sitemap/robots
  components/     # UI, motion primitives, forms, cart, seo
  lib/            # content loaders, site config, formatting, images, mail
```

## Editing content

The site is **data-driven** — edit the JSON in `content/site/`, no component changes needed:

- **Wines / prices** → `content/site/wines.json` (`price`, `vintage`, `abv`, `notes`, …)
- **Producers** → `content/site/producers.json`
- **Page copy** → `content/site/pages.json` (blocks: `heading` / `text` / `eyebrow` / `image`)
- **Curated hero images** → `src/lib/images.ts`
- **Nav, footer, address, emails, socials** → `src/lib/site.ts`

To re-pull everything from the live WordPress site again:

```bash
npm run extract   # runs the 3 python scripts → refreshes content/ + images
```

---

## Environment variables

**Everything is optional.** With no variables set, the site runs fully: checkout is simulated and forms return a success stub (submissions are logged server-side). Copy `.env.example` → `.env.local` for local dev, and add the same in Vercel.

| Variable | Required? | Purpose |
|---|---|---|
| `STRIPE_SECRET_KEY` | optional | Enables live payments. Unset → **simulated** checkout. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | optional | Stripe.js publishable key (client). |
| `RESEND_API_KEY` | optional | Sends reservation/contact/newsletter emails via Resend. Unset → logged stub. |
| `CONTACT_TO_EMAIL` | optional | Where contact + newsletter go (default `info@reddelvino.com`). |
| `RESERVATIONS_TO_EMAIL` | optional | Where reservation/event requests go (default `reservas@reddelvino.com`). |
| `NEXT_PUBLIC_SITE_URL` | recommended | Canonical URL for SEO/sitemap (`https://reddelvino.com`). |

### Payments (optional)

The purchase flow (cart → checkout → order confirmation) works today as a **simulation**. To go live with Stripe:

1. Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
2. In `src/app/api/checkout/route.ts`, replace the simulated response with a Stripe Checkout Session creation and return `session.url`; redirect to it from `src/app/checkout/page.tsx`. The redirect keeps all card handling on Stripe (no PCI scope here).

### Email (optional)

Forms POST to `/api/reservation`, `/api/contact`, `/api/newsletter`. With `RESEND_API_KEY` set they email the addresses above; otherwise the submission is logged and the user still sees a success state.

---

## Deploy to Vercel

1. Push this repo to GitHub (see below).
2. Go to **vercel.com → Add New → Project → Import** the GitHub repo.
3. **Framework preset:** Next.js (auto-detected). Build command `next build`, output auto.
4. **Environment Variables:** add any from the table above (all optional — you can deploy with none).
5. **Deploy.** Then verify:
   - `https://<deploy>/` — homepage + scroll experience
   - `https://<deploy>/wines` and a wine detail — Add to cart → checkout → simulated confirmation
   - `https://<deploy>/sitemap.xml` and `/robots.txt`

---

## Accessibility & performance

- Semantic HTML, keyboard-navigable, alt text on imagery, WCAG-AA-minded contrast.
- All motion honors `prefers-reduced-motion`.
- `next/image` (AVIF/WebP, responsive), `next/font` (self-hosted, no layout shift).
- Per-page metadata, Open Graph, JSON-LD (Organization + Product), sitemap, robots, EN/ES hreflang scaffolding.

## Internationalization

The current build ships **English**, with the language switcher and `hreflang` alternates scaffolded for **Spanish (`/es`)**. The Spanish content exists on the live site and can be extracted into `content/site/*.es.json` in a follow-up pass.
