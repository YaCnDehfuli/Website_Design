import "server-only";
import { z } from "zod";

const serverEnvironment = z.object({
  DATABASE_URL: z.string().url().startsWith("postgres"),
  SITE_URL: z.string().url().default("http://localhost:3000"),
});

const result = serverEnvironment.safeParse({
  DATABASE_URL: process.env.DATABASE_URL,
  SITE_URL: process.env.SITE_URL,
});

if (!result.success) {
  throw new Error(`Invalid server environment: ${z.prettifyError(result.error)}`);
}

export const env = result.data;
