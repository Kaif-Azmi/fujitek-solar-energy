import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });

  const { name, email, password } = body;
  if (!email || !password) return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });

  const db = await getDb();
  const users = db.collection('users');

  // Use helper to create the user (centralised logic, easier to test)
  try {
    const created = await (await import('@/lib/auth')).createUser({ name, email, password });
    return NextResponse.json({ success: true, id: created.id }, { status: 201 });
  } catch (err: any) {
    if (err?.message === 'duplicate') {
      return NextResponse.json({ error: 'An account with that email already exists' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}
