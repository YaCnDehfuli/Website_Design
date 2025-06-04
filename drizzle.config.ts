import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { z } from "zod";

config({ path: [".env.local", ".env"], quiet: true });

const migrationEnvironment = z.object({
  MIGRATION_DATABASE_URL: z.string().url().startsWith("postgres"),
});

const parsedEnvironment = migrationEnvironment.safeParse(process.env);

if (!parsedEnvironment.success) {
  throw new Error(
    "MIGRATION_DATABASE_URL is missing or invalid. Copy .env.example to .env.local and provide a PostgreSQL URL.",
  );
}

const { MIGRATION_DATABASE_URL } = parsedEnvironment.data;

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: MIGRATION_DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
