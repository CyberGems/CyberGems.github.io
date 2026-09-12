// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// @astrojs/sitemap only emits sitemap-index.xml, but many tools request the
// conventional /sitemap.xml path by default (today it 404s). Mirror the index
// there after the build. Listed after sitemap() so it runs after the index
// exists and is never picked up as a page URL itself.
// The same hook also adds <lastmod> to sitemap-0.xml, derived from the source
// file each URL is generated from (wiki markdown for /docs pages, the app's
// CMS JSON for /apps pages, and the .astro/.md page source for static pages).
// URLs that cannot be mapped to a source are left without lastmod (valid XML;
// lastmod is optional per URL).
const sitemapXmlAlias = {
  name: 'sitemap-xml-alias',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const outDir = fileURLToPath(dir);
      const root = process.cwd();
      const sitemapPath = path.join(outDir, 'sitemap-0.xml');

      if (fs.existsSync(sitemapPath)) {
        let xml = fs.readFileSync(sitemapPath, 'utf8');
        let withLastmod = 0;
        xml = xml.replace(/(<url><loc>https:\/\/cybergems\.org)([^<]*)(<\/loc>)/g, (m, head, pathPart, tail) => {
          const clean = pathPart.replace(/&amp;/g, '&').replace(/^\/es(?=\/)/, '');
          let src = null;
          const docs = clean.match(/^\/docs\/([^/]+)\/(.+)\/$/);
          const appPage = clean.match(/^\/apps\/([^/]+)\/$/);
          if (docs) {
            src = path.join(root, 'wikis', docs[1], docs[2] + '.md');
          } else if (appPage) {
            src = path.join(root, 'src', 'data', 'apps', appPage[1] + '.json');
          } else {
            const candidates = [
              path.join(root, 'src', 'pages', clean, 'index.astro'),
              path.join(root, 'src', 'pages', clean + '.astro'),
              path.join(root, 'src', 'pages', clean, 'index.md'),
              path.join(root, 'src', 'pages', clean + '.md'),
            ];
            src = candidates.find((c) => fs.existsSync(c)) || null;
          }
          if (!src || !fs.existsSync(src)) return m;
          const lastmod = new Date(fs.statSync(src).mtime).toISOString().slice(0, 10);
          withLastmod += 1;
          return head + pathPart + tail + '<lastmod>' + lastmod + '</lastmod>';
        });
        fs.writeFileSync(sitemapPath, xml);
        console.log(`[sitemap-lastmod] lastmod added to ${withLastmod} URL(s)`);
      }

      fs.copyFileSync(
        path.join(outDir, 'sitemap-index.xml'),
        path.join(outDir, 'sitemap.xml')
      );
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://cybergems.org',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', es: 'es' },
      },
    }),
    sitemapXmlAlias,
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // sharp is installed — enables optimized image service
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
});