import BlogEditor from "@/components/admin/blog/BlogEditor";

type AdminEditBlogPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminEditBlogPage({ params }: AdminEditBlogPageProps) {
  const { id } = await params;
  return <BlogEditor blogId={id} />;
}

