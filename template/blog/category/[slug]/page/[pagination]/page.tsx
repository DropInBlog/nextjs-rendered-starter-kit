import { dibApi } from '@/lib/api';
import { DibPageFetcher, dibUtils } from '@dropinblog/nextjs-rendered';
export const generateMetadata = async ({
  params,
}: {
  params: { pagination: string; slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchCategories, params);

export default async function CategoryPagination({
  params,
}: {
  params: { pagination: string; slug: string };
}) {
  const { pagination, slug } = await params;
  const { body_html, head_data } = await dibApi.fetchCategories({
    slug,
    pagination,
  });
  return <DibPageFetcher body_html={body_html} head_data={head_data} />;
}
