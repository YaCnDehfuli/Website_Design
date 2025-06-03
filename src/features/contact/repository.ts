import "server-only";
import { db } from "@/db/client";
import { contactMessages } from "@/db/schema";
import type { ContactMessageInput } from "./validation";

type PersistedContactMessage = Pick<ContactMessageInput, "name" | "email" | "message">;

export async function createContactMessage(message: PersistedContactMessage) {
  const [created] = await db
    .insert(contactMessages)
    .values(message)
    .returning({ id: contactMessages.id });

  if (!created) throw new Error("Contact message insert returned no record");
  return created;
}
