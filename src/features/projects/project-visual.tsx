import Image from "next/image";
import styles from "./project-visual.module.css";

type ProjectVisualProps = Readonly<{
  path: string;
  projectSlug: string;
  projectTitle: string;
  compact?: boolean;
}>;

const visualMetadata = {
  "vadvit-explainable-memory-forensics": {
    alt: "VADViT methodology from periodic memory snapshots through VAD image generation, transformer classification, and attention attribution",
    caption: (
      <>
        VADViT methodology overview (Figure A.2), Yasin Dehfouli and Arash Habibi Lashkari,{" "}
        <cite>Journal of Information Security and Applications</cite> 94 (2025).{" "}
        <a href="https://doi.org/10.1016/j.jisa.2025.104200">DOI 10.1016/j.jisa.2025.104200</a>.
        Used with permission.
      </>
    ),
    position: "center",
  },
  "volmemlyzer-dfir-automation": {
    alt: "Sunburst visualization of the VolMemLyzer Volatility 3 plugin and feature catalog",
    caption: (
      <>
        Plugin and feature-catalog visualization from the{" "}
        <a href="https://github.com/ahlashkari/VolMemLyzer">VolMemLyzer repository</a>. © project
        contributors; GPL-3.0.
      </>
    ),
    position: "center",
  },
  "memory-dump-cfg-graph-malware-classification": {
    alt: "Workflow from process-memory disassembly through control-flow graphs, assembly embeddings, graph models, and malware classification",
    caption: <>Original portfolio diagram based on the verified public repository architecture.</>,
    position: "center",
  },
} as const;

export function ProjectVisual({
  path,
  projectSlug,
  projectTitle,
  compact = false,
}: ProjectVisualProps) {
  const metadata = visualMetadata[projectSlug as keyof typeof visualMetadata];

  return (
    <figure className={compact ? styles.compact : styles.figure}>
      <div className={styles.imageFrame}>
        <Image
          alt={metadata?.alt ?? `${projectTitle} project visual`}
          fill
          sizes={compact ? "(max-width: 45rem) 100vw, 33vw" : "(max-width: 48rem) 100vw, 74rem"}
          src={path}
          style={{ objectPosition: metadata?.position ?? "center" }}
          unoptimized={path.endsWith(".svg")}
        />
      </div>
      {metadata?.caption && <figcaption>{metadata.caption}</figcaption>}
    </figure>
  );
}
