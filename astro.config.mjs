import { defineConfig } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import sectionize from "remark-sectionize"

// https://astro.build/config
export default defineConfig({
  site: "https://lotta.pages.dev",
  output: "server",
  adapter: cloudflare(),
  markdown: {
    remarkPlugins: [sectionize]
  }
});
