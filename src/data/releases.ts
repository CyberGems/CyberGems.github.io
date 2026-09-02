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
