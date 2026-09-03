import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { apps } from '../../../data/apps';
import { ogSvg } from '../../../utils/og';

export function getStaticPaths() {
  return apps.map((app) => ({ params: { slug: app.slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug as string;
  const app = apps.find((a) => a.slug === slug);
  if (!app) return new Response('Not found', { status: 404 });
  const svg = ogSvg(app, 'es');
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
