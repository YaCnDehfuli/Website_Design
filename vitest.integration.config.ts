import { config as loadEnvironment } from "dotenv";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

loadEnvironment({ path: [".env.local", ".env"], quiet: true });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required for PostgreSQL integration tests.");
}

const databaseHost = new URL(databaseUrl).hostname;
if (databaseHost !== "localhost" && databaseHost !== "127.0.0.1") {
  throw new Error("Integration tests are restricted to a local PostgreSQL host.");
}

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "server-only": fileURLToPath(new URL("./test/server-only.ts", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    fileParallelism: false,
    include: ["src/**/*.integration.test.ts"],
  },
});
