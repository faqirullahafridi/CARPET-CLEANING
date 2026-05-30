import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

type Db = ReturnType<typeof drizzle<typeof schema>>;

let poolInstance: pg.Pool | undefined;
let dbInstance: Db | undefined;

function needsSsl(connectionString: string): boolean {
  if (/localhost|127\.0\.0\.1/i.test(connectionString)) return false;
  if (/sslmode=disable/i.test(connectionString)) return false;
  return true;
}

function getPool(): pg.Pool {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error(
      "DATABASE_URL must be set. Did you forget to provision a database?",
    );
  }

  if (!poolInstance) {
    poolInstance = new Pool({
      connectionString,
      ssl: needsSsl(connectionString) ? { rejectUnauthorized: false } : undefined,
      max: process.env.VERCEL ? 1 : 10,
      idleTimeoutMillis: process.env.VERCEL ? 5000 : 30000,
      connectionTimeoutMillis: 10000,
    });
  }

  return poolInstance;
}

function getDb(): Db {
  if (!dbInstance) {
    dbInstance = drizzle(getPool(), { schema });
  }

  return dbInstance;
}

export const db = new Proxy({} as Db, {
  get(_target, prop, receiver) {
    const instance = getDb();
    const value = Reflect.get(instance, prop, receiver);
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(instance)
      : value;
  },
});

export const pool = new Proxy({} as pg.Pool, {
  get(_target, prop, receiver) {
    const instance = getPool();
    const value = Reflect.get(instance, prop, receiver);
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(instance)
      : value;
  },
});

export * from "./schema";
