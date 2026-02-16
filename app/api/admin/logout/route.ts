import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/admin-auth";
import { withNoStore } from "@/lib/security";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url), 303);
  clearAdminSessionCookie(response);
  return withNoStore(response);
}
