export type Lang = 'en' | 'es';

// Shared UI strings — data lives in ui.json (editable in the CMS at /admin).
// Keep this wrapper so components keep importing from '../data/ui'.
import data from './ui.json';

/** Shared UI strings for the site chrome (nav, hero, sections, footer). */
export const ui = data as Record<Lang, Record<string, string>>;
