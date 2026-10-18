// Shared MongoDB client for Vercel serverless functions.
// Uses the native mongodb driver (v6) with a cached connection so cold-starts
// don't open a new socket on every invocation.

import { MongoClient, ObjectId } from "mongodb";

const MONGODB_URI  = process.env.MONGODB_URI!;
const DATABASE     = process.env.MONGODB_DATABASE ?? "portfolio";
const COLLECTION   = "projects";

// Module-level cache — Vercel reuses the Node process across warm invocations.
let cachedClient: MongoClient | null = null;

async function getClient(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

async function col() {
  const client = await getClient();
  return client.db(DATABASE).collection(COLLECTION);
}

export interface MongoFilter {
  [key: string]: unknown;
}

export async function findAll(filter: MongoFilter = {}, sort: Record<string, 1 | -1> = { order: 1 }) {
  const c = await col();
  return c.find(filter).sort(sort).toArray();
}

export async function findOne(filter: MongoFilter) {
  const c = await col();
  return c.findOne(filter);
}

export async function insertOne(document: object) {
  const c = await col();
  const result = await c.insertOne(document as never);
  return result.insertedId.toString();
}

export async function updateOne(filter: MongoFilter, update: object) {
  const c = await col();
  return c.updateOne(filter, update);
}

export async function deleteOne(filter: MongoFilter) {
  const c = await col();
  return c.deleteOne(filter);
}

/** Build a filter that matches a document by its string id. */
export function objectIdFilter(id: string): MongoFilter {
  try {
    return { _id: new ObjectId(id) };
  } catch {
    // Fallback for non-ObjectId string ids (e.g. numeric legacy ids stored as strings)
    return { _id: id };
  }
}
