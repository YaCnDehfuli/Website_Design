import type { Metadata } from "next";
import { ProjectList } from "@/features/projects/project-list";
import { getPublishedProjects } from "@/features/projects/queries";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected software, security, and AI projects with implementation notes.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className="section-kicker">/projects/index</p>
          <h1>Systems I can explain.</h1>
        </div>
        <p className="lede">
          Selected builds documented beyond the screenshot: the problem, constraints, technical
          decisions, and what the result taught me.
        </p>
      </header>
      <div className={styles.status}>
        <span>INDEX_STATUS</span>
        <span>{String(projects.length).padStart(2, "0")} public nodes</span>
        <span>drafts excluded</span>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}
