import type { SVGProps } from "react";

export const securityGlyphNames = [
  "rule-match",
  "endpoint-identity",
  "vad-region",
  "process-tree",
  "attention-rank",
  "plugin-dag",
  "cfg-path",
  "evidence-record",
  "trust-boundary",
  "honeypot-branch",
  "doi-record",
  "message-route",
  "missing-route",
] as const;

export type SecurityGlyphName = (typeof securityGlyphNames)[number];

export const focusAreaGlyphNames = [
  "rule-match",
  "endpoint-identity",
  "vad-region",
  "attention-rank",
] as const satisfies readonly SecurityGlyphName[];

type SecurityGlyphProps = Omit<SVGProps<SVGSVGElement>, "children"> &
  Readonly<{
    name: SecurityGlyphName;
    label?: string;
  }>;

export function SecurityGlyph({ name, label, ...props }: SecurityGlyphProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      focusable="false"
      role={label ? "img" : undefined}
    >
      {renderGlyph(name)}
    </svg>
  );
}

type ByteMarkProps = Omit<SVGProps<SVGSVGElement>, "children"> &
  Readonly<{
    label?: string;
  }>;

export function ByteMark({ label, ...props }: ByteMarkProps) {
  return (
    <svg
      {...props}
      viewBox="0 0 52 24"
      fill="none"
      aria-hidden={label ? undefined : true}
      aria-label={label}
      focusable="false"
      role={label ? "img" : undefined}
    >
      <rect x="1" y="3" width="24" height="18" rx="3" stroke="currentColor" />
      <rect x="27" y="3" width="24" height="18" rx="3" stroke="currentColor" />
      <text
        x="13"
        y="15"
        fill="currentColor"
        fontFamily="var(--font-mono)"
        fontSize="8"
        fontWeight="700"
        textAnchor="middle"
      >
        59
      </text>
      <text
        x="39"
        y="15"
        fill="currentColor"
        fontFamily="var(--font-mono)"
        fontSize="8"
        fontWeight="700"
        textAnchor="middle"
      >
        44
      </text>
    </svg>
  );
}

function renderGlyph(name: SecurityGlyphName) {
  switch (name) {
    case "rule-match":
      return (
        <>
          <path d="M4 8h8M4 16h8M4 24h8" />
          <path d="m13 6 6 10-6 10" />
          <path d="M19 16h8" />
          <circle cx="27" cy="16" r="2" />
        </>
      );
    case "endpoint-identity":
      return (
        <>
          <rect x="3" y="6" width="17" height="13" rx="2" />
          <path d="M8 24h7M11.5 19v5M20 12h3" />
          <circle cx="25" cy="10" r="3" />
          <path d="M20.5 25c.7-3.1 2.2-4.7 4.5-4.7s3.8 1.6 4.5 4.7" />
        </>
      );
    case "vad-region":
      return (
        <>
          <rect x="5" y="4" width="22" height="5" rx="1" />
          <rect x="5" y="11" width="22" height="7" rx="1" fill="currentColor" opacity="0.14" />
          <rect x="5" y="20" width="22" height="4" rx="1" />
          <rect x="5" y="26" width="22" height="2" rx="1" />
          <path d="M9 14.5h7M20 14.5h3" />
        </>
      );
    case "process-tree":
      return (
        <>
          <rect x="12" y="3" width="8" height="5" rx="1" />
          <rect x="3" y="23" width="8" height="5" rx="1" />
          <rect x="21" y="23" width="8" height="5" rx="1" />
          <rect x="12" y="13" width="8" height="5" rx="1" />
          <path d="M16 8v5M16 18v2M7 20h18M7 20v3M25 20v3" />
        </>
      );
    case "attention-rank":
      return (
        <>
          {Array.from({ length: 9 }, (_, index) => {
            const x = 4 + (index % 3) * 9;
            const y = 4 + Math.floor(index / 3) * 9;
            const ranked = index === 1 || index === 4 || index === 8;
            return (
              <rect
                key={index}
                x={x}
                y={y}
                width="6"
                height="6"
                rx="1"
                fill={ranked ? "currentColor" : undefined}
                opacity={ranked ? 0.2 + index * 0.06 : undefined}
              />
            );
          })}
        </>
      );
    case "plugin-dag":
      return (
        <>
          <circle cx="5" cy="16" r="2.5" />
          <circle cx="16" cy="7" r="2.5" />
          <circle cx="16" cy="25" r="2.5" />
          <circle cx="27" cy="16" r="2.5" />
          <path d="m7 14.5 6.8-5.7M7 17.5l6.8 5.7M18.2 8.8l6.8 5.5M18.2 23.2l6.8-5.5" />
        </>
      );
    case "cfg-path":
      return (
        <>
          <rect x="3" y="4" width="10" height="6" rx="1" />
          <rect x="19" y="13" width="10" height="6" rx="1" />
          <rect x="3" y="22" width="10" height="6" rx="1" />
          <path d="M13 7h4l4 6M24 19v6h-9" />
          <path d="m16.5 4.5 3 2.5-3 2.5M17 22.5 14 25l3 2.5" />
        </>
      );
    case "evidence-record":
      return (
        <>
          <path d="M7 3h12l6 6v20H7z" />
          <path d="M19 3v6h6M11 15h10M11 20h10M11 25h6" />
          <circle cx="10" cy="10" r="1.5" fill="currentColor" />
        </>
      );
    case "trust-boundary":
      return (
        <>
          <rect x="8" y="5" width="20" height="22" rx="2" strokeDasharray="3 3" />
          <rect x="14" y="11" width="8" height="10" rx="1" />
          <path d="M2 11h6M2 21h6M5 8l3 3-3 3M5 18l3 3-3 3" />
        </>
      );
    case "honeypot-branch":
      return (
        <>
          <path d="M3 9h14v14h11M14 20l3 3-3 3" />
          <path d="M17 14h5" />
          <path d="m25 10 4 2.5v5L25 20l-4-2.5v-5z" />
        </>
      );
    case "doi-record":
      return (
        <>
          <path d="M6 4h12l5 5v18H6zM18 4v5h5M10 14h9M10 19h9" />
          <path d="M21 24h5M24 21v6" />
        </>
      );
    case "message-route":
      return (
        <>
          <rect x="3" y="7" width="9" height="7" rx="1" />
          <path d="m4 8 3.5 3L11 8M12 10h5M15 7l3 3-3 3" />
          <path d="M18 10h3v12h3" strokeDasharray="2 2" />
          <rect x="24" y="18" width="5" height="8" rx="1" />
        </>
      );
    case "missing-route":
      return (
        <>
          <circle cx="6" cy="16" r="2" />
          <circle cx="26" cy="16" r="2" />
          <path d="M8 16h6l3-5 3 10 2-5h2" strokeDasharray="3 2" />
          <path d="m14 24 4-4M18 24l-4-4" />
        </>
      );
  }
}
