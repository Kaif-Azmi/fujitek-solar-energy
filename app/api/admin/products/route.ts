import { NextResponse, type NextRequest } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import { requireAdminRequest } from "@/lib/admin-route-auth";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";

export const runtime = "nodejs";

const CATEGORIES = ["Panel", "Inverter", "Battery", "EV Charger"] as const;
type Category = (typeof CATEGORIES)[number];
type Status = "active" | "inactive";

type ProductDoc = {
  _id: ObjectId;
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
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    const db = await getDb();
    const docs = await db
      .collection<ProductDoc>("admin_products")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(
      docs.map((doc) => ({
        id: doc._id.toString(),
        name: doc.name,
        category: doc.category,
        price: doc.price,
        imageUrl: doc.imageUrl,
        publicId: doc.publicId,
        status: doc.status,
        createdAt: doc.createdAt,
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

    let body: Partial<{
      name: string;
      category: Category;
      price: number;
      imageUrl: string;
      publicId: string;
      status: Status;
    }>;

    try {
      body = (await request.json()) as typeof body;
    } catch {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const name = String(body.name || "").trim();
    const category = String(body.category || "").trim();
    const imageUrl = String(body.imageUrl || "").trim();
    const publicId = String(body.publicId || "").trim();
    const price = parsePrice(body.price);
    const status: Status = body.status === "inactive" ? "inactive" : "active";

    if (!name || !isValidCategory(category) || price === null || !imageUrl || !publicId) {
      return NextResponse.json(
        { message: "All fields are required and must be valid." },
        { status: 400 }
      );
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

export async function PATCH(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    let body: Partial<{
      id: string;
      name: string;
      category: Category;
      price: number;
      imageUrl: string;
      publicId: string;
      status: Status;
    }>;
    try {
      body = (await request.json()) as typeof body;
    } catch {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const id = String(body.id || "").trim();
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid product id." }, { status: 400 });
    }

    const update: Record<string, unknown> = {};
    if (typeof body.name === "string") update.name = body.name.trim();
    if (typeof body.category === "string" && isValidCategory(body.category)) {
      update.category = body.category;
    }
    if (body.price !== undefined) {
      const price = parsePrice(body.price);
      if (price === null) {
        return NextResponse.json({ message: "Invalid price." }, { status: 400 });
      }
      update.price = price;
    }
    if (typeof body.imageUrl === "string") update.imageUrl = body.imageUrl.trim();
    if (typeof body.publicId === "string") update.publicId = body.publicId.trim();
    if (body.status === "active" || body.status === "inactive") update.status = body.status;

    const db = await getDb();
    await db
      .collection("admin_products")
      .updateOne({ _id: new ObjectId(id) }, { $set: update });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to update product." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    let body: { id?: string };
    try {
      body = (await request.json()) as { id?: string };
    } catch {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const id = String(body.id || "").trim();

    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid product id." }, { status: 400 });
    }

    const db = await getDb();
    const existing = await db
      .collection<ProductDoc>("admin_products")
      .findOne({ _id: new ObjectId(id) });

    if (!existing) {
      return NextResponse.json({ message: "Product not found." }, { status: 404 });
    }

    if (existing.publicId) {
      try {
        if (isCloudinaryConfigured) {
          await cloudinary.uploader.destroy(existing.publicId, { resource_type: "image" });
        }
      } catch {
        // Don't block DB deletion on a Cloudinary failure; surface as JSON if needed later.
      }
    }

    await db.collection("admin_products").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to delete product." },
      { status: 500 }
    );
  }
}
