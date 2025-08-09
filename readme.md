# @dropinblog/nextjs-rendered-starter-kit

A CLI tool to quickly add a DropInBlog-powered `/blog` route and supporting library to your Next.js project.

## Features

- Installs a ready-to-use `/blog` route with DropInBlog integration.
- Adds a `/dib-lib` folder with API helpers.
- Supports Next.js projects with or without a `src/` directory.
- Safe: will not overwrite existing `/blog` or `/dib-lib` folders.

## Installation

```sh
npm install @dropinblog/nextjs-rendered
```

## Usage

Run the CLI in the root of your Next.js project:

```sh
npx create-nextjs-dib-blog
```

You will be prompted to confirm if your project uses a `src/` directory.

- If **yes**, `/blog` and `/dib-lib` will be added to `src/app` and `src/dib-lib`.
- If **no**, they will be added to `app` and `dib-lib` at the project root.

## What’s Included

- `/blog`: All the necessary pages for posts, categories, authors, and pagination.
- `/dib-lib/api.ts`: Pre-configured DropInBlog API helper.

## Configuration

1. Open `dib-lib/api.ts` and replace the placeholders with your actual DropInBlog API token and blog ID:

   ```ts
   const token = 'YOUR_DROPINBLOG_API_TOKEN'; // Replace with your actual API token
   const blogId = 'YOUR_BLOG_ID'; // Replace with your actual blog ID
   ```

2. Deploy or run your Next.js app. The `/blog` route is now live and powered by DropInBlog.

## Requirements

- Node.js 16+
- Next.js 13+ (with App Router)

## License

ISC

## Links

- [DropInBlog](https://dropinblog.com/)
