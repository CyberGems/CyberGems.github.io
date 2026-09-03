import type { CyberApp } from '../data/apps';
import type { Lang } from '../data/ui';

export function ogSvg(app?: CyberApp, lang: Lang = 'en'): string {
  const accent = app?.accent ?? '#00F2FF';
  const accent2 = '#7A5CFF';
  const title = app ? app.name : 'CyberGems';
  const subtitle = app
    ? app.tagline[lang] ?? app.tagline.en
    : lang === 'es'
      ? 'Apps gratuitas y open-source para Windows'
      : 'Free & open-source Windows apps';
  const emoji = app ? app.emoji : '💎';
  // Extra description line for per-app
  const extra = app ? app.stack : lang === 'es' ? 'cybergems.org — Sin anuncios · Sin rastreo · GPLv3' : 'cybergems.org — No ads · No tracking · GPLv3';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" role="img">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${accent}" />
      <stop offset="1" stop-color="${accent2}" />
    </linearGradient>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0d0f17" />
      <stop offset="1" stop-color="#12151f" />
    </linearGradient>
    <radialGradient id="glow" cx="20%" cy="0%" r="80%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.35" />
      <stop offset="1" stop-color="${accent}" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="1200" height="630" rx="0" fill="url(#bg)" />
  <rect width="1200" height="630" rx="0" fill="url(#glow)" />
  <!-- subtle grid -->
  <g opacity="0.06">
    ${Array.from({ length: 30 }).map((_, i) => `<line x1="${i * 44}" y1="0" x2="${i * 44}" y2="630" stroke="${accent}" stroke-width="1"/>`).join('')}
    ${Array.from({ length: 16 }).map((_, i) => `<line x1="0" y1="${i * 44}" x2="1200" y2="${i * 44}" stroke="${accent}" stroke-width="1"/>`).join('')}
  </g>
  <!-- accent top line -->
  <rect x="0" y="0" width="1200" height="4" fill="url(#g)" />
  <!-- emoji badge -->
  <g transform="translate(70, 110)">
    <rect width="120" height="120" rx="24" fill="white" fill-opacity="0.06" stroke="white" stroke-opacity="0.10" />
    <text x="60" y="78" font-size="64" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
  </g>
  <!-- title -->
  <text x="220" y="175" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="64" font-weight="800" letter-spacing="-1">${escapeXml(title)}</text>
  <text x="220" y="222" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="26" font-weight="600" opacity="0.92">${escapeXml(subtitle)}</text>
  <!-- divider -->
  <rect x="70" y="270" width="1060" height="1" fill="white" opacity="0.08" />
  <!-- extra/stack line -->
  <text x="70" y="310" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="20" font-weight="500">${escapeXml(extra)}</text>
  <!-- bottom brand -->
  <text x="70" y="560" fill="white" font-family="Segoe UI, system-ui, sans-serif" font-size="24" font-weight="800">Cyber<tspan fill="url(#g)">Gems</tspan></text>
  <text x="70" y="590" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="16">Free • No Ads • No Tracking • Open Source</text>
  <!-- URL -->
  <text x="1130" y="590" fill="#9a9aa5" font-family="Segoe UI, system-ui, sans-serif" font-size="15" text-anchor="end">cybergems.org</text>
</svg>`;
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
