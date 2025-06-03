export type ContactField = "name" | "email" | "message";

export type ContactFormState = Readonly<{
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<ContactField, readonly string[]>>;
}>;
