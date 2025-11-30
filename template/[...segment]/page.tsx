import { dibApi } from "../../dib-lib/api";
import { dibUtils, DibBlog } from "@dropinblog/nextjs-rendered";

async function getSegment(params: Promise<{
    segment: string[];
}>) {
    const { segment } = await params;
    let body_html: string | undefined;

    let head_data: {
        title: string;
        rss_url: string;
        seo_url_next: string;
        css: string;
        js: string;
    } | undefined;

    try {
        if (segment.length === 1 && segment[0] === "blog") {

            // /blog (main page)
            const res = await dibApi.fetchMainList();
            body_html = res?.body_html;
            head_data = res?.head_data;

        } else if (segment.length > 1 && segment[0] === "blog") {
            if (segment[1] === "author") {
                let res;
                if (segment[3] === "page") {
                    // /blog/author/[slug]/page/[pageNumber]
                    const pageNum = segment[4];
                    res = await dibApi.fetchAuthor({ slug: segment[2], pagination: pageNum });

                } else {
                    // /blog/author/[slug]
                    res = await dibApi.fetchAuthor({ slug: segment[2] });
                }
                body_html = res?.body_html;
                head_data = res?.head_data;
            } else if (segment[1] === "category") {
                let res;
                if (segment[3] === "page") {
                    // /blog/category/[slug]/page/[pageNumber]
                    const pageNum = segment[4];
                    res = await dibApi.fetchCategories({ slug: segment[2], pagination: pageNum });
                } else {
                    // /blog/category/[slug]
                    res = await dibApi.fetchCategories({ slug: segment[2] });
                }
                body_html = res?.body_html;
                head_data = res?.head_data;
            } else if (segment[1] === "page") {
                // /blog/page/[pageNumber]
                const pageNum = segment[2];
                const res = await dibApi.fetchMainList({ pagination: pageNum });
                body_html = res?.body_html;
                head_data = res?.head_data;
            }
            else if (segment[1] === 'sitemap.xml') {
                return
            }
            else if (segment[1] === 'feed') {
                return
            } else {
                // /blog/[post-slug]
                const res = await dibApi.fetchPost({ slug: segment[1] });
                body_html = res?.body_html;
                head_data = res?.head_data;
            }


        }

        return [body_html, head_data]
    } catch (error) {
        throw error;
    }

}

export async function generateMetadata({
    params,
}: {
    params: Promise<{
        segment: string[];
    }>;
}) {
    const { segment } = await params;

    if (segment.length === 1 && segment[0] === "blog") {
        // /blog (main page)
        return dibUtils.generateMetadataFromFetcher(dibApi.fetchMainList);
    }

    if (segment.length > 1 && segment[0] === "blog") {
        if (segment[1] === "author") {
            // /blog/author/[slug]...
            const pageNum = segment[3] === "page" ? segment[4] : undefined;
            return dibUtils.generateMetadataFromFetcher(() => dibApi.fetchAuthor({ slug: segment[2], pagination: pageNum }));
        }

        if (segment[1] === "category") {
            // /blog/category/[slug]...
            const pageNum = segment[3] === "page" ? segment[4] : undefined;
            return dibUtils.generateMetadataFromFetcher(() => dibApi.fetchCategories({ slug: segment[2], pagination: pageNum }));
        }

        if (segment[1] === "page") {
            // /blog/page/[pageNumber]
            return dibUtils.generateMetadataFromFetcher(() => dibApi.fetchMainList({ pagination: segment[2] }));
        }
        if (segment[1] === 'sitemap.xml') {
            return
        }
        if (segment[1] === 'feed') {
            return
        }

        // /blog/[post-slug]
        return dibUtils.generateMetadataFromFetcher(() => dibApi.fetchPost({ slug: segment[1] }));
    }
}


export default async function BlogPage({
    params,
}: {
    params: Promise<{ segment: string[] }>;
}) {
    const [body_html, head_data] = await getSegment(params) || [];
    const bodyHtmlString = typeof body_html === 'string' ? body_html : undefined;
    const headData = (head_data && typeof head_data === 'object') ? head_data : undefined;

    return <>
        {headData && bodyHtmlString && (
            <DibBlog.BodyTag body_html={bodyHtmlString} head_data={headData} />
        )}
    </>
}
