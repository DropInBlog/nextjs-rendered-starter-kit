import { DibPageFetcher, dibUtils } from '@dropinblog/nextjs-rendered';
import { dibApi } from '../../../../../../dib-lib/api';

export const generateMetadata = async ({
  params,
}: {
  params: { pagination: string; slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchAuthor, params);

export default async function AuthorPagination({
  params,
}: {
  params: { pagination: string; slug: string };
}) {
  const { pagination, slug } = await params;
  const { body_html, head_data } = await dibApi.fetchAuthor({
    slug,
    pagination,
  });
  return <DibPageFetcher body_html={body_html} head_data={head_data} />;
}
