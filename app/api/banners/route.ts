import { NextResponse, type NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import type { Banner } from "@/lib/types/banner";
import { getDb } from "@/lib/mongodb";
import { ensureMongoIndexes } from "@/lib/mongodb-indexes";
import { requireAdminRequest } from "@/lib/admin-route-auth";
import { withNoStore, withPublicCache } from "@/lib/security";

const DEFAULT_BANNER_CTA_LINK = "/contact";
// Keep legacy "/service" accepted so existing banner records remain valid.
const ALLOWED_BANNER_CTA_LINKS = new Set(["/", "/contact", "/products", "/services", "/service", "/blog", "/about"]);

function normalizeBannerCtaLink(value: unknown) {
  if (typeof value !== "string") return DEFAULT_BANNER_CTA_LINK;
  const trimmed = value.trim();
  if (!trimmed) return DEFAULT_BANNER_CTA_LINK;
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) return DEFAULT_BANNER_CTA_LINK;
  if (!ALLOWED_BANNER_CTA_LINKS.has(trimmed)) return DEFAULT_BANNER_CTA_LINK;
  return trimmed;
}

export async function GET(_request: NextRequest) {
  try {
    await ensureMongoIndexes();
    const params = _request.nextUrl.searchParams;
    const page = Math.max(Number(params.get("page") || "1"), 1);
    const limit = Math.min(Math.max(Number(params.get("limit") || "10"), 1), 50);
    const skip = (page - 1) * limit;

    const db = await getDb();

    const activeBanners = (await db
      .collection("banners")
      .find({
        $or: [{ status: "Active" }, { isActive: true }],
      }, { projection: { title: 1, subtitle: 1, ctaText: 1, ctaLink: 1, imageUrl: 1, status: 1, isActive: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()) as unknown as Banner[];

    return withPublicCache(NextResponse.json({ page, limit, items: activeBanners }, { status: 200 }), 300);
  } catch {
    return withNoStore(NextResponse.json({ error: "Failed to fetch banners" }, { status: 503 }));
  }
}

export async function POST(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    const payload = await request.json();
    const { title, subtitle, ctaText, ctaLink, status, imageUrl } = payload || {};

    if (!title || typeof title !== "string") {
      return withNoStore(NextResponse.json({ error: "Title is required" }, { status: 400 }));
    }

    await ensureMongoIndexes();
    const db = await getDb();

    const doc = {
      title: title ?? "",
      subtitle: subtitle ?? "",
      ctaText: ctaText ?? "",
      ctaLink: normalizeBannerCtaLink(ctaLink),
      status: status ?? "Inactive",
      imageUrl: imageUrl ?? "",
      createdAt: new Date(),
    };

    const result = await db.collection("banners").insertOne(doc);

    return withNoStore(
      NextResponse.json({ success: true, id: String(result.insertedId), banner: doc }, { status: 200 }),
    );
  } catch {
    return withNoStore(NextResponse.json({ error: "Failed to save banner" }, { status: 503 }));
  }
}

export async function PUT(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    const payload = await request.json();
    const { id, title, subtitle, ctaText, ctaLink, status, imageUrl } = payload || {};

    if (!id) {
      return withNoStore(NextResponse.json({ error: "Banner id is required" }, { status: 400 }));
    }

    if (!ObjectId.isValid(String(id))) {
      return withNoStore(NextResponse.json({ error: "Invalid banner id" }, { status: 400 }));
    }

    const db = await getDb();
    const filter = { _id: new ObjectId(String(id)) };

    const updateDoc: Record<string, unknown> = {};
    if (title !== undefined) updateDoc.title = title;
    if (subtitle !== undefined) updateDoc.subtitle = subtitle;
    if (ctaText !== undefined) updateDoc.ctaText = ctaText;
    if (ctaLink !== undefined) updateDoc.ctaLink = normalizeBannerCtaLink(ctaLink);
    if (status !== undefined) updateDoc.status = status;
    if (imageUrl !== undefined) updateDoc.imageUrl = imageUrl;
    updateDoc.updatedAt = new Date();

    const result = await db.collection("banners").updateOne(filter, { $set: updateDoc });

    if (result.matchedCount === 0) {
      return withNoStore(NextResponse.json({ error: "Banner not found" }, { status: 404 }));
    }

    return withNoStore(NextResponse.json({ success: true, id }, { status: 200 }));
  } catch {
    return withNoStore(NextResponse.json({ error: "Failed to update banner" }, { status: 503 }));
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    const payload = await request.json();
    const { id } = payload || {};

    if (!id) {
      return withNoStore(NextResponse.json({ error: "Banner id is required" }, { status: 400 }));
    }

    if (!ObjectId.isValid(String(id))) {
      return withNoStore(NextResponse.json({ error: "Invalid banner id" }, { status: 400 }));
    }

    const db = await getDb();
    const filter = { _id: new ObjectId(String(id)) };
    const result = await db.collection("banners").deleteOne(filter);

    if (result.deletedCount === 0) {
      return withNoStore(NextResponse.json({ error: "Banner not found" }, { status: 404 }));
    }

    return withNoStore(NextResponse.json({ success: true, id }, { status: 200 }));
  } catch {
    return withNoStore(NextResponse.json({ error: "Failed to delete banner" }, { status: 503 }));
  }
}
