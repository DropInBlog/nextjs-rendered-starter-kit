import { dibApi } from '../../../../dib-lib/api';

import React from 'react';
import xml2js from 'xml2js';

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const json = await dibApi.fetchCategoryFeed({ slug });

  const parser = new xml2js.Parser({ explicitArray: false });
  const parsed = await parser.parseStringPromise(json.data.feed);

  const item = parsed.rss.channel.item;
  return (
    <div>
      <a href={item.link}>{item.title}</a>
      <p>{item.pubDate}</p>
      <p>{item['dc:creator']}</p>
      <p>{item.guid}</p>
      <p>{item.description}</p>
      {item['media:content']?.$?.url && (
        <img
          src={item['media:content'].$.url}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      )}
      <br />
      <div>{item['content:encoded']}</div>
    </div>
  );
};

export default page;
