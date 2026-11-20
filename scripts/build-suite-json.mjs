// Genera public/suite.json desde src/data/apps/*.json.
// Es la fuente canónica de la suite: cada app empaqueta una copia y la lee
// sin red (el tray la usa para el submenú "Más de CyberGems").
// Uso: node scripts/build-suite-json.mjs
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'data', 'apps');
const apps = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
  if (data.published !== true) continue;
  if (!data || typeof data.slug !== 'string' || typeof data.name !== 'string') continue;
  apps.push({
    slug: data.slug,
    name: data.name,
    tagline: data.tagline && typeof data.tagline === 'object' ? data.tagline : undefined,
    site: `https://cybergems.org/apps/${data.slug}/`,
    repo: typeof data.repo === 'string' ? data.repo : null,
    wiki: typeof data.wiki === 'string' ? data.wiki : null,
  });
}

apps.sort((a, b) => a.slug.localeCompare(b.slug));

const target = join(root, 'public', 'suite.json');
let updated = new Date().toISOString().slice(0, 10);

// Keep the stamp tied to the data, not to the last build: rebuilding with
// unchanged app metadata must not dirty the tracked manifest.
if (existsSync(target)) {
  try {
    const current = JSON.parse(readFileSync(target, 'utf8'));
    const sameApps = JSON.stringify(current.apps) === JSON.stringify(apps);
    if (sameApps && current.count === apps.length && typeof current.updated === 'string') {
      updated = current.updated;
    }
  } catch {
    // An unreadable or incomplete manifest is regenerated from scratch.
  }
}

const out = {
  updated,
  count: apps.length,
  apps,
};

const next = JSON.stringify(out, null, 2) + '\n';
const previous = existsSync(target) ? readFileSync(target, 'utf8') : null;
if (previous !== next) writeFileSync(target, next);
console.log(`suite.json: ${apps.length} apps -> public/suite.json`);
