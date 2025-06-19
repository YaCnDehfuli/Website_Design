export const engineeringPrinciples = [
  {
    code: "BOUNDARY_01",
    emoji: "🛡️",
    title: "Make trust boundaries explicit",
    description:
      "Validate data at system boundaries, minimize exposed surface area, and document the security assumptions relevant to each interface.",
  },
  {
    code: "SCOPE_02",
    emoji: "✂️",
    title: "Keep scope proportional to requirements",
    description:
      "Smaller systems are easier to reason about, test, secure, and change. Add dependencies or abstractions only when a concrete requirement justifies them.",
  },
  {
    code: "EVIDENCE_03",
    emoji: "🔬",
    title: "Make correctness verifiable",
    description:
      "Use types, tests, logs, and reproducible commands to make expected behavior inspectable by someone other than the author.",
  },
  {
    code: "FAILURE_04",
    emoji: "🧯",
    title: "Design for failure",
    description:
      "Contain failures, return useful errors, and preserve a recovery path. Error handling is part of the interface.",
  },
] as const;

export const verificationLayers = [
  { label: "types", command: "tsc --noEmit", purpose: "type-contract violations" },
  { label: "lint", command: "eslint .", purpose: "static quality and safety issues" },
  { label: "unit", command: "vitest run", purpose: "isolated behavior and edge cases" },
  { label: "system", command: "playwright test", purpose: "critical user journeys" },
] as const;

export const buildLoop = [
  "Define the required behavior and constraints",
  "Map data flow, assets, and trust boundaries",
  "Implement the smallest complete path",
  "Verify expected behavior and failure modes",
  "Record decisions and known limitations",
] as const;
