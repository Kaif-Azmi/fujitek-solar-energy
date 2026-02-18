type CacheEntry = {
  response: string;
  timestamp: number;
};

const CACHE_TTL_MS = 5 * 60 * 1000;
const responseCache = new Map<string, CacheEntry>();

export function getCachedResponse(key: string): string | null {
  const normalizedKey = key.trim().toLowerCase();
  if (!normalizedKey) {
    return null;
  }

  const entry = responseCache.get(normalizedKey);
  if (!entry) {
    return null;
  }

  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    responseCache.delete(normalizedKey);
    return null;
  }

  return entry.response;
}

export function setCachedResponse(key: string, response: string): void {
  const normalizedKey = key.trim().toLowerCase();
  if (!normalizedKey || !response.trim()) {
    return;
  }

  responseCache.set(normalizedKey, {
    response,
    timestamp: Date.now(),
  });
}
