// Genera public/suite.json desde src/data/apps/*.json.
// Es la fuente canónica de la suite: cada app empaqueta una copia y la lee
// sin red (el tray la usa para el submenú "Más de CyberGems").
// Uso: node scripts/build-suite-json.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'data', 'apps');
const apps = [];

for (const file of readdirSync(dir).filter((f) => f.endsWith('.json'))) {
  const data = JSON.parse(readFileSync(join(dir, file), 'utf8'));
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

const out = {
  updated: new Date().toISOString().slice(0, 10),
  count: apps.length,
  apps,
};

writeFileSync(join(root, 'public', 'suite.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`suite.json: ${apps.length} apps -> public/suite.json`);
