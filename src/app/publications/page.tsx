import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingState } from "@/components/feedback/loading-state";
import { PublicationList } from "@/features/publications/publication-list";
import { getPublishedPublications } from "@/features/publications/queries";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Publications",
  description: "Peer-reviewed research on memory forensics and malware detection.",
};

export const dynamic = "force-dynamic";

export default function PublicationsPage() {
  return (
    <Suspense fallback={<LoadingState label="Resolving publication records…" />}>
      <PublicationsIndex />
    </Suspense>
  );
}

async function PublicationsIndex() {
  const publications = await getPublishedPublications();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className="section-kicker">/publications/archive</p>
          <h1>Published investigations.</h1>
        </div>
        <p className="lede">
          Peer-reviewed work on volatile-memory evidence, explainable malware detection, forensic
          datasets, and reproducible evaluation.
        </p>
      </header>
      <div className={styles.archiveBar}>
        <span>ARCHIVE.online</span>
        <span>{String(publications.length).padStart(2, "0")} readable records</span>
      </div>
      <PublicationList publications={publications} />
    </div>
  );
}
