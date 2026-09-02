import fs from 'node:fs';
import path from 'node:path';

export interface DocPage {
  appDir: string;
  /** URL slug ("" for Home.md) */
  slug: string;
  file: string;
}

export const WIKIS_DIR = path.resolve('wikis');

/** Lists every markdown page of every fetched wiki. Used by the /docs routes. */
export function listDocs(): DocPage[] {
  const out: DocPage[] = [];
  if (!fs.existsSync(WIKIS_DIR)) return out;
  for (const entry of fs.readdirSync(WIKIS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    for (const f of fs.readdirSync(path.join(WIKIS_DIR, entry.name))) {
      if (!f.toLowerCase().endsWith('.md') || f.startsWith('_')) continue;
      const base = f.slice(0, -3);
      out.push({ appDir: entry.name, slug: base === 'Home' ? '' : base, file: f });
    }
  }
  return out;
}

/** Pretty page title from a doc slug. */
export function docTitle(slug: string): string {
  return (slug || 'Home').replace(/[-_]/g, ' ');
}
