import type { EducationEntry, ExperienceEntry } from "./types";

export const experience: readonly ExperienceEntry[] = [
  {
    organization: "Hadeth",
    role: "Security Engineer",
    startDate: "March 2025",
    endDate: "April 2026",
    summary:
      "Built and operated Hadeth’s first security function across endpoint and identity controls, detection engineering, vulnerability management, and incident response.",
    highlights: [
      "Enrolled 20 of 21 devices in Intune and Defender and enforced encryption, firewall, antimalware, and compliance baselines, increasing managed-device coverage from 24% to 95%.",
      "Developed 9 Wazuh rules and hunting queries across Windows authentication, Sysmon, PowerShell, and agent-health telemetry; validated them with 23 ATT&CK-aligned simulations.",
      "Reduced recurring non-actionable alerts by 38% over two months through rule tuning and workflow refinement.",
      "Triaged 42 vulnerability findings by exploitability, exposure, and business impact, and verified closure of 7 of 8 high-severity issues.",
      "Supported investigation and response across 8 phishing, suspicious-sign-in, malware, and credential-exposure cases by correlating endpoint, identity, and email telemetry.",
    ],
  },
  {
    organization: "Behaviour-Centric Cybersecurity Center, York University",
    role: "Cybersecurity & AI Researcher",
    startDate: "September 2023",
    endDate: "November 2025",
    summary:
      "Conducted applied research in memory forensics and malware detection, including forensic dataset construction, machine-learning evaluation, and analyst-oriented attribution.",
    highlights: [
      "Developed VADViT, a Vision Transformer framework that achieved 99% binary-classification accuracy and 92% macro-averaged F1 for multiclass malicious-process detection.",
      "Designed memory-extraction and preprocessing pipelines using Volatility 3, Python, multiprocessing, entropy analysis, and Markov byte-transition representations.",
      "Contributed to the BCCC-MalMem-SnapLog-2025 data-generation and evidence-capture workflow.",
      "Co-authored two peer-reviewed papers published in ACM Computing Surveys and the Journal of Information Security and Applications.",
    ],
  },
  {
    organization: "Behaviour-Centric Cybersecurity Center, York University",
    role: "Research Assistant",
    startDate: "May 2025",
    endDate: "September 2025",
    summary:
      "Developed VolMemLyzer, a Python framework for repeatable Volatility 3 execution, structured feature extraction, and analyst-oriented triage.",
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
      "Supported practical undergraduate instruction in security, Linux and systems programming, and artificial intelligence and logic programming.",
    highlights: [
      "Taught defensive-security fundamentals including RSA, hashing, network security, and malware.",
      "Supported labs and coursework in Linux permissions, Bash, C, assembly, machine learning, and logic programming.",
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
      "Developed voice-assistant and smart-home software spanning speech recognition, command interpretation, Python services, Raspberry Pi systems, Arduino devices, and embedded communication.",
    highlights: [
      "Delivered more than 10 speech-to-command and smart-home features.",
      "Reduced misrouted commands by 21%.",
      "Implemented workflows from speech recognition and intent processing through device execution and user feedback.",
      "Integrated Python and C/C++ services with Raspberry Pi, Arduino, I2C, and infrared-control workflows.",
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
