import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const defaults = {
  source: path.join(root, 'public', 'screenshots', 'cyberfeeds', 'cyberfeeds-ui-source.png'),
  wallpaper: 'C:\\Windows\\Web\\Wallpaper\\Windows\\img0.jpg',
  output: path.join(root, 'public', 'screenshots', 'cyberfeeds', 'cyberfeeds-main.png'),
};

const options = Object.fromEntries(
  process.argv.slice(2).flatMap((argument) => {
    if (!argument.startsWith('--')) return [];
    const [key, ...value] = argument.slice(2).split('=');
    return [[key, value.join('=')]];
  }),
);

const sourcePath = options.source ?? defaults.source;
const wallpaperPath = options.wallpaper ?? defaults.wallpaper;
const outputPath = options.output ?? defaults.output;
const canvas = { width: 1600, height: 900 };
const app = { x: 144, y: 28, width: 1312, height: 824, radius: 24 };

const [source, wallpaper] = await Promise.all([
  fs.readFile(sourcePath),
  fs.readFile(wallpaperPath),
]);

const sourceData = `data:image/png;base64,${source.toString('base64')}`;
const wallpaperData = `data:image/jpeg;base64,${wallpaper.toString('base64')}`;
const taskbarY = app.y + app.height + 2;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <defs>
    <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#020711" stop-opacity=".58"/>
      <stop offset=".5" stop-color="#061323" stop-opacity=".36"/>
      <stop offset="1" stop-color="#02040b" stop-opacity=".72"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#28b6f6" stop-opacity=".4"/>
      <stop offset=".52" stop-color="#147ce5" stop-opacity=".12"/>
      <stop offset="1" stop-color="#0a1020" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="18" result="blur"/>
      <feOffset dy="16" result="offset"/>
      <feFlood flood-color="#000814" flood-opacity=".82"/>
      <feComposite in2="offset" operator="in"/>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <clipPath id="app-clip">
      <rect x="${app.x}" y="${app.y}" width="${app.width}" height="${app.height}" rx="${app.radius}"/>
    </clipPath>
  </defs>

  <image href="${wallpaperData}" x="0" y="0" width="${canvas.width}" height="${canvas.height}" preserveAspectRatio="xMidYMid slice"/>
  <rect width="${canvas.width}" height="${canvas.height}" fill="url(#shade)"/>
  <ellipse cx="800" cy="410" rx="710" ry="430" fill="url(#glow)"/>

  <rect x="0" y="${taskbarY}" width="${canvas.width}" height="${canvas.height - taskbarY}" fill="#0a1019" fill-opacity=".72"/>
  <line x1="0" y1="${taskbarY}" x2="${canvas.width}" y2="${taskbarY}" stroke="#c4e6ff" stroke-opacity=".18"/>
  <g transform="translate(706 ${taskbarY + 10})" opacity=".94">
    <rect x="0" y="0" width="18" height="18" rx="3" fill="#52b8ff"/>
    <path d="M3 3h5v5H3zM10 3h5v5h-5zM3 10h5v5H3zM10 10h5v5h-5z" fill="#07111d"/>
    <rect x="27" y="0" width="112" height="18" rx="9" fill="#d6edff" fill-opacity=".14" stroke="#d6edff" stroke-opacity=".18"/>
    <circle cx="40" cy="9" r="4" fill="none" stroke="#d9efff" stroke-width="1.5"/>
    <path d="m43 12 3 3" stroke="#d9efff" stroke-width="1.5" stroke-linecap="round"/>
    <text x="52" y="12.5" fill="#d9efff" fill-opacity=".78" font-family="Segoe UI, Arial, sans-serif" font-size="9">Search</text>
    <circle cx="157" cy="9" r="7" fill="#6cbfff" fill-opacity=".28"/>
    <rect x="177" y="3" width="13" height="13" rx="3" fill="#f2b85b" fill-opacity=".82"/>
    <rect x="197" y="3" width="13" height="13" rx="3" fill="#8b7bff" fill-opacity=".8"/>
  </g>
  <g fill="#d9efff" fill-opacity=".7" font-family="Segoe UI, Arial, sans-serif" font-size="9">
    <text x="1480" y="${taskbarY + 14}">10:04 AM</text>
    <text x="1480" y="${taskbarY + 27}">9/22/2026</text>
  </g>

  <rect x="${app.x - 8}" y="${app.y - 8}" width="${app.width + 16}" height="${app.height + 16}" rx="${app.radius + 8}" fill="#020914" fill-opacity=".62" filter="url(#shadow)"/>
  <image href="${sourceData}" x="${app.x}" y="${app.y}" width="${app.width}" height="${app.height}" preserveAspectRatio="none" clip-path="url(#app-clip)"/>
  <rect x="${app.x}" y="${app.y}" width="${app.width}" height="${app.height}" rx="${app.radius}" fill="none" stroke="#d7efff" stroke-opacity=".26"/>
  <rect x="${app.x + 1}" y="${app.y + 1}" width="${app.width - 2}" height="${app.height - 2}" rx="${app.radius - 1}" fill="none" stroke="#0c6fa9" stroke-opacity=".26"/>
</svg>`;

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(outputPath);

console.log(JSON.stringify({ sourcePath, wallpaperPath, outputPath, ...canvas }, null, 2));
