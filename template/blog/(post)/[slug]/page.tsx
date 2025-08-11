import { dibApi } from '@/lib/api';
import { DibPageFetcher, dibUtils } from '@dropinblog/nextjs-rendered';
import React from 'react';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchPost, params);

export default async function Blog({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { body_html, head_data } = await dibApi.fetchPost({
    slug,
  });
  return <DibPageFetcher body_html={body_html} head_data={head_data} />;
}
