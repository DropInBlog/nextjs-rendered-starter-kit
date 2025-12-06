import { dibApi } from '../../dib-lib/api';
import { DibBlog, dibUtils } from '@dropinblog/nextjs-rendered';

// ✅ metadata
export const generateMetadata = () =>
  dibUtils.generateMetadataFromFetcher(dibApi.fetchMainList);

export default async function Blog() {
  let data;
  try {
    data = await dibApi.fetchMainList();
  } catch (error) {
    throw error;
  }
  const { body_html, head_data } = data || {};
  if (body_html && head_data) {
    return <DibBlog body_html={body_html} head_data={head_data} />;
  }


}
