"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Asterisk, Eye, EyeOff, Mail } from "lucide-react";
import { Button, Alert, AlertDescription } from "@/components/ui";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{12,}$/.test(password)) {
      setError(
        "Password must be at least 12 characters and include uppercase, lowercase, number, and special character.",
      );
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-surface px-6 py-section">
      <div className="pointer-events-none absolute -left-16 top-20 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
      <ScrollReveal>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5 rounded-2xl border border-border/70 bg-background/95 p-8 shadow-xl shadow-primary/5 backdrop-blur-sm"
        >
          <div className="text-center">
            <p className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Secure Area
            </p>
            <h1 className="mt-3 text-2xl text-strong text-foreground">Admin Login</h1>
            <p className="mt-1 text-sm text-secondary">Sign in to manage products, banners, and content.</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div>
            <label htmlFor="admin-email" className="mb-1 block text-sm font-medium text-foreground">
              Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted" />
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
                placeholder="admin@company.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-1 block text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <Asterisk className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted" />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="h-11 w-full rounded-lg border border-border bg-background pl-9 pr-11 text-foreground outline-none transition focus:ring-2 focus:ring-primary/40"
                placeholder="Enter admin password"
                required
                minLength={12}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-2 top-1.5 inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition hover:bg-hover hover:text-primary"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
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
      </ScrollReveal>
    </main>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminLoginContent />
    </Suspense>
  );
}
