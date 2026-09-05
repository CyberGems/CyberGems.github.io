import { apps } from './apps';

export interface ReleaseInfo {
  tag: string;
  name: string;
  url: string;
  publishedAt: string;
  body: string;
}

export interface AppReleases {
  slug: string;
  name: string;
  emoji: string;
  accent: string;
  releases: ReleaseInfo[];
}

const PER_PAGE = 6;
const REPO_OWNER = 'CyberGems';

/**
 * Fetches the latest releases of every app in the suite. Runs at build time:
 * the generated page is fully static until the next deploy.
 *
 * Uses GITHUB_TOKEN when available (set in the GitHub Actions workflow) to get
 * a high rate limit; falls back to unauthenticated requests locally.
 */
export async function fetchAllReleases(): Promise<{ apps: AppReleases[]; failed: boolean }> {
  const token = import.meta.env.GITHUB_TOKEN as string | undefined;
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const results = await Promise.all(
    apps.map(async (app): Promise<AppReleases> => {
      const base = {
        slug: app.slug,
        name: app.name,
        emoji: app.emoji,
        accent: app.accent,
      };
      try {
        const res = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${app.slug}/releases?per_page=${PER_PAGE}`,
          { headers }
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: unknown = await res.json();
        const list = Array.isArray(json) ? json : [];
        const releases: ReleaseInfo[] = list.map((r: any) => ({
          tag: r.tag_name ?? '',
          name: r.name || r.tag_name || '',
          url: r.html_url ?? '',
          publishedAt: r.published_at ?? '',
          body: r.body ?? '',
        }));
        return { ...base, releases };
      } catch {
        return { ...base, releases: [] };
      }
    })
  );

  const failed = results.some((r) => r.releases.length === 0);
  return { apps: results, failed };
}

export interface ReleaseAsset {
  name: string;
  url: string;
  size: number;
}

export interface LatestDownload {
  tag: string;
  publishedAt: string;
  releaseUrl: string;
  /** Setup installer (.exe, non-portable) when the release offers one */
  installer: ReleaseAsset | null;
  /** Portable .zip when the release offers one */
  portable: ReleaseAsset | null;
  /** SHA256 / checksum asset when the release offers one */
  checksum: ReleaseAsset | null;
}

function pickAsset(assets: any[], test: RegExp, prefer?: RegExp): ReleaseAsset | null {
  const list = (assets || []).filter((a) => test.test(a.name || ''));
  if (list.length === 0) return null;
  const chosen = (prefer && list.find((a) => prefer.test(a.name || ''))) || list[0];
  return { name: chosen.name ?? '', url: chosen.browser_download_url ?? '', size: chosen.size ?? 0 };
}

async function fetchLatestDownloadsOnce(): Promise<{
  downloads: Record<string, LatestDownload>;
  failed: boolean;
}> {
  const token = import.meta.env.GITHUB_TOKEN as string | undefined;
  const headers: Record<string, string> = { Accept: 'application/vnd.github+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const entries = await Promise.all(
    apps.map(async (app): Promise<[string, LatestDownload]> => {
      const empty: LatestDownload = {
        tag: '',
        publishedAt: '',
        releaseUrl: `${app.repo}/releases/latest`,
        installer: null,
        portable: null,
        checksum: null,
      };
      try {
        const res = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${app.slug}/releases/latest`, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const r: any = await res.json();
        const assets: any[] = Array.isArray(r.assets) ? r.assets : [];
        return [
          app.slug,
          {
            tag: r.tag_name ?? '',
            publishedAt: r.published_at ?? '',
            releaseUrl: r.html_url ?? empty.releaseUrl,
            installer: pickAsset(assets, /\.exe$/i, /setup|install/i),
            portable: pickAsset(assets, /\.zip$/i, /portable/i),
            checksum: pickAsset(assets, /sha2?56|checksum/i),
          },
        ];
      } catch {
        return [app.slug, empty];
      }
    })
  );

  const downloads: Record<string, LatestDownload> = {};
  for (const [slug, dl] of entries) downloads[slug] = dl;
  const failed = entries.every(([, dl]) => !dl.tag);
  return { downloads, failed };
}

let latestDownloadsCache: Promise<{ downloads: Record<string, LatestDownload>; failed: boolean }> | null = null;

/**
 * Latest release download info for every app, fetched at build time.
 * Memoized so the EN and ES download pages share one fetch round per build.
 */
export function fetchLatestDownloads(): Promise<{ downloads: Record<string, LatestDownload>; failed: boolean }> {
  latestDownloadsCache ??= fetchLatestDownloadsOnce();
  return latestDownloadsCache;
}