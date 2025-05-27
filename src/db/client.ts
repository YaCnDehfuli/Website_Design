import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "@/lib/env";

const globalForDatabase = globalThis as typeof globalThis & {
  databaseClient?: ReturnType<typeof postgres>;
};

const client =
  globalForDatabase.databaseClient ??
  postgres(env.DATABASE_URL, {
    max: 1,
    prepare: false,
  });

if (process.env.NODE_ENV !== "production") {
  globalForDatabase.databaseClient = client;
}

export const db = drizzle(client);
