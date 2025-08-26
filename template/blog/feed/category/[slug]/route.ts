import { dibApi } from '../../../../../dib-lib/api';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const json = await dibApi.fetchCategoryFeed({ slug });
  return new NextResponse(json.data.feed, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
