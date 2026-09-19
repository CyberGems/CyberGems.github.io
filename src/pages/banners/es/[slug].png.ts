import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { apps } from '../../../data/apps';
import { readmeBannerSvg } from '../../../utils/og';

export function getStaticPaths() {
  return apps.map((app) => ({ params: { slug: app.slug } }));
}

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug as string;
  const app = apps.find((candidate) => candidate.slug === slug);
  if (!app) return new Response('Not found', { status: 404 });

  const png = await sharp(Buffer.from(readmeBannerSvg(app, 'es'))).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600, must-revalidate',
    },
  });
};
