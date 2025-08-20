import { MetadataRoute } from 'next';
import xml2js from 'xml2js';
import React from 'react';
import { dibApi } from '../../dib-lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const json = await dibApi.fetchSitemap();

  const parser = new xml2js.Parser();
  const parsed = await parser.parseStringPromise(json.data.sitemap);

  const urls: MetadataRoute.Sitemap = parsed.urlset.url.map((item: any) => ({
    url: item.loc[0],
    lastModified: item.lastmod ? new Date(item.lastmod[0]) : undefined,
    changeFrequency: item.changeFrequency ? item.changeFrequency[0] : 'weekly',
    priority: item.priority ? parseFloat(item.priority[0]) : 0.8,
  }));

  return urls;
}
