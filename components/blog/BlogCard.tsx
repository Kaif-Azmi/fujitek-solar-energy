import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatBlogDate } from "@/lib/blog";

type BlogCardProps = {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
    publishedAt: string;
    featuredImage: string;
  };
};

export default function BlogCard({ post }: BlogCardProps) {
  const postUrl = `/blog/${post.slug}`;

  return (
    <article className="h-full">
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-background">
        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/70">
          <Image
            src={post.featuredImage}
            alt={`${post.title} featured image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            quality={72}
          />
        </div>

        <CardContent className="flex flex-1 flex-col p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {post.category}
            </span>
            <time className="text-xs text-secondary" dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
            <span className="text-xs text-secondary">• {post.readTime}</span>
          </div>

          <CardTitle className="text-xl leading-snug">
            <Link href={postUrl} className="hover:text-primary">
              {post.title}
            </Link>
          </CardTitle>

          <p className="mt-3 flex-1 text-sm leading-7 text-secondary">{post.excerpt}</p>

          <div className="mt-5">
            <Button asChild variant="outline">
              <Link href={postUrl} aria-label={`Read full article: ${post.title}`}>
                Read More
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
