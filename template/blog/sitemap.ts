import { MetadataRoute } from 'next';
import React from 'react';
import { dibApi } from '../../dib-lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const data = await dibApi.fetchSitemap();

    const urlRegex = /<url>([\s\S]*?)<\/url>/g;
    const locRegex = /<loc>(.*?)<\/loc>/;
    const lastmodRegex = /<lastmod>(.*?)<\/lastmod>/;

    const urls: MetadataRoute.Sitemap = [];
    const matches = data?.sitemap?.match(urlRegex) || [];

    if (!matches.length) {
      return urls;
    }

    for (const urlBlock of matches) {
      const locMatch = urlBlock.match(locRegex);
      const lastmodMatch = urlBlock.match(lastmodRegex);

      if (locMatch) {
        urls.push({
          url: locMatch[1],
          lastModified: lastmodMatch ? lastmodMatch[1] : undefined,
        });
      }
    }

    return urls;
  } catch (error) {
    return [];
  }
}