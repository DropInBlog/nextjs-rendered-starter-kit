import { dibApi } from '@/lib/api';
import React from 'react';
import xml2js from 'xml2js';

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const json = await dibApi.fetchAuthorFeed({ slug });

  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(json.data.feed);

  const items = parsed.rss.channel.item;
  return (
    <div>
      {items.map((post: any) => (
        <div key={post.guid} style={{ marginBottom: '2rem' }}>
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            {post.title}
          </a>
          <p>{post['dc:creator']}</p>
          <p>{post.pubDate}</p>
          {post['media:content']?.$?.url && (
            <img
              src={post['media:content'].$.url}
              alt={post.title}
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          )}
          <p>{post.description}</p>

          <div>{post['content:encoded']}</div>
        </div>
      ))}
    </div>
  );
};

export default page;
