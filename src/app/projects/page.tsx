import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingState } from "@/components/feedback/loading-state";
import { plannedProjects } from "@/content/planned-projects";
import { PlannedProjectList } from "@/features/projects/planned-project-list";
import { ProjectList } from "@/features/projects/project-list";
import { getPublishedProjects } from "@/features/projects/queries";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Security research, memory-forensics software, and applied machine-learning projects.",
};

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<LoadingState label="Loading projects…" />}>
      <ProjectsIndex />
    </Suspense>
  );
}

async function ProjectsIndex() {
  const projects = await getPublishedProjects();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className="section-kicker">/projects/index</p>
          <h1>Projects</h1>
        </div>
        <p className="lede">
          Selected work in memory forensics, malware analysis, and applied machine learning. Each
          project documents the problem, implementation, evaluation, and known limitations.
        </p>
      </header>
      <div className={styles.status}>
        <span>Published work</span>
        <span>{String(projects.length).padStart(2, "0")} project records</span>
        <span>planned work separated below</span>
      </div>
      <ProjectList projects={projects} />
      <section className={styles.planned} aria-labelledby="planned-projects-title">
        <div className={styles.plannedHeader}>
          <div>
            <p className="section-kicker">01 / portfolio roadmap</p>
            <h2 id="planned-projects-title">Planned work</h2>
          </div>
          <p>
            Scoped portfolio builds that have not yet been presented as completed work. Each entry
            will become a full project record only after implementation and evaluation evidence is
            available.
          </p>
        </div>
        <PlannedProjectList projects={plannedProjects} />
      </section>
    </div>
  );
}
