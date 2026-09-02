# CyberGems Website

Official website for the [CyberGems](https://github.com/CyberGems) suite — free, open-source Windows apps. No ads, no tracking.

Built with [Astro](https://astro.build) + [Tailwind CSS v4](https://tailwindcss.com). Fully bilingual (English / Spanish).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Start local dev server at `localhost:4321`    |
| `npm run build`   | Build the production site to `./dist/`        |
| `npm run preview` | Preview the production build locally          |

## Content model

- **`src/data/apps.ts`** — one entry per app (name, emoji, accent color, bilingual tagline/description/features, links). Screenshots are optional: set `screenshot` to a file inside `/public/screenshots/<slug>/` or leave it `null` to render the gradient placeholder.
- **`src/data/ui.ts`** — shared UI strings (English / Spanish).
- **`src/pages/`** — `/` (English) and `/es/` (Spanish), plus `/apps/[slug]` per-app pages in both languages.

## Deploy

Static output in `dist/`, ready for GitHub Pages / Cloudflare Pages with the custom domain `cybergems.org`.
