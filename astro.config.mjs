import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import sectionize from "remark-sectionize"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

// https://astro.build/config
export default defineConfig({
  site: "https://lotta.pages.dev",
  output: "server",
  adapter: cloudflare(),
  markdown: {
    remarkPlugins: [sectionize],
    rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, {
      behavior: "append", content: [
        {
          type: 'element',
          tagName: 'i',
          properties: { className: ['ph ph-link'] }
        }
      ]
    }]],
    shikiConfig: {
      themes: {
        light: "vitesse-light",
        dark: "vitesse-dark"
      },
      defaultColor: false,
      cssVariablePrefix: '--shiki-'
    }
  }
});
