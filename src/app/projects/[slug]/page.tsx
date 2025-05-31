import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustedMarkdown } from "@/components/content/trusted-markdown";
import { getPublishedProjectBySlug } from "@/features/projects/queries";
import styles from "./page.module.css";

type ProjectPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  return project
    ? { title: project.title, description: project.summary }
    : { title: "Project not found" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) notFound();

  const repositoryUrl = safeHttpUrl(project.repositoryUrl);
  const liveUrl = safeHttpUrl(project.liveUrl);

  return (
    <article className={styles.page}>
      <Link className={styles.back} href="/projects">
        <span aria-hidden="true">←</span> return_to_index
      </Link>

      <header className={styles.header}>
        <p className="section-kicker">/projects/{project.slug}</p>
        <h1>{project.title}</h1>
        <p className="lede">{project.summary}</p>
        <ul className={styles.tags} aria-label="Technologies">
          {project.tags.map((tag) => (
            <li key={tag.slug}>#{tag.slug}</li>
          ))}
        </ul>
      </header>

      <div className={styles.caseStudy}>
        <section className={styles.content} aria-label="Case study">
          <div className={styles.fileBar}>
            <span>CASE_STUDY.md</span>
            <span>trusted markdown · raw html disabled</span>
          </div>
          <TrustedMarkdown>{project.body}</TrustedMarkdown>
        </section>

        <aside className={styles.sidebar} aria-label="Project links and status">
          <p className={styles.sidebarTitle}>PROJECT.record</p>
          <dl>
            <div>
              <dt>state</dt>
              <dd>● published</dd>
            </div>
            <div>
              <dt>released</dt>
              <dd>{formatDate(project.publishedAt)}</dd>
            </div>
            <div>
              <dt>tags</dt>
              <dd>{project.tags.length}</dd>
            </div>
          </dl>
          {(repositoryUrl || liveUrl) && (
            <div className={styles.externalLinks}>
              {repositoryUrl && (
                <a href={repositoryUrl} target="_blank" rel="noreferrer">
                  source_code <span aria-hidden="true">↗</span>
                </a>
              )}
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noreferrer">
                  live_system <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          )}
        </aside>
      </div>
    </article>
  );
}

function safeHttpUrl(value: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function formatDate(value: Date | null) {
  if (!value) return "undated";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}
