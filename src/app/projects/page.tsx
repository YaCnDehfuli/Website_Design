import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingState } from "@/components/feedback/loading-state";
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
    <Suspense fallback={<LoadingState label="Indexing project records…" />}>
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
        <span>INDEX_STATUS</span>
        <span>{String(projects.length).padStart(2, "0")} public nodes</span>
        <span>drafts excluded</span>
      </div>
      <ProjectList projects={projects} />
    </div>
  );
}
