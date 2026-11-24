# KAMARI Goa: independent concept website

Written for: developers and the project owner. This is an independent creative proposal. It is not an official KAMARI website, and it is not approved by KAMARI. Keep the deployment private until KAMARI authorizes publication.

Brand line: **Sunsets. Sounds. Sensations.** Tagline: **Sea You at the KAMARI!**

## Stack

- React 19, Vite 8, TypeScript (strict), React Router 7
- GSAP for the horizon text reveal (with `gsap.context` cleanup)
- Self-hosted fonts from `@fontsource` (Cormorant Garamond, Manrope; both OFL)
- Lenis for smooth scrolling (`src/lib/smoothScroll.ts`). It pauses while the full-screen menu is open and is disabled for `prefers-reduced-motion`.
- No Three.js and no other animation or UI libraries. The brief did not need them, and the small footprint keeps performance high.

## Run

```bash
npm install
npm run dev         # local dev server
npm run build       # tsc -b + vite build
npm run preview     # serve the production build on :4173
npx oxlint src      # lint
```

## Content and configuration

All editable content lives in `src/content/`:

| File | What it controls |
|---|---|
| `site.ts` | Business facts: phones, Instagram, Maps link, address (with `verified` flag), opening hours (`null` until supplied), reservation destination, WhatsApp (`null`), concept disclosure, `noindex` |
| `events.ts` | Event model and status logic. Classifies upcoming and past in `Asia/Kolkata`. Only `publication: "published"` entries render. The list is empty because no events are verified. |
| `menu.ts` | Menu model (name, description, category, verified price and dietary info, availability). Empty until KAMARI supplies the menu. |
| `media.generated.ts` | **Generated.** Do not edit. Produced by `scripts/gen-media-manifest.py` from `public/media/`. |

### Reservation destination

`site.reservations.mode` is `"demo"` by default. In demo mode the form validates input, sends nothing, and says so. To wire a real destination, set `mode: "endpoint"` and `endpoint` to an authorized URL. The endpoint must do its own server-side validation, rate limiting, spam protection and privacy handling. The frontend does not store enquiries.

### Events

Add an entry to `events` with `publication: "published"`, a confirmed date and start time, and only confirmed performers. Set `booking` only when a verified booking page exists. Past events automatically show a closed status, and booking is hidden for them.

## Media pipeline

Originals stay in the parent folder and are never modified. To regenerate web assets:

```bash
# 1. Derive WebP images, silent MP4 loops and posters from the originals
./scripts/process-media.sh "/path/to/originals"

# 2. Build the curated manifest and prune unpublished derivatives
python3 scripts/gen-media-manifest.py
```

`process-media.sh` removes audio from every video, strips metadata, and writes 1080 px and 640 px WebP images. Curation is explicit in `scripts/gen-media-manifest.py`. Add a clip only after checking every part of it, not just the first frame, for identifiable people, overlays and other businesses. See `ASSET-INVENTORY.md`.

## Deploy to Vercel

1. Push this `site/` folder to a private repository. Use a private repo; do not publish the concept until authorized.
2. In Vercel, create a project from that repository. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
3. `vercel.json` already sets SPA rewrites, `X-Robots-Tag: noindex, nofollow`, long-lived caching for `/media/*`, and a restrictive Permissions-Policy.
4. Keep Vercel deployment protection on (password or team-only access) until KAMARI signs off. `noindex` alone is not privacy protection.
5. To go public later: remove the `noindex` meta, `X-Robots-Tag` header and `public/robots.txt` `Disallow`, add a canonical domain, and add a sitemap. Only do this after written authorization and after clearing every item in `ASSET-INVENTORY.md`.

## Accessibility and motion

- Skip link, visible focus ring, semantic landmarks, one `h1` per page.
- Full-screen menu: a visible Close button (first in tab order), Escape, and the links all close it. Tab is trapped, body scroll and Lenis are paused, and focus returns to the toggle.
- Gallery lightbox is a native `<dialog>`, which gives focus trapping and Escape handling. Focus returns to the trigger on close.
- Videos are muted, have no audio, pause off-screen (IntersectionObserver), and show the poster only for `prefers-reduced-motion`.
- Reduced motion disables the GSAP reveal and shortens CSS transitions.
- Mobile bottom bar respects `env(safe-area-inset-bottom)`.

## Known limitations

- **No official logo.** The original KAMARI logo was not in the project folder, so the header uses a typographic wordmark. Replace it with the approved logo file once supplied.
- **Hero clip is short, soft on large screens, and not a full showreel.** The only clean footage was a 9.5 s terrace clip, and the source is 720 px wide, so it is upscaled on desktop and looks soft. Replace it with a 1080p or higher clip. No showreel was built, because doing so would need music rights.
- **Sunset footage is missing.** Every sunset clip reviewed had overlays or identifiable people, so the "Follow the sun" band uses a still image.
- **Images repeat.** With 14 published stills and 2 clips, some images appear on more than one page. Replace them as more clean footage is cleared.
- **Video size.** The published clips total about 5 MB. The media directory is about 9 MB in total.

## Leftover template files

The Vite template's `src/App.css`, `src/index.css`, `src/assets/` and `public/icons.svg` are unused and can be deleted. They were left in place because the deletion command was blocked during the build. Delete them by hand.

## Verification status

Run in this repository:

- `tsc -b`: passes with strict settings.
- `npm run build`: passes. Entry bundle 358 kB (117 kB gzip), CSS 42 kB (16 kB gzip). Each route is a separate chunk.
- `oxlint src`: no warnings.
- Browser check (Chromium via Playwright, preview server): all routes return 200. No console errors or warnings. No horizontal overflow at 390 px or 1440 px. Reservation validation and demo path verified. Menu open, scroll lock, Escape and focus return verified.

Not yet run: Lighthouse audits (Performance, Accessibility, Best Practices, SEO), Firefox and WebKit, throttled-network testing, tablet (768 and 1024 px) and 320/430 px screenshots, and reduced-motion emulation. The performance targets in the brief are therefore unverified.
