import type { EducationEntry, ExperienceEntry } from "./types";

export const experience: readonly ExperienceEntry[] = [
  {
    organization: "Hadeth",
    role: "Security Engineer",
    startDate: "March 2025",
    endDate: "April 2026",
    summary:
      "Worked across detection engineering, security telemetry, vulnerability management, incident response, endpoint security, identity security, and practical validation of defensive controls.",
    highlights: [
      "Expanded managed-device coverage from 24% to 95%, reaching 20 of 21 devices.",
      "Developed 9 detection rules and validated defensive coverage through 23 adversary simulations.",
      "Reduced recurring alert volume by 38% through rule and workflow refinement.",
      "Documented and triaged 42 vulnerability findings.",
      "Supported investigation and response activities across 8 security incidents.",
    ],
  },
  {
    organization: "Behaviour-Centric Cybersecurity Center, York University",
    role: "Cybersecurity & AI Researcher",
    startDate: "September 2023",
    endDate: "November 2025",
    summary:
      "Conducted research at the intersection of memory forensics, malware analysis, applied machine learning, forensic datasets, and explainable detection.",
    highlights: [
      "Developed VADViT, a Vision Transformer framework for malicious-process detection and explainable VAD-region attribution.",
      "Designed memory-extraction and preprocessing pipelines using Volatility 3, Python, multiprocessing, entropy analysis, and Markov byte-transition representations.",
      "Contributed to the BCCC-MalMem-SnapLog-2025 data-generation and evidence-capture workflow.",
      "Co-authored peer-reviewed research in ACM Computing Surveys and the Journal of Information Security and Applications.",
    ],
  },
  {
    organization: "Behaviour-Centric Cybersecurity Center, York University",
    role: "Research Assistant",
    startDate: "May 2025",
    endDate: "September 2025",
    summary:
      "Developed VolMemLyzer, a Python framework for repeatable memory-forensics extraction, structured feature generation, and analyst-oriented triage.",
    highlights: [
      "Developed modular runner, pipeline, registry, extraction, conversion, and analysis components over Volatility 3.",
      "Implemented cached and parallel plugin execution with timeout handling, deterministic artifact naming, and structured failure reporting.",
      "Produced normalized JSON, JSONL, and CSV artifacts for forensic and machine-learning workflows.",
      "Built registry-driven extraction across process, registry, network, VAD, service, thread, module, DLL, handle, and kernel artifacts.",
    ],
  },
  {
    organization: "York University",
    role: "Teaching Assistant",
    startDate: "September 2023",
    endDate: "April 2026",
    summary:
      "Supported undergraduate teaching across security, artificial intelligence, Linux tooling, C, assembly, Bash, and logic programming.",
    highlights: [
      "Taught foundational defensive-security topics including RSA, hashing, network security, and malware.",
      "Supported practical instruction across Linux permissions, Bash scripting, C, assembly, artificial intelligence, and logic inference.",
    ],
    assignments: [
      {
        startDate: "September 2023",
        endDate: "December 2023",
        title: "Software Tools",
        topics: "Linux, Bash, and C",
      },
      {
        startDate: "January 2024",
        endDate: "May 2024",
        title: "Software Tools",
        topics: "Linux fundamentals, permissions, Bash scripting, and core Linux concepts",
      },
      {
        startDate: "September 2024",
        endDate: "December 2024",
        title: "Introduction to Artificial Intelligence and Logic Programming",
        topics: "AI concepts, machine learning, logic programming, and inference",
      },
      {
        startDate: "January 2025",
        endDate: "May 2025",
        title: "Introduction to Security",
        topics: "RSA, hashing, network security, malware, and foundational defensive concepts",
      },
      {
        startDate: "September 2025",
        endDate: "December 2025",
        title: "Systems Programming",
        topics: "C programming, assembly programming, and Bash scripting",
      },
      {
        startDate: "January 2026",
        endDate: "April 2026",
        title: "Introduction to Security",
        topics: "RSA, hashing, network security, malware, and foundational defensive concepts",
      },
    ],
  },
  {
    organization: "noICT",
    role: "AI Software Engineer",
    startDate: "April 2021",
    endDate: "August 2022",
    summary:
      "Developed smart-home and voice-assistant software connecting speech recognition, command interpretation, Python services, Raspberry Pi systems, Arduino devices, and embedded communication.",
    highlights: [
      "Delivered more than 10 speech-to-command and smart-home features.",
      "Reduced misrouted commands by 21%.",
      "Developed speech-to-command workflows involving recognition, interpretation, intent or entity processing, and user feedback.",
      "Worked across Python, C/C++, Raspberry Pi, Arduino, I2C communication, and infrared remote-control workflows.",
    ],
  },
];

export const education: readonly EducationEntry[] = [
  {
    institution: "York University",
    credential: "M.Sc. Computer Science",
    startDate: "September 2023",
    endDate: "May 2025",
    gpa: "3.9/4.0",
  },
  {
    institution: "Amirkabir University of Technology",
    credential: "B.A.Sc. Electrical & Computer Engineering",
    startDate: "September 2017",
    endDate: "August 2022",
    gpa: "3.84/4.0",
  },
];
