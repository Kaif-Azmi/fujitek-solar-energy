// Copyright (c) 2026 Kaif Azmi
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';

export async function GET() {
  try {
    const user = await createUser({
      name: 'Admin',
      email: 'kaifazmi211@gmail.com',
      password: 'admin123',
    });

    return NextResponse.json({
      ok: true,
      message: 'Admin user created',
      user,
    });
  } catch (err: any) {
    return NextResponse.json({
      ok: false,
      error: err.message || 'Failed to create admin',
    });
  }
}
