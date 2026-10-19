/** Check the complete deployed output, not just the app-page route list. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dataDir = path.join(root, 'src/data/apps');
const entries = fs.readdirSync(dataDir).filter((file) => file.endsWith('.json'))
  .map((file) => JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8')));
const published = entries.filter((app) => app.published === true);
const drafts = entries.filter((app) => app.published !== true);
const dist = path.join(root, 'dist');
const manifest = JSON.parse(fs.readFileSync(path.join(dist, 'suite.json'), 'utf8'));
assert.equal(manifest.count, published.length, 'suite.json must count only published apps');
assert.deepEqual(manifest.apps.map((app) => app.slug).sort(), published.map((app) => app.slug).sort());

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const patterns = drafts.map((app) => ({ slug: app.slug, pattern: new RegExp(`\\b${escape(app.slug)}\\b`, 'i') }));
const textExtensions = new Set(['.html', '.json', '.xml', '.js', '.css', '.svg', '.md', '.txt', '.map']);
let checked = 0;
function inspect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    const relative = path.relative(dist, target);
    for (const { slug, pattern } of patterns) assert(!pattern.test(relative), `Draft ${slug} has a public output path: ${relative}`);
    if (entry.isDirectory()) { inspect(target); continue; }
    if (!textExtensions.has(path.extname(entry.name))) continue;
    const content = fs.readFileSync(target, 'utf8');
    for (const { slug, pattern } of patterns) assert(!pattern.test(content), `Draft ${slug} appears in ${relative}`);
    checked++;
  }
}
inspect(dist);
for (const app of published) {
  for (const locale of ['', 'es']) assert(fs.existsSync(path.join(dist, locale, 'apps', app.slug, 'index.html')), `Missing published page: ${locale}/${app.slug}`);
}
console.log(`Publication verified: ${published.length} public apps, ${drafts.length} drafts excluded, ${checked} text assets checked.`);
