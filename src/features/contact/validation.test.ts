import { describe, expect, it } from "vitest";
import { contactMessageSchema } from "./validation";

describe("contactMessageSchema", () => {
  it("normalizes a valid submission", () => {
    const result = contactMessageSchema.parse({
      name: "  Ada Lovelace  ",
      email: "  ADA@EXAMPLE.COM  ",
      message: "  I would like to discuss a memory-forensics project.  ",
      website: "  ",
    });

    expect(result).toEqual({
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "I would like to discuss a memory-forensics project.",
      website: "",
    });
  });

  it("reports errors for every invalid public field", () => {
    const result = contactMessageSchema.safeParse({
      name: "A",
      email: "not-an-email",
      message: "Too short",
      website: "",
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error.flatten().fieldErrors).toMatchObject({
      name: ["Enter at least 2 characters."],
      email: ["Enter a valid email address."],
      message: ["Include at least 20 characters so there is enough context."],
    });
  });

  it("rejects values beyond the database field limits", () => {
    const result = contactMessageSchema.safeParse({
      name: "n".repeat(121),
      email: `${"e".repeat(310)}@example.com`,
      message: "m".repeat(5001),
      website: "",
    });

    expect(result.success).toBe(false);
  });
});
