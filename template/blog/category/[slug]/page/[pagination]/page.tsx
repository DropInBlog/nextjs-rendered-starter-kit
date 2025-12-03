import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';
import { dibApi } from '../../../../../../dib-lib/api';
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
  return <DibBlog body_html={body_html} head_data={head_data} />;
}
