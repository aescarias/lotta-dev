import type { APIContext } from "astro";
import { getRssString } from "@astrojs/rss";
import { getCollection } from "astro:content";

import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

import { WEB_TITLE, WEB_DESCRIPTION } from "../common";

function beautifyXML(xml: string, tab = "\t"): string {
  let formatted = "";
  let indentLine = "";

  xml.split(/>\s*</).forEach((node) => {
    if (node.match(/^\/\w/)) indentLine = indentLine.substring(tab.length); // decrease indent by one 'tab'

    formatted += `${indentLine}<${node}>\r\n`;
    if (node.match(/^<?\w[^>]*[^\/]$/)) indentLine += tab; // increase indent
  });

  return formatted.substring(1, formatted.length - 3);
}

export async function GET(context: APIContext) {
  const posts = await getCollection("posts");

  const rssItems = posts.map(async (post) => ({
    title: post.data.title,
    link: `/posts/${post.id}/`,
    pubDate: post.data.published,    
    categories: post.data.tags,
    content: sanitizeHtml(await marked.parse(post.body || ""), {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    }),
    description: post.data.description,
  }));

  const doc = await getRssString({
    title: WEB_TITLE,
    description: WEB_DESCRIPTION,
    site: context.site || new URL("https://lotta.pages.dev"),
    stylesheet: "/rss/feed.xsl",
    items: await Promise.all(rssItems),
    customData: "<language>en-us</language>",
  });

  return new Response(beautifyXML(doc), {
    headers: {
      "Content-Type": "application/xml",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
