/**
 * Fetches every app's GitHub wiki (they are plain git repos: <App>.wiki.git)
 * into ./wikis/<slug> so the Astro build can turn them into /docs pages.
 * Also copies each wiki into ./public/wikis/<slug> so images referenced by
 * the markdown are served as static assets.
 *
 * Runs automatically before every build ("prebuild" hook), locally and in CI.
 * Wikis that don't exist or are disabled are skipped silently.
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const wikisDir = path.join(root, 'wikis');
const publicWikisDir = path.join(root, 'public', 'wikis');
fs.mkdirSync(wikisDir, { recursive: true });

// Read the app slugs straight from the data source of truth.
const appsTs = fs.readFileSync(path.join(root, 'src', 'data', 'apps.ts'), 'utf-8');
const slugs = [...appsTs.matchAll(/slug:\s*'([a-z0-9-]+)'/g)].map((m) => m[1]);

for (const slug of slugs) {
  const dest = path.join(wikisDir, slug);
  const wikiUrl = `https://github.com/CyberGems/${slug}.wiki.git`;
  try {
    // Always fresh shallow clone: wiki repos are tiny and this avoids
    // shallow-pull divergent-branch issues.
    fs.rmSync(dest, { recursive: true, force: true });
    execSync(`git clone --quiet --depth 1 ${wikiUrl} "${dest}"`, { stdio: 'pipe' });

    // Serve non-markdown files (images, attachments) as static assets.
    const target = path.join(publicWikisDir, slug);
    fs.rmSync(target, { recursive: true, force: true });
    fs.cpSync(dest, target, { recursive: true });

    console.log(`  ✓ wiki ${slug} (${fs.readdirSync(dest).filter((f) => f.endsWith('.md')).length} pages)`);
  } catch {
    fs.rmSync(dest, { recursive: true, force: true });
    console.log(`  - wiki ${slug} unavailable, skipping`);
  }
}
