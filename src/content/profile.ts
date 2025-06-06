import type { Profile } from "./types";

export const profile = {
  name: "Yasin Dehfouli",
  shortName: "YD",
  professionalHeadline: "Security Engineer | Memory Forensics | Applied AI",
  location: "Toronto, Ontario",
  introduction:
    "I build security tools and research systems that turn volatile-memory evidence into explainable detections, analyst-ready artifacts, and reproducible experiments.",
  biography: [
    "I am a security engineer and published researcher working across detection engineering, memory forensics, malware analysis, DFIR automation, and applied machine learning.",
    "I focus on systems that do more than produce a prediction: they preserve evidence, expose technical decisions, and help analysts understand what happened.",
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
      emoji: "🛡️",
      title: "Memory Forensics & DFIR",
      description:
        "Windows memory analysis, Volatility 3, process artifacts, VAD regions, and analyst-oriented triage.",
      signal: "cyan",
    },
    {
      emoji: "📡",
      title: "Detection & Security Engineering",
      description:
        "Telemetry coverage, detection rules, adversary simulations, vulnerability analysis, and incident workflows.",
      signal: "lime",
    },
    {
      emoji: "🤖",
      title: "Applied AI for Malware Analysis",
      description:
        "Vision Transformers, graph representations, explainability, malware classification, and forensic datasets.",
      signal: "violet",
    },
    {
      emoji: "🧪",
      title: "Research Software Engineering",
      description:
        "Python tooling, reproducible experiments, structured pipelines, concurrency, testing, and technical communication.",
      signal: "amber",
    },
  ],
} as const satisfies Profile;
