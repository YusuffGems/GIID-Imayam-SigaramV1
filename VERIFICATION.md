# Verification notes — August 2026 fix pass

What was checked, how, and what could not be checked. Kept in the repo so the
next person does not have to re-derive it.

## Verified locally (dev server on 127.0.0.1, production build)

- `npx tsc --noEmit` — clean (was 5 errors: four missing interfaces in
  `src/types/index.ts`, one implicit `any` in `makers.tsx`).
- `npm run build` — succeeds. All 24 product photographs, the logo and the
  4 MP4s are emitted, fingerprinted, into `.output/public/assets/`.
- Routes `/`, `/products`, `/products/diary-cover`, `/products/laptop-sleeve`,
  `/sitemap.xml` all return HTTP 200.
- Every asset returns 200 on localhost, including the two awkward filenames:
  `Men's_Wallet_1750.jpg` (apostrophe) and `Diary Cover.mp4` (spaces).
- `/products` renders all 27 products, including Diary Cover, Keychain cum Card
  Holder, Feature Keychain and all five Card Holder types.
- `sitemap.xml` — 42 URLs, 54 `<image:image>` entries, `lastmod` on every URL,
  no localhost and no query-string URLs.
- JSON-LD — Organization, WebSite, Product and BreadcrumbList all parse as
  valid JSON. Exactly one BreadcrumbList per page (no duplicates).
- WhatsApp message — carries product name, SL number, product ID, price with
  the rupee symbol, quantity, colour and customisation. URL-encoded output
  round-trips identically through `decodeURIComponent`; no raw space, newline,
  `#` or `&` survives into the query string. Tested with an em dash, an
  ampersand, quotes, `%`, `+` and a deliberately long product name.
- Contact validation — 8/8 checks pass: optional email blank submits, optional
  email omitted submits, invalid email rejected with friendly text, a 4,800
  character message is accepted and stored in full (not truncated), an
  over-limit message gets a friendly message, and the enquiry schema now
  requires `priceLabel`.

## NOT verified — needs a real browser or real credentials

- **Lighthouse** (performance / accessibility / best practices / SEO scores):
  no Chrome in the build environment. Not run, and no scores are reported.
- **Live Google Apps Script submission and the Google Sheets test row**:
  `GOOGLE_APPS_SCRIPT_URL` is not configured in this project and the build
  environment cannot reach `script.google.com`. The client and server code
  paths are verified; the round trip to the Sheet is not.
- **Production deployment and post-deploy smoke test**: publishing runs through
  the connected Lovable branch and needs credentials that are not present here.
- **Responsive breakpoints (320–1920px) and DevTools console/network**: both
  need a real browser.

## Known content issues — deliberately NOT changed

These are data/asset decisions for the owner, not code defects:

1. `Weaving_Bag_5200.jpg` shows a woven **bamboo/cane basket**, but the product
   is described as hand-woven leather at ₹5,200.
2. `Guitar_Keychain_450.jpg` shows **anchor-shaped** keychains, not guitars.
3. `Moulded_Bag_3600.jpg` — filename says 3600, the catalogue price is ₹4,600.
4. `Belt_1850.jpg` carries another company's branding ("flyer" logo plate).
5. `Men's_Wallet_1750.jpg` appears to carry a Levi's stamp.
   (4 and 5 are a trademark/misrepresentation risk on own-brand handmade goods.)
6. Low-resolution photographs that will look soft in the gallery, which renders
   near 600px: Moulded Bag 223x300, Cross Body 388x388, Sling 447x447,
   Men's Wallet 387x516, Weaving Bag 365x547, Belt 731x476.
7. Card Holder Types 03, 04 and 05 all reuse the Type 02 photograph.
8. AirPods Case, Guitar Keychain and Leaf Keychain use marketing posters with
   baked-in text rather than plain product shots; the text is unreadable at
   thumbnail size and is invisible to screen readers.

## Pre-existing lint debt — deliberately NOT touched

`npx eslint .` reports 22 Prettier formatting errors and 6 `react-refresh`
warnings, all in files this pass did not modify (mostly `src/components/ui/*`,
plus `data/categories.ts`, `data/events.ts`, `data/makers.ts`). They were
present before. `npm run format` fixes them, but it rewrites the whole repo and
would produce a very large diff on the Lovable-connected branch — worth doing
as its own separate commit.

## Vercel deployment — SOLVED (19 Aug)

Symptom: the live Vercel site returned HTTP 500 and showed the app's own
"This page didn't load" page, while localhost worked fine.

Vercel's log did not show the cause. Invoking the built server function
directly did:

    TypeError: createCsrfMiddleware is not a function
    at _ssr/server-<hash>.mjs

The Vercel SSR output split TanStack's server code across two chunks that
imported each other circularly — the importing chunk evaluated first, so the
export was still undefined when called at module top level. Nothing in this
application's own code was part of that cycle.

Two attempts that did NOT work (recorded so they are not retried):

1. Removing the custom server entry (`tanstackStart.server.entry`) — same error.
2. Aligning TanStack versions (react-start 1.168.47 + react-router 1.170.30) —
   the build then failed outright with MISSING_EXPORT errors for
   `_getRenderedMatches` and `bindSsrResponseToRequest` from router-core.
   Reverted; package.json is on the original versions.

THE FIX — force the SSR build into a single chunk, in vite.config.ts:

    environments: { ssr: { build: { rollupOptions: {
      output: { manualChunks: () => "server" },
    } } } }

One chunk means no cycle. `_ssr/` now contains a single ssr.mjs.

## De-Lovabled (19 Aug)

The project no longer depends on Lovable in any way:

- `@lovable.dev/vite-tanstack-config` removed from package.json and
  node_modules. vite.config.ts now wires the plugins directly:
  tsConfigPaths, tailwindcss, tanstackStart, nitro, viteReact.
- `src/lib/lovable-error-reporting.ts` (which forwarded errors to Lovable's
  editor telemetry) replaced by `src/lib/error-reporting.ts`, which only logs
  to the console. Hook up Sentry there if you want remote reporting.
- The site-wide Open Graph image was hot-linked from Lovable's R2 CDN. It is
  now self-hosted at `public/og-image.jpg` (1200x630, generated from
  hero-workbench.jpg) and served from your own domain.
- `.lovable/` deleted; AGENTS.md and bunfig.toml stripped of Lovable
  instructions and package allow-lists.

The code no longer needs Lovable. It still syncs to Lovable only if you keep
pushing to the branch Lovable is connected to.

Verified after de-Lovabling — built Vercel function, all HTTP 200:

    /                      renders
    /products              renders
    /products/diary-cover  renders
    /contact               renders
    /sitemap.xml           42 urls

`npx tsc --noEmit` clean.
