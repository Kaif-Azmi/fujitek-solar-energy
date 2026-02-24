import { createHmac, randomUUID, timingSafeEqual } from "crypto";
import type { NextRequest, NextResponse } from "next/server";
import { ConversationStage, type ChatSessionState, type ConversationSlots } from "@/lib/chat-funnel";

const CHAT_SESSION_COOKIE = "chat_session";
const CHAT_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24; // 24h
const CHAT_SESSION_MAX_AGE_MS = CHAT_SESSION_MAX_AGE_SECONDS * 1000;

type ChatCookiePayload = {
  sid: string;
  stage: ConversationStage;
  slots: ConversationSlots;
  rev: number;
  exp: number;
};

function getChatSessionSecret(): string {
  const secret = process.env.CHAT_SESSION_SECRET?.trim() || process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) {
    throw new Error("CHAT_SESSION_SECRET or ADMIN_SESSION_SECRET is required.");
  }
  return secret;
}

function toBase64Url(value: string): string {
  return Buffer.from(value, "utf8").toString("base64url");
}

function fromBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(encodedPayload: string): string {
  return createHmac("sha256", getChatSessionSecret()).update(encodedPayload).digest("base64url");
}

function signPayload(payload: ChatCookiePayload): string {
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

function verifySignedPayload(token?: string): ChatCookiePayload | null {
  if (!token) return null;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = sign(encodedPayload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (actualBuffer.length !== expectedBuffer.length) return null;
  if (!timingSafeEqual(actualBuffer, expectedBuffer)) return null;

  try {
    const payload = JSON.parse(fromBase64Url(encodedPayload)) as ChatCookiePayload;
    if (!payload.sid || !payload.stage || !Number.isFinite(payload.rev) || !Number.isFinite(payload.exp)) return null;
    if (payload.exp <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function createInitialChatSession(): ChatSessionState {
  const now = Date.now();
  return {
    sid: randomUUID(),
    stage: ConversationStage.INTENT_GATE,
    slots: {},
    rev: 0,
    exp: now + CHAT_SESSION_MAX_AGE_MS,
  };
}

export function readChatSession(request: NextRequest): ChatSessionState {
  const token = request.cookies.get(CHAT_SESSION_COOKIE)?.value;
  const payload = verifySignedPayload(token);
  if (!payload) return createInitialChatSession();

  return {
    sid: payload.sid,
    stage: payload.stage,
    slots: payload.slots ?? {},
    rev: payload.rev,
    exp: payload.exp,
  };
}

export function bumpChatSession(session: ChatSessionState): ChatSessionState {
  return {
    ...session,
    slots: { ...session.slots },
    rev: session.rev + 1,
    exp: Date.now() + CHAT_SESSION_MAX_AGE_MS,
  };
}

export function writeChatSessionCookie(response: NextResponse, session: ChatSessionState): void {
  const payload: ChatCookiePayload = {
    sid: session.sid,
    stage: session.stage,
    slots: session.slots,
    rev: session.rev,
    exp: session.exp,
  };

  const signed = signPayload(payload);
  response.cookies.set(CHAT_SESSION_COOKIE, signed, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: CHAT_SESSION_MAX_AGE_SECONDS,
  });
}

