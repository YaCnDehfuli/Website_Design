"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
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
    if (state.status === "success") formRef.current?.reset();
  }, [state.status]);

  const nameError = state.fieldErrors?.name?.[0];
  const emailError = state.fieldErrors?.email?.[0];
  const messageError = state.fieldErrors?.message?.[0];

  return (
    <section className={styles.panel} aria-labelledby="message-title">
      <div className={styles.panelBar}>
        <span>MESSAGE_BUFFER.form</span>
        <span>POST /contact</span>
      </div>
      <div className={styles.layout}>
        <div className={styles.intro}>
          <p className="section-kicker">02 / direct transmission</p>
          <h2 id="message-title">Send a message</h2>
          <p>
            This form stores your name, email address, message, and submission time so I can
            respond. Do not include passwords or other secrets.
          </p>
          <div className={styles.privacyNote}>
            <span aria-hidden="true">🔐</span>
            <p>
              <strong>Data boundary</strong>
              No account, tracking identifier, or marketing subscription.
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
                20–5,000 characters · useful context beats formal wording
              </p>
            )}
          </div>

          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <div className={styles.submitRow}>
            <SubmitButton />
            <p className={styles.formStatus} data-status={state.status} aria-live="polite">
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
    <button type="submit" disabled={pending}>
      <span aria-hidden="true">{pending ? "◌" : "▶"}</span>
      {pending ? " transmitting..." : " transmit_message"}
    </button>
  );
}
