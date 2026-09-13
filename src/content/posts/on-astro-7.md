---
title: Upgrade to Astro 7
description: On Astro 7, a lesson on reading changelogs, and blog updates
published: 2026-09-13T12:30:00-06:00
tags: 
  - programming
---

## The Astro 7 update

I recently updated this blog to [Astro 7](https://astro.build/blog/astro-7/), which includes a rewrite of the Astro compiler in Rust and a switch from [unified](https://unifiedjs.com/) (remark/rehype) to [Sätteri](https://satteri.bruits.org/), which is the new Markdown pipeline being used to generate content.

While Astro 7 includes some new features such as [Advanced Routing](https://docs.astro.build/en/guides/routing/#advanced-routing) and improved performance as result of the rewrite, the change most relevant to us was the adoption of Sätteri. While there is an option to continue using the `unified` pipeline, I decided to adopt Sätteri for the increased performance.

The downside of this is that the `unified` and Sätteri plugin APIs are incompatible, which means replacing the plugins I use for this blog. For context, this site is mostly Markdown but relies on a few plugins that provide convenient features. With the old unified pipeline, these plugins were:

1. `rehype-slug` for adding an `id` attribute to headings. This is used for generating the table of contents to the side as well as for the next plugin.
2. `rehype-autolink-headings` for adding links from headings back to themselves. This is used so users can easily link to a specific section of an article.
3. `remark-sectionize` for wrapping each heading and the contents following it in HTML `section` tags. This provides semantic HTML and it also allows the table of contents to track where in the article the reader is at.

Using the new Sätteri pipeline, the plugins were reimplemented as follows:

1. `rehype-slug` did not require a rewrite since Astro provides `satteriHeadingIdsPlugin` as a builtin plugin.
2. `rehype-autolink-headings` is fairly easy to rewrite as a [`hast`](https://github.com/syntax-tree/hast) plugin. In essence, you take every heading tag (`h1` through `h6`) and you append to the contents an anchor tag (`a`) that links to the heading itself via its `id` attribute.
3. `remark-sectionize` is perhaps the most involved. The gist of it is that you locate the first heading, then start accumulating elements until the next element is another heading either at the same level (which creates sibling `section` elements) or at different levels (which creates a child `section` within the current parent `section`), and do so for all elements in the blog content.

## A lesson on reading changelogs

One thing I realized during the upgrade is that the site had actually been running on Astro 5, even though I upgraded to Astro 6 [earlier this year](https://github.com/aescarias/lotta-dev/commit/7886d3d). I did not realize that deployment had actually failed until I updated to Astro 7.

The reason the deployment failed was because of changes during Astro 6 that I was not aware of. The first was a change to the [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) adapter which was used to deploy this site. During the Astro 6 update, the adapter [removed support for Cloudflare Pages](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#removed-cloudflare-pages-support) which is the service that hosts this website (note the `pages.dev` at the end of the domain -- that's Cloudflare).

The second reason was that Astro 6 [dropped support for Node 20](https://docs.astro.build/en/guides/integrations-guide/cloudflare/#removed-cloudflare-pages-support) which was used as part of the build toolchain. This caused the build to fail and the site to not deploy.

This is also why the initial deployment of the upgrade to Astro 7 also failed. This involved some troubleshooting that led to the fact that the website was being built in SSR or "server" mode rather than what it should be using, SSG or "static" mode. Once I enabled "static" output, the dependency on the Cloudflare adapter as well as the related configuration could be dropped, and the website could be redeployed.

## An article, rewritten

Alongside this upgrade, though unrelated to it, was a rewrite of the first blog I ever published here: [Before you compile Python...](./before-you-compile-python). This was an article I made to compile common answers to the question "How do I make an executable from a Python project?" that I had seen and gave in [Python Discord](https://www.pythondiscord.com/), a community I participate in.

After looking back at the article, which was first published 3 years ago, I decided to rewrite most of it to address some issues I found while reading it again after a long time, as follows:

- The article previously assumed and implied in some cases that onefile mode was the only mode available for bundling tools, without ever mentioning the onedir (standalone) approach. Onedir is now covered in the new version.
- The article mistakenly called `briefcase` a freezing tool when in fact it builds installers and packages. This has been fixed.
- The new version covers in more detail why and how heuristics can detect frozen executables such as those from PyInstaller's onefile mode.
- The new version includes other drawbacks such as hidden imports and startup times in more detail than before.
- The new version includes more details regarding file reputation and code signing certificates, which were only briefly mentioned previously.
- The new version mentions using an installer or ZIP package as an alternative to building with onefile mode. As with the previous change, installer solutions were only briefly mentioned.

## Possible new features

To end this little update post, here are some features I've considered adding to the site, after seeing inspiration from some other blogs:

- **Blog series.** Series allow grouping multiple related consecutive posts. A type of series I'd like to publish at some point would involve covering topics "from the ground up", such as looking into PDF internals, inspecting Python bytecode, or building an interpreter from scratch.
- **Article revision logs.** The revision log would simply list changes that occurred to an article over time. What could also accompany the revision log is a "status" for drafts or articles that have been superseded or withdrawn.
- **Admonitions (callouts).** Right now, elements such as tips and asides are communicated via Markdown block quotes, which is not the intended use of this feature. Asides will appear collapsed by default; tips and warnings will appear expanded.
- **Footnote tooltips.** When hovering or clicking over a footnote, show a tooltip including the footnote content, with a link to the specific item in the footnotes section.
- **Better images.** Right now, images appear as is in articles. Some additions could include adding captions (separate from alternative text) and "lightbox" for zooming into images.
- **Projects.** The projects page would cover the projects I have worked on, alongside their current status and some details about them.
