"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { SecurityGlyph } from "@/components/visuals/security-glyphs";
import { submitContactMessage } from "./actions";
import type { ContactFormState } from "./types";
import styles from "./contact-form.module.css";

const initialState: ContactFormState = {
  status: "idle",
  message: "",
};

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactMessage, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      return;
    }

    if (state.status === "error" && state.fieldErrors) {
      const frame = requestAnimationFrame(() => {
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      });

      return () => cancelAnimationFrame(frame);
    }
  }, [state.fieldErrors, state.status]);

  const nameError = state.fieldErrors?.name?.[0];
  const emailError = state.fieldErrors?.email?.[0];
  const messageError = state.fieldErrors?.message?.[0];

  return (
    <section className={styles.panel} aria-labelledby="message-title">
      <div className={styles.panelBar}>
        <span>CONTACT_FORM</span>
        <span>SERVER_VALIDATED</span>
      </div>
      <div className={styles.layout}>
        <div className={styles.intro}>
          <p className="section-kicker">02 / contact form</p>
          <h2 id="message-title">Send a message</h2>
          <p>
            This form stores your name, email address, message, and submission time so I can
            respond. Do not include passwords or other secrets.
          </p>
          <div className={styles.privacyNote}>
            <SecurityGlyph name="trust-boundary" width="28" height="28" />
            <p>
              <strong>Data boundary</strong>
              This form does not create an account or add a marketing subscription.
            </p>
          </div>
        </div>

        <form ref={formRef} action={formAction} noValidate>
          <div className={styles.fieldRow}>
            <Field label="Name" name="name" error={nameError} autoComplete="name" />
            <Field
              label="Email"
              name="email"
              type="email"
              error={emailError}
              autoComplete="email"
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={7}
              minLength={20}
              maxLength={5000}
              required
              aria-invalid={Boolean(messageError)}
              aria-describedby={messageError ? "message-error" : "message-hint"}
            />
            {messageError ? (
              <p className={styles.error} id="message-error">
                <span aria-hidden="true">!</span> {messageError}
              </p>
            ) : (
              <p className={styles.hint} id="message-hint">
                20–5,000 characters · include enough context to understand the request.
              </p>
            )}
          </div>

          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className={styles.submitRow}>
            <SubmitButton />
            <p
              className={styles.formStatus}
              data-status={state.status}
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {state.message}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

type FieldProps = Readonly<{
  label: string;
  name: "name" | "email";
  type?: "text" | "email";
  error: string | undefined;
  autoComplete: string;
}>;

function Field({ label, name, type = "text", error, autoComplete }: FieldProps) {
  const errorId = `${name}-error`;

  return (
    <div className={styles.field}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        maxLength={name === "name" ? 120 : 320}
        required
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p className={styles.error} id={errorId}>
          <span aria-hidden="true">!</span> {error}
        </p>
      )}
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} aria-busy={pending}>
      {pending ? "Sending…" : "Send message"}
    </button>
  );
}
