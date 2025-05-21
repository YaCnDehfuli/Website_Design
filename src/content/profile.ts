import type { Profile } from "./types";

export const profile = {
  name: "Yasin Dehfouli",
  shortName: "YD",
  role: "Computer Science · AI · Security",
  introduction:
    "I explore how intelligent systems are built, tested, and secured—from software boundaries to the behavior hiding inside data.",
  biography: [
    "I am a computer science practitioner drawn to the boundary between useful software and trustworthy systems. My work and learning center on security, artificial intelligence, and the engineering choices that connect them.",
    "This site is both a portfolio and a public lab notebook: a place to document projects, explain technical decisions, and turn new questions into reproducible experiments.",
  ],
  email: "mryd71114@gmail.com",
  socialLinks: [
    { label: "GitHub", href: "https://github.com/YaCnDehfuli" },
    { label: "Email", href: "mailto:mryd71114@gmail.com" },
  ],
  focusAreas: [
    {
      emoji: "🛡️",
      title: "Security engineering",
      description: "Threat-aware design, defensive thinking, and reliable boundaries.",
      signal: "cyan",
    },
    {
      emoji: "🤖",
      title: "Applied AI",
      description: "Intelligent systems evaluated for usefulness, limits, and safety.",
      signal: "lime",
    },
    {
      emoji: "🧠",
      title: "Computer science",
      description: "Algorithms, data structures, and the ideas beneath working code.",
      signal: "violet",
    },
    {
      emoji: "🕸️",
      title: "Networks & systems",
      description: "How components communicate, fail, and recover under pressure.",
      signal: "amber",
    },
  ],
} as const satisfies Profile;
