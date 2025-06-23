import Link from "next/link";
import { SecurityGlyph, type SecurityGlyphName } from "@/components/visuals/security-glyphs";
import type { ProjectSummary } from "./queries";
import { ProjectVisual } from "./project-visual";
import styles from "./project-list.module.css";

type ProjectListProps = Readonly<{
  projects: readonly ProjectSummary[];
}>;

const projectGlyphs: Readonly<Record<string, SecurityGlyphName>> = {
  "vadvit-explainable-memory-forensics": "attention-rank",
  "volmemlyzer-dfir-automation": "plugin-dag",
  "memory-dump-cfg-graph-malware-classification": "cfg-path",
};

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className={styles.empty}>
        <span aria-hidden="true">[ ]</span>
        <p>
          No project records are available.
          <small>Published projects will appear here when available.</small>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {projects.map((project) => {
        const glyph = projectGlyphs[project.slug] ?? "evidence-record";

        return (
          <article className={styles.card} key={project.id}>
            <div className={styles.cardMeta}>
              <span className={styles.artifactType}>
                <SecurityGlyph name={glyph} width="20" height="20" />
                {formatLabel(project.projectType ?? "project")}
              </span>
              <span>{formatLabel(project.status ?? "documented")}</span>
            </div>
            {project.heroImagePath && project.slug !== "volmemlyzer-dfir-automation" ? (
              <ProjectVisual
                compact
                path={project.heroImagePath}
                projectSlug={project.slug}
                projectTitle={project.title}
              />
            ) : (
              <div className={styles.visual} aria-hidden="true">
                <SecurityGlyph name={glyph} width="64" height="64" />
              </div>
            )}
            <div className={styles.cardBody}>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <ul aria-label={`${project.title} technologies`}>
                {project.tags.slice(0, 5).map((tag) => (
                  <li key={tag.slug}>{tag.name}</li>
                ))}
              </ul>
            </div>
            <Link href={`/projects/${project.slug}`}>
              View project <span aria-hidden="true">↗</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}

function formatLabel(value: string) {
  return value.replaceAll("-", " ");
}
