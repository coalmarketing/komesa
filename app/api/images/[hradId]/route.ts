import { NextRequest, NextResponse } from 'next/server';

const imageManifest: Record<number, string[]> = {
  1: [
    '/new-photo/06_vlnka/IMG_4680.webp',
    '/new-photo/06_vlnka/IMG_4698.webp',
    '/new-photo/06_vlnka/IMG_7094.webp',
    '/new-photo/06_vlnka/IMG_8476.webp',
  ],
  2: [
    '/new-photo/07_veze/IMG_1004.webp',
    '/new-photo/07_veze/IMG_1141.webp',
    '/new-photo/07_veze/IMG_1764.webp',
    '/new-photo/07_veze/IMG_5468.webp',
  ],
  3: [
    '/new-photo/05_skok/IMG_3455.webp',
    '/new-photo/05_skok/IMG_3473.webp',
    '/new-photo/05_skok/IMG_4214.webp',
    '/new-photo/05_skok/IMG_9020.webp',
  ],
  4: [
    '/new-photo/04_pirat/IMG_1569.webp',
    '/new-photo/04_pirat/IMG_2925.webp',
    '/new-photo/04_pirat/IMG_3930.webp',
    '/new-photo/04_pirat/IMG_5667.webp',
  ],
  5: [
    '/new-photo/03_dve-skluzavky/IMG_1380.webp',
    '/new-photo/03_dve-skluzavky/IMG_2373.webp',
    '/new-photo/03_dve-skluzavky/IMG_3719.webp',
    '/new-photo/03_dve-skluzavky/IMG_9491.webp',
  ],
  6: [
    '/new-photo/02_tunel/IMG_3373.webp',
    '/new-photo/02_tunel/IMG_4394.webp',
    '/new-photo/02_tunel/IMG_5629.webp',
    '/new-photo/02_tunel/IMG_8919.webp',
  ],
  7: [
    '/new-photo/01_minihrad/01-01.webp',
    '/new-photo/01_minihrad/02-01.webp',
    '/new-photo/01_minihrad/03-01.webp',
    '/new-photo/01_minihrad/04-01.webp',
  ],
};

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ hradId: string }> }
) {
  const { hradId } = await params;
  const id = parseInt(hradId);
  const images = imageManifest[id] ?? [];
  return NextResponse.json({ images });
}


