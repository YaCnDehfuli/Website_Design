import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrustedMarkdown } from "@/components/content/trusted-markdown";
import { getPublishedPublicationBySlug } from "@/features/publications/queries";
import styles from "./page.module.css";

type PublicationPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublishedPublicationBySlug(slug);

  return publication
    ? { title: publication.title, description: publication.summary }
    : { title: "Publication not found" };
}

export default async function PublicationPage({ params }: PublicationPageProps) {
  const { slug } = await params;
  const publication = await getPublishedPublicationBySlug(slug);

  if (!publication) notFound();

  const externalUrl = safeHttpUrl(publication.externalUrl);
  const doiUrl = publication.doi ? safeHttpUrl(`https://doi.org/${publication.doi}`) : null;

  return (
    <article className={styles.page}>
      <Link className={styles.back} href="/publications">
        <span aria-hidden="true">←</span> return_to_archive
      </Link>

      <header className={styles.header}>
        <div className={styles.recordType}>
          <span>PUBLIC_RECORD</span>
          <span>● readable</span>
        </div>
        <p className="section-kicker">/publications/{publication.slug}</p>
        <h1>{publication.title}</h1>
        <p className="lede">{publication.summary}</p>
        <dl className={styles.metadata}>
          {publication.publicationType && (
            <div>
              <dt>type</dt>
              <dd>{formatLabel(publication.publicationType)}</dd>
            </div>
          )}
          {publication.authors && publication.authors.length > 0 && (
            <div>
              <dt>authors</dt>
              <dd>{publication.authors.join(" · ")}</dd>
            </div>
          )}
          {publication.venue && (
            <div>
              <dt>venue</dt>
              <dd>{publication.venue}</dd>
            </div>
          )}
          {publication.publishedAt && (
            <div>
              <dt>released</dt>
              <dd>{formatDate(publication.publishedAt)}</dd>
            </div>
          )}
          {publication.doi && doiUrl && (
            <div>
              <dt>doi</dt>
              <dd>
                <a href={doiUrl} target="_blank" rel="noreferrer">
                  {publication.doi}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </header>

      <section className={styles.citation} aria-labelledby="citation-title">
        <p id="citation-title">CITE.record</p>
        <cite>
          {publication.authors?.join(" and ")}. “{publication.title}.”
          {publication.venue ? ` ${publication.venue}.` : ""}
          {publication.publishedAt ? ` ${publication.publishedAt.getUTCFullYear()}.` : ""}
          {publication.doi ? ` doi:${publication.doi}.` : ""}
        </cite>
      </section>

      <div className={styles.document}>
        <div className={styles.fileBar}>
          <span>NOTE.md</span>
          <span>utf-8 · raw html disabled</span>
        </div>
        <div className={styles.documentBody}>
          <aside aria-label="Document line marker">
            <span>01</span>
            <span>02</span>
            <span>03</span>
            <span>04</span>
          </aside>
          <TrustedMarkdown>{publication.body}</TrustedMarkdown>
        </div>
        {externalUrl && (
          <div className={styles.external}>
            <span>ORIGINAL_SOURCE</span>
            <a href={externalUrl} target="_blank" rel="noreferrer">
              open external record <span aria-hidden="true">↗</span>
            </a>
          </div>
        )}
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
  if (!value) return null;

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(value);
}

function formatLabel(value: string) {
  return value.replaceAll("-", " ");
}
