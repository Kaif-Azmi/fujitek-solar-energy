import { describe, it, expect, beforeAll } from 'vitest';
import { getDb } from '@/lib/mongodb';
import { createUser, verifyCredentials } from '@/lib/auth';

describe('Auth helper + signup API', () => {
  it('creates a user and prevents duplicates', async () => {
    const user = await createUser({ name: 'Test User', email: 'test@example.com', password: 'Password123' });
    expect(user.email).toBe('test@example.com');

    // Ensure duplicate is rejected
    await expect(createUser({ name: 'Test User', email: 'test@example.com', password: 'Password123' })).rejects.toThrow('duplicate');

    const db = await getDb();
    const u = await db.collection('users').findOne({ email: 'test@example.com' });
    expect(u).toBeTruthy();
    expect(u?.passwordHash).toBeTruthy();
    expect(u?.passwordHash).not.toBe('Password123');
  });

  it('verifies credentials successfully and fails on wrong password', async () => {
    const v = await verifyCredentials('test@example.com', 'Password123');
    expect(v).toBeTruthy();
    expect(v?.email).toBe('test@example.com');

    const v2 = await verifyCredentials('test@example.com', 'wrong');
    expect(v2).toBeNull();
  });
});
