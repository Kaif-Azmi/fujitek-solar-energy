import type { NextRequest, NextResponse } from "next/server";

const textEncoder = new TextEncoder();

export const ADMIN_AUTH_COOKIE = "admin_auth_token";
export const ADMIN_CSRF_COOKIE = "admin_csrf_token";

export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours
const ADMIN_CSRF_MAX_AGE = 60 * 30; // 30 minutes

type AdminSessionPayload = {
  sub: string;
  email: string;
  role: "admin";
  iat: number;
  exp: number;
};

type CsrfPayload = {
  purpose: "admin-login";
  nonce: string;
  exp: number;
};

function getAdminSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is required.");
  return secret;
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

function randomString(byteLength = 24) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base64UrlEncodeBinary(bytesToBinary(bytes));
}

async function hmacSha256(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign("HMAC", key, textEncoder.encode(value));
  return new Uint8Array(signature);
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function signPayload(payloadEncoded: string) {
  const signatureBytes = await hmacSha256(payloadEncoded, getAdminSecret());
  return base64UrlEncodeBinary(bytesToBinary(signatureBytes));
}

async function createSignedToken(payload: Record<string, unknown>) {
  const payloadEncoded = encodeString(JSON.stringify(payload));
  const signature = await signPayload(payloadEncoded);
  return `${payloadEncoded}.${signature}`;
}

async function verifySignedToken<T>(token?: string | null) {
  if (!token) return null;

  const [payloadEncoded, signature] = token.split(".");
  if (!payloadEncoded || !signature) return null;

  const expectedSignature = await signPayload(payloadEncoded);
  if (!timingSafeEqual(signature, expectedSignature)) return null;

  try {
    return JSON.parse(decodeString(payloadEncoded)) as T;
  } catch {
    return null;
  }
}

export async function createAdminSessionToken(adminId: string, email: string) {
  const iat = Math.floor(Date.now() / 1000);
  const payload: AdminSessionPayload = {
    sub: adminId,
    email,
    role: "admin",
    iat,
    exp: iat + ADMIN_SESSION_MAX_AGE,
  };

  return createSignedToken(payload as unknown as Record<string, unknown>);
}

export async function verifyAdminSessionToken(token?: string | null) {
  const payload = await verifySignedToken<AdminSessionPayload>(token);
  if (!payload) return null;
  if (payload.role !== "admin") return null;
  if (!payload.sub || !payload.email) return null;
  if (!Number.isFinite(payload.exp) || payload.exp <= Math.floor(Date.now() / 1000)) return null;
  return payload;
}

export function setAdminSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(ADMIN_AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_AUTH_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function createCsrfToken() {
  const payload: CsrfPayload = {
    purpose: "admin-login",
    nonce: randomString(24),
    exp: Math.floor(Date.now() / 1000) + ADMIN_CSRF_MAX_AGE,
  };

  return createSignedToken(payload as unknown as Record<string, unknown>);
}

export function setAdminCsrfCookie(response: NextResponse, token: string) {
  response.cookies.set(ADMIN_CSRF_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_CSRF_MAX_AGE,
  });
}

function getRequestOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin) return origin;

  const referer = request.headers.get("referer");
  if (!referer) return null;

  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

export function hasValidSameOrigin(request: NextRequest) {
  const requestOrigin = getRequestOrigin(request);
  if (!requestOrigin) return false;
  return requestOrigin === request.nextUrl.origin;
}

export async function verifyLoginCsrf(request: NextRequest) {
  if (!hasValidSameOrigin(request)) return false;

  const headerToken = request.headers.get("x-csrf-token")?.trim();
  const cookieToken = request.cookies.get(ADMIN_CSRF_COOKIE)?.value;
  if (!headerToken || !cookieToken) return false;
  if (!timingSafeEqual(headerToken, cookieToken)) return false;

  const payload = await verifySignedToken<CsrfPayload>(cookieToken);
  if (!payload) return false;
  if (payload.purpose !== "admin-login") return false;
  if (!payload.nonce) return false;
  if (!Number.isFinite(payload.exp) || payload.exp <= Math.floor(Date.now() / 1000)) return false;

  return true;
}

export async function getAdminSessionFromRequest(request: NextRequest) {
  const token = request.cookies.get(ADMIN_AUTH_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}
