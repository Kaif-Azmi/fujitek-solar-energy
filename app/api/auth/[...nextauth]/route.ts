import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { getMongoClient } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

const clientPromise = getMongoClient();

if (!process.env.NEXTAUTH_SECRET) {
  console.warn('NEXTAUTH_SECRET is not set — please configure it for production');
}

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise as any),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    AppleProvider({
      clientId: process.env.APPLE_ID || '',
      // Apple service / team identifiers
      teamId: process.env.APPLE_TEAM_ID || '',
      keyId: process.env.APPLE_KEY_ID || '',
      privateKey: (process.env.APPLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    } as any),

    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const { verifyCredentials } = await import('@/lib/auth');
        const user = await verifyCredentials(credentials.email, credentials.password);
        if (!user) throw new Error('Invalid credentials');

        return user as any;
      },

    }),
  ],

  session: {
    strategy: 'database',
  },

  pages: {
    signIn: '/admin/login',
    newUser: '/signup',
  },

  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, user }: { session: any; user?: any }) {
      // Database strategy: session and user come from DB; add role for admin/user separation
      const adminEmails = (process.env.ADMIN_EMAILS ?? '')
        .split(',')
        .map((e) => e.trim().toLowerCase())
        .filter(Boolean);
      const email = (session?.user?.email ?? user?.email ?? '').toString().toLowerCase();
      (session as any).role = adminEmails.includes(email) ? 'admin' : 'user';
      if (user) (session as any).user = { ...session.user, ...user };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== 'production',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handler = (NextAuth as any)(authOptions as any);
export { handler as GET, handler as POST };
