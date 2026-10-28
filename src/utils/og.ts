import type { CyberApp } from '../data/apps';
import { apps } from '../data/apps';
import type { Lang } from '../data/ui';
import fs from 'node:fs';
import path from 'node:path';

const WIDTH = 1200;
const HEIGHT = 630;
const BANNER_WIDTH = 1280;
const BANNER_HEIGHT = 360;
const PUBLIC_DIR = path.join(process.cwd(), 'public');

/**
 * Social cards are rendered by Sharp in an environment without the browser's
 * emoji fonts. Embedding the real site assets keeps previews consistent across
 * Reddit, Discord, Slack, GitHub and other crawlers.
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

function balanceTwoLines(value: string, singleLineLimit = 52): string[] {
  if (value.length <= singleLineLimit) return [value];

  const words = value.split(/\s+/);
  let splitAt = 1;
  let smallestDifference = Number.POSITIVE_INFINITY;

  for (let index = 1; index < words.length; index += 1) {
    const firstLength = words.slice(0, index).join(' ').length;
    const secondLength = words.slice(index).join(' ').length;
    const difference = Math.abs(firstLength - secondLength);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      splitAt = index;
    }
  }

  return [words.slice(0, splitAt).join(' '), words.slice(splitAt).join(' ')];
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
      <stop offset="0" stop-color="#0a0f17" />
      <stop offset="0.48" stop-color="#070a10" />
      <stop offset="1" stop-color="#0c0b16" />
    </linearGradient>
    <radialGradient id="cyanGlow" cx="15%" cy="15%" r="75%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.14" />
      <stop offset="1" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="violetGlow" cx="85%" cy="80%" r="70%">
      <stop offset="0" stop-color="#7A5CFF" stop-opacity="0.14" />
      <stop offset="1" stop-color="#7A5CFF" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="iconAura" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.25" />
      <stop offset="55%" stop-color="${accent}" stop-opacity="0.08" />
      <stop offset="100%" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>`;
}

/**
 * Deterministic starfield generator with varied star sizes and 4-point cross sparkles
 * matching the live galactic hero on cybergems.org.
 */
function renderStarfield(width: number, height: number, accent: string): string {
  let seed = 2026;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const count = width > 1200 ? 95 : 65;
  const stars: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const x = (random() * width).toFixed(1);
    const y = (random() * height).toFixed(1);
    const r = (0.55 + random() * 1.35).toFixed(2);
    const o = (0.25 + random() * 0.55).toFixed(2);
    const isTinted = random() > 0.8;
    const fill = isTinted ? accent : '#edf0fa';

    stars.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="${o}" />`);

    // 4-point cross sparkles for selected stars
    if (i % 7 === 0) {
      const s = (2.2 + random() * 2).toFixed(1);
      stars.push(
        `<path d="M-${s} 0H${s}M0 -${s}V${s}" transform="translate(${x} ${y})" stroke="${fill}" stroke-width="0.8" opacity="${(Number(o) * 0.95).toFixed(2)}" />`
      );
    }
  }

  return stars.join('\n  ');
}

function background(accent: string, width = WIDTH, height = HEIGHT): string {
  return `
  <rect width="${width}" height="${height}" fill="url(#background)" />
  <rect width="${width}" height="${height}" fill="url(#cyanGlow)" />
  <rect width="${width}" height="${height}" fill="url(#violetGlow)" />
  ${renderStarfield(width, height, accent)}
  <rect width="${width}" height="4" fill="url(#brand)" />`;
}

function footer(lang: Lang): string {
  const trust = lang === 'es'
    ? 'GRATIS PARA SIEMPRE  ·  SIN ANUNCIOS  ·  SIN CUENTA  ·  GPLv3'
    : 'FREE FOREVER  ·  NO ADS  ·  NO ACCOUNT  ·  GPLv3';
  return `
  <rect x="72" y="538" width="1056" height="1" fill="white" opacity="0.1" />
  <text x="72" y="582" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="16" font-weight="600" letter-spacing="0.6">${trust}</text>
  <text x="1128" y="582" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="14" font-weight="600" letter-spacing="1" text-anchor="end">cybergems.org</text>
`;
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
  const suiteLine = lang === 'es' ? `${apps.length} apps · una filosofía` : `${apps.length} tools · one philosophy`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img">
  ${defs(accent)}
  ${background(accent)}
  ${brandMark(72, 48, 52, 32)}

  <rect x="72" y="164" width="${lang === 'es' ? 350 : 300}" height="34" rx="17" fill="#00F2FF" fill-opacity="0.1" stroke="#00F2FF" stroke-opacity="0.32" />
  <circle cx="86" cy="181" r="3.5" fill="#00F2FF" />
  <text x="98" y="186" fill="#bafcff" font-family="Segoe UI, system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="1.1">${badge}</text>
  <text x="72" y="278" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="57" font-weight="800" letter-spacing="-1.8">${escapeXml(headline)}</text>
  <text x="72" y="344" fill="url(#brand)" font-family="Segoe UI, system-ui, sans-serif" font-size="48" font-weight="800" letter-spacing="-1.4">${escapeXml(subtitle)}</text>
  <text x="72" y="397" fill="#d8d8df" font-family="Segoe UI, system-ui, sans-serif" font-size="22" font-weight="500">${escapeXml(intro)}</text>
  <text x="72" y="432" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="17" font-weight="500">${escapeXml(categories)}</text>

  <g filter="url(#softShadow)">
    <rect x="784" y="128" width="344" height="366" rx="32" fill="#111722" fill-opacity="0.88" stroke="white" stroke-opacity="0.13" />
    <circle cx="956" cy="291" r="130" fill="url(#iconAura)" />
    ${appImage(brandApp, 898, 233, 116)}
    <text x="956" y="392" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="25" font-weight="800" text-anchor="middle">Cyber<tspan fill="url(#brand)">Gems</tspan></text>
    <text x="956" y="420" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="14" text-anchor="middle">${suiteLine}</text>
    ${positions.map(([x, y], index) => {
      const a = apps[index];
      return `<rect x="${x}" y="${y}" width="52" height="52" rx="15" fill="#151c28" stroke="${a.accent}" stroke-opacity="0.42" />${appImage(a, x + 5, y + 5, 42)}`;
    }).join('')}
  </g>
  ${footer(lang)}
</svg>`;
}

function appCard(app: CyberApp, lang: Lang): string {
  const accent = app.accent ?? '#00F2FF';
  const title = escapeXml(app.name);
  const tagline = wrapText(app.tagline[lang] ?? app.tagline.en, 46).slice(0, 3);
  const extra = `${app.stack}  ·  ${app.license}  ·  Windows`;
  const label = lang === 'es' ? 'WINDOWS 10 / 11 · 64-BIT' : 'WINDOWS 10 / 11 · 64-BIT';
  const cardTitle = lang === 'es' ? 'Código abierto bajo GPLv3' : 'Open source under GPLv3';
  const cardLine = lang === 'es' ? 'Gratis · Privada · Nativa Windows' : 'Free · Private · Native Windows';
  const tagStartY = tagline.length > 2 ? 342 : 352;
  const tagLineHeight = tagline.length > 2 ? 30 : 36;
  const tagFontSize = tagline.length > 2 ? 22 : 24;
  const extraY = tagline.length > 2 ? 446 : 446;
  const cardTitleY = tagline.length > 2 ? 480 : 480;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img">
  ${defs(accent)}
  ${background(accent)}
  ${brandMark(72, 48, 52, 32)}

  <!-- Left: Metadata and headline -->
  <rect x="72" y="164" width="245" height="34" rx="17" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.36" />
  <circle cx="88" cy="181" r="3.5" fill="${accent}" />
  <text x="100" y="186" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="13" font-weight="700" letter-spacing="1.1">${label}</text>
  <text x="72" y="286" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="68" font-weight="800" letter-spacing="-2">${title}</text>
  ${tagline.map((line, index) => `<text x="72" y="${tagStartY + index * tagLineHeight}" fill="#d8d8df" font-family="Segoe UI, system-ui, sans-serif" font-size="${tagFontSize}" font-weight="500">${escapeXml(line)}</text>`).join('')}
  <text x="72" y="${extraY}" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="18" font-weight="600">${escapeXml(extra)}</text>
  <text x="72" y="${cardTitleY}" fill="${accent}" font-family="Segoe UI, system-ui, sans-serif" font-size="17" font-weight="700">${cardTitle}</text>

  <!-- Right: Glassmorphic flagship showcase card -->
  <g filter="url(#softShadow)">
    <rect x="756" y="118" width="372" height="392" rx="30" fill="#12151f" fill-opacity="0.92" stroke="white" stroke-opacity="0.14" />
    ${appImage(app, 857, 190, 170)}

    <text x="942" y="412" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="24" font-weight="800" text-anchor="middle">${title}</text>
    <text x="942" y="442" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle">${cardLine}</text>
    <rect x="832" y="464" width="220" height="26" rx="13" fill="white" fill-opacity="0.04" stroke="white" stroke-opacity="0.08" />
    <text x="942" y="481" fill="${accent}" font-family="Segoe UI, system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="0.5" text-anchor="middle">WINDOWS 10 / 11 · x64</text>
  </g>

  ${footer(lang)}
</svg>`;
}

/**
 * Wide app banner for README headers and other compact placements.
 * Fully aligned with the space / galactic aesthetic of the site.
 */
export function readmeBannerSvg(app: CyberApp, lang: Lang = 'en'): string {
  const accent = app.accent ?? '#00F2FF';
  const title = escapeXml(app.name);
  const tagline = balanceTwoLines(app.tagline[lang] ?? app.tagline.en);
  const longestTaglineLine = Math.max(...tagline.map((line) => line.length));
  const taglineSize = longestTaglineLine > 62 ? 20 : longestTaglineLine > 55 ? 21 : 23;
  const cyberGemsMark = assetData('/favicon.svg', 'image/svg+xml');
  const trust = lang === 'es'
    ? 'GRATIS PARA SIEMPRE · SIN ANUNCIOS · SIN CUENTA · CÓDIGO ABIERTO'
    : 'FREE FOREVER · NO ADS · NO ACCOUNT · OPEN SOURCE';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}" viewBox="0 0 ${BANNER_WIDTH} ${BANNER_HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="banner-title banner-description">
  <title id="banner-title">${title}</title>
  <desc id="banner-description">${escapeXml(app.tagline[lang] ?? app.tagline.en)}</desc>
  <defs>
    <linearGradient id="bannerBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0c1119" />
      <stop offset="0.56" stop-color="#0b0d14" />
      <stop offset="1" stop-color="#12101f" />
    </linearGradient>
    <radialGradient id="bannerGlow" cx="19%" cy="50%" r="55%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.14" />
      <stop offset="1" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
    <radialGradient id="bannerViolet" cx="100%" cy="110%" r="65%">
      <stop offset="0" stop-color="#7A5CFF" stop-opacity="0.18" />
      <stop offset="1" stop-color="#7A5CFF" stop-opacity="0" />
    </radialGradient>
    <filter id="bannerIconGlow" x="-70%" y="-70%" width="240%" height="240%">
      <feGaussianBlur stdDeviation="28" />
    </filter>
  </defs>

  <!-- Space background with stars (no grid) -->
  <rect width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}" rx="24" fill="url(#bannerBg)" />
  <rect width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}" rx="24" fill="url(#bannerGlow)" />
  <rect width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}" rx="24" fill="url(#bannerViolet)" />
  ${renderStarfield(BANNER_WIDTH, BANNER_HEIGHT, accent)}
  <rect x="0.5" y="0.5" width="${BANNER_WIDTH - 1}" height="${BANNER_HEIGHT - 1}" rx="23.5" fill="none" stroke="${accent}" stroke-opacity="0.30" />

  <!-- Left Icon showcase with aura -->
  <circle cx="214" cy="180" r="96" fill="${accent}" fill-opacity="0.22" filter="url(#bannerIconGlow)" />
  ${appImage(app, 144, 110, 140)}

  <!-- Header pill -->
  <svg x="448" y="55" width="16" height="16" viewBox="0 0 16 16" fill="${accent}">
    <path d="M1 2.3 7 1.5v6H1V2.3Zm8-1.1 6-.8v7.1H9V1.2ZM1 8.5h6v6L1 13.7V8.5Zm8 0h6v7.1l-6-.8V8.5Z" />
  </svg>
  <text x="474" y="69" fill="${accent}" font-family="Segoe UI, system-ui, sans-serif" font-size="13" font-weight="800" letter-spacing="2">WINDOWS 10 / 11 (64-BIT)</text>

  <!-- Title and tagline -->
  <text x="448" y="158" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="72" font-weight="800" letter-spacing="-2.6">${title}</text>
  ${tagline.map((line, index) => `<text x="450" y="${212 + index * 34}" fill="#c9c9d1" font-family="Segoe UI, system-ui, sans-serif" font-size="${taglineSize}" font-weight="500">${escapeXml(line)}</text>`).join('')}
  <text x="450" y="308" fill="#8f929f" font-family="Segoe UI, system-ui, sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">${escapeXml(trust)}</text>

  <!-- Bottom right mark -->
  <image href="${cyberGemsMark}" x="1162" y="260" width="36" height="36" opacity="0.95" />
  <text x="1180" y="318" fill="#c9d2d8" fill-opacity="0.92" font-family="Segoe UI, system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle">cybergems.org</text>
</svg>`;
}

export function ogSvg(app?: CyberApp, lang: Lang = 'en'): string {
  return app ? appCard(app, lang) : homeCard(lang);
}
