import type { APIContext } from "astro";
import { getCollection } from "astro:content"

function randint(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} 

export async function GET(context: APIContext) {
    const posts = await getCollection("posts");
    const randPostId = randint(0, posts.length - 1) 

    return context.redirect(`/posts/${posts[randPostId].slug}`, 302);
}
