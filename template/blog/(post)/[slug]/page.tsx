import React from 'react';
import { dibApi } from '../../../../dib-lib/api';
import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchPost, params);

export default async function Blog({ params }: { params: { slug: string } }) {
  let data;
  try {
    const { slug } = await params;
    data = await dibApi.fetchPost({
      slug,
    });

  } catch (error) {
    throw error;
  }

  const { body_html, head_data } = data || {};

  if (body_html && head_data) {
    return <DibBlog body_html={body_html} head_data={head_data} />;
  }

}
