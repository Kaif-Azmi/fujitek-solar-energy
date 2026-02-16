import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";
import { ADMINS_COLLECTION, type AdminDoc } from "@/models/Admin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);

  const email = String(searchParams.get("email") || "admin@fujitek.local").trim().toLowerCase();
  const password = String(searchParams.get("password") || "admin12345");
  const name = String(searchParams.get("name") || "Admin").trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Valid email is required." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const now = new Date();

  const db = await getDb();
  await db.collection<AdminDoc>(ADMINS_COLLECTION).updateOne(
    { email },
    {
      $set: {
        email,
        name,
        passwordHash,
        role: "super_admin",
        isActive: true,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true },
  );

  return NextResponse.json({ ok: true, email });
}
