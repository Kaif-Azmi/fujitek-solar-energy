type RateLimitEntry = {
  count: number;
  windowStart: number;
};

const WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 20;
const ipRequestMap = new Map<string, RateLimitEntry>();

export async function checkPublicRateLimit(ip: string): Promise<boolean> {
  const normalizedIp = ip.trim() || "unknown";
  const now = Date.now();
  const current = ipRequestMap.get(normalizedIp);

  if (!current) {
    ipRequestMap.set(normalizedIp, { count: 1, windowStart: now });
    return true;
  }

  if (now - current.windowStart >= WINDOW_MS) {
    ipRequestMap.set(normalizedIp, { count: 1, windowStart: now });
    return true;
  }

  if (current.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  current.count += 1;
  ipRequestMap.set(normalizedIp, current);
  return true;
}
