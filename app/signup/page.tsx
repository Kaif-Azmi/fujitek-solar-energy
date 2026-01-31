'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Alert, AlertDescription } from '@/components/ui';

/**
 * Public user signup — for optional customer accounts.
 */
export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name || undefined, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Sign up failed');
        return;
      }
      router.push('/login?registered=1');
      router.refresh();
    } catch {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface py-section">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[28rem] bg-background p-8 rounded-xl border border-border shadow-sm space-y-5"
      >
        <h1 className="text-2xl font-bold text-foreground text-center">Create account</h1>
        <p className="text-center text-sm text-secondary">
          Sign up to save your details and request product information.
        </p>
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Name (optional)</label>
          <div className="flex items-center border border-border rounded-lg h-11 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition">
            <input
              type="text"
              placeholder="Your name"
              className="w-full h-full outline-none bg-transparent text-foreground placeholder:text-muted"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">Email</label>
          <div className="flex items-center border border-border rounded-lg h-11 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition">
            <input
              type="email"
              placeholder="your@email.com"
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
              placeholder="At least 8 characters"
              className="w-full h-full outline-none bg-transparent text-foreground placeholder:text-muted"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full h-11" size="lg">
          {loading ? 'Creating account...' : 'Sign up'}
        </Button>
        <p className="text-center text-sm text-secondary">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
