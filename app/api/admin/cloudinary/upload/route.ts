import { NextResponse, type NextRequest } from "next/server";
import type { UploadApiResponse } from "cloudinary";
import cloudinary, { isCloudinaryConfigured } from "@/lib/cloudinary";
import { requireAdminRequest } from "@/lib/admin-route-auth";
import { MAX_UPLOAD_FILE_BYTES, withNoStore } from "@/lib/security";

export const runtime = "nodejs";

function errorToMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const anyErr = error as Record<string, unknown>;
    const nested = anyErr.error as { message?: string } | undefined;
    return (
      String(anyErr.message || "") ||
      nested?.message ||
      String(anyErr.error || "") ||
      JSON.stringify(anyErr)
    );
  }
  return "Upload failed.";
}

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

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = String(formData.get("folder") || "fujitek/admin");

    if (!(file instanceof File)) {
      return withNoStore(NextResponse.json({ message: "Image file is required." }, { status: 400 }));
    }

    if (file.size > MAX_UPLOAD_FILE_BYTES) {
      return withNoStore(
        NextResponse.json({ message: "File too large. Maximum size is 5MB." }, { status: 413 }),
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder, resource_type: "image" },
        (error, uploadResult) => {
          if (error) return reject(new Error(errorToMessage(error)));
          if (!uploadResult) return reject(new Error("Cloudinary upload failed."));
          resolve(uploadResult);
        }
      );

      stream.end(buffer);
    });

    return withNoStore(NextResponse.json({
      secureUrl: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    }));
  } catch (error) {
    const msg = errorToMessage(error);
    return withNoStore(NextResponse.json(
      {
        message: msg.includes("Invalid Signature")
          ? "Cloudinary credentials mismatch (Invalid Signature). Check CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET."
          : msg,
      },
      { status: 500 }
    ));
  }
}
