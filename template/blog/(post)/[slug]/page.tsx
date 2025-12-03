import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';
import React from 'react';
import { dibApi } from '../../../../dib-lib/api';

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
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
