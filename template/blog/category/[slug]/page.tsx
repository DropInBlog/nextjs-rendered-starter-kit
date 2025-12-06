import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';
import { dibApi } from '../../../../dib-lib/api';
export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchCategories, params);

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  let data;
  try {
    const { slug } = await params;
    data = await dibApi.fetchCategories({
      slug,
    });
  } catch (error) {
    throw error;
  }
  const { body_html, head_data } = data || {};

  if (body_html && head_data)
    return <DibBlog body_html={body_html} head_data={head_data} />;
}
