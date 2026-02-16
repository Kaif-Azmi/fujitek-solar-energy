type Bucket = {
  failedAttempts: number;
  firstAttemptAt: number;
  blockedUntil: number;
};

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;
const BLOCK_MS = 15 * 60 * 1000;

const buckets = new Map<string, Bucket>();

function getNow() {
  return Date.now();
}

function cleanupExpiredBuckets(now: number) {
  for (const [key, bucket] of buckets.entries()) {
    const inactive = now - bucket.firstAttemptAt > WINDOW_MS;
    const unblocked = bucket.blockedUntil > 0 && bucket.blockedUntil <= now;
    if (inactive && unblocked) buckets.delete(key);
  }
}

export function checkAdminLoginRateLimit(key: string) {
  const now = getNow();
  cleanupExpiredBuckets(now);

  const bucket = buckets.get(key);
  if (!bucket) return { allowed: true, retryAfterSeconds: 0 };

  if (bucket.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((bucket.blockedUntil - now) / 1000),
    };
  }

  if (now - bucket.firstAttemptAt > WINDOW_MS) {
    buckets.delete(key);
    return { allowed: true, retryAfterSeconds: 0 };
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export function recordFailedAdminLogin(key: string) {
  const now = getNow();
  const existing = buckets.get(key);

  if (!existing || now - existing.firstAttemptAt > WINDOW_MS) {
    buckets.set(key, {
      failedAttempts: 1,
      firstAttemptAt: now,
      blockedUntil: 0,
    });
    return;
  }

  const failedAttempts = existing.failedAttempts + 1;
  const blockedUntil = failedAttempts >= MAX_FAILED_ATTEMPTS ? now + BLOCK_MS : 0;

  buckets.set(key, {
    failedAttempts,
    firstAttemptAt: existing.firstAttemptAt,
    blockedUntil,
  });
}

export function clearAdminLoginRateLimit(key: string) {
  buckets.delete(key);
}
