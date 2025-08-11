import React from 'react';
import xml2js from 'xml2js';
import { dibApi } from '../../dib-lib/api';

export default async function BlogFeed() {
  const json = await dibApi.fetchBlogFeed();

  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(json.data.feed);

  const items = parsed.rss.channel.item;

  return (
    <div>
      <h1>{parsed.rss.channel.title}</h1>
      <ul>
        {items.map((post: any, i: number) => (
          <li
            key={i}
            style={{
              padding: '10px',
              marginBottom: '10px',
            }}
          >
            <a href={post.link}>{post.title}</a>
            <p>{post.pubDate}</p>
            <p>{post.guid}</p>
            <p>{post.description}</p>
            <div>{post['content:encoded']}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
