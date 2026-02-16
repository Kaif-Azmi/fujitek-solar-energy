import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ensureMongoIndexes } from "@/lib/mongodb-indexes";
import { requireAdminRequest } from "@/lib/admin-route-auth";
import { withNoStore, withPublicCache } from "@/lib/security";

export const runtime = "nodejs";

const CATEGORIES = ["Panel", "Inverter", "Battery", "EV Charger"] as const;
type Category = (typeof CATEGORIES)[number];
type Status = "active" | "inactive";

type CreateBody = Partial<{
  name: string;
  category: Category;
  price: number;
  imageUrl: string;
  publicId: string;
  status: Status;
}>;

type ProductDoc = {
  _id: unknown;
  name: string;
  category: Category;
  price: number;
  imageUrl: string;
  publicId: string;
  status: Status;
  createdAt: Date;
};

function isValidCategory(value: string): value is Category {
  return CATEGORIES.includes(value as Category);
}

function parsePrice(input: unknown) {
  const value = Number(input);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}

export async function GET(request: NextRequest) {
  try {
    await ensureMongoIndexes();
    const params = request.nextUrl.searchParams;
    const page = Math.max(Number(params.get("page") || "1"), 1);
    const limit = Math.min(Math.max(Number(params.get("limit") || "24"), 1), 100);
    const skip = (page - 1) * limit;

    const db = await getDb();
    const docs = await db
      .collection<ProductDoc>("admin_products")
      .find({ status: "active" }, { projection: { name: 1, category: 1, price: 1, imageUrl: 1 } })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return withPublicCache(NextResponse.json({
      page,
      limit,
      items: docs.map((doc) => ({
        id: String(doc._id),
        name: doc.name,
        category: doc.category,
        price: doc.price,
        imageUrl: doc.imageUrl,
      })),
    }), 300);
  } catch (error) {
    return withNoStore(NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to load products." },
      { status: 500 }
    ));
  }
}

export async function POST(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    let body: CreateBody;
    try {
      body = (await request.json()) as CreateBody;
    } catch {
      return withNoStore(NextResponse.json({ message: "Invalid request body." }, { status: 400 }));
    }

    const errors: Record<string, string> = {};

    const name = String(body.name || "").trim();
    const category = String(body.category || "").trim();
    const imageUrl = String(body.imageUrl || "").trim();
    const publicId = String(body.publicId || "").trim();
    const price = parsePrice(body.price);
    const status: Status | "" =
      body.status === "active" || body.status === "inactive" ? body.status : "";

    if (!name) errors.name = "Product name is required.";
    if (!category || !isValidCategory(category)) errors.category = "Category is required.";
    if (price === null) errors.price = "Price must be a valid number.";
    if (!status) errors.status = "Status is required.";
    if (!imageUrl) errors.imageUrl = "Image URL is required.";
    if (!publicId) errors.publicId = "publicId is required.";

    if (Object.keys(errors).length > 0) {
      return withNoStore(NextResponse.json({ message: "Validation failed.", errors }, { status: 400 }));
    }

    const now = new Date();
    await ensureMongoIndexes();
    const db = await getDb();
    const result = await db.collection("admin_products").insertOne({
      name,
      category,
      price,
      imageUrl,
      publicId,
      status,
      createdAt: now,
    });

    return withNoStore(NextResponse.json({
      id: result.insertedId.toString(),
      name,
      category,
      price,
      imageUrl,
      publicId,
      status,
      createdAt: now,
    }));
  } catch (error) {
    return withNoStore(NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create product." },
      { status: 500 }
    ));
  }
}
