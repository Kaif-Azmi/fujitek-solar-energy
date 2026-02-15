'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Button, Alert, AlertDescription } from '@/components/ui';

/**
 * Admin login — internal only, not linked from public UI.
 * Access via URL: /admin/login
 */
export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const err = params.get('error');
    if (!err) return;
    const friendly: Record<string, string> = {
      OAuthSignin: 'Error signing in with OAuth provider',
      OAuthCallback: 'OAuth callback error or cancelled',
      OAuthCreateAccount: 'Failed to create account with OAuth provider',
      OAuthAccountNotLinked: 'This OAuth account is not linked to any account',
      EmailCreateAccount: 'Error creating email account',
      Callback: 'Authentication callback error',
      CredentialsSignin: 'Invalid email or password',
      SessionRequired: 'You must sign in to access that page',
    };
    setError(friendly[err] || err);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      } as any);
      if (result?.error) {
        setError(result.error || 'Invalid credentials');
        return;
      }
      router.push('/admin');
    } catch {
      setError('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface py-section">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[28rem] bg-background p-8 rounded-xl border border-border shadow-sm space-y-5"
      >
        <h1 className="text-2xl text-strong text-foreground text-center">Admin Login</h1>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <div className="flex items-center border border-border rounded-lg h-11 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition">
            <input
              type="email"
              placeholder="Admin email"
              className="w-full h-full outline-none bg-transparent text-foreground placeholder:text-muted"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Password</label>
          <div className="flex items-center border border-border rounded-lg h-11 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition">
            <input
              type="password"
              placeholder="Password"
              className="w-full h-full outline-none bg-transparent text-foreground placeholder:text-muted"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full h-11" size="lg">
          Sign In
        </Button>
        <p className="text-center text-sm text-muted">Or with</p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl: '/admin' })}
            className="flex-1 h-11 border border-border rounded-lg flex items-center justify-center gap-2 text-foreground hover:bg-hover transition"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
              <path fill="#FFC107" d="M43.6 20.4H42V20H24v8h11.3C33.7 32.4 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.2 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.6z" />
              <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.2 6.2 29.4 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z" />
              <path fill="#4CAF50" d="M24 44c5.1 0 9.9-2 13.5-5.3l-6.2-5.2C29.4 35.7 26.8 36.6 24 36c-5.2 0-9.7-3.5-11.3-8.3l-6.5 5C9.5 39.6 16.3 44 24 44z" />
              <path fill="#1976D2" d="M43.6 20.4H42V20H24v8h11.3c-1.1 3-3.4 5.4-6.3 6.7l.1.1 6.2 5.2C33.9 41.2 44 36 44 24c0-1.3-.1-2.7-.4-3.6z" />
            </svg>
            Google
          </button>
          <button
            type="button"
            onClick={() => signIn('apple', { callbackUrl: '/admin' })}
            className="flex-1 h-11 border border-border rounded-lg flex items-center justify-center gap-2 text-foreground hover:bg-hover transition"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="black" aria-hidden>
              <path d="M16.365 1.43c0 1.14-.453 2.24-1.262 3.08-.824.86-2.18 1.53-3.33 1.43-.15-1.11.43-2.29 1.25-3.13.83-.85 2.24-1.48 3.34-1.38z" />
              <path d="M21.5 17.16c-.55 1.26-.81 1.82-1.52 2.93-.98 1.55-2.36 3.47-4.07 3.49-1.52.02-1.91-.99-3.96-.99-2.05 0-2.48.97-3.99 1.01-1.71.04-3.02-1.69-4-3.23-2.7-4.27-2.98-9.28-1.32-11.87 1.18-1.82 3.05-2.89 4.8-2.89 1.79 0 2.92.99 4.4.99 1.44 0 2.31-.99 4.38-.99 1.56 0 3.21.85 4.39 2.33-3.87 2.12-3.24 7.63.89 9.22z" />
            </svg>
            Apple
          </button>
        </div>
      </form>
    </div>
  );
}

