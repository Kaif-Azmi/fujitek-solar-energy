import { NextResponse, type NextRequest } from "next/server";
import { requireAdminRequest } from "@/lib/admin-route-auth";
import { parseJsonBodyLimit, requireSameOriginMutation, withNoStore } from "@/lib/security";
import { createAdminBlog, getAdminBlogPage } from "@/lib/blog";
import { validateBlogPayload } from "@/lib/blog-validation";

export const runtime = "nodejs";
const BLOG_ADMIN_BODY_LIMIT_BYTES = 300 * 1024;

function isDuplicateSlugError(error: unknown) {
  if (!error || typeof error !== "object") return false;
  const maybeError = error as { code?: number; keyPattern?: Record<string, number> };
  return maybeError.code === 11000 && Boolean(maybeError.keyPattern?.slug);
}

function parsePage(value: string | null, fallbackValue: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallbackValue;
  return Math.floor(parsed);
}

export async function GET(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request, { requiredRole: "admin" });
    if (unauthorized) return unauthorized;

    const page = parsePage(request.nextUrl.searchParams.get("page"), 1);
    const limit = parsePage(request.nextUrl.searchParams.get("limit"), 10);
    const search = String(request.nextUrl.searchParams.get("q") || "").trim();

    const data = await getAdminBlogPage({ page, limit, search });
    return withNoStore(NextResponse.json(data));
  } catch (error) {
    return withNoStore(
      NextResponse.json(
        { message: error instanceof Error ? error.message : "Failed to fetch blogs." },
        { status: 500 },
      ),
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const sameOriginError = requireSameOriginMutation(request);
    if (sameOriginError) return sameOriginError;

    const unauthorized = await requireAdminRequest(request, { requiredRole: "admin" });
    if (unauthorized) return unauthorized;

    if (!parseJsonBodyLimit(request.headers.get("content-length"), BLOG_ADMIN_BODY_LIMIT_BYTES)) {
      return withNoStore(NextResponse.json({ message: "Request payload too large." }, { status: 413 }));
    }

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

    const created = await createAdminBlog(validation.data);
    return withNoStore(NextResponse.json(created, { status: 201 }));
  } catch (error) {
    if (isDuplicateSlugError(error)) {
      return withNoStore(
        NextResponse.json({ message: "A blog post with this slug already exists." }, { status: 409 }),
      );
    }

    return withNoStore(
      NextResponse.json(
        { message: error instanceof Error ? error.message : "Failed to create blog post." },
        { status: 500 },
      ),
    );
  }
}
