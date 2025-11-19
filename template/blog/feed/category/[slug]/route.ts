import { dibApi } from '../../../../../dib-lib/api';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const data = await dibApi.fetchCategoryFeed({ slug });
  const headers: HeadersInit = {};
  if (data.content_type) {
    headers['Content-Type'] = data.content_type;
  }

  return new NextResponse(data.feed, {
    headers,
  });
}
