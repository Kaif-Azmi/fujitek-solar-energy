import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_AUTH_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth";
import { validateRequiredEnv } from "@/lib/env";
import {
  detectRequestLocale,
  getLocaleFromPathname,
  localeCookieMaxAge,
  localeCookieName,
  withLocalePath,
} from "@/lib/i18n";

const PUBLIC_FILE = /\.[^/]+$/;

function withAdminNoIndex(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  return response;
}

function setLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    maxAge: localeCookieMaxAge,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

function shouldSkipI18n(pathname: string): boolean {
  if (PUBLIC_FILE.test(pathname)) return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/admin")) return true;
  return false;
}

function nextWithLocaleHeader(request: NextRequest, locale: string) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") ?? "";
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isAdminPagePath = pathname.startsWith("/admin");
  const isAdminApiPath = pathname.startsWith("/api/admin");

  const isProductionHost =
    host === "fujiteksolar.com" || host === "www.fujiteksolar.com";

  if (isProductionHost) {
    const needsHttps = forwardedProto === "http";
    const needsWww = host === "fujiteksolar.com";

    if (needsHttps || needsWww) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.protocol = "https:";
      redirectUrl.hostname = "www.fujiteksolar.com";
      redirectUrl.port = "";
      const redirectResponse = NextResponse.redirect(redirectUrl, 308);
      if (isAdminPagePath || isAdminApiPath) {
        return withAdminNoIndex(redirectResponse);
      }
      return redirectResponse;
    }
  }

  if (isAdminApiPath) {
    return withAdminNoIndex(NextResponse.next());
  }

  if (isAdminPagePath) {
    validateRequiredEnv();

    const token = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
    const session = await verifyAdminSessionToken(token);
    const isAuthorized = Boolean(session);

    if (pathname === "/admin/login") {
      if (isAuthorized) {
        return withAdminNoIndex(NextResponse.redirect(new URL("/admin/dashboard", request.url)));
      }
      return withAdminNoIndex(NextResponse.next());
    }

    if (!isAuthorized) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return withAdminNoIndex(NextResponse.redirect(loginUrl));
    }

    return withAdminNoIndex(NextResponse.next());
  }

  if (shouldSkipI18n(pathname)) {
    return NextResponse.next();
  }

  const localeInPath = getLocaleFromPathname(pathname);

  if (localeInPath) {
    const response = nextWithLocaleHeader(request, localeInPath);
    setLocaleCookie(response, localeInPath);
    return response;
  }

  const detectedLocale = detectRequestLocale(request);
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = withLocalePath(detectedLocale, pathname);

  const response = NextResponse.redirect(redirectUrl);
  setLocaleCookie(response, detectedLocale);
  return response;
}

export const config = {
  matcher: ["/:path*"],
};