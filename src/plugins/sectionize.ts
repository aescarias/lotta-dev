import { defineMdastPlugin, type MdastNode, type Custom } from "satteri";

type SectionContent = MdastNode | Custom;

type SectionData = {
  hName: "section";
  depth: number;
};

type SectionNode = Custom & {
  type: "section";
  data: SectionData;
  children: SectionContent[];
};

type OpenSection = {
  depth: number;
  children: SectionContent[];
};

function groupIntoSections(children: MdastNode[]): SectionContent[] {
  const result: SectionContent[] = [];
  const stack: OpenSection[] = [{ depth: 0, children: result }];

  for (const child of children) {
    if (child.type === "heading") {
      const depth = child.depth;

      while (stack.length > 1 && stack[stack.length - 1].depth >= depth) {
        stack.pop();
      }

      const section: SectionNode = {
        type: "section",
        data: { hName: "section", depth },
        children: [child],
      };

      stack[stack.length - 1].children.push(section);
      stack.push({ depth, children: section.children });
    } else {
      stack[stack.length - 1].children.push(child);
    }
  }

  return result;
}

export function mdastSectionize() {
  const done = new WeakSet();

  return defineMdastPlugin({
    name: "mdast-sectionize",
    heading(node, ctx) {
      const parent = ctx.parent(node);

      if (!parent || !("children" in parent) || done.has(parent)) return;
      done.add(parent);

      ctx.setProperty(parent, "children", groupIntoSections(parent.children));
    },
  });
}
