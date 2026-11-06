export type Lang = 'en' | 'es';

export interface LocalizedText {
  en: string;
  es: string;
}

export interface UseCase {
  icon: string;
  title: LocalizedText;
  text: LocalizedText;
}

export interface HowItWorksStep {
  icon: string;
  title: LocalizedText;
  text: LocalizedText;
}

export interface HighlightCard {
  icon: string;
  /** Optional hex color for the icon tile (falls back to the app accent) */
  color?: string;
  title: LocalizedText;
  text: LocalizedText;
}

export interface CyberApp {
  /** URL slug, e.g. "cybersnap" -> /apps/cybersnap */
  slug: string;
  /** Explicit editorial approval. Missing or false keeps the app off the public site. */
  published: boolean;
  name: string;
  emoji: string;
  /** Official app icon stored in the website's public assets */
  icon?: string;
  /** Hex accent color used for gradients & highlights */
  accent: string;
  /** Tech stack label */
  stack: string;
  license: string;
  tagline: LocalizedText;
  /** Optional shorter tagline used in generated README banners and social cards (falls back to tagline) */
  bannerTagline?: LocalizedText;
  /** Optional hex color for the name suffix in generated README banners (falls back to accent) */
  bannerTitleAccent?: string;
  description: LocalizedText;
  features: LocalizedText[];
  repo: string;
  /** GitHub wiki URL (empty string if the repo has no wiki) */
  wiki: string;
  /** winget package id, if published */
  winget?: string;
  /** Optional code signing note rendered in "Requirements & safety" */
  codeSigning?: LocalizedText;
  /** Optional link to the project's code signing policy page */
  codeSigningPolicy?: string;
  /** Optional role/task use cases rendered as "By Role" / "By Task" sections */
  useCases?: {
    roles: UseCase[];
    tasks: UseCase[];
  };
  /** Optional "how it works" 3-step strip (numbered badges + icons) */
  howItWorks?: {
    title: LocalizedText;
    steps: HowItWorksStep[];
  };
  /** Optional highlight cards grid (icon tile + title + text) */
  highlights?: HighlightCard[];
  /** Optional editorial headings for the highlights grid and supporting feature list */
  highlightsTitle?: LocalizedText;
  featuresHeading?: LocalizedText;
  /** Conceptual visual shown only until a real screenshot is available */
  explainer?: 'connection-flow' | 'feed-flow' | 'launcher-flow' | 'viewer-flow' | 'tray-flow' | 'manager-flow' | 'notes-flow' | 'snap-flow' | 'paste-flow' | 'clock-flow';
  /** Screenshot: bare filename resolved to /screenshots/<slug>/, or an
      absolute public path (as written by the CMS), or null for the placeholder */
  screenshot: string | null;
}

// One JSON file per app — editable in the CMS at /admin.
import cybersnap from './apps/cybersnap.json';
import cybermanager from './apps/cybermanager.json';
import cybertray from './apps/cybertray.json';
import cyberfeeds from './apps/cyberfeeds.json';
import cybernotes from './apps/cybernotes.json';
import cyberpaste from './apps/cyberpaste.json';
import cyberwall from './apps/cyberwall.json';
import cyberviewer from './apps/cyberviewer.json';
import cyberlauncher from './apps/cyberlauncher.json';
import cyberclock from './apps/cyberclock.json';
import cybergo from './apps/cybergo.json';
import bannerOnly from './banner-apps.json';

const appEntries: CyberApp[] = [
  cybersnap,
  cybermanager,
  cybertray,
  cyberfeeds,
  cybernotes,
  cyberpaste,
  cyberwall,
  cyberviewer,
  cyberlauncher,
  cyberclock,
  cybergo,
] as CyberApp[];

// Public consumers, including routes, navigation, releases and social images,
// must use this list rather than publishing every editorial source file.
export const apps = appEntries.filter((app) => app.published === true);

export function getApp(slug: string): CyberApp | undefined {
  return apps.find((a) => a.slug === slug);
}

/** Minimal shape the generated README banner needs. */
export interface BannerSource {
  slug: string;
  name: string;
  emoji?: string;
  icon?: string;
  accent?: string;
  tagline?: LocalizedText;
  bannerTagline?: LocalizedText;
  bannerTitleAccent?: string;
}

/**
 * Banners are served for every app, including unpublished ones and apps that
 * are not on the site yet, so their READMEs can use a generated image without
 * exposing an app page.
 */
export const bannerApps: BannerSource[] = [
  ...appEntries.map((app) => ({
    slug: app.slug,
    name: app.name,
    emoji: app.emoji,
    icon: app.icon,
    accent: app.accent,
    tagline: app.tagline,
    bannerTagline: app.bannerTagline,
    bannerTitleAccent: app.bannerTitleAccent,
  })),
  ...(bannerOnly as BannerSource[]),
];
