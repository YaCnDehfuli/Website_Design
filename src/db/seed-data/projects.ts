import type { ProjectSeed } from "./types";

export const projectSeeds = [
  {
    slug: "vadvit-explainable-memory-forensics",
    title: "VADViT: Explainable Malicious-Process Detection from Memory",
    projectType: "research",
    status: "published-research",
    role: "First Author and Primary Research Developer",
    organization: "Behaviour-Centric Cybersecurity Center, York University",
    startedAt: null,
    endedAt: null,
    heroImagePath: "/projects/vadvit/methodology-overview.png",
    repositoryUrl: "https://github.com/YaCnDehfuli/VADViT",
    liveUrl: "https://doi.org/10.1016/j.jisa.2025.104200",
    featured: true,
    sortOrder: 10,
    publishedAt: new Date("2025-08-30T00:00:00.000Z"),
    summary:
      "A Vision Transformer pipeline that converts Virtual Address Descriptor regions from Windows memory snapshots into fused Markov, entropy, and metadata images for malicious-process detection and region-level attribution.",
    body: `## Overview

VADViT turns Windows process-memory evidence into a structured visual representation for detection and forensic review. Rather than reducing an entire dump to one image, the pipeline extracts Virtual Address Descriptor regions, follows them across snapshots, and preserves region-level structure in a process grid.

## Research problem

Memory-based malware detectors often depend on handcrafted features or aggressive image resizing. Those choices can discard local evidence and make a model's decision difficult to investigate. VADViT asks whether region-aware visual representations and transformer attention can support both classification and analyst-oriented attribution.

## My role

I designed and implemented the main VADViT research pipeline, including VAD-region extraction, temporal aggregation, memory-region visualization, process-grid construction, Vision Transformer training, evaluation, and attention-based forensic attribution. I also contributed to dataset design, experimental analysis, and publication writing.

## Dataset and snapshot workflow

The work uses BCCC-MalMem-SnapLog-2025, which captures memory snapshots at regular intervals while logging process identifiers and supporting host and network telemetry. The workflow isolates relevant process memory without requiring a debugger attachment during later forensic analysis.

## VAD extraction and temporal aggregation

Volatility 3 extracts VAD regions for tracked processes. The preprocessing pipeline consolidates related regions across snapshots so the representation captures changes in process memory while retaining the identity of individual regions.

## Fused memory representation

Each region contributes three complementary channels:

- a Markov byte-transition image representing local byte relationships;
- an entropy image exposing randomness and packed or encrypted areas;
- an intensity image encoding VAD metadata and permissions.

The regions are placed into a process grid before Vision Transformer training. This keeps region boundaries available to the model instead of flattening the process into one undifferentiated image.

## Attention-based forensic attribution

Self-attention scores are mapped back to VAD regions and sorted to identify the memory areas most relevant to a prediction. The output is an investigative lead: analysts can prioritize suspicious allocations, injected-code candidates, and unusual permission patterns while retaining the underlying evidence.

## Evaluation and results

The final peer-reviewed evaluation reports **99% binary classification accuracy** and **92% macro-averaged F1 for multiclass detection**. The paper also evaluates image resolution, patch size, freezing strategies, and variability across random-seed runs.

## Limitations

The reported results are tied to the study's Windows memory dataset and malware-family coverage. Attention prioritization supports interpretation but does not prove causality or replace manual forensic validation. Broader external datasets and evolving operating-system memory structures remain important validation targets.

## Repository, paper, and dataset

- [Source repository](https://github.com/YaCnDehfuli/VADViT)
- [Peer-reviewed paper](https://doi.org/10.1016/j.jisa.2025.104200)
- [BCCC cybersecurity datasets](https://www.yorku.ca/research/bccc/ucs-technical/cybersecurity-datasets-cds/)`,
    tagSlugs: [
      "python",
      "pytorch",
      "vision-transformer",
      "timm",
      "volatility-3",
      "memory-forensics",
      "malware-detection",
      "computer-vision",
      "explainable-ai",
      "multiprocessing",
      "scikit-learn",
    ],
  },
  {
    slug: "volmemlyzer-dfir-automation",
    title: "VolMemLyzer: Automated Memory-Forensics Orchestration",
    projectType: "software",
    status: "maintained",
    role: "Research Assistant and Core Python/DFIR Tooling Developer",
    organization: "Behaviour-Centric Cybersecurity Center, York University",
    startedAt: null,
    endedAt: null,
    heroImagePath: "/projects/volmemlyzer/feature-catalog.png",
    repositoryUrl: "https://github.com/ahlashkari/VolMemLyzer",
    liveUrl: null,
    featured: true,
    sortOrder: 20,
    publishedAt: null,
    summary:
      "A modular Python toolkit over Volatility 3 for cached and parallel plugin execution, registry-driven feature extraction, normalized artifacts, and stepwise DFIR triage.",
    body: `## Overview

VolMemLyzer is a Python toolkit for repeatable memory-forensics extraction and analyst-oriented triage over Volatility 3. It connects raw plugin execution, structured artifacts, feature extraction, and investigative views without hiding the underlying commands or evidence.

## Analyst and research problem

Running a large collection of memory plugins manually creates duplicated work, inconsistent file naming, format mismatches, and fragile experiment pipelines. Research workflows also need stable features across many images, while incident responders need a smaller set of explainable triage steps.

## My role

I developed and extended the core Python architecture for VolMemLyzer, including plugin orchestration, caching, parallel execution, registry-driven feature extraction, structured artifact conversion, analyst-oriented triage, and reliability handling around Volatility 3.

## Package architecture

The code separates responsibilities into a command runner, extractor registry, orchestration pipeline, artifact converters, analysis modules, terminal presentation, and CLI. That structure allows the same operations to be used interactively or imported into research scripts.

## Pipeline orchestration

The registry binds Volatility plugin specifications to extractor functions and their dependencies. The pipeline resolves those dependencies in topological layers, executes independent work concurrently, and returns explicit artifact paths and structured action results.

## Cache, conversion, and timeout behavior

Before rerunning a plugin, the pipeline checks for an exact cached artifact. When possible, it converts compatible JSON, JSONL, or CSV output into the requested format. Per-plugin timeouts and stderr artifacts contain failures without silently dropping a result.

## Structured feature generation

Registry-driven extractors normalize process, registry, network, VAD, service, thread, module, DLL, handle, and kernel evidence. Deterministic names and stable feature keys make those artifacts usable in both forensic review and machine-learning datasets.

## DFIR triage workflow

The analysis layer organizes evidence into progressive steps: establish process bearings, inspect suspicious execution and injection evidence, correlate network and persistence artifacts, and retain links to the source plugin output. Rich terminal tables keep the workflow readable without replacing the raw records.

## Reliability boundaries

VolMemLyzer inherits the symbol coverage and plugin behavior of Volatility 3. Cache reuse must be disabled when fresh execution is required, and normalized features still need case-specific interpretation. The tool accelerates repeatable analysis; it does not automate forensic conclusions.

## Repositories

- [Primary VolMemLyzer repository](https://github.com/ahlashkari/VolMemLyzer)
- [Development CLI repository](https://github.com/YaCnDehfuli/VolMemLyzer3-CLI_forensic_tool)`,
    tagSlugs: [
      "python",
      "volatility-3",
      "dfir",
      "memory-forensics",
      "cli",
      "pandas",
      "rich",
      "concurrency",
      "caching",
      "json",
      "jsonl",
      "csv",
    ],
  },
  {
    slug: "memory-dump-cfg-graph-malware-classification",
    title: "Memory-Dump CFG and Graph-Based Malware Classification",
    projectType: "academic",
    status: "completed",
    role: "Research Developer",
    organization: null,
    startedAt: null,
    endedAt: null,
    heroImagePath: "/projects/memory-cfg/graph-workflow.svg",
    repositoryUrl: "https://github.com/YaCnDehfuli/Malware-Detection-using-Memory-Dump",
    liveUrl: null,
    featured: true,
    sortOrder: 30,
    publishedAt: null,
    summary:
      "A completed academic malware-analysis project that extracted disassembly-derived control-flow and call-graph representations and evaluated graph-based and transformer-based models for binary and multiclass malware classification.",
    body: `## Overview

This academic project explores malware classification from process-memory evidence through disassembly, control-flow graphs, call graphs, learned assembly representations, and graph neural networks.

## Academic objective

The work tests whether executable structure recovered from memory can retain enough behavioral and semantic information for binary and malware-family classification. The pipeline emphasizes graph construction and model experimentation rather than signature matching.

## My role

I developed the research pipeline and model experiments, including memory-process extraction, disassembly processing, graph construction, data preparation, training, and evaluation.

## Memory and disassembly pipeline

Process artifacts are recovered from memory and passed through SMDA to identify functions, basic blocks, instructions, and control-flow relationships. The code creates per-function CFGs and a function-level call graph while retaining identifiers needed for later embedding and evaluation.

## Representation learning

The repository contains a DistilBERT masked-language-model workflow for assembly tokens, frozen block-embedding generation, a GraphSAGE and DiffPool function encoder, and a graph-level classifier over function relationships. Baseline and related graph-learning experiments provide comparison points.

## Dataset split

The evaluated data was divided into **70% training, 15% validation, and 15% testing**. The split separates model selection from final evaluation and supports both binary and multiclass experiments.

## Results

The completed evaluation reports **97% binary accuracy**. For malware-family classification, **the best evaluated configuration achieved 94% multiclass accuracy**. The available repository confirms the model families explored but does not contain a conclusive saved artifact that ties the 94% result to one named configuration.

## Limitations

The results should be interpreted within the collected dataset, recovered disassembly quality, and represented malware families. Memory corruption, incomplete process recovery, packing, and changes in the data distribution can affect graph construction and model behavior.

## Repository

[Inspect the source and experiment pipeline](https://github.com/YaCnDehfuli/Malware-Detection-using-Memory-Dump)`,
    tagSlugs: [
      "python",
      "smda",
      "control-flow-graphs",
      "call-graphs",
      "networkx",
      "pytorch",
      "pytorch-geometric",
      "graphsage",
      "diffpool",
      "transformers",
      "malware-classification",
    ],
  },
] as const satisfies readonly ProjectSeed[];
