/**
 * Wiki links use GitHub heading anchors (for example `Viewing#playing-videos`).
 * The docs renderer now injects the same ids into headings, so this guard
 * verifies after every build that every internal #link still resolves —
 * including Spanish pages, whose heading slugs differ from the English ones.
 */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const htmlFiles = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(target);
    else if (entry.name.endsWith('.html')) htmlFiles.push(target);
  }
}
walk(dist);

const idCache = new Map();
function idsFor(file) {
  if (idCache.has(file)) return idCache.get(file);
  if (!fs.existsSync(file)) { idCache.set(file, null); return null; }
  const html = fs.readFileSync(file, 'utf8');
  const set = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => decode(m[1])));
  idCache.set(file, set);
  return set;
}

function decode(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function resolve(href, from) {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return null; // external or mailto
  const hash = href.indexOf('#');
  if (hash < 0) return null;
  let fragment = href.slice(hash + 1);
  try { fragment = decodeURIComponent(fragment); } catch { /* keep raw */ }
  fragment = decode(fragment);
  if (!fragment) return null;
  const pathPart = href.slice(0, hash);
  if (!pathPart) return { file: from, fragment }; // same-page anchor
  if (pathPart === '/') return { file: path.join(dist, 'index.html'), fragment };
  const clean = pathPart.replace(/^\//, '').replace(/\/$/, '');
  for (const candidate of [path.join(dist, clean, 'index.html'), path.join(dist, `${clean}.html`)]) {
    if (fs.existsSync(candidate)) return { file: candidate, fragment };
  }
  return { file: null, fragment };
}

const docPages = htmlFiles.filter((file) => {
  const relative = path.relative(dist, file).split(path.sep);
  return relative[0] === 'docs' || (relative[0] === 'es' && relative[1] === 'docs');
});

let checked = 0;
const broken = [];
for (const page of docPages) {
  const html = fs.readFileSync(page, 'utf8');
  for (const match of html.matchAll(/href="([^"]*#[^"]*)"/g)) {
    const target = resolve(decode(match[1]), page);
    if (!target) continue;
    checked += 1;
    const ids = idsFor(target.file ?? '');
    if (!ids || !ids.has(target.fragment)) {
      broken.push(`${path.relative(dist, page)} -> ${match[1]} (destination: ${target.file ?? 'missing'})`);
    }
  }
}

assert.equal(broken.length, 0, `Broken doc anchors:\n${broken.slice(0, 12).join('\n')}`);
console.log(`Doc anchors verified: ${docPages.length} pages, ${checked} internal #links, 0 broken.`);
