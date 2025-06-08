import Link from "next/link";
import type { PublicationSummary } from "./queries";
import styles from "./publication-list.module.css";

type PublicationListProps = Readonly<{
  publications: readonly PublicationSummary[];
}>;

export function PublicationList({ publications }: PublicationListProps) {
  if (publications.length === 0) {
    return (
      <div className={styles.empty}>
        <span aria-hidden="true">[ ]</span>
        <p>
          No public writing records found.
          <small>The archive is connected and waiting for a release.</small>
        </p>
      </div>
    );
  }

  return (
    <ol className={styles.list}>
      {publications.map((publication, index) => (
        <li key={publication.id}>
          <article>
            <div className={styles.index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <i aria-hidden="true" />
            </div>
            <div className={styles.body}>
              <div className={styles.meta}>
                <span>{formatLabel(publication.publicationType ?? "publication")}</span>
                <time dateTime={publication.publishedAt?.toISOString()}>
                  {formatDate(publication.publishedAt)}
                </time>
              </div>
              <h2>{publication.title}</h2>
              {publication.authors && publication.authors.length > 0 && (
                <p className={styles.authors}>{publication.authors.join(" · ")}</p>
              )}
              {publication.venue && <p className={styles.venue}>{publication.venue}</p>}
              <p>{publication.summary}</p>
            </div>
            <Link
              href={`/publications/${publication.slug}`}
              aria-label={`Read ${publication.title}`}
            >
              <span>read_note</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </article>
        </li>
      ))}
    </ol>
  );
}

function formatDate(value: Date | null) {
  if (!value) return "undated";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}

function formatLabel(value: string) {
  return value.replaceAll("-", " ");
}
