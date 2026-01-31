import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// NOTE: Middleware-based JWT checks for `/admin` were removed to avoid
// conflicts with Auth.js / NextAuth sessions. The `app/admin/layout.tsx`
// performs server-side protection using `getServerSession(...)` which is
// the recommended, reliable approach for App Router server components.

export function middleware(_request: NextRequest) {
  // no-op middleware kept intentionally for future use
  return NextResponse.next();
}

export const config = {
  // No active route matchers. Admin protection is handled server-side.
  matcher: [],
};
