import { NextResponse, type NextRequest } from "next/server";
import { deleteAdminBlog, getAdminBlogById, updateAdminBlog } from "@/lib/blog";
import { validateBlogPayload } from "@/lib/blog-validation";
import { requireAdminRequest } from "@/lib/admin-route-auth";
import { parseJsonBodyLimit, requireSameOriginMutation, withNoStore } from "@/lib/security";

export const runtime = "nodejs";
const BLOG_ADMIN_BODY_LIMIT_BYTES = 300 * 1024;

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

function isDuplicateSlugError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const maybeError = error as { code?: number; keyPattern?: Record<string, number> };
  return maybeError.code === 11000 && Boolean(maybeError.keyPattern?.slug);
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const unauthorized = await requireAdminRequest(request, { requiredRole: "admin" });
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const item = await getAdminBlogById(id);
    if (!item) {
      return withNoStore(NextResponse.json({ message: "Blog post not found." }, { status: 404 }));
    }

    return withNoStore(NextResponse.json(item));
  } catch (error) {
    return withNoStore(
      NextResponse.json(
        { message: error instanceof Error ? error.message : "Failed to fetch blog post." },
        { status: 500 },
      ),
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const sameOriginError = requireSameOriginMutation(request);
    if (sameOriginError) return sameOriginError;

    const unauthorized = await requireAdminRequest(request, { requiredRole: "admin" });
    if (unauthorized) return unauthorized;

    if (!parseJsonBodyLimit(request.headers.get("content-length"), BLOG_ADMIN_BODY_LIMIT_BYTES)) {
      return withNoStore(NextResponse.json({ message: "Request payload too large." }, { status: 413 }));
    }

    const { id } = await params;
    const payload = await request.json().catch(() => null);
    const validation = validateBlogPayload(payload);
    if (!validation.ok) {
      return withNoStore(
        NextResponse.json(
          { message: "Validation failed.", errors: validation.errors },
          { status: 400 },
        ),
      );
    }

    const updated = await updateAdminBlog(id, validation.data);
    if (!updated) {
      return withNoStore(NextResponse.json({ message: "Blog post not found." }, { status: 404 }));
    }

    return withNoStore(NextResponse.json(updated));
  } catch (error) {
    if (isDuplicateSlugError(error)) {
      return withNoStore(
        NextResponse.json({ message: "A blog post with this slug already exists." }, { status: 409 }),
      );
    }

    return withNoStore(
      NextResponse.json(
        { message: error instanceof Error ? error.message : "Failed to update blog post." },
        { status: 500 },
      ),
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const sameOriginError = requireSameOriginMutation(request);
    if (sameOriginError) return sameOriginError;

    const unauthorized = await requireAdminRequest(request, { requiredRole: "admin" });
    if (unauthorized) return unauthorized;

    const { id } = await params;
    const deleted = await deleteAdminBlog(id);
    if (!deleted) {
      return withNoStore(NextResponse.json({ message: "Blog post not found." }, { status: 404 }));
    }

    return withNoStore(NextResponse.json({ ok: true }));
  } catch (error) {
    return withNoStore(
      NextResponse.json(
        { message: error instanceof Error ? error.message : "Failed to delete blog post." },
        { status: 500 },
      ),
    );
  }
}
