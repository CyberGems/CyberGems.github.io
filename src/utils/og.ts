import type { CyberApp, BannerSource } from '../data/apps';
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
 * The upper-left corner glow is intentionally the same on every social card.
 * Warm per-app accents (red, violet, cyan, ...) clash with the navy/violet
 * background, while CyberLauncher's indigo sits right between the two. The
 * pill, icon aura and tinted stars still use each app's own accent.
 */
const CORNER_GLOW = '#8B9CF6';

/** Copy shared by both home cards. Kept here so variants can swap it cleanly. */
const HOME_BADGE = {
  en: 'FREE APPS FOR WINDOWS',
  es: 'APLICACIONES GRATUITAS PARA WINDOWS',
};
const HOME_CAPTION = {
  en: 'Tools for Windows',
  es: 'Herramientas para Windows',
};

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

function balanceTwoLines(value: string, singleLineLimit = 56): string[] {
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

function appImage(app: Pick<BannerSource, 'icon' | 'emoji'>, x: number, y: number, size: number): string {
  if (!app.icon) {
    return `<text x="${x + size / 2}" y="${y + size * 0.7}" fill="white" font-size="${size * 0.52}" text-anchor="middle">${escapeXml(app.emoji ?? '◆')}</text>`;
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
    <radialGradient id="cornerGlow" cx="15%" cy="15%" r="75%">
      <stop offset="0" stop-color="${CORNER_GLOW}" stop-opacity="0.14" />
      <stop offset="1" stop-color="${CORNER_GLOW}" stop-opacity="0" />
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
    <radialGradient id="homeAura" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.12" />
      <stop offset="55%" stop-color="${accent}" stop-opacity="0.04" />
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
  <rect width="${width}" height="${height}" fill="url(#cornerGlow)" />
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
  const badge = HOME_BADGE[lang];
  const headline = lang === 'es' ? 'Apps de calidad premium.' : 'Premium-quality apps.';
  const subtitle = lang === 'es' ? 'Gratis y de código abierto.' : 'Free & open source.';
  const intro = lang === 'es'
    ? 'Herramientas para el uso diario, creadas para Windows.'
    : 'Tools for everyday use, crafted for Windows.';
  const categories = lang === 'es'
    ? 'Captura  ·  Portapapeles  ·  Notas  ·  Firewall  ·  Y más'
    : 'Screen capture  ·  Clipboard  ·  Notes  ·  Firewall  ·  More';
  const caption = HOME_CAPTION[lang];
  const positions = [[828, 174], [1036, 174], [820, 403], [1044, 403]];
  const brandApp = { icon: '/branding/cybergems-favicon.png', emoji: '◆' } as CyberApp;

  const leftX = 72;
  const showcaseX = 784;
  const badgeSize = 14;
  const badgeSpacing = 1.1;
  const badgeY = 164;
  const badgeHeight = 34;
  const badgeTextX = leftX + 28;
  // A fixed 350/300 px pill left the label off-centre. The estimate is
  // calibrated to the wider Linux fallback font used by the deploy runner.
  const badgeTextWidth = Math.ceil(badge.length * (badgeSize * 0.68 + badgeSpacing));
  const badgeWidth = 28 + badgeTextWidth + 28;

  // The old 57 px headline ran underneath the showcase card ("premium." was
  // visible through the translucent panel). Fit it to the left column instead.
  const headlineSize = Math.min(57, Math.floor((showcaseX - leftX - 28) / (headline.length * 0.58)));

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img">
  ${defs(accent)}
  ${background(accent)}
  ${brandMark(72, 48, 52, 32)}

  <rect x="${leftX}" y="${badgeY}" width="${badgeWidth}" height="${badgeHeight}" rx="17" fill="#00F2FF" fill-opacity="0.1" stroke="#00F2FF" stroke-opacity="0.32" />
  <circle cx="${leftX + 16}" cy="${badgeY + 17}" r="3.5" fill="#00F2FF" />
  <text id="home-badge" x="${badgeTextX}" y="${badgeY + 22}" fill="#bafcff" font-family="Segoe UI, system-ui, sans-serif" font-size="${badgeSize}" font-weight="700" letter-spacing="${badgeSpacing}">${badge}</text>
  <text x="${leftX}" y="278" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="${headlineSize}" font-weight="800" letter-spacing="-1.8">${escapeXml(headline)}</text>
  <text x="${leftX}" y="344" fill="url(#brand)" font-family="Segoe UI, system-ui, sans-serif" font-size="48" font-weight="800" letter-spacing="-1.4">${escapeXml(subtitle)}</text>
  <text x="${leftX}" y="397" fill="#d8d8df" font-family="Segoe UI, system-ui, sans-serif" font-size="22" font-weight="500">${escapeXml(intro)}</text>
  <text x="${leftX}" y="432" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="17" font-weight="500">${escapeXml(categories)}</text>

  <!-- Only the panel casts a shadow: the old aura inherited it and read as a muddy ring. -->
  <g filter="url(#softShadow)">
    <rect x="784" y="128" width="344" height="366" rx="32" fill="#111722" fill-opacity="0.92" stroke="white" stroke-opacity="0.13" />
  </g>
  <circle id="home-aura" cx="956" cy="291" r="152" fill="url(#homeAura)" />
  ${appImage(brandApp, 898, 233, 116)}
  <text id="home-caption" x="956" y="386" fill="#c2cad8" font-family="Segoe UI, system-ui, sans-serif" font-size="15" font-weight="600" letter-spacing="0.2" text-anchor="middle">${escapeXml(caption)}</text>
  ${positions.map(([x, y], index) => {
    const a = apps[index];
    return `<rect x="${x}" y="${y}" width="52" height="52" rx="15" fill="#151c28" stroke="${a.accent}" stroke-opacity="0.42" />${appImage(a, x + 5, y + 5, 42)}`;
  }).join('')}
  ${footer(lang)}
</svg>`;
}

function appCard(app: CyberApp, lang: Lang): string {
  const accent = app.accent ?? '#00F2FF';
  const titleAccent = app.bannerTitleAccent ?? accent;
  const title = escapeXml(app.name);
  // Social cards show the same short line printed on the generated README
  // banner; 56 chars keeps every bannerTagline on a single line, as it is there.
  const bannerTagline = app.bannerTagline?.[lang] ?? app.bannerTagline?.en ?? app.tagline[lang] ?? app.tagline.en;
  const tagline = wrapText(bannerTagline, 56).slice(0, 2);

  const leftX = 72;
  const cardX = 780;
  const cardY = 148;
  const cardWidth = 348;
  const cardHeight = 344;
  const iconSize = 232;
  const textWidth = cardX - leftX - 40;

  // Fit the two most important elements to the column instead of using fixed
  // sizes: short names and short lemas get noticeably larger type. The width
  // estimates are deliberately conservative because the deploy runner has no
  // Segoe UI and falls back to a noticeably wider Linux font.
  const titleSize = Math.min(88, Math.floor(textWidth / (app.name.length * 0.65)));
  const longestLine = Math.max(...tagline.map((line) => line.length));
  const taglineSize = Math.max(24, Math.min(27, Math.floor(textWidth / (longestLine * 0.56))));

  // The deploy runner has no Segoe UI and its wider fallback font used to
  // leave just 2 px after "64-BIT". Size the pill from a conservative glyph
  // estimate so the label keeps the same breathing room on both sides.
  const platformLabel = 'WINDOWS 10 / 11 · 64-BIT';
  const platformSize = 13;
  const platformSpacing = 1.1;
  const platformLabelWidth = Math.ceil(
    platformLabel.length * (platformSize * 0.63 + platformSpacing),
  );
  const platformTextX = leftX + 28;
  const pillWidth = 28 + platformLabelWidth + 28;
  const pillHeight = 34;

  // Lay the left column out as one measured block, then center it between the
  // brand mark and the footer. Hardcoded baselines assumed a two-line lema and
  // left a hole as soon as the banner tagline became a single line.
  const titleCap = Math.round(titleSize * 0.72);
  const titleDescender = Math.round(titleSize * 0.21);
  const taglineCap = Math.round(taglineSize * 0.72);
  const taglineDescender = Math.round(taglineSize * 0.21);
  const taglineLineHeight = Math.round(taglineSize * 1.25);
  const metaSize = 18;
  const metaCap = Math.round(metaSize * 0.72);
  const metaDescender = Math.round(metaSize * 0.21);
  const gapPillTitle = 40;
  const gapTitleTagline = 22;
  const gapTaglineRule = 20;
  const gapRuleMeta = 20;
  const blockHeight = pillHeight
    + gapPillTitle + titleCap + titleDescender
    + gapTitleTagline + taglineCap + (tagline.length - 1) * taglineLineHeight + taglineDescender
    + gapTaglineRule + 4
    + gapRuleMeta + metaCap + metaDescender;
  const blockTop = Math.round(132 + (500 - 132 - blockHeight) / 2);
  const pillY = blockTop;
  const titleBaseline = pillY + pillHeight + gapPillTitle + titleCap;
  const taglineStartY = titleBaseline + titleDescender + gapTitleTagline + taglineCap;
  const ruleY = taglineStartY + (tagline.length - 1) * taglineLineHeight + taglineDescender + gapTaglineRule;
  const metaBaseline = ruleY + 4 + gapRuleMeta + metaCap;

  // Two-tone name, mirroring the README banner. Platform, license and trust
  // claims appear exactly once on the card: pill, stack line and footer.
  const titleMarkup = app.name.startsWith('Cyber') && app.name.length > 5
    ? `<tspan fill="white">Cyber</tspan><tspan fill="${titleAccent}">${escapeXml(app.name.slice(5))}</tspan>`
    : `<tspan fill="white">${title}</tspan>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img">
  ${defs(accent)}
  ${background(accent)}
  ${brandMark(72, 48, 52, 32)}

  <!-- Left: platform, name, lema and stack -->
  <rect x="${leftX}" y="${pillY}" width="${pillWidth}" height="${pillHeight}" rx="17" fill="${accent}" fill-opacity="0.1" stroke="${accent}" stroke-opacity="0.36" />
  <circle cx="${leftX + 16}" cy="${pillY + 17}" r="3.5" fill="${accent}" />
  <text x="${platformTextX}" y="${pillY + 22}" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="${platformSize}" font-weight="700" letter-spacing="${platformSpacing}">${platformLabel}</text>
  <text x="${leftX}" y="${titleBaseline}" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="${titleSize}" font-weight="800" letter-spacing="-2">${titleMarkup}</text>
  ${tagline.map((line, index) => `<text x="${leftX}" y="${taglineStartY + index * taglineLineHeight}" fill="#e4e8f0" font-family="Segoe UI, system-ui, sans-serif" font-size="${taglineSize}" font-weight="500">${escapeXml(line)}</text>`).join('')}
  <rect x="${leftX}" y="${ruleY}" width="64" height="4" rx="2" fill="${accent}" />
  <text x="${leftX}" y="${metaBaseline}" fill="#b7bcc8" font-family="Segoe UI, system-ui, sans-serif" font-size="${metaSize}" font-weight="600">${escapeXml(app.stack)}</text>

  <!-- Right: icon showcase. No repeated name, platform or license. -->
  <g filter="url(#softShadow)">
    <rect x="${cardX}" y="${cardY}" width="${cardWidth}" height="${cardHeight}" rx="30" fill="#12151f" fill-opacity="0.92" stroke="white" stroke-opacity="0.14" />
    <circle cx="${cardX + cardWidth / 2}" cy="${cardY + cardHeight / 2}" r="140" fill="url(#iconAura)" />
    ${appImage(app, cardX + (cardWidth - iconSize) / 2, cardY + (cardHeight - iconSize) / 2, iconSize)}
  </g>

  ${footer(lang)}
</svg>`;
}

/**
 * Wide app banner for README headers and other compact placements.
 * Fully aligned with the space / galactic aesthetic of the site.
 */
export function readmeBannerSvg(app: BannerSource, lang: Lang = 'en'): string {
  const accent = app.accent ?? '#00F2FF';
  const titleAccent = app.bannerTitleAccent ?? accent;
  const title = escapeXml(app.name);
  const bannerTagline = app.bannerTagline?.[lang] ?? app.tagline?.[lang] ?? app.tagline?.en ?? app.name;
  const tagline = balanceTwoLines(bannerTagline);

  // Text column starts at x=448; keep a safe right margin for the brand mark.
  const textX = 448;
  const textWidth = BANNER_WIDTH - textX - 84;

  // Segoe UI Bold averages ~0.56em per glyph, so fit the title to the column.
  const titleSize = Math.min(84, Math.floor(textWidth / (app.name.length * 0.56)));
  const taglineSize = Math.min(
    27,
    Math.floor(textWidth / (Math.max(...tagline.map((line) => line.length)) * 0.5)),
  );
  const trustSize = 16;

  // Two-tone title, mirroring the app UI: "Cyber" stays white, the rest takes
  // the per-app banner accent.
  const titleMarkup = app.name.startsWith('Cyber') && app.name.length > 5
    ? `<tspan fill="white">Cyber</tspan><tspan fill="${titleAccent}">${escapeXml(app.name.slice(5))}</tspan>`
    : `<tspan fill="white">${title}</tspan>`;

  const cyberGemsMark = assetData('/favicon.svg', 'image/svg+xml');
  const trust = lang === 'es'
    ? 'GRATIS PARA SIEMPRE · SIN ANUNCIOS · SIN CUENTA · CÓDIGO ABIERTO'
    : 'FREE FOREVER · NO ADS · NO ACCOUNT · OPEN SOURCE';

  // Lay the text block out by visual gaps instead of baselines: type size
  // changes move descenders, so baseline math left the tagline glued to the
  // title while the trust line drifted away.
  const lineHeight = 36;
  const gapTitleTagline = 26;
  const gapTaglineTrust = 24;
  const taglineCount = tagline.length;
  const titleCap = Math.round(titleSize * 0.72);
  const titleDescender = Math.round(titleSize * 0.21);
  const taglineCap = Math.round(taglineSize * 0.72);
  const taglineDescender = Math.round(taglineSize * 0.21);
  const trustCap = Math.round(trustSize * 0.72);
  const trustDescender = Math.round(trustSize * 0.21);
  const blockHeight = titleCap
    + titleDescender
    + gapTitleTagline
    + taglineCap
    + (taglineCount - 1) * lineHeight
    + taglineDescender
    + gapTaglineTrust
    + trustCap
    + trustDescender;
  const blockTop = (BANNER_HEIGHT - blockHeight) / 2;
  const titleBaseline = blockTop + titleCap;
  const taglineStartY = titleBaseline + titleDescender + gapTitleTagline + taglineCap;
  const trustY = taglineStartY + (taglineCount - 1) * lineHeight + taglineDescender + gapTaglineTrust + trustCap;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${BANNER_WIDTH}" height="${BANNER_HEIGHT}" viewBox="0 0 ${BANNER_WIDTH} ${BANNER_HEIGHT}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="banner-title banner-description">
  <title id="banner-title">${title}</title>
  <desc id="banner-description">${escapeXml(bannerTagline)}</desc>
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
  <circle cx="214" cy="180" r="115" fill="${accent}" fill-opacity="0.22" filter="url(#bannerIconGlow)" />
  ${appImage(app, 130, 96, 168)}

  <!-- Title and tagline -->
  <text x="${textX}" y="${titleBaseline}" font-family="Segoe UI, system-ui, sans-serif" font-size="${titleSize}" font-weight="800" letter-spacing="-2.6">${titleMarkup}</text>
  ${tagline.map((line, index) => `<text x="${textX + 2}" y="${taglineStartY + index * lineHeight}" fill="#D8E7F1" font-family="Segoe UI, system-ui, sans-serif" font-size="${taglineSize}" font-weight="500">${escapeXml(line)}</text>`).join('')}
  <text x="${textX + 2}" y="${trustY}" fill="#8f929f" font-family="Segoe UI, system-ui, sans-serif" font-size="${trustSize}" font-weight="700" letter-spacing="0.5">${escapeXml(trust)}</text>

  <!-- Bottom right mark -->
  <image href="${cyberGemsMark}" x="1162" y="260" width="36" height="36" opacity="0.95" />
  <text x="1180" y="318" fill="#c9d2d8" fill-opacity="0.92" font-family="Segoe UI, system-ui, sans-serif" font-size="14" font-weight="600" text-anchor="middle">cybergems.org</text>
</svg>`;
}

export function ogSvg(app?: CyberApp, lang: Lang = 'en'): string {
  return app ? appCard(app, lang) : homeCard(lang);
}
