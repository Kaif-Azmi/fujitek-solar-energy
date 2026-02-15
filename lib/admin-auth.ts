const textEncoder = new TextEncoder();

export const ADMIN_AUTH_COOKIE = "admin_auth_token";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8; // 8 hours

type AdminTokenPayload = {
  role: "admin";
  exp: number;
};

function getAdminSecret() {
  return process.env.ADMIN_SESSION_SECRET || "change-this-admin-secret";
}

function getBase64Encoder() {
  return typeof btoa === "function"
    ? btoa
    : (value: string) => Buffer.from(value, "binary").toString("base64");
}

function getBase64Decoder() {
  return typeof atob === "function"
    ? atob
    : (value: string) => Buffer.from(value, "base64").toString("binary");
}

function base64UrlEncodeBinary(binary: string) {
  return getBase64Encoder()(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecodeBinary(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = (4 - (normalized.length % 4)) % 4;
  return getBase64Decoder()(normalized + "=".repeat(padLength));
}

function encodeString(value: string) {
  return base64UrlEncodeBinary(value);
}

function decodeString(value: string) {
  return base64UrlDecodeBinary(value);
}

function bytesToBinary(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
}

async function hmacSha256(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(value),
  );

  return new Uint8Array(signature);
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

export async function createAdminToken() {
  const payload: AdminTokenPayload = {
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + ADMIN_SESSION_MAX_AGE,
  };

  const payloadEncoded = encodeString(JSON.stringify(payload));
  const signatureBytes = await hmacSha256(payloadEncoded, getAdminSecret());
  const signatureEncoded = base64UrlEncodeBinary(bytesToBinary(signatureBytes));

  return `${payloadEncoded}.${signatureEncoded}`;
}

export async function verifyAdminToken(token?: string | null) {
  if (!token) return false;

  const [payloadEncoded, signature] = token.split(".");
  if (!payloadEncoded || !signature) return false;

  const expectedBytes = await hmacSha256(payloadEncoded, getAdminSecret());
  const expectedSignature = base64UrlEncodeBinary(bytesToBinary(expectedBytes));

  if (!timingSafeEqual(signature, expectedSignature)) return false;

  try {
    const payload = JSON.parse(decodeString(payloadEncoded)) as AdminTokenPayload;
    if (payload.role !== "admin") return false;
    if (!Number.isFinite(payload.exp)) return false;
    return payload.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function isValidAdminCredentials(email: string, password: string) {
  const adminEmail = (process.env.ADMIN_LOGIN_EMAIL || "admin@fujitek.local").toLowerCase();
  const adminPassword = process.env.ADMIN_LOGIN_PASSWORD || "admin12345";
  return email.toLowerCase() === adminEmail && password === adminPassword;
}
