import { NextResponse, type NextRequest } from "next/server";
import { getPublishedBlogBySlug, getRelatedPublishedBlogs } from "@/lib/blog";
import { withNoStore, withPublicCache } from "@/lib/security";

type RouteParams = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const post = await getPublishedBlogBySlug(slug);

    if (!post) {
      return withNoStore(NextResponse.json({ message: "Blog post not found." }, { status: 404 }));
    }

    const relatedPosts = await getRelatedPublishedBlogs(post.category, post.slug, 3);
    return withPublicCache(NextResponse.json({ post, relatedPosts }), 300);
  } catch (error) {
    return withNoStore(
      NextResponse.json(
        { message: error instanceof Error ? error.message : "Failed to load blog post." },
        { status: 500 },
      ),
    );
  }
}

