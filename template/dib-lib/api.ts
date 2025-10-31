import DibApi from "@dropinblog/dropinblog-api-client";

const token = process.env.DROPINBLOG_API_TOKEN as string;
const blogId = process.env.DROPINBLOG_BLOG_ID as string;

export const dibApi = new DibApi(token, blogId);
