/**
 * Synchronizes the website's app icons with the canonical PNG tracked in each
 * application repository. The web hero and generated README banner both read
 * public/icons/apps/<slug>.png, so one successful sync updates both surfaces.
 *
 * Local builds prefer sibling app repositories. CI downloads the same files
 * from GitHub. A failed or invalid download never replaces a valid fallback.
 */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const siblingProjectsDir = path.resolve(root, '..');
const targetDir = path.join(root, 'public', 'icons', 'apps');
const isCi = process.env.CI === 'true';
const maxIconBytes = 5 * 1024 * 1024;
const requestTimeoutMs = 15_000;

const iconSources = [
  { slug: 'cyberclock', repo: 'CyberClock', ref: 'master', source: 'src/assets/images/icon.png' },
  { slug: 'cyberfeeds', repo: 'CyberFeeds', ref: 'main', source: 'resources/icon.png' },
  { slug: 'cyberlauncher', repo: 'CyberLauncher', ref: 'main', source: 'public/icon.png' },
  { slug: 'cybermanager', repo: 'CyberManager', ref: 'main', source: 'src/CyberManager.UI/Assets/CyberManager.png' },
  { slug: 'cybernotes', repo: 'CyberNotes', ref: 'main', source: 'public/icon.png' },
  { slug: 'cyberpaste', repo: 'CyberPaste', ref: 'main', source: 'src-tauri/icons/icon.png' },
  { slug: 'cybersnap', repo: 'CyberSnap', ref: 'main', source: 'src/CyberSnap/Assets/CyberSnap_square.png' },
  { slug: 'cybertray', repo: 'CyberTray', ref: 'main', source: 'public/icon.png' },
  { slug: 'cyberviewer', repo: 'CyberViewer', ref: 'main', source: 'assets/icon.png' },
  { slug: 'cyberwall', repo: 'CyberWall', ref: 'master', source: 'src/CyberWall.UI/Assets/CyberWall.png' },
];

const appDataDir = path.join(root, 'src', 'data', 'apps');
const appSlugs = fs.readdirSync(appDataDir)
  .filter((filename) => filename.endsWith('.json'))
  .map((filename) => filename.replace(/\.json$/, ''))
  .sort();
const configuredSlugs = iconSources.map(({ slug }) => slug).sort();
const duplicateSlugs = configuredSlugs.filter((slug, index) => configuredSlugs.indexOf(slug) !== index);
const missingSlugs = appSlugs.filter((slug) => !configuredSlugs.includes(slug));
const unknownSlugs = configuredSlugs.filter((slug) => !appSlugs.includes(slug));

if (duplicateSlugs.length || missingSlugs.length || unknownSlugs.length) {
  if (duplicateSlugs.length) console.error(`Duplicate icon sources: ${[...new Set(duplicateSlugs)].join(', ')}`);
  if (missingSlugs.length) console.error(`Apps without an icon source: ${missingSlugs.join(', ')}`);
  if (unknownSlugs.length) console.error(`Icon sources without app data: ${unknownSlugs.join(', ')}`);
  process.exit(1);
}

fs.mkdirSync(targetDir, { recursive: true });

function rawGitHubUrl({ repo, ref, source }) {
  const encodedPath = source.split('/').map(encodeURIComponent).join('/');
  return `https://raw.githubusercontent.com/CyberGems/${encodeURIComponent(repo)}/${encodeURIComponent(ref)}/${encodedPath}`;
}

async function validateIcon(buffer, label) {
  if (!buffer.length || buffer.length > maxIconBytes) {
    throw new Error(`${label} has an invalid file size (${buffer.length} bytes)`);
  }

  const metadata = await sharp(buffer, { failOn: 'error' }).metadata();
  if (metadata.format !== 'png') {
    throw new Error(`${label} is ${metadata.format ?? 'an unknown format'}, expected PNG`);
  }
  if (!metadata.width || !metadata.height || metadata.width < 128 || metadata.height < 128) {
    throw new Error(`${label} is smaller than the required 128x128 pixels`);
  }
  if (metadata.width !== metadata.height) {
    throw new Error(`${label} is not square (${metadata.width}x${metadata.height})`);
  }

  return metadata;
}

async function downloadIcon(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
  try {
    const response = await fetch(rawGitHubUrl(source), {
      signal: controller.signal,
      cache: 'no-store',
      headers: { 'User-Agent': 'CyberGems-Website-Icon-Sync' },
    });
    if (!response.ok) {
      throw new Error(`GitHub returned HTTP ${response.status}`);
    }
    return Buffer.from(await response.arrayBuffer());
  } finally {
    clearTimeout(timeout);
  }
}

async function loadCanonicalIcon(source) {
  const localPath = path.join(siblingProjectsDir, source.repo, ...source.source.split('/'));
  if (!isCi && fs.existsSync(localPath)) {
    return { buffer: fs.readFileSync(localPath), origin: `local ${source.repo}/${source.source}` };
  }
  return { buffer: await downloadIcon(source), origin: `${source.repo}@${source.ref}/${source.source}` };
}

const stats = { updated: 0, unchanged: 0, fallback: 0 };

for (const source of iconSources) {
  const target = path.join(targetDir, `${source.slug}.png`);
  try {
    const { buffer, origin } = await loadCanonicalIcon(source);
    const metadata = await validateIcon(buffer, origin);
    const current = fs.existsSync(target) ? fs.readFileSync(target) : null;

    if (current?.equals(buffer)) {
      stats.unchanged += 1;
      console.log(`  ✓ icon ${source.slug} unchanged (${metadata.width}x${metadata.height}, ${origin})`);
      continue;
    }

    fs.writeFileSync(target, buffer);
    stats.updated += 1;
    console.log(`  ↻ icon ${source.slug} updated (${metadata.width}x${metadata.height}, ${origin})`);
  } catch (error) {
    try {
      if (!fs.existsSync(target)) throw new Error('no fallback file exists');
      const fallback = fs.readFileSync(target);
      const metadata = await validateIcon(fallback, `fallback ${target}`);
      stats.fallback += 1;
      console.warn(`  ⚠ icon ${source.slug} sync failed; keeping ${metadata.width}x${metadata.height} fallback: ${error.message}`);
    } catch (fallbackError) {
      console.error(`  ✗ icon ${source.slug} has no valid source or fallback: ${fallbackError.message}`);
      process.exitCode = 1;
    }
  }
}

console.log(`Icon sync: ${stats.updated} updated, ${stats.unchanged} unchanged, ${stats.fallback} fallback`);
