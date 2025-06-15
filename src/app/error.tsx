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
      <p className={styles.code}>STATUS / request failed safely</p>
      <h1>The signal was interrupted.</h1>
      <p className={styles.description}>
        The requested data could not be loaded. No submission is required; retry the request or
        return later.
      </p>
      <button type="button" onClick={reset}>
        retry_request
      </button>
      {error.digest && <p className={styles.digest}>reference: {error.digest}</p>}
    </div>
  );
}
