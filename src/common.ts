import { type CollectionEntry } from "astro:content";

/* Constants */
export const WEB_TITLE = "lotta dev";
export const WEB_DESCRIPTION = "Programming tidbits and more from Angel Carias";
export const WEB_TAGS: Record<string, string> = {
  programming: "General programming tidbits",
  python: "Bits about the Python programming language",
  qt: "Articles relating to the Qt framework",
  windows: "Everything to do with the Windows operating system",
};

/* Everything else */
export function sortByLatest(posts: CollectionEntry<"posts">[]) {
  return posts.toSorted(
    (first, second) =>
      second.data.published.getTime() - first.data.published.getTime()
  );
}

export function getReadingTime(content: string): number {
  return content.split(" ").length / 200; // words / wpm
}
