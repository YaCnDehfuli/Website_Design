"use client";

type GlobalErrorProps = Readonly<{
  reset: () => void;
}>;

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body
        style={{
          background: "#060b12",
          color: "#e8f2f0",
          fontFamily: "Arial, sans-serif",
          margin: 0,
          padding: "10vh 8vw",
        }}
      >
        <main>
          <p style={{ color: "#63f2d0", fontFamily: "monospace" }}>STATUS / application boundary</p>
          <h1>Unable to render the site.</h1>
          <p style={{ color: "#91a5a3", maxWidth: "42rem" }}>
            A non-recoverable rendering error occurred. Retry once; if it persists, return later.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "transparent",
              border: "1px solid #63f2d0",
              color: "#63f2d0",
              cursor: "pointer",
              marginTop: "1.5rem",
              padding: ".7rem .9rem",
            }}
          >
            retry_request
          </button>
        </main>
      </body>
    </html>
  );
}
