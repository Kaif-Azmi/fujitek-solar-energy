import { NextResponse, type NextRequest } from "next/server";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";
import { requireAdminRequest } from "@/lib/admin-route-auth";

type DeleteBody = {
  publicId?: string;
};

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const unauthorized = await requireAdminRequest(request);
    if (unauthorized) return unauthorized;

    if (!isCloudinaryConfigured) {
      return NextResponse.json(
        { message: "Cloudinary is not configured on server." },
        { status: 500 }
      );
    }

    let body: DeleteBody;
    try {
      body = (await request.json()) as DeleteBody;
    } catch {
      return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
    }

    const publicId = String(body.publicId || "").trim();

    if (!publicId) {
      return NextResponse.json({ message: "publicId is required." }, { status: 400 });
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return NextResponse.json({ message: "Failed to delete image." }, { status: 500 });
    }

    return NextResponse.json({ ok: true, result: result.result });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Delete failed." },
      { status: 500 }
    );
  }
}
