import type { Metadata } from "next";
import { PublicationList } from "@/features/publications/publication-list";
import { getPublishedPublications } from "@/features/publications/queries";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Publications",
  description: "Technical notes and longer-form writing about software, systems, and security.",
};

export const dynamic = "force-dynamic";

export default async function PublicationsPage() {
  const publications = await getPublishedPublications();

  return (
    <div className={styles.page}>
      <header className={styles.intro}>
        <div>
          <p className="section-kicker">/publications/archive</p>
          <h1>Notes from the investigation.</h1>
        </div>
        <p className="lede">
          Technical writing is a debugging tool for ideas. This archive records what I understand,
          what remains uncertain, and enough context to challenge both.
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
