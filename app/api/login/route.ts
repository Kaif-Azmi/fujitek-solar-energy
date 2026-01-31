import { NextResponse } from 'next/server';

// Deprecated: login is now handled by NextAuth at /api/auth
export async function POST() {
  return NextResponse.json({ error: 'Deprecated: use /api/auth (NextAuth) for authentication' }, { status: 410 });
}

