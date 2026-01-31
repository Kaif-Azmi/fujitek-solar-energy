'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

/**
 * Public navbar auth: "Login" for guests, "My Account" for logged-in users only.
 * Admin users do not see an admin link here (admin remains URL-only).
 */
export default function HeaderAuth() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <span className="text-sm text-muted w-16 inline-block" aria-hidden>
        …
      </span>
    );
  }

  if (!session) {
    return (
      <Link
        href="/login"
        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
      >
        Login
      </Link>
    );
  }

  const role = (session as { role?: string }).role;
  if (role === 'admin') {
    return null;
  }

  return (
    <Link
      href="/dashboard"
      className="text-sm font-medium text-foreground hover:text-primary transition-colors"
    >
      My Account
    </Link>
  );
}
