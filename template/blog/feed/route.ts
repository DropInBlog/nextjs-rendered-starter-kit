import { dibApi } from '../../../dib-lib/api';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await dibApi.fetchBlogFeed();
    const headers: HeadersInit = {};
    if (data.content_type) {
      headers['Content-Type'] = data.content_type;
    }

    return new NextResponse(data.feed, {
      headers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog feed' },
      { status: 500 }
    );
  }

}
