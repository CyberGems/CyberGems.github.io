import fs from 'node:fs';
import path from 'node:path';
import GithubSlugger from 'github-slugger';
import { marked } from 'marked';
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

/** Plain text of a rendered heading, used to reproduce GitHub's anchor slug. */
function headingText(innerHtml: string): string {
  return innerHtml
    .replace(/<[^>]+>/g, '')
    .replace(/&#x([0-9a-f]+);/gi, (_m, hex: string) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, dec: string) => String.fromCodePoint(Number(dec)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}

/**
 * GitHub wikis attach an id to every heading; marked does not. Without this,
 * section links written for the wiki land nowhere on the site. Slugs match the
 * wiki exactly, including -1/-2 suffixes for repeated headings.
 */
export function addHeadingIds(html: string): string {
  const slugger = new GithubSlugger();
  return html.replace(/<h([1-6])(\s[^>]*)?>([\s\S]*?)<\/h\1>/g,
    (_match, level: string, attrs = '', inner: string) => {
      const id = slugger.slug(headingText(inner));
      return id ? `<h${level} id="${id}"${attrs}>${inner}</h${level}>` : `<h${level}${attrs}>${inner}</h${level}>`;
    });
}

export interface WikiHeading { level: number; slug: string; }

const headingCache = new Map<string, WikiHeading[]>();

/** Heading ids of a wiki markdown page, in document order. */
export function wikiHeadings(appDir: string, file: string): WikiHeading[] {
  const key = `${appDir}/${file}`;
  const cached = headingCache.get(key);
  if (cached) return cached;
  const html = (marked.parse(fs.readFileSync(path.join(WIKIS_DIR, appDir, file), 'utf-8')) as string)
    .replace(/<h1(\s|>)/g, '<h2$1').replace(/<\/h1>/g, '</h2>');
  const slugger = new GithubSlugger();
  const headings: WikiHeading[] = [];
  for (const match of html.matchAll(/<h([1-6])(?:\s[^>]*)?>([\s\S]*?)<\/h\1>/g)) {
    headings.push({ level: Number(match[1]), slug: slugger.slug(headingText(match[2])) });
  }
  headingCache.set(key, headings);
  return headings;
}

/**
 * A link written against an English page keeps its English #anchor even when
 * the Spanish site renders the translated page instead. Map it to the matching
 * translated heading when both pages share the same heading structure.
 */
export function localizedAnchor(en: WikiHeading[], es: WikiHeading[], anchor: string): string {
  if (en.length !== es.length || en.some((heading, i) => heading.level !== es[i].level)) return anchor;
  const index = en.findIndex((heading) => heading.slug === anchor);
  return index >= 0 ? es[index].slug : anchor;
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

