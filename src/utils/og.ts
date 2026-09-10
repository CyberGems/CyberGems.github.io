import type { CyberApp } from '../data/apps';
import { apps } from '../data/apps';
import type { Lang } from '../data/ui';
import fs from 'node:fs';
import path from 'node:path';

const WIDTH = 1200;
const HEIGHT = 630;
const PUBLIC_DIR = path.join(process.cwd(), 'public');

/**
 * Social cards are rendered by Sharp in an environment without the browser's
 * emoji fonts. Embedding the real site assets keeps previews consistent across
 * Reddit, Discord, Slack and other crawlers.
 */
function assetData(publicPath: string, mime = 'image/png'): string {
  const filePath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ''));
  return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function wrapText(value: string, maxChars: number): string[] {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let line = '';

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (line && next.length > maxChars) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function appImage(app: CyberApp, x: number, y: number, size: number): string {
  if (!app.icon) {
    return `<text x="${x + size / 2}" y="${y + size * 0.7}" fill="white" font-size="${size * 0.52}" text-anchor="middle">${escapeXml(app.emoji)}</text>`;
  }
  return `<image href="${assetData(app.icon)}" x="${x}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" />`;
}

function brandMark(x: number, y: number, size: number, labelSize: number): string {
  const favicon = assetData('/branding/cybergems-favicon.png');
  return `
  <rect x="${x}" y="${y}" width="${size}" height="${size}" rx="${size * 0.24}" fill="#0d0f17" stroke="white" stroke-opacity="0.14" />
  <image href="${favicon}" x="${x}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet" />
  <text x="${x + size + 18}" y="${y + size * 0.68}" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="${labelSize}" font-weight="800" letter-spacing="-1">Cyber<tspan fill="url(#brand)">Gems</tspan></text>`;
}

function defs(accent: string): string {
  return `
  <defs>
    <linearGradient id="brand" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#00F2FF" />
      <stop offset="1" stop-color="#7A5CFF" />
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent}" />
      <stop offset="1" stop-color="#7A5CFF" />
    </linearGradient>
    <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#101b25" />
      <stop offset="0.48" stop-color="#0d0f17" />
      <stop offset="1" stop-color="#12101f" />
    </linearGradient>
    <radialGradient id="cyanGlow" cx="10%" cy="0%" r="80%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.28" />
      <stop offset="1" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="violetGlow" cx="100%" cy="60%" r="65%">
      <stop offset="0" stop-color="#7A5CFF" stop-opacity="0.18" />
      <stop offset="1" stop-color="#7A5CFF" stop-opacity="0" />
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.35" />
    </filter>
  </defs>`;
}

function background(accent: string): string {
  return `
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#background)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#cyanGlow)" />
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#violetGlow)" />
  <g opacity="0.075">
    ${Array.from({ length: 29 }).map((_, i) => `<line x1="${i * 44}" y1="0" x2="${i * 44}" y2="${HEIGHT}" stroke="${accent}" stroke-width="1" />`).join('')}
    ${Array.from({ length: 15 }).map((_, i) => `<line x1="0" y1="${i * 44}" x2="${WIDTH}" y2="${i * 44}" stroke="${accent}" stroke-width="1" />`).join('')}
  </g>
  <rect width="${WIDTH}" height="5" fill="url(#brand)" />`;
}

function footer(lang: Lang): string {
  const trust = lang === 'es'
    ? 'GRATIS PARA SIEMPRE  ·  SIN ANUNCIOS  ·  SIN CUENTA  ·  GPLv3'
    : 'FREE FOREVER  ·  NO ADS  ·  NO ACCOUNT  ·  GPLv3';
  return `
  <rect x="72" y="538" width="1056" height="1" fill="white" opacity="0.1" />
  <text x="72" y="582" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="16" font-weight="600" letter-spacing="0.6">${trust}</text>
  <text x="1128" y="582" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="16" text-anchor="end">cybergems.org</text>`;
}

function homeCard(lang: Lang): string {
  const accent = '#00F2FF';
  const badge = lang === 'es' ? '10 APPS GRATIS PARA WINDOWS' : '10 FREE APPS FOR WINDOWS';
  const headline = lang === 'es' ? 'Apps de calidad premium.' : 'Premium-quality apps.';
  const subtitle = lang === 'es' ? 'Gratis y de código abierto.' : 'Free & open source.';
  const intro = lang === 'es'
    ? 'Una suite para el uso diario, creada para Windows.'
    : 'A suite for everyday use, crafted for Windows.';
  const categories = lang === 'es'
    ? 'Captura  ·  Portapapeles  ·  Notas  ·  Firewall  ·  Y más'
    : 'Screen capture  ·  Clipboard  ·  Notes  ·  Firewall  ·  More';
  const positions = [[828, 174], [1036, 174], [820, 403], [1044, 403]];
  const brandApp = { icon: '/branding/cybergems-favicon.png', emoji: '◆' } as CyberApp;
  const suiteLine = lang === 'es' ? '10 apps · una filosofía' : '10 tools · one philosophy';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img">
  ${defs(accent)}
  ${background(accent)}
  ${brandMark(72, 48, 52, 32)}
  <text x="1128" y="80" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="15" font-weight="600" letter-spacing="1.5" text-anchor="end">CYBERGEMS.ORG</text>

  <rect x="72" y="164" width="${lang === 'es' ? 350 : 300}" height="34" rx="17" fill="#00F2FF" fill-opacity="0.1" stroke="#00F2FF" stroke-opacity="0.32" />
  <text x="92" y="186" fill="#bafcff" font-family="Segoe UI, system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="1.1">${badge}</text>
  <text x="72" y="278" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="57" font-weight="800" letter-spacing="-1.8">${escapeXml(headline)}</text>
  <text x="72" y="344" fill="url(#brand)" font-family="Segoe UI, system-ui, sans-serif" font-size="48" font-weight="800" letter-spacing="-1.4">${escapeXml(subtitle)}</text>
  <text x="72" y="397" fill="#d8d8df" font-family="Segoe UI, system-ui, sans-serif" font-size="22" font-weight="500">${escapeXml(intro)}</text>
  <text x="72" y="432" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="17" font-weight="500">${escapeXml(categories)}</text>

  <g filter="url(#softShadow)">
    <rect x="784" y="128" width="344" height="366" rx="32" fill="#111722" fill-opacity="0.88" stroke="white" stroke-opacity="0.13" />
    <rect x="784" y="128" width="344" height="4" rx="2" fill="url(#brand)" />
    <circle cx="956" cy="291" r="112" fill="#00F2FF" fill-opacity="0.045" stroke="#00F2FF" stroke-opacity="0.1" />
    <circle cx="956" cy="291" r="82" fill="#0d0f17" stroke="white" stroke-opacity="0.1" />
    ${appImage(brandApp, 898, 233, 116)}
    <text x="956" y="392" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="25" font-weight="800" text-anchor="middle">Cyber<tspan fill="url(#brand)">Gems</tspan></text>
    <text x="956" y="420" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="14" text-anchor="middle">${suiteLine}</text>
    ${positions.map(([x, y], index) => {
      const app = apps[index];
      return `<rect x="${x}" y="${y}" width="52" height="52" rx="15" fill="#151c28" stroke="${app.accent}" stroke-opacity="0.42" />${appImage(app, x + 5, y + 5, 42)}`;
    }).join('')}
  </g>
  ${footer(lang)}
</svg>`;
}

function appCard(app: CyberApp, lang: Lang): string {
  const accent = app.accent ?? '#00F2FF';
  const title = escapeXml(app.name);
  const tagline = wrapText(app.tagline[lang] ?? app.tagline.en, 48).slice(0, 2);
  const extra = `${app.stack}  ·  ${app.license}  ·  Windows`;
  const label = lang === 'es' ? 'APP DE CYBERGEMS  ·  WINDOWS' : 'CYBERGEMS APP  ·  WINDOWS';
  const cardTitle = lang === 'es' ? 'Código abierto bajo GPLv3' : 'Open source under GPLv3';
  const cardLine = lang === 'es' ? 'Gratis · privada · nativa para Windows' : 'Free · private · native Windows';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img">
  ${defs(accent)}
  ${background(accent)}
  ${brandMark(72, 48, 52, 32)}
  <text x="1128" y="80" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="15" font-weight="600" letter-spacing="1.5" text-anchor="end">CYBERGEMS.ORG</text>

  <rect x="72" y="164" width="330" height="34" rx="17" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.36" />
  <text x="92" y="186" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="1">${label}</text>
  <text x="72" y="286" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="68" font-weight="800" letter-spacing="-2">${title}</text>
  ${tagline.map((line, index) => `<text x="72" y="${352 + index * 36}" fill="#d8d8df" font-family="Segoe UI, system-ui, sans-serif" font-size="24" font-weight="500">${escapeXml(line)}</text>`).join('')}
  <text x="72" y="446" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="18" font-weight="600">${escapeXml(extra)}</text>
  <text x="72" y="480" fill="${accent}" font-family="Segoe UI, system-ui, sans-serif" font-size="17" font-weight="700">${cardTitle}</text>

  <g filter="url(#softShadow)">
    <rect x="824" y="128" width="304" height="366" rx="32" fill="#111722" fill-opacity="0.88" stroke="${accent}" stroke-opacity="0.3" />
    <rect x="824" y="128" width="304" height="4" rx="2" fill="url(#accent)" />
    <circle cx="976" cy="291" r="119" fill="${accent}" fill-opacity="0.09" />
    <rect x="892" y="207" width="168" height="168" rx="38" fill="#0d0f17" stroke="${accent}" stroke-opacity="0.5" />
    ${appImage(app, 910, 225, 132)}
    <text x="976" y="421" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="20" font-weight="800" text-anchor="middle">${title}</text>
    <text x="976" y="449" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="14" text-anchor="middle">${cardLine}</text>
  </g>
  ${footer(lang)}
</svg>`;
}

export function ogSvg(app?: CyberApp, lang: Lang = 'en'): string {
  return app ? appCard(app, lang) : homeCard(lang);
}
