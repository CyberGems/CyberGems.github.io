// Central site links — edit me.
// Fill in your real handles/URLs. Sections render ONLY when configured
// (null = hidden), so the Donate page never shows dead buttons.
export interface CryptoEntry {
  label: string; // e.g. 'Bitcoin'
  network?: string; // e.g. 'BTC', 'ERC-20'
  address: string;
  qr?: string; // e.g. '/donate/qr-btc.png' — served locally from public/
  icon?: string; // e.g. '/donate/btc.svg' — coin brand icon, served locally
}
export const site = {
  githubOrg: 'https://github.com/CyberGems',
  profileRepo: 'https://github.com/CyberGems/CyberGems',
  // GitHub Sponsors is recommended (0 fees, integrated with the org).
  // Create it at https://github.com/sponsors and paste the URL here.
  sponsors: 'https://github.com/sponsors/CyberGems',
  // Official one-way links (no third-party JS — privacy-friendly).
  // Values verified against CyberViewer / CyberSnap READMEs.
  paypal: 'https://www.paypal.com/donate/?hosted_button_id=M4PY3UPJA5Y6Q',
  kofi: 'https://ko-fi.com/cybergems',
  bmc: 'https://www.buymeacoffee.com/cybergems',
  // Crypto — addresses verified against CyberViewer / CyberSnap READMEs.
  // QR images served locally from public/donate/ (copied from CyberViewer docs).
  crypto: [
    { label: 'Bitcoin', network: 'BTC', address: 'bc1q5mxzz05nmvsheqzx7970euswta3fksxzcfzag4', qr: '/donate/qr-btc.png', icon: '/donate/btc.svg' },
    { label: 'Ethereum', network: 'ETH', address: '0x79b703Ec0f77493679Fcd280aF3b983E20c580B8', qr: '/donate/qr-eth.png', icon: '/donate/eth.svg' },
    { label: 'USDT', network: 'ERC20 / BEP20', address: '0x79b703Ec0f77493679Fcd280aF3b983E20c580B8', qr: '/donate/qr-eth.png', icon: '/donate/usdt.svg' },
    { label: 'USDT', network: 'TRC20', address: 'TSVbSk1HSyZ1NprCnAYiw56ECwXgH887mD', qr: '/donate/qr-usdt-tron.png', icon: '/donate/usdt.svg' },
    { label: 'Litecoin', network: 'LTC', address: 'LWGnEHgcFCE2BRkzLnsdPDD8Y8ZeDK577X', qr: '/donate/qr-ltc.png', icon: '/donate/ltc.svg' },
  ] as CryptoEntry[],
  // Contact / support
  issuesTemplate: (slug: string) => `https://github.com/CyberGems/${slug}/issues/new`,
  discussions: 'https://github.com/CyberGems/CyberGems/discussions',
};
