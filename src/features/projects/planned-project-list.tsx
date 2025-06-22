import { SecurityGlyph, type SecurityGlyphName } from "@/components/visuals/security-glyphs";
import type { PlannedProject } from "@/content/planned-projects";
import styles from "./planned-project-list.module.css";

type PlannedProjectListProps = Readonly<{
  projects: readonly PlannedProject[];
}>;

const plannedGlyphs: Readonly<Record<string, SecurityGlyphName>> = {
  "detection-as-code": "rule-match",
  "sentinel-detection-hunting": "rule-match",
  "soar-triage-workflow": "message-route",
  "network-detection-pipeline": "network-flow",
  "memory-triage-integration": "vad-region",
  "agentic-ai-security-evaluation": "trust-boundary",
};

export function PlannedProjectList({ projects }: PlannedProjectListProps) {
  return (
    <div className={styles.grid}>
      {projects.map((project) => (
        <article key={project.slug}>
          <div className={styles.meta}>
            <SecurityGlyph
              name={plannedGlyphs[project.slug] ?? "evidence-record"}
              width="28"
              height="28"
            />
            <span>Planned</span>
          </div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </article>
      ))}
    </div>
  );
}
