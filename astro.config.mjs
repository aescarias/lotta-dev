import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import sectionize from "remark-sectionize"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"

// https://astro.build/config
export default defineConfig({
  site: "https://lotta.pages.dev",
  output: "server",
  adapter: cloudflare(),
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Nunito Sans",
      cssVariable: "--font-nunito-sans",
      fallbacks: ["sans-serif"],
      styles: ["normal"]
    },
    {
      provider: fontProviders.fontsource(),
      name: "Source Code Pro",
      cssVariable: "--font-source-code-pro",
      fallbacks: ["monospace"],
      styles: ["normal"],
      weights: [500, 600]
    }
  ],
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
