import { DibPageFetcher, dibUtils } from '@dropinblog/nextjs-rendered';
import { dibApi } from '../../../../dib-lib/api';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => dibUtils.generateMetadataFromFetcher(dibApi.fetchAuthor, params);

export default async function Author({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { body_html, head_data } = await dibApi.fetchAuthor({
    slug,
  });
  return <DibPageFetcher body_html={body_html} head_data={head_data} />;
}
