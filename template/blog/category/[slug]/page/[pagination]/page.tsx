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
  let data;
  try {
    const { pagination, slug } = await params;
    data = await dibApi.fetchCategories({
      slug,
      pagination,
    });
  } catch (error) {
    throw error;
  }
  const { body_html, head_data } = data || {};

  if (body_html && head_data)
    return <DibBlog body_html={body_html} head_data={head_data} />;
}
