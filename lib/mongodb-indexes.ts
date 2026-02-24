import { getDb } from "@/lib/mongodb";
import { ADMINS_COLLECTION } from "@/models/Admin";
import { BLOGS_COLLECTION } from "@/models/Blog";

let indexPromise: Promise<void> | null = null;

export async function ensureMongoIndexes() {
  if (!indexPromise) {
    indexPromise = (async () => {
      const db = await getDb();

      await Promise.all([
        db.collection(ADMINS_COLLECTION).createIndex({ email: 1 }, { unique: true }),
        db.collection("admin_products").createIndex({ status: 1, createdAt: -1 }),
        db.collection("banners").createIndex({ status: 1, createdAt: -1 }),
        db.collection(BLOGS_COLLECTION).createIndex({ slug: 1 }, { unique: true }),
        db.collection(BLOGS_COLLECTION).createIndex({ isPublished: 1, publishedAt: -1 }),
        db.collection("leads").createIndex({ phone: 1 }, { unique: true }),
        db.collection("leads").createIndex({ createdAt: -1 }),
        db.collection("leads").createIndex({ lastInteractionAt: -1 }),
        db.collection("leads").createIndex({ score: -1 }),
        db.collection("leads").createIndex({ status: 1, createdAt: -1 }),
      ]);
    })();
  }

  await indexPromise;
}
