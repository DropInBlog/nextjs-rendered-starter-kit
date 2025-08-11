import { dibApi } from '@/lib/api';
import { DibPageFetcher, dibUtils } from '@dropinblog/nextjs-rendered';

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
  return <DibPageFetcher body_html={body_html} head_data={head_data} />;
}
