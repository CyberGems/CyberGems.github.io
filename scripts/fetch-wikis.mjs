/**
 * Fetches every app's GitHub wiki (they are plain git repos: <App>.wiki.git)
 * into ./wikis/<slug> so the Astro build can turn them into /docs pages.
 * Also copies each wiki into ./public/wikis/<slug> so images referenced by
 * the markdown are served as static assets.
 *
 * Runs automatically before every build ("prebuild" hook), locally and in CI.
 * Local sibling wiki repositories are preferred; CI falls back to GitHub.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siblingProjectsDir = path.resolve(root, '..');
const wikisDir = path.join(root, 'wikis');
const publicWikisDir = path.join(root, 'public', 'wikis');
fs.mkdirSync(wikisDir, { recursive: true });
fs.mkdirSync(publicWikisDir, { recursive: true });

// Read the app slugs from the CMS-editable JSON files (one per app).
const appsDir = path.join(root, 'src', 'data', 'apps');
const appEntries = fs
  .readdirSync(appsDir)
  .filter((f) => f.endsWith('.json'))
  .map((filename) => {
    const file = path.join(appsDir, filename);
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const slug = filename.replace(/\.json$/, '');
    const repoName = data.repo ? new URL(data.repo).pathname.split('/').filter(Boolean).pop() : null;
    return { slug, repoName: repoName || slug };
  });

const stats = { local: 0, cloned: 0, unavailable: 0 };

function hasMarkdown(dir) {
  return fs.existsSync(dir)
    && fs.statSync(dir).isDirectory()
    && fs.readdirSync(dir).some((filename) => filename.toLowerCase().endsWith('.md'));
}

function copyWiki(source, dest, target) {
  fs.rmSync(dest, { recursive: true, force: true });
  fs.rmSync(target, { recursive: true, force: true });
  fs.cpSync(source, dest, { recursive: true });
  fs.cpSync(source, target, { recursive: true });
  // Git metadata is useful in the local source repo, but must never be published.
  fs.rmSync(path.join(target, '.git'), { recursive: true, force: true });
}

for (const { slug, repoName } of appEntries) {
  const dest = path.join(wikisDir, slug);
  const target = path.join(publicWikisDir, slug);
  const localWiki = path.join(siblingProjectsDir, `${repoName}.wiki`);
  const wikiUrl = `https://github.com/CyberGems/${slug}.wiki.git`;

  // During local development, use the independently cloned wiki repository
  // beside the app repository (for example ../CyberViewer.wiki). This keeps
  // the website aligned with the wiki folders the developer is maintaining.
  if (hasMarkdown(localWiki)) {
    copyWiki(localWiki, dest, target);
    stats.local += 1;
    console.log(`  ✓ wiki ${slug} (local, ${fs.readdirSync(dest).filter((f) => f.toLowerCase().endsWith('.md')).length} pages)`);
    continue;
  }

  try {
    // CI fallback: always fresh shallow clone so the static build gets the
    // latest wiki without requiring the sibling repositories to be checked out.
    fs.rmSync(dest, { recursive: true, force: true });
    fs.rmSync(target, { recursive: true, force: true });
    execFileSync('git', ['clone', '--quiet', '--depth', '1', wikiUrl, dest], { stdio: 'pipe' });

    // Serve non-markdown files (images, attachments) as static assets.
    fs.cpSync(dest, target, { recursive: true });
    fs.rmSync(path.join(target, '.git'), { recursive: true, force: true });

    stats.cloned += 1;
    console.log(`  ✓ wiki ${slug} (GitHub, ${fs.readdirSync(dest).filter((f) => f.toLowerCase().endsWith('.md')).length} pages)`);
  } catch {
    fs.rmSync(dest, { recursive: true, force: true });
    fs.rmSync(target, { recursive: true, force: true });
    stats.unavailable += 1;
    console.warn(`  ⚠ wiki ${slug} unavailable; no local ${repoName}.wiki copy or GitHub clone succeeded`);
  }
}

console.log(`Wiki sync: ${stats.local} local, ${stats.cloned} GitHub, ${stats.unavailable} unavailable`);

// A production deploy must not replace valid documentation with an empty
// /docs section because GitHub was temporarily unavailable. Local development
// remains permissive so the rest of the site can still be previewed offline.
if (process.env.CI === 'true' && stats.unavailable > 0) {
  console.error(`Wiki sync failed in CI: ${stats.unavailable} wiki(s) unavailable.`);
  process.exitCode = 1;
}
