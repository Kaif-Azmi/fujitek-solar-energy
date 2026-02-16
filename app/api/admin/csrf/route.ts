import { NextResponse } from "next/server";
import { createCsrfToken, setAdminCsrfCookie } from "@/lib/admin-auth";
import { withNoStore } from "@/lib/security";

export const runtime = "nodejs";

export async function GET() {
  const csrfToken = await createCsrfToken();
  const response = NextResponse.json({ csrfToken });

  setAdminCsrfCookie(response, csrfToken);
  return withNoStore(response);
}
