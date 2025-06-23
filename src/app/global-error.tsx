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
          <p style={{ color: "#63f2d0", fontFamily: "monospace" }}>APPLICATION_ERROR</p>
          <h1>The site could not be displayed.</h1>
          <p style={{ color: "#91a5a3", maxWidth: "42rem" }}>
            An application error prevented this page from loading. Try again, or return later.
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
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
