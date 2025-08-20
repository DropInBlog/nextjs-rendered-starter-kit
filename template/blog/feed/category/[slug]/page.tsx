import React from 'react';
import { dibApi } from '../../../../../dib-lib/api';

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const json = await dibApi.fetchCategoryFeed({ slug });

  return (
    <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
      {json.data.feed}
    </pre>
  );
};

export default page;
