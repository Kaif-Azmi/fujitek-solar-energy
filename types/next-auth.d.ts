declare module '@next-auth/mongodb-adapter';

declare module 'next-auth' {
  interface Session {
    user: { name?: string | null; email?: string | null; image?: string | null };
    role?: 'admin' | 'user';
  }
}
