export type PlannedProject = Readonly<{
  slug: string;
  title: string;
  description: string;
}>;

// These roadmap entries are not published project records. Move an item to PostgreSQL only after
// implementation begins and evidence is available for a full project record.
export const plannedProjects = [
  {
    slug: "detection-as-code",
    title: "Detection as Code",
    description:
      "A planned repository of tested Sigma rules, ATT&CK mappings, and CI-backed conversion to KQL and SPL.",
  },
  {
    slug: "sentinel-detection-hunting",
    title: "Sentinel Detection and Hunting Pack",
    description:
      "A planned set of KQL analytics, hunting queries, and a workbook evaluated against public security telemetry.",
  },
  {
    slug: "soar-triage-workflow",
    title: "SOAR Triage Workflow",
    description:
      "A planned workflow connecting a detection to enrichment, triage decisions, and case notification.",
  },
  {
    slug: "network-detection-pipeline",
    title: "Network Detection Pipeline",
    description:
      "A planned Zeek and Suricata pipeline with an original Python detector for beaconing or DNS tunneling.",
  },
  {
    slug: "memory-triage-integration",
    title: "Memory-Triage Integration",
    description:
      "A planned integration of VolMemLyzer and VADViT into one evidence-linked analyst report.",
  },
  {
    slug: "agentic-ai-security-evaluation",
    title: "Agentic AI Security Evaluation Harness",
    description:
      "A planned evaluation harness for prompt injection, tool misuse, and agentic workflow abuse with scored results.",
  },
] as const satisfies readonly PlannedProject[];
