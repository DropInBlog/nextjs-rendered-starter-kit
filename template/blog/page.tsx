import { dibApi } from '../../dib-lib/api';
import { DibPageFetcher, dibUtils } from '@dropinblog/nextjs-page-fetcher';

// ✅ metadata
export const generateMetadata = () =>
  dibUtils.generateMetadataFromFetcher(dibApi.fetchMainList);

export default async function Blog() {
  const { body_html, head_data } = await dibApi.fetchMainList();

  return <DibPageFetcher body_html={body_html} head_data={head_data} />;
}
