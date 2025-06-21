import type { Profile } from "./types";

export const profile = {
  name: "Yasin Dehfouli",
  shortName: "YD",
  professionalHeadline: "Cybersecurity Engineer",
  location: "Toronto, Ontario",
  introduction:
    "I work across detection engineering and defensive security operations, with research depth in memory forensics, malware analysis, and applied machine learning.",
  biography: [
    "I am a cybersecurity engineer with experience in detection engineering, endpoint and identity security, vulnerability management, and incident response. My operational work has included establishing controls in a startup environment, improving telemetry coverage, validating detections, and supporting investigations.",
    "My research focuses on memory forensics and malware analysis. I develop Python tooling and reproducible data pipelines for Volatility-based analysis and have co-authored peer-reviewed work applying machine learning to malicious-process detection. I treat machine learning as an analytical method within security engineering, with emphasis on evidence, evaluation, and analyst interpretation.",
  ],
  githubUrl: "https://github.com/YaCnDehfuli",
  linkedInUrl: "https://www.linkedin.com/in/yasindehfuli/",
  image: {
    src: "/profile/yasin-dehfouli.png",
    alt: "Portrait of Yasin Dehfouli",
  },
  socialLinks: [
    { label: "GitHub", href: "https://github.com/YaCnDehfuli" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/yasindehfuli/" },
  ],
  focusAreas: [
    {
      title: "Detection Engineering",
      description:
        "Detection-rule development and tuning, telemetry coverage, adversary simulation, and investigation workflows.",
      signal: "cyan",
    },
    {
      title: "Defensive Security Operations",
      description:
        "Endpoint and identity controls, vulnerability prioritization, incident triage, containment, and remediation validation.",
      signal: "cyan",
    },
    {
      title: "Memory Forensics & Malware Analysis",
      description:
        "Windows memory artifacts, Volatility 3, VAD analysis, process evidence, and repeatable DFIR workflows.",
      signal: "violet",
    },
    {
      title: "Applied ML & Research Tooling",
      description:
        "Python research systems, forensic datasets, model evaluation, and interpretable malware-analysis methods.",
      signal: "violet",
    },
  ],
} as const satisfies Profile;
