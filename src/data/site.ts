// Site links — data lives in site.json (editable in the CMS at /admin).
// Functions stay here because JSON cannot hold code.
import data from './site.json';

export interface CryptoEntry {
  label: string;
  network?: string;
  address: string;
  qr?: string;
  icon?: string;
}

export const site = {
  githubOrg: 'https://github.com/CyberGems',
  profileRepo: 'https://github.com/CyberGems/CyberGems',
  sponsors: data.sponsors as string,
  paypal: data.paypal as string | null,
  kofi: data.kofi as string | null,
  bmc: data.bmc as string | null,
  crypto: data.crypto as CryptoEntry[],
  // Contact / support
  issuesTemplate: (slug: string) => `https://github.com/CyberGems/${slug}/issues/new`,
  discussions: 'https://github.com/CyberGems/CyberGems/discussions',
};
