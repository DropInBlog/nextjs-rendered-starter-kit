import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';
import { dibApi } from '../../../../../dib-lib/api';

export async function generateMetadata({
  params,
}: {
  params: { pagination: string };
}) {
  return dibUtils.generateMetadataFromFetcher(dibApi.fetchMainList, params);
}

export default async function BlogPagination({
  params,
}: {
  params: { pagination: string };
}) {
  let data;
  try {
    const p = await params;
    data = await dibApi.fetchMainList(p);
  } catch (error) {
    throw error;
  }

  const { body_html, head_data } = data || {};

  if (body_html && head_data) {
    return <DibBlog body_html={body_html} head_data={head_data} />;
  }
}
