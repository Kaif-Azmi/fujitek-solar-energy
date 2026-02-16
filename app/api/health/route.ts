import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { withNoStore } from "@/lib/security";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDb();
    await db.command({ ping: 1 });

    return withNoStore(
      NextResponse.json({
        status: "ok",
        checks: { database: "ok" },
        timestamp: new Date().toISOString(),
      }),
    );
  } catch {
    return withNoStore(
      NextResponse.json(
        {
          status: "degraded",
          checks: { database: "error" },
          timestamp: new Date().toISOString(),
        },
        { status: 503 },
      ),
    );
  }
}

