import { dibApi } from '../../../dib-lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
  const json = await dibApi.fetchBlogFeed();
  return new NextResponse(json.data.feed, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}
