import { dibApi } from '../../../../../dib-lib/api';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const data = await dibApi.fetchAuthorFeed({ slug });

    const headers: HeadersInit = {};
    if (data.content_type) {
      headers['Content-Type'] = data.content_type;
    }

    return new NextResponse(data.feed, {
      headers,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch blog author feed' },
      { status: 500 }
    );
  }

}