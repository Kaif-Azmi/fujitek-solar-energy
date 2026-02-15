import { NextResponse, type NextRequest } from "next/server";
import { getDb } from "@/lib/mongodb";
import { requireAdminRequest } from "@/lib/admin-route-auth";

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

function isValidCategory(value: string): value is Category {
  return CATEGORIES.includes(value as Category);
}

function parsePrice(input: unknown) {
  const value = Number(input);
  if (!Number.isFinite(value) || value < 0) return null;
  return value;
}

export async function GET() {
  try {
    const db = await getDb();
    const docs = await db
      .collection("admin_products")
      .find({ status: "active" })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      docs.map((doc: any) => ({
        id: String(doc._id),
        name: doc.name,
        category: doc.category,
        price: doc.price,
        imageUrl: doc.imageUrl,
      }))
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to load products." },
      { status: 500 }
    );
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
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
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
      return NextResponse.json({ message: "Validation failed.", errors }, { status: 400 });
    }

    const now = new Date();
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

    return NextResponse.json({
      id: result.insertedId.toString(),
      name,
      category,
      price,
      imageUrl,
      publicId,
      status,
      createdAt: now,
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to create product." },
      { status: 500 }
    );
  }
}
