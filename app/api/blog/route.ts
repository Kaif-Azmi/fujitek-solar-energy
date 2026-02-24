import { NextResponse, type NextRequest } from "next/server";
import { getPublishedBlogPage } from "@/lib/blog";
import { withNoStore, withPublicCache } from "@/lib/security";

export const runtime = "nodejs";

function parsePositive(value: string | null, fallbackValue: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallbackValue;
  return Math.floor(parsed);
}

export async function GET(request: NextRequest) {
  try {
    const page = parsePositive(request.nextUrl.searchParams.get("page"), 1);
    const limit = parsePositive(request.nextUrl.searchParams.get("limit"), 6);
    const category = String(request.nextUrl.searchParams.get("category") || "").trim();
    const tag = String(request.nextUrl.searchParams.get("tag") || "").trim();
    const search = String(request.nextUrl.searchParams.get("q") || "").trim();

    const data = await getPublishedBlogPage({
      page,
      limit,
      category: category || undefined,
      tag: tag || undefined,
      search: search || undefined,
    });

    return withPublicCache(NextResponse.json(data), 300);
  } catch (error) {
    return withNoStore(
      NextResponse.json(
        { message: error instanceof Error ? error.message : "Failed to load blog posts." },
        { status: 500 },
      ),
    );
  }
}

