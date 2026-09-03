import type { APIRoute } from 'astro';
import sharp from 'sharp';
import { ogSvg } from '../utils/og';

export const GET: APIRoute = async () => {
  const svg = ogSvg();
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
