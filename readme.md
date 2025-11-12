# @dropinblog/nextjs-rendered-starter-kit

A CLI that scaffolds a DropInBlog-powered `/blog` into an existing Next.js project.  
It automatically adds a complete blog route along with a helper library for fetching pre-rendered content from DropInBlog’s API — and can optionally install all required dependencies for you.

## ✨ Features

- Installs a ready-to-use `/blog` route with DropInBlog integration.
- Automatically creates `/dib-lib` helper library for fetching and rendering content.
- Detects whether your project uses a `src/` folder.
- Optional command line parameter `--no-src` Project does not use src folder.
- Supports **npm**, **yarn**, and **pnpm** automatically.
- Optionally installs required dependencies:
  - [`@dropinblog/nextjs-rendered`](https://www.npmjs.com/package/@dropinblog/nextjs-rendered)
  - [`@dropinblog/api-client`](https://www.npmjs.com/package/@dropinblog/api-client)
- Includes:
  - Blog index with pagination.
  - Category and author routes.
  - Single post route.
  - Sitemap generation.
  - RSS feeds (main, category, and author).

---

## 🚀 Usage

Run this command in the **root** of your Next.js project:

```bash
npx @dropinblog/nextjs-rendered-starter-kit
```

You’ll be asked a few interactive questions:

1. **Is your Next.js project using the `src/` folder?**

   - If **yes**, `/blog` and `/dib-lib` will be added to `src/app` and `src/dib-lib`.
   - If **no**, they will be added to `app` and `dib-lib` in your project root.

2. **Do you want to install DropInBlog dependencies now?**
   - If you confirm, the CLI automatically installs the required packages using your preferred package manager (npm, yarn, or pnpm).

---

## 🧩 Manual Dependency Installation (optional)

If you skipped automatic installation, run this manually:

```bash
npm install @dropinblog/nextjs-rendered @dropinblog/api-client
```

or with Yarn:

```bash
yarn add @dropinblog/nextjs-rendered @dropinblog/api-client
```

---

## 📁 What’s Included

- **`/blog`** → A fully functional DropInBlog route (list, post, category, author, sitemap, and RSS).
- **`/dib-lib/api.ts`** → Preconfigured helper for fetching data from the DropInBlog API.

---

## ⚙️ Configuration

1. Add your DropInBlog credentials to your `.env` file:

   ```bash
   DROPINBLOG_API_TOKEN=your_api_token_here
   DROPINBLOG_BLOG_ID=your_blog_id_here
   ```

2. Start or deploy your Next.js app — your blog is live at:

   ```
   /blog
   ```

---

## 📦 Requirements

- **Node.js 18+**
- **Next.js 13+** (App Router required)

---

## 📄 License

ISC

---

## 🔗 Links

- [DropInBlog](https://dropinblog.com/)
- [@dropinblog/nextjs-rendered](https://www.npmjs.com/package/@dropinblog/nextjs-rendered)
- [@dropinblog/api-client](https://www.npmjs.com/package/@dropinblog/api-client)
