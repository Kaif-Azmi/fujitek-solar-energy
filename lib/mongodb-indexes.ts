import { getDb } from "@/lib/mongodb";
import { ADMINS_COLLECTION } from "@/models/Admin";

let indexPromise: Promise<void> | null = null;

export async function ensureMongoIndexes() {
  if (!indexPromise) {
    indexPromise = (async () => {
      const db = await getDb();

      await Promise.all([
        db.collection(ADMINS_COLLECTION).createIndex({ email: 1 }, { unique: true }),
        db.collection("admin_products").createIndex({ status: 1, createdAt: -1 }),
        db.collection("banners").createIndex({ status: 1, createdAt: -1 }),
      ]);
    })();
  }

  await indexPromise;
}

