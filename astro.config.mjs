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
const sitemapXmlAlias = {
  name: 'sitemap-xml-alias',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const outDir = fileURLToPath(dir);
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