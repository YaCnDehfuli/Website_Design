import { afterEach, describe, expect, it } from "vitest";
import { eq } from "drizzle-orm";
import { db } from "@/db/client";
import { contactMessages } from "@/db/schema";
import { createContactMessage } from "./repository";

let createdMessageId: string | null = null;

afterEach(async () => {
  if (!createdMessageId) return;

  await db.delete(contactMessages).where(eq(contactMessages.id, createdMessageId));
  createdMessageId = null;
});

describe("contact message repository", () => {
  it("persists a validated message and returns its identifier", async () => {
    const uniqueEmail = `integration-${crypto.randomUUID()}@example.com`;
    const created = await createContactMessage({
      name: "Integration Test",
      email: uniqueEmail,
      message: "This row verifies PostgreSQL persistence and is removed after the test.",
    });
    createdMessageId = created.id;

    const [stored] = await db
      .select({
        id: contactMessages.id,
        name: contactMessages.name,
        email: contactMessages.email,
        message: contactMessages.message,
      })
      .from(contactMessages)
      .where(eq(contactMessages.id, created.id));

    expect(stored).toEqual({
      id: created.id,
      name: "Integration Test",
      email: uniqueEmail,
      message: "This row verifies PostgreSQL persistence and is removed after the test.",
    });
  });
});
