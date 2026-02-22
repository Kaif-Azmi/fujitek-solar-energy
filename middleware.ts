import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_AUTH_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { validateRequiredEnv } from "@/lib/env";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const forwardedProto = request.headers.get("x-forwarded-proto");

  const isProductionHost =
    host === "fujiteksolar.com" || host === "www.fujiteksolar.com";

  // Enforce canonical HTTPS + www in production to avoid non-HTTPS indexing.
  if (isProductionHost) {
    const needsHttps = forwardedProto === "http";
    const needsWww = host === "fujiteksolar.com";

    if (needsHttps || needsWww) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.protocol = "https:";
      redirectUrl.hostname = "www.fujiteksolar.com";
      redirectUrl.port = "";
      return NextResponse.redirect(redirectUrl, 308);
    }
  }

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  validateRequiredEnv();

  const token = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
  const session = await verifyAdminSessionToken(token);
  const isAuthorized = Boolean(session);

  if (pathname === "/admin/login") {
    if (isAuthorized) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!isAuthorized) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
