"use server";

import { createContactMessage } from "./repository";
import type { ContactFormState } from "./types";
import { contactMessageSchema } from "./validation";

export async function submitContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const result = contactMessageSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
    website: formData.get("website"),
  });

  if (!result.success) {
    return {
      status: "error",
      message: "Check the highlighted fields and try again.",
      fieldErrors: result.error.flatten().fieldErrors,
    };
  }

  // The hidden field gives basic bots a successful-looking no-op without retaining their payload.
  if (result.data.website) {
    return { status: "success", message: "Message received." };
  }

  try {
    await createContactMessage({
      name: result.data.name,
      email: result.data.email,
      message: result.data.message,
    });

    return {
      status: "success",
      message: "Message stored. Thank you for reaching out.",
    };
  } catch (error) {
    console.error("Contact message persistence failed", error);

    return {
      status: "error",
      message: "The message could not be stored. Please use the email fallback.",
    };
  }
}
