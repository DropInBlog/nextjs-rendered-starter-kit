import { dibApi } from '../../../../../dib-lib/api';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const json = await dibApi.fetchAuthorFeed({ slug });
  return new NextResponse(json.data.feed, {
    headers: {
      'Content-Type': json.data.content_type,
    },
  });
}
