import { MongoClient } from 'mongodb';
import { validateRequiredEnv } from "@/lib/env";

const uri = process.env.MONGODB_URI;

// Extract DB name from the connection string path (requires /<dbname> present)
function parseDbNameFromUri(connectionString: string): string {
  try {
    // Replace mongodb(s) scheme with https so URL can parse the pathname
    const safe = connectionString.replace(/^mongodb(\+srv)?:\/\//i, 'https://');
    const url = new URL(safe);
    const pathname = url.pathname || '';
    const parts = pathname.split('/').filter(Boolean);
    const dbName = parts[0];
    if (!dbName) {
      throw new Error('Database name not found in MONGODB_URI (expect mongodb://user:pass@host/dbname)');
    }
    return dbName;
  } catch {
    throw new Error('Failed to parse database name from MONGODB_URI');
  }
}

let DB_NAME: string | null = null;

declare global {
  var __mongoClientPromise: Promise<MongoClient> | undefined;
  var __mongoClient: MongoClient | undefined;
}

function ensureMongoClientPromise() {
  if (globalThis.__mongoClientPromise) return;
  validateRequiredEnv(["NODE_ENV", "MONGODB_URI"]);
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is required');
  }

  const client = new MongoClient(uri, {});
  globalThis.__mongoClientPromise = client
    .connect()
    .then(() => {
      globalThis.__mongoClient = client;
      client.on('close', () => {
        console.error('MongoDB: connection closed unexpectedly');
      });
      return client;
    })
    .catch((err) => {
      console.error('MongoDB: initial connection failed', err);
      throw err;
    });
}

/**
 * Returns the connected MongoClient instance.
 * Throws if the initial connection failed.
 */
export async function getMongoClient(): Promise<MongoClient> {
  ensureMongoClientPromise();
  const clientPromise = globalThis.__mongoClientPromise;
  if (!clientPromise) throw new Error("MongoDB client not initialized.");
  return await clientPromise;
}

/**
 * Returns the database referenced in the MONGODB_URI.
 * Throws on any error.
 */
export async function getDb() {
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is required');
  }
  if (!DB_NAME) DB_NAME = parseDbNameFromUri(uri);
  const client = await getMongoClient();
  return client.db(DB_NAME);
}
