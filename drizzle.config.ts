import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { z } from "zod";

const migrationEnvironment = z.object({
  MIGRATION_DATABASE_URL: z.string().url().startsWith("postgres"),
});

const { MIGRATION_DATABASE_URL } = migrationEnvironment.parse(process.env);

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
