import { DibApi } from '@dropinblog/nextjs-rendered';
const token = 'YOUR_DROPINBLOG_API_TOKEN'; // Replace with your actual API token
const blogId = 'YOUR_BLOG_ID'; // Replace with your actual blog ID

export const dibApi = new DibApi(token, blogId);
