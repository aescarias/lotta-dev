import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from "@astrojs/cloudflare";
import { satteri, satteriHeadingIdsPlugin } from "@astrojs/markdown-satteri"
import { hastAutolinkHeadings, mdastSectionize } from './src/plugins';

// https://astro.build/config
export default defineConfig({
  site: "https://lotta.pages.dev",
  output: "server",
  adapter: cloudflare({
    prerenderEnvironment: "node"
  }),
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
  compressHTML: true,
  markdown: {
    processor: satteri({
      mdastPlugins: [mdastSectionize()],
      hastPlugins: [
        satteriHeadingIdsPlugin(),
        hastAutolinkHeadings({
          behavior: "append",
          content: [
            {
              type: "element",
              tagName: "i",
              properties: { className: ['ph ph-link'] }
            }
          ]
        })
      ],
    }),
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
