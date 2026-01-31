import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI environment variable is required');
}

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
  } catch (err) {
    throw new Error('Failed to parse database name from MONGODB_URI');
  }
}

const DB_NAME = parseDbNameFromUri(uri);

declare global {
  // eslint-disable-next-line no-var
  var __mongoClientPromise: Promise<MongoClient> | undefined;
  // eslint-disable-next-line no-var
  var __mongoClient: MongoClient | undefined;
}

if (!globalThis.__mongoClientPromise) {
  const client = new MongoClient(uri, {});

  globalThis.__mongoClientPromise = client
    .connect()
    .then(() => {
      globalThis.__mongoClient = client;
      console.log('MongoDB: connected');
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
  if (!globalThis.__mongoClientPromise) {
    throw new Error('MongoDB client promise is not initialized');
  }
  return await globalThis.__mongoClientPromise;
}

/**
 * Returns the database referenced in the MONGODB_URI.
 * Throws on any error.
 */
export async function getDb() {
  const client = await getMongoClient();
  return client.db(DB_NAME);
}
