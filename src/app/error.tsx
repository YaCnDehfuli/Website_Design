"use client";

import { useEffect } from "react";
import styles from "./status.module.css";

type ErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Route rendering failed", error);
  }, [error]);

  return (
    <div className={styles.page}>
      <p className={styles.code}>REQUEST_ERROR</p>
      <h1>Something went wrong.</h1>
      <p className={styles.description}>
        The requested page could not be loaded. Try again, or return later.
      </p>
      <button type="button" onClick={reset}>
        Try again
      </button>
      {error.digest && <p className={styles.digest}>Reference: {error.digest}</p>}
    </div>
  );
}
