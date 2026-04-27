# We Are Niche

The corporate umbrella website for the **Niche real estate ecosystem** — connecting Niche Solutions, Niche Data, Niche CRM, Get Niche Now, Niche Space, Niche Acquisitions, JV With Niche, and Niche Home Help under one place.

- **Production domain:** [we-are-niche.com](https://we-are-niche.com)
- **Repository:** [github.com/AtlasHomesGroup/we-are-niche](https://github.com/AtlasHomesGroup/we-are-niche)
- **Hosting:** Vercel (auto-deploys from the default branch)

This site is **not** a replacement for any existing Niche brand website. Each brand site stays live and independent. We Are Niche is the umbrella hub that explains how the ecosystem connects and routes visitors to the correct dedicated website.

## Tech stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with theme tokens defined in `src/app/globals.css`
- **Fonts:** Geist Sans + Geist Mono via `next/font/google`
- **Search:** lightweight client-side search over a static page index (no third-party dependency)
- **Hosting target:** Vercel (zero config — `next build` is auto-detected)

## Local setup

```bash
git clone https://github.com/AtlasHomesGroup/we-are-niche.git
cd we-are-niche
npm install
npm run dev
```

The dev server runs on [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Turbopack dev server with HMR |
| `npm run build` | Production build (`next build`) |
| `npm run start` | Start the production server (after build) |
| `npm run lint` | Run ESLint |

## Vercel deployment notes

1. In Vercel, **Add New Project → Import Git Repository** and select `AtlasHomesGroup/we-are-niche`.
2. Vercel will auto-detect Next.js. No build overrides needed.
3. Set the production domain to `we-are-niche.com` under **Settings → Domains**.
4. No environment variables are required for the first version — the embedded Google Map uses the keyless public embed URL.

## Folder structure

```text
public/
  brand/                 # Local copies of Niche brand assets (see "Brand assets" below)
src/
  app/
    layout.tsx           # Root layout — Header, Footer, first-load animation
    page.tsx             # Homepage (Hero, EcosystemMap, CategoryCards, SummaryBlocks)
    not-found.tsx        # Custom 404
    sitemap.ts           # XML sitemap (/sitemap.xml)
    robots.ts            # robots.txt
    ecosystem/           # Niche Solutions, Niche Data, Niche CRM
    community/           # Get Niche Now, Niche Space
    acquisitions/        # Niche Acquisitions, JV With Niche, Niche Home Help
    company/             # About Us, Michael Franke, Contact
    privacy-policy/      # Legal placeholder
    terms-and-conditions/# Legal placeholder
    sitemap/             # Human-facing /sitemap page
    globals.css          # Tailwind + Niche theme tokens
  components/
    layout/              # Header, MenuPanel, SearchOverlay, Footer, FooterDivider, FirstLoadAnimation
    home/                # Hero, EcosystemMap, CategoryCards, SummaryBlocks
    pages/               # PageHero, Prose, VisitWebsiteButton, EcosystemFit, RelatedBrands, BrandPageLayout
    ui/                  # Container, Section, Button, Card
  lib/
    site-config.ts       # Site name, URL, contact info, social links, brand asset paths
    navigation.ts        # Menu structure (Ecosystem / Community / Acquisitions / Company)
    brands.ts            # The 8 brand entries — name, route, external URL, related brands
    pages.ts             # Page metadata used by SEO and search
    search-index.ts      # Static client-side search index
    seo.ts               # buildMetadata() helper for per-page metadata
docs/
  we_are_niche_claude_code_spec.md  # Original product/content spec
```

## Brand assets

The canonical Niche mark is the round orange N. It is the single source of truth for every brand-mark surface on the site.

Local paths used by the app:

- `public/brand/niche-app-logo.svg` — the round orange N. Used in the header context, footer, menu panel, footer divider, intro animation, 404, and as the source for the favicon (`src/app/icon.svg`) and Apple touch icon (`src/app/apple-icon.png`).
- `public/brand/niche-stacked-logo.png` — the N + NICHE wordmark stacked vertically, used as the constellation hub on the homepage.
- `public/brand/og-default.png` — the 1200×630 social preview, generated from the round N via `node scripts/generate-og.mjs`.

If you replace `niche-app-logo.svg`, regenerate the social preview (`node scripts/generate-og.mjs`) and the Apple touch icon. The `<link rel="icon">` is auto-emitted by Next.js from `src/app/icon.svg`.

## SEO and search

- Per-page `Metadata` is built via `buildMetadata()` in `src/lib/seo.ts` and consumed by each route's exported `metadata`.
- Default Open Graph image is configured to live at `public/brand/og-default.png`. Replace it with a finalized 1200×630 OG image before launch.
- An XML sitemap is auto-generated at `/sitemap.xml` from `src/app/sitemap.ts`.
- The human-facing sitemap page lives at `/sitemap` and lists internal pages plus external brand websites.
- Site search reads from `src/lib/search-index.ts` (a thin wrapper over `pages.ts`) — no external service required.

## Legal placeholder warning

`/privacy-policy` and `/terms-and-conditions` are **placeholder pages**. They are clearly marked as temporary. They must be replaced with finalized copy reviewed by legal counsel before relying on them.

## External brand websites

| Brand | Internal page | External site |
| --- | --- | --- |
| Niche Solutions | `/ecosystem/niche-solutions` | <https://www.nichesolutions.ai/> |
| Niche Data | `/ecosystem/niche-data` | <https://nichedata.ai/> |
| Niche CRM | `/ecosystem/niche-crm` | <https://www.nichecrm.ai/> |
| Get Niche Now | `/community/get-niche-now` | <https://www.getnichenow.com/> |
| Niche Space | `/community/niche-space` | <https://www.niche-space.com/> |
| Niche Acquisitions | `/acquisitions/niche-acquisitions` | <https://www.nicheacquisition.com/> |
| JV With Niche | `/acquisitions/jv-with-niche` | <https://jvwithniche.com/> |
| Niche Home Help | `/acquisitions/niche-home-help` | <https://www.nichehomehelp.com/> |
