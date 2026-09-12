import { defineHastPlugin, type HastNode } from "satteri";
import type { ElementContent } from "hast";

interface AutolinkOptions {
  behavior?: "append" | "prepend";
  content?: ElementContent | ElementContent[];
}

export function hastAutolinkHeadings(options: AutolinkOptions = {}) {
  const behavior = options.behavior || "append";
  const content = options.content ?? [{ type: "text", value: "#" }];

  return defineHastPlugin({
    name: "hast-autolink-headings",
    element: {
      filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
      visit(node, ctx) {
        const id = node.properties.id;
        if (!id) return;

        const anchor: HastNode = {
          type: "element",
          tagName: "a",
          properties: {
            href: `#${id}`,
            ariaHidden: "true",
            tabIndex: -1,
            className: ["anchor"],
          },
          children: Array.isArray(content) ? content : [content],
        };

        if (behavior === "prepend") {
          node.children.unshift(anchor);
        } else {
          ctx.appendChild(node, anchor);
        }
      },
    },
  });
}
