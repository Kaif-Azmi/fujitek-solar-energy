import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { getDb } from "@/lib/mongodb";
import { ADMINS_COLLECTION, type AdminDoc } from "@/models/Admin";
import { ensureMongoIndexes } from "@/lib/mongodb-indexes";
import {
  createAdminSessionToken,
  setAdminSessionCookie,
  verifyLoginCsrf,
} from "@/lib/admin-auth";
import {
  checkAdminLoginRateLimit,
  clearAdminLoginRateLimit,
  recordFailedAdminLogin,
} from "@/lib/admin-rate-limit";
import type { WithId, Document } from "mongodb";
import { isStrongPassword, withNoStore } from "@/lib/security";

type LoginBody = {
  email?: string;
  password?: string;
};

type LegacyUserDoc = WithId<
  Document & {
    email?: string;
    name?: string;
    passwordHash?: string;
  }
>;

function getRequestIp(request: NextRequest) {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

function buildRateLimitKey(request: NextRequest, email: string) {
  return `${getRequestIp(request)}:${email || "unknown"}`;
}

function getSeedAdminConfig() {
  const email = String(process.env.ADMIN_SEED_EMAIL || "").trim().toLowerCase();
  const password = String(process.env.ADMIN_SEED_PASSWORD || "");
  const name = String(process.env.ADMIN_SEED_NAME || "Admin").trim() || "Admin";

  if (!email || !password) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  if (!isStrongPassword(password)) return null;

  return { email, password, name };
}

async function findAdminByEmail(db: Awaited<ReturnType<typeof getDb>>, email: string) {
  return db.collection<AdminDoc>(ADMINS_COLLECTION).findOne({
    email,
    isActive: { $ne: false },
  });
}

async function bootstrapSeedAdminIfEligible(
  db: Awaited<ReturnType<typeof getDb>>,
  email: string,
) {
  const seed = getSeedAdminConfig();
  if (!seed || seed.email !== email) return;

  const now = new Date();
  const passwordHash = await bcrypt.hash(seed.password, 12);

  await db.collection<AdminDoc>(ADMINS_COLLECTION).updateOne(
    { email: seed.email },
    {
      $set: {
        email: seed.email,
        name: seed.name,
        passwordHash,
        role: "super_admin",
        isActive: true,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true },
  );
}

async function migrateLegacyUserToAdmin(
  db: Awaited<ReturnType<typeof getDb>>,
  email: string,
) {
  const legacyUser = await db.collection<LegacyUserDoc>("users").findOne({
    email,
    passwordHash: { $exists: true, $type: "string" },
  });

  if (!legacyUser?.passwordHash) return null;

  const now = new Date();
  await db.collection<AdminDoc>(ADMINS_COLLECTION).updateOne(
    { email },
    {
      $set: {
        email,
        name: legacyUser.name || "Admin",
        passwordHash: legacyUser.passwordHash,
        role: "admin",
        isActive: true,
        updatedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true },
  );

  return findAdminByEmail(db, email);
}

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const csrfOk = await verifyLoginCsrf(request);
  if (!csrfOk) {
    return withNoStore(NextResponse.json({ message: "Invalid CSRF token." }, { status: 403 }));
  }

  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return withNoStore(NextResponse.json({ message: "Invalid request body." }, { status: 400 }));
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "");

  if (!email || !password) {
    return withNoStore(NextResponse.json({ message: "Email and password are required." }, { status: 400 }));
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return withNoStore(NextResponse.json({ message: "Enter a valid email address." }, { status: 400 }));
  }

  if (!isStrongPassword(password)) {
    return withNoStore(
      NextResponse.json(
        {
          message:
            "Password must be at least 12 characters and include uppercase, lowercase, number, and special character.",
        },
        { status: 400 },
      ),
    );
  }

  const rateLimitKey = buildRateLimitKey(request, email);
  const rateLimit = checkAdminLoginRateLimit(rateLimitKey);

  if (!rateLimit.allowed) {
    return withNoStore(NextResponse.json(
      {
        message: "Too many failed login attempts. Please try again later.",
        retryAfterSeconds: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
      },
    ));
  }

  const db = await getDb();

  await ensureMongoIndexes();

  let admin = await findAdminByEmail(db, email);
  if (!admin) {
    await bootstrapSeedAdminIfEligible(db, email);
    admin = await findAdminByEmail(db, email);
  }
  if (!admin) {
    admin = await migrateLegacyUserToAdmin(db, email);
  }

  if (!admin) {
    recordFailedAdminLogin(rateLimitKey);
    return withNoStore(NextResponse.json({ message: "Invalid email or password." }, { status: 401 }));
  }

  const passwordOk = await bcrypt.compare(password, admin.passwordHash);
  if (!passwordOk) {
    recordFailedAdminLogin(rateLimitKey);
    return withNoStore(NextResponse.json({ message: "Invalid email or password." }, { status: 401 }));
  }

  clearAdminLoginRateLimit(rateLimitKey);

  const token = await createAdminSessionToken(String(admin._id), admin.email);
  const response = NextResponse.json({ ok: true });

  setAdminSessionCookie(response, token);
  withNoStore(response);

  await db.collection<AdminDoc>(ADMINS_COLLECTION).updateOne(
    { _id: admin._id },
    { $set: { lastLoginAt: new Date(), updatedAt: new Date() } },
  );

  return response;
}
