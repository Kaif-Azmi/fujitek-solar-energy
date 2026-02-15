'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Alert, AlertDescription } from '@/components/ui';

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
        body: JSON.stringify({
          name: name || undefined,
          email,
          password,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || 'Unable to create account');
        return;
      }

      router.push('/');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
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
        {/* Heading */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl text-strong text-foreground">
            Create your account
          </h1>
          <p className="text-sm text-secondary">
            Sign up to request products, save details, and track inquiries.
          </p>
        </div>

        {/* Error */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Name <span className="text-muted">(optional)</span>
          </label>
          <div className="flex items-center border border-border rounded-lg h-11 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition">
            <input
              type="text"
              placeholder="Your name"
              className="w-full h-full bg-transparent outline-none text-foreground placeholder:text-muted"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Email address
          </label>
          <div className="flex items-center border border-border rounded-lg h-11 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition">
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full h-full bg-transparent outline-none text-foreground placeholder:text-muted"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-1">
            Password
          </label>
          <div className="flex items-center border border-border rounded-lg h-11 px-3 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 transition">
            <input
              type="password"
              placeholder="Minimum 8 characters"
              className="w-full h-full bg-transparent outline-none text-foreground placeholder:text-muted"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={loading}
            />
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="w-full h-11"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </Button>

        {/* Footer */}
        <p className="text-center text-sm text-secondary">
          Return to{" "}
          <Link href="/" className="font-medium text-primary hover:underline">
            homepage
          </Link>
        </p>
      </form>
    </div>
  );
}

