<div align="center">

# 💎 CyberGems Website

**cybergems.org — Official website for the CyberGems suite.**

*High-quality, open-source Windows apps — Free, No Ads, No Tracking.*

[![Website](https://img.shields.io/badge/Website-cybergems.org-0a66c2?style=for-the-badge&logo=google-chrome&logoColor=white)](https://cybergems.org)
[![Astro](https://img.shields.io/badge/Astro-5.12-BC52EE?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue?style=for-the-badge&logo=gnu&logoColor=white)](https://www.gnu.org/licenses/gpl-3.0)

![Bilingual](https://img.shields.io/badge/Bilingual-EN%20%2F%20ES-00b894?style=flat-square)
![Platform](https://img.shields.io/badge/Platform-Web-0078D6?style=flat-square&logo=google-chrome&logoColor=white)
![No Tracking](https://img.shields.io/badge/Privacy-No%20Tracking-success?style=flat-square)
![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-181717?style=flat-square&logo=github&logoColor=white)

</div>

---

### ✨ About

> **CyberGems** crafts free and open-source Windows applications that respect your privacy. No ads, no telemetry, no cloud lock-in — just fast, native, beautiful tools. All projects are **GPLv3** licensed.

This repository powers **[cybergems.org](https://cybergems.org)** — the official landing for the suite. It showcases all 10 apps, per-app detail pages, a cross-repo changelog and auto-synced documentation, fully bilingual (English / Spanish on the site).

🌐 **Live site:** [cybergems.org](https://cybergems.org) &nbsp;|&nbsp; 👨‍💻 **Org:** [github.com/CyberGems](https://github.com/CyberGems) &nbsp;|&nbsp; 📦 **Profile repo:** [CyberGems/CyberGems](https://github.com/CyberGems/CyberGems)

---

### 🖥️ What the site does

| Area | Route | Description |
|---|---|---|
| **Landing** | `/` (EN) · `/es/` (ES) | Hero, suite grid (10 apps from `src/data/apps/`), highlights and CTAs |
| **App pages** | `/apps/[slug]` · `/es/apps/[slug]` | Tagline, description, feature list, screenshot or gradient placeholder, download / releases / source / wiki links |
| **Changelog** | `/changelog` · `/es/changelog` | Latest releases aggregated from GitHub Releases across the suite |
| **Docs** | `/docs` · `/docs/[app]` · `/es/docs/...` | Guides rendered from each repo's GitHub wiki, synced at build time |

All pages are static, SEO-friendly and served from a custom domain.

---

### 🛠️ Tech Stack

<div align="center">

![Astro](https://img.shields.io/badge/Astro-5.12-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Marked](https://img.shields.io/badge/Marked-Markdown-black?style=for-the-badge)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-181717?style=for-the-badge&logo=github&logoColor=white)

</div>

* **Framework:** [Astro 5](https://astro.build) with file-based routing
* **Styling:** [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
* **Language:** TypeScript (`astro.config.mjs`, `src/data/*`, `src/components/*`)
* **Markdown:** [`marked`](https://github.com/markedjs/marked) for wiki rendering
* **Hosting:** GitHub Pages (custom domain `cybergems.org`), also compatible with Cloudflare Pages

---

### 📁 Project Structure

```
.
├── public/
│   ├── favicon.svg
│   ├── screenshots/<slug>/   # optional per-app screenshots (served as-is)
│   └── wikis/<slug>/         # wiki assets copied at build time
├── wikis/<slug>/             # cloned wiki repos (gitignored, generated)
├── scripts/fetch-wikis.mjs   # clones every <App>.wiki.git before dev/build
├── src/
│   ├── components/Landing.astro
│   ├── data/
│   │   ├── apps/             # one JSON per app — editable in the CMS (/admin)
│   │   ├── apps.ts           # types + loader for the JSON files
│   │   └── ui.ts             # shared UI strings (EN/ES)
│   ├── admin/                # public/admin — Decap CMS panel
│   └── pages/
│       ├── index.astro       # → /
│       ├── es/index.astro    # → /es/
│       ├── apps/[slug].astro # → /apps/* + /es/apps/*
│       ├── changelog.astro   # → /changelog + /es/changelog
│       └── docs/             # → /docs + /docs/[app]
├── astro.config.mjs          # site: https://cybergems.org
└── .github/workflows/deploy.yml
```

---

### 🧩 Content Model

* **`src/data/apps/`** — one JSON file per app (`slug`, `name`, `emoji`, `accent`, `stack`, `license`, bilingual `tagline`/`description`/`features`, `repo`, `wiki`, optional `winget`, `screenshot`). Screenshots are optional: set `screenshot` to a file inside `/public/screenshots/<slug>/` (or an absolute `/screenshots/...` path, as written by the CMS) or leave it `null` to render the gradient placeholder.
* **`src/data/ui.ts`** — shared UI strings for nav, hero, sections and footer (`en` / `es`).
* **`src/pages/`** — `/` (English) and `/es/` (Spanish), plus `/apps/[slug]` per-app pages in both languages, plus `changelog` and `docs`.
* **`public/screenshots/`** — static screenshots; absent files fall back to the accent-gradient placeholder.
* **`wikis/` + `public/wikis/`** — generated; do not edit by hand (see below).

To update an app: edit its JSON in `src/data/apps/` or use the visual CMS at `/admin` — the landing, app pages, changelog and docs pick it up automatically.

---

### 🎛️ Visual editing (Sveltia CMS)

A content manager is available at **`/admin`** (`https://cybergems.org/admin`):

* Edits the `src/data/apps/*.json` files and uploads screenshots to `public/screenshots/`
* Also editable: `❓ FAQs` (`src/data/faqs.json`), `⚙️ Settings` (donation links + crypto in `src/data/site.json`), `🌐 UI Strings` (nav, hero, footer texts in `src/data/ui.json`) and `📄 Pages` (About, Privacy, Download copy in `src/data/pages.json`)
* Every save is a commit to `main` → the deploy workflow rebuilds the site automatically
* Login: **Sign In with Token** — paste a fine-grained PAT ([create one here](https://github.com/settings/tokens?type=beta)) with access to this repo and `Contents: Read and write`. No OAuth App, no auth server. Only accounts with write access to the repo can log in.
* Local dev: Sveltia CMS has a built-in local workflow — no proxy server needed

---

### ⚡ Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Start local dev server at `localhost:4321`    |
| `npm run build`   | Build the production site to `./dist/`        |
| `npm run preview` | Preview the production build locally          |

> `predev` and `prebuild` run `node scripts/fetch-wikis.mjs` automatically — no manual step needed.

---

### 📚 Documentation Sync

Wikis live as separate git repos (`https://github.com/CyberGems/<slug>.wiki.git`). On every `dev` and `build`:

1. `scripts/fetch-wikis.mjs` reads slugs from `src/data/apps/*.json`
2. Shallow-clones each wiki into `wikis/<slug>/` (skips silently if wiki is disabled)
3. Copies non-markdown assets into `public/wikis/<slug>/` so images referenced in markdown are served as static files
4. Astro renders the markdown via `marked` into `/docs` routes

To refresh wikis locally without a full build: `node scripts/fetch-wikis.mjs`.

---

### 🚀 Deploy

* **Output:** static site in `dist/` (`astro build`)
* **CI:** `.github/workflows/deploy.yml` — `withastro/action@v3` on push to `main`, plus a daily cron `30 4 * * *` to refresh releases and wikis without a manual push, plus `workflow_dispatch`
* **Hosting:** GitHub Pages with custom domain `cybergems.org` (also ready for Cloudflare Pages). No server, no runtime — just static assets.

---

### 🤝 Contributing & Support

All CyberGems apps are **GPLv3** — free forever. Contributions, bug reports and stars are welcome!

* ⭐ Star this repo or any app you like — it helps a lot
* 🐛 Open an issue if you find a bug
* 🔀 PRs are welcome — keep changes focused and bilingual strings in sync (`src/data/apps/` + `src/data/ui.ts`)

<div align="center">

**[🌐 cybergems.org](https://cybergems.org) • [📦 All Repositories](https://github.com/CyberGems?tab=repositories) • [💎 Profile Repo](https://github.com/CyberGems/CyberGems)**

*Free • No Ads • No Tracking • Open Source*

</div>
