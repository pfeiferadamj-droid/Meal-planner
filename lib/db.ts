/**
 * Embedded Postgres via PGlite — no Docker, no database server.
 * Data persists to DATABASE_DIR (default: .harvest-db/ in the repo root).
 * Schema files in db/init/ are idempotent and run on every startup.
 */
import fs from "fs";
import path from "path";
import { PGlite } from "@electric-sql/pglite";

export interface DbQueryResult<R> {
  rows: R[];
  rowCount: number;
}

// Drop-in stand-in for pg's PoolClient surface used by this app.
export interface DbClient {
  query<R = Record<string, unknown>>(
    text: string,
    params?: unknown[]
  ): Promise<DbQueryResult<R>>;
  release(): void;
}

declare global {
  var harvestPGlite: Promise<PGlite> | undefined;
}

const dataDir =
  process.env.DATABASE_DIR ?? path.join(process.cwd(), ".harvest-db");

async function createDb(): Promise<PGlite> {
  const db = new PGlite(dataDir);
  await db.waitReady;

  const initDir = path.join(process.cwd(), "db", "init");
  const initFiles = fs
    .readdirSync(initDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  for (const file of initFiles) {
    const sql = fs.readFileSync(path.join(initDir, file), "utf8");
    await db.exec(sql);
  }

  return db;
}

function getDb(): Promise<PGlite> {
  if (!global.harvestPGlite) {
    global.harvestPGlite = createDb();
  }
  return global.harvestPGlite;
}

interface Queryable {
  query<R>(
    text: string,
    params?: unknown[]
  ): Promise<{ rows: R[]; affectedRows?: number }>;
}

function toClient(queryable: Queryable): DbClient {
  return {
    async query<R = Record<string, unknown>>(text: string, params?: unknown[]) {
      const result = await queryable.query<R>(text, params ?? []);
      return {
        rows: result.rows,
        rowCount: result.affectedRows || result.rows.length,
      };
    },
    // PGlite serializes queries on a single embedded connection; nothing to release.
    release() {},
  };
}

export const pool = {
  async connect(): Promise<DbClient> {
    return toClient(await getDb());
  },
  async query<R = Record<string, unknown>>(text: string, params?: unknown[]) {
    const client = await this.connect();
    return client.query<R>(text, params);
  },
};

/**
 * Transaction utility that mirrors the old pg implementation: the callback
 * receives an active client inside a transaction; commit on success,
 * rollback on error.
 */
export async function withTransaction<T>(
  callback: (client: DbClient) => Promise<T>
): Promise<T> {
  const db = await getDb();
  return db.transaction((tx) => callback(toClient(tx)));
}

export async function closePool(): Promise<void> {
  if (global.harvestPGlite) {
    const db = await global.harvestPGlite;
    await db.close();
    global.harvestPGlite = undefined;
  }
}
