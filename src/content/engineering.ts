export const engineeringPrinciples = [
  {
    code: "BOUNDARY_01",
    emoji: "🛡️",
    title: "Treat every boundary as a trust decision",
    description:
      "Validate input where it enters, minimize exposed surface area, and make authorization assumptions visible—even in small systems.",
  },
  {
    code: "SCOPE_02",
    emoji: "✂️",
    title: "Constrain before optimizing",
    description:
      "A smaller system is easier to reason about, test, secure, and change. Complexity needs evidence before it earns a dependency.",
  },
  {
    code: "EVIDENCE_03",
    emoji: "🔬",
    title: "Replace confidence with evidence",
    description:
      "Types, tests, logs, and reproducible checks turn an opinion about correctness into something another person can inspect.",
  },
  {
    code: "FAILURE_04",
    emoji: "🧯",
    title: "Design the unhappy path",
    description:
      "Failures should be contained, understandable, and recoverable. Error handling is part of the interface, not cleanup work.",
  },
] as const;

export const verificationLayers = [
  { label: "types", command: "tsc --noEmit", purpose: "invalid states" },
  { label: "lint", command: "eslint .", purpose: "unsafe patterns" },
  { label: "unit", command: "vitest run", purpose: "isolated behavior" },
  { label: "system", command: "playwright test", purpose: "user journeys" },
] as const;

export const buildLoop = [
  "State the behavior and its constraints",
  "Map data flow and trust boundaries",
  "Build the smallest complete path",
  "Verify behavior and failure modes",
  "Record decisions while context is fresh",
] as const;
