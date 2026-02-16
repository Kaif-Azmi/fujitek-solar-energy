"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Alert, AlertDescription } from "@/components/ui";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadCsrfToken() {
      try {
        const response = await fetch("/api/admin/csrf", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const data = (await response.json()) as { csrfToken?: string; message?: string };

        if (!response.ok || !data.csrfToken) {
          throw new Error(data.message || "Failed to initialize login session.");
        }

        if (mounted) setCsrfToken(data.csrfToken);
      } catch {
        if (mounted) setError("Failed to initialize secure login. Refresh the page.");
      }
    }

    loadCsrfToken();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!csrfToken) {
      setError("Secure login token missing. Refresh the page and try again.");
      return;
    }

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const data = (await response.json()) as { message?: string; retryAfterSeconds?: number };

      if (!response.ok) {
        if (response.status === 429 && data.retryAfterSeconds) {
          setError(`Too many attempts. Try again in ${data.retryAfterSeconds} seconds.`);
          return;
        }

        setError(data.message || "Login failed.");
        return;
      }

      const nextPath = searchParams.get("next") || "/admin/dashboard";
      router.replace(nextPath);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-6 py-section">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-xl border border-border bg-background p-8 shadow-sm space-y-5"
      >
        <h1 className="text-center text-2xl text-strong text-foreground">
          Admin Login
        </h1>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div>
          <label htmlFor="admin-email" className="mb-1 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="admin-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-background px-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
            placeholder="admin@company.com"
            required
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="mb-1 block text-sm font-medium text-foreground">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 w-full rounded-lg border border-border bg-background px-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
            placeholder="Enter admin password"
            required
            minLength={8}
          />
        </div>

        <Button type="submit" size="lg" className="h-11 w-full" disabled={isSubmitting || !csrfToken}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>

        <p className="text-center text-sm text-secondary">
          Return to{" "}
          <Link href="/" className="text-primary underline-offset-4 hover:underline">
            homepage
          </Link>
          .
        </p>
      </form>
    </main>
  );
}
