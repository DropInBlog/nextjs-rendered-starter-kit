import React from 'react';
import { dibApi } from '../../../dib-lib/api';

export default async function BlogFeed() {
  const json = await dibApi.fetchBlogFeed();

  return (
    <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
      {json.data.feed}
    </pre>
  );
}
