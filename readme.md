# @dropinblog/nextjs-rendered-starter-kit

A CLI that scaffolds a DropInBlog‑powered /blog into an existing Next.js project. It adds a complete blog route along with a tiny helper library for fetching pre‑rendered content from DropInBlog’s API.

## Features

- Installs a ready-to-use `/blog` route with DropInBlog integration.
- Includes main list, category list and author list routes with pagination.
- Includes single post route.
- Includes sitemap route.
- Includes main RSS feed, category RSS feed and author RSS feed.

## Installation

```sh
npm install @dropinblog/nextjs-rendered
```

## Usage

Run the CLI in the root of your Next.js project:

```sh
npx @dropinblog/nextjs-rendered-starter-kit
```

You will be prompted to confirm if your project uses a `src/` directory.

- If **yes**, `/blog` and `/dib-lib` will be added to `src/app` and `src/dib-lib`.
- If **no**, they will be added to `app` and `dib-lib` at the project root.

## What’s Included

- `/blog`: All the necessary pages for sitemap, posts, categories, authors, feeds, and pagination.
- `/dib-lib/api.ts`: Pre-configured DropInBlog API helper.

## Configuration

1. Add your DropInBlog API token and blog ID to your .env:

   ```ts
   DROPINBLOG_API_TOKEN=your_api_token_here
   DROPINBLOG_BLOG_ID=your_blog_id_here
   ```

2. Deploy or run your Next.js app. The `/blog` route is now live and powered by DropInBlog.

## Requirements

- Node.js 18+
- Next.js 13+ (with App Router)

## License

ISC

## Links

- [DropInBlog](https://dropinblog.com/)
