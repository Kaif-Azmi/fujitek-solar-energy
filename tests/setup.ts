import { MongoMemoryServer } from 'mongodb-memory-server';

// Start MongoMemoryServer eagerly so the MONGODB_URI is set before tests import DB helpers.
const mongodPromise = MongoMemoryServer.create();

// Use top-level await to ensure the URI is available before tests run.
const mongod = await mongodPromise;
process.env.MONGODB_URI = mongod.getUri();

// Ensure the server is stopped when the process exits
process.on('exit', async () => {
  if (mongod) await mongod.stop();
});

