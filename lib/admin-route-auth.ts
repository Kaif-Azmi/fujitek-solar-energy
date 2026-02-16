import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import { requireSameOriginMutation, withNoStore } from "@/lib/security";

export async function requireAdminRequest(request: NextRequest) {
  const sameOriginError = requireSameOriginMutation(request);
  if (sameOriginError) return sameOriginError;

  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return withNoStore(NextResponse.json({ message: "Unauthorized." }, { status: 401 }));
  }

  return null;
}
