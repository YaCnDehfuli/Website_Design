import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters.").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email address.").max(320),
  message: z
    .string()
    .trim()
    .min(20, "Include at least 20 characters so there is enough context.")
    .max(5000, "Keep the message below 5,000 characters."),
  website: z.string().trim().optional(),
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
