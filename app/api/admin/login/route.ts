import { NextResponse } from "next/server";
import {
  ADMIN_AUTH_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminToken,
  isValidAdminCredentials,
} from "@/lib/admin-auth";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required." },
      { status: 400 },
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: "Password must be at least 8 characters." },
      { status: 400 },
    );
  }

  if (!isValidAdminCredentials(email, password)) {
    return NextResponse.json(
      { message: "Invalid admin credentials." },
      { status: 401 },
    );
  }

  const token = await createAdminToken();
  const response = NextResponse.json({ ok: true });

  response.cookies.set(ADMIN_AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  return response;
}
