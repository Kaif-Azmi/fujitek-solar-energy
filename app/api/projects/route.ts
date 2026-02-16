import { NextResponse } from "next/server";
import type { Project } from "@/lib/types/project";
import { getDb } from "@/lib/mongodb";
import { withNoStore, withPublicCache } from "@/lib/security";

export async function GET() {
  try {
    const limit = 24;
    const db = await getDb();
    const projects = await db
      .collection<Project>("projects")
      .find({ isActive: true }, { projection: { id: 1, title: 1, description: 1, location: 1, category: 1, images: 1, isActive: 1, createdAt: 1 } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return withPublicCache(NextResponse.json(projects), 300);
  } catch {
    return withNoStore(NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 }));
  }
}
