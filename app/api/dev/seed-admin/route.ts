import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";
import { ADMINS_COLLECTION, type AdminDoc } from "@/models/Admin";
import { isStrongPassword } from "@/lib/security";

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

  if (!isStrongPassword(password)) {
    return NextResponse.json(
      {
        message:
          "Password must be at least 12 characters and include uppercase, lowercase, number, and special character.",
      },
      { status: 400 },
    );
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
