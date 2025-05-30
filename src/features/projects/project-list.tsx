import Link from "next/link";
import type { ProjectSummary } from "./queries";
import styles from "./project-list.module.css";

type ProjectListProps = Readonly<{
  projects: readonly ProjectSummary[];
}>;

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className={styles.empty}>
        <span aria-hidden="true">[ ]</span>
        <p>
          No published project records found.
          <small>The index is connected and waiting for a release.</small>
        </p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {projects.map((project, index) => (
        <article className={styles.card} key={project.id}>
          <div className={styles.cardMeta}>
            <span>NODE_{String(index + 1).padStart(2, "0")}</span>
            <span>{project.publishedAt ? project.publishedAt.getUTCFullYear() : "active"}</span>
          </div>
          <div className={styles.visual} aria-hidden="true">
            <span />
            <span />
            <span />
            <i>{project.slug.slice(0, 2).toUpperCase()}</i>
          </div>
          <div className={styles.cardBody}>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
            <ul aria-label={`${project.title} technologies`}>
              {project.tags.map((tag) => (
                <li key={tag.slug}>#{tag.slug}</li>
              ))}
            </ul>
          </div>
          <Link href={`/projects/${project.slug}`}>
            inspect_case_study <span aria-hidden="true">↗</span>
          </Link>
        </article>
      ))}
    </div>
  );
}
