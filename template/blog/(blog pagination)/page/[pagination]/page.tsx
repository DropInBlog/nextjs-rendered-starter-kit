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
  const p = await params;
  const { body_html, head_data } = await dibApi.fetchMainList(p);
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
