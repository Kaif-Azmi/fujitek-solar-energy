import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{12,}$/;

export const MAX_UPLOAD_FILE_BYTES = 5 * 1024 * 1024;

export function isStrongPassword(password: string) {
  return STRONG_PASSWORD_REGEX.test(password);
}

export function assertStrongPassword(password: string) {
  if (!isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 12 characters and include uppercase, lowercase, number, and special character.",
    );
  }
}

export function parseJsonBodyLimit(contentLengthHeader: string | null, maxBytes: number) {
  const parsed = Number(contentLengthHeader || "");
  if (Number.isFinite(parsed) && parsed > maxBytes) return false;
  return true;
}

export function withNoStore(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  return response;
}

export function withPublicCache(response: NextResponse, sMaxAgeSeconds: number) {
  response.headers.set(
    "Cache-Control",
    `public, s-maxage=${sMaxAgeSeconds}, stale-while-revalidate=${sMaxAgeSeconds * 2}`,
  );
  return response;
}

function getRequestOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) return origin;

  const referer = request.headers.get("referer");
  if (!referer) return null;

  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

export function requireSameOriginMutation(request: NextRequest) {
  const method = request.method.toUpperCase();
  const unsafeMethod = method !== "GET" && method !== "HEAD" && method !== "OPTIONS";
  if (!unsafeMethod) return null;

  const requestOrigin = getRequestOrigin(request);
  if (!requestOrigin || requestOrigin !== request.nextUrl.origin) {
    return withNoStore(NextResponse.json({ message: "Invalid request origin." }, { status: 403 }));
  }

  return null;
}

