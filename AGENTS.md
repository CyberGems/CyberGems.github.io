# CyberGems Website — agent habits

Static Astro site for cybergems.org. Content is bilingual (EN/ES) via
`src/data/*.json` (`{ en, es }` pairs). One JSON per app in `src/data/apps/`.

## Session start: CMS sync check (mandatory)

The Decap CMS (`/admin`) commits **directly to remote `main`**, so the local
clone may be behind without any local change. Before editing or pushing:

```powershell
git fetch origin
git status -sb            # look for [behind N]
git log --oneline 'HEAD..@{u}'   # the CMS commits, if any
```

- If the remote moved: tell the user what the CMS changed, then
  `git pull --ff-only` before doing any work.
- Never `--force-push`: it would silently overwrite CMS edits. A normal push
  is rejected on a moved remote — that rejection is the safety net, not an
  error to work around.
- Before every commit/push, inspect `git status`, `git diff --stat` and
  `git log --oneline -5`; stage only intended files.

## Build & verify

- `npm run build` (prebuild refetches all GitHub wikis into `wikis/`).
- `wikis/` is gitignored build input — never edit it directly. The sources of
  truth are the sibling `../<App>.wiki` checkouts (e.g. `../CyberPaste.wiki`).
- Verify output in `dist/` (e.g. `dist/apps/<slug>/index.html` and
  `dist/es/apps/<slug>/index.html`) after content changes.
