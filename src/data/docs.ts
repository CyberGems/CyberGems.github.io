import fs from 'node:fs';
import path from 'node:path';
import { apps } from './apps';

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
    if (!entry.isDirectory() || !apps.some((app) => app.slug === entry.name)) continue;
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

/** A translated wiki page and its original share one navigation entry. */
export function docBaseSlug(slug: string): string {
  const base = slug.replace(/-es$/, '');
  return base === 'Home' ? '' : base;
}

export function localizedDoc(doc: DocPage, lang: 'en' | 'es', pages: DocPage[]): DocPage {
  if (lang !== 'es' || doc.slug.endsWith('-es')) return doc;
  return pages.find((page) => page.appDir === doc.appDir && page.slug === `${doc.slug || 'Home'}-es`) ?? doc;
}

/**
 * Wraps every <table> in a horizontally scrollable container so wide
 * markdown tables don't squeeze (or bleed) on narrow screens.
 */
export function wrapTables(html: string): string {
  return html
    .replace(/<table>/g, '<div class="table-wrap"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

import sanitizeHtml from 'sanitize-html';

/** Sanitizes markdown-rendered HTML, allowing safe tags while stripping scripts and event handlers. */
export function sanitize(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'h1', 'h2', 'h3', 'h4', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'div', 'span', 'pre', 'code', 'blockquote', 'hr']),
    allowedAttributes: {
      '*': ['id', 'class', 'style', 'href', 'src', 'alt', 'title', 'width', 'height', 'colspan', 'rowspan'],
      a: ['href', 'name', 'target', 'rel'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    disallowedTagsMode: 'discard',
  });
}

