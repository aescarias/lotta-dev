import { type CollectionEntry } from "astro:content"

/* Constants */
export const WEB_TITLE = "lotta dev"
export const WEB_DESCRIPTION = "The personal programming website of Angel Carias."

/* Everything else */
export function sortByLatest(posts: CollectionEntry<'posts'>[]) {
	return posts.toSorted((first, second) => 
		second.data.published.getTime() - first.data.published.getTime())
}

export function getReadingTime(content: string): number {
    return content.split(" ").length / 200; // words / wpm
}
