import { getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function createUser({ name, email, password }: { name?: string; email: string; password: string }) {
  const db = await getDb();
  const users = db.collection("users");

  const existing = await users.findOne({ email: email.toLowerCase() });
  if (existing) throw new Error("duplicate");

  const passwordHash = await bcrypt.hash(password, 10);
  const now = new Date();

  const result = await users.insertOne({
    name: name || null,
    email: email.toLowerCase(),
    passwordHash,
    createdAt: now,
    updatedAt: now,
  });

  if (!result.acknowledged) throw new Error("failed to create");

  return { id: String(result.insertedId), email: email.toLowerCase(), name: name || null };
}

export async function verifyCredentials(email: string, password: string) {
  const db = await getDb();
  const users = db.collection("users");
  const user = await users.findOne({ email: email.toLowerCase() });
  if (!user || !user.passwordHash) return null;

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;

  return { id: String(user._id), email: user.email, name: user.name || user.email };
}
