import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";

const uri = process.env.MONGODB_URI;
const email = (process.env.ADMIN_SEED_EMAIL || "admin@fujitek.local").trim().toLowerCase();
const password = process.env.ADMIN_SEED_PASSWORD || "admin12345";
const name = process.env.ADMIN_SEED_NAME || "Admin";
const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W_]{12,}$/;

if (!uri) throw new Error("MONGODB_URI is required");
if (!STRONG_PASSWORD_REGEX.test(password)) {
  throw new Error(
    "ADMIN_SEED_PASSWORD must be at least 12 characters and include uppercase, lowercase, number, and special character",
  );
}

const client = new MongoClient(uri);

try {
  await client.connect();

  const safe = uri.replace(/^mongodb(\+srv)?:\/\//i, "https://");
  const dbName = new URL(safe).pathname.split("/").filter(Boolean)[0];
  if (!dbName) throw new Error("Database name missing in MONGODB_URI path");

  const db = client.db(dbName);
  const passwordHash = await bcrypt.hash(password, 12);
  const now = new Date();

  await db.collection("admins").updateOne(
    { email },
    {
      $set: {
        email,
        name,
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

  await db.collection("admins").createIndex({ email: 1 }, { unique: true });

  console.log(`Admin seeded: ${email}`);
} finally {
  await client.close();
}
