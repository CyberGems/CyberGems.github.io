export type Lang = 'en' | 'es';

export interface LocalizedText {
  en: string;
  es: string;
}

export interface CyberApp {
  /** URL slug, e.g. "cybersnap" -> /apps/cybersnap */
  slug: string;
  name: string;
  emoji: string;
  /** Hex accent color used for gradients & highlights */
  accent: string;
  /** Tech stack label */
  stack: string;
  license: string;
  tagline: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
  repo: string;
  /** GitHub wiki URL (empty string if the repo has no wiki) */
  wiki: string;
  /** winget package id, if published */
  winget?: string;
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

export const apps: CyberApp[] = [
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
] as CyberApp[];

export function getApp(slug: string): CyberApp | undefined {
  return apps.find((a) => a.slug === slug);
}
