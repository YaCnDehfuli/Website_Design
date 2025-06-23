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
    <Suspense fallback={<LoadingState label="Loading publications…" />}>
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
          <h1>Publications</h1>
        </div>
        <p className="lede">
          Peer-reviewed research in volatile-memory forensics and explainable malware detection,
          including forensic datasets and reproducible evaluation.
        </p>
      </header>
      <div className={styles.archiveBar}>
        <span>PUBLICATION_INDEX</span>
        <span>{String(publications.length).padStart(2, "0")} published records</span>
      </div>
      <PublicationList publications={publications} />
    </div>
  );
}
