import type { PublicationSeed } from "./types";

export const publicationSeeds = [
  {
    slug: "vadvit-vision-transformer-memory-forensics",
    title:
      "VADViT: Vision transformer-driven memory forensics for malicious process detection and explainable threat attribution",
    publicationType: "journal",
    authors: ["Yasin Dehfouli", "Arash Habibi Lashkari"],
    doi: "10.1016/j.jisa.2025.104200",
    venue: "Journal of Information Security and Applications, Volume 94, Article 104200",
    externalUrl: "https://doi.org/10.1016/j.jisa.2025.104200",
    publishedAt: new Date("2025-08-30T00:00:00.000Z"),
    summary:
      "A Vision Transformer framework for detecting malicious processes from VAD-region memory representations and attributing predictions to analyst-reviewable regions.",
    body: `## Citation

Yasin Dehfouli and Arash Habibi Lashkari. “VADViT: Vision transformer-driven memory forensics for malicious process detection and explainable threat attribution.” *Journal of Information Security and Applications*, Volume 94, Article 104200, 2025. [https://doi.org/10.1016/j.jisa.2025.104200](https://doi.org/10.1016/j.jisa.2025.104200)

## Plain-language summary

VADViT detects malicious Windows processes by converting their Virtual Address Descriptor regions into structured images. It combines three signals—byte transitions, entropy, and memory-region metadata—then uses a Vision Transformer to classify the process and rank the regions that most influenced the result.

## Research problem

Existing memory detectors can depend on handcrafted forensic features, lose evidence while resizing large memory images, or return predictions without a practical route back to the suspicious bytes. The study focuses on preserving region structure and making model output useful during forensic review.

## Methodology

The work introduces BCCC-MalMem-SnapLog-2025, a dataset built from periodic memory snapshots with process identifiers and supporting telemetry. Volatility 3 extracts the VAD regions for tracked processes. Each region becomes a fused Markov, entropy, and VAD-metadata image before placement in a process grid and classification by a fine-tuned Vision Transformer.

## Main contributions

- a region-aware memory representation that limits information loss;
- a temporal memory-snapshot dataset with process-level tracking;
- an attention-based workflow that maps model relevance back to VAD regions;
- evaluation across binary and malware-family classification settings.

## Headline results

The final paper reports **99% binary classification accuracy** and **92% macro-averaged F1 for multiclass detection**. Attention-based region sorting narrows the evidence analysts need to inspect while retaining links to the underlying memory regions.

## Dataset context and limitations

The dataset represents controlled Windows malware executions and a defined set of families. Results may change with unseen environments, operating-system versions, acquisition conditions, and malware distributions. Attention ranking improves traceability but remains supporting evidence rather than a causal explanation.

## Research artifacts

- [VADViT repository](https://github.com/YaCnDehfuli/VADViT)
- [DOI record](https://doi.org/10.1016/j.jisa.2025.104200)
- [BCCC dataset directory](https://www.yorku.ca/research/bccc/ucs-technical/cybersecurity-datasets-cds/)`,
  },
  {
    slug: "memory-analysis-malware-detection-oscar-survey",
    title:
      "Memory Analysis for Malware Detection: A Comprehensive Survey Using the OSCAR Methodology",
    publicationType: "journal",
    authors: ["Yasin Dehfouli", "Arash Habibi Lashkari"],
    doi: "10.1145/3764580",
    venue: "ACM Computing Surveys, Volume 58, Issue 4, Article 86",
    externalUrl: "https://doi.org/10.1145/3764580",
    publishedAt: new Date("2025-10-01T00:00:00.000Z"),
    summary:
      "A structured survey of memory acquisition, forensic methods, datasets, and malware-detection approaches using an OSCAR-guided methodology.",
    body: `## Citation

Yasin Dehfouli and Arash Habibi Lashkari. “Memory Analysis for Malware Detection: A Comprehensive Survey Using the OSCAR Methodology.” *ACM Computing Surveys*, Volume 58, Issue 4, Article 86, October 2025. [https://doi.org/10.1145/3764580](https://doi.org/10.1145/3764580)

## Why this survey

Memory analysis spans acquisition hardware, operating-system internals, forensic plugins, malware datasets, and detection models. Earlier surveys often covered only one part of that landscape or reflected tools and datasets that had become outdated. This work connects the full workflow and makes the comparison criteria explicit.

## OSCAR-guided methodology

The survey adapts OSCAR—Obtain, Strategize, Collect, Analyze, Report—into a domain-specific structure for acquisition, forensics, datasets, approaches, and results. Research questions are mapped to each stage before literature collection and comparison.

## Acquisition and forensic analysis

The taxonomy covers software and hardware acquisition across user, kernel, hypervisor, and device levels. It then compares forensic methods and tools for processes, injected code, networking, credentials, persistence, and other volatile artifacts, including practical limitations caused by operating-system and symbol changes.

## Datasets and scoring

The survey catalogs public memory-dump datasets and proposes a comparison score spanning sample count, malware diversity, feature coverage, release date, dump size, and accessibility. The score is a decision aid rather than a universal ranking: a specialized dataset can still be the right choice for a focused research question.

## Detection approaches

Both machine-learning and non-machine-learning methods are organized by their inputs, feature strategies, model families, results, and forensic applicability. The comparison highlights the trade-off between predictive performance, explainability, reproducibility, and the cost of acquiring and processing volatile memory.

## Research gaps and practical implications

The study identifies continuing needs for standardized acquisition, current and accessible datasets, reproducible evaluation, cross-environment validation, and explanations that lead analysts back to evidence. It also documents aging tools and the difficulty of comparing results across incompatible datasets and experimental protocols.

## Source

[Read the canonical DOI record](https://doi.org/10.1145/3764580)`,
  },
] as const satisfies readonly PublicationSeed[];
