import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getAdminSessionFromRequest } from "@/lib/admin-auth";
import { requireSameOriginMutation, withNoStore } from "@/lib/security";

type RequireAdminOptions = {
  requiredRole?: "admin";
};

export async function requireAdminRequest(request: NextRequest, options: RequireAdminOptions = {}) {
  const sameOriginError = requireSameOriginMutation(request);
  if (sameOriginError) return sameOriginError;

  const session = await getAdminSessionFromRequest(request);

  if (!session) {
    return withNoStore(NextResponse.json({ message: "Unauthorized." }, { status: 401 }));
  }

  if (options.requiredRole && session.role !== options.requiredRole) {
    return withNoStore(NextResponse.json({ message: "Forbidden." }, { status: 403 }));
  }

  return null;
}
