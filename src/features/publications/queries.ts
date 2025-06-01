import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { publications } from "@/db/schema";

export type PublicationSummary = Readonly<{
  id: string;
  slug: string;
  title: string;
  summary: string;
  venue: string | null;
  externalUrl: string | null;
  publishedAt: Date | null;
}>;

const publicPublicationColumns = {
  id: publications.id,
  slug: publications.slug,
  title: publications.title,
  summary: publications.summary,
  venue: publications.venue,
  externalUrl: publications.externalUrl,
  publishedAt: publications.publishedAt,
};

export async function getPublishedPublications(): Promise<readonly PublicationSummary[]> {
  return db
    .select(publicPublicationColumns)
    .from(publications)
    .where(eq(publications.published, true))
    .orderBy(desc(publications.publishedAt), desc(publications.createdAt));
}

export async function getRecentPublications(limit = 3): Promise<readonly PublicationSummary[]> {
  return db
    .select(publicPublicationColumns)
    .from(publications)
    .where(eq(publications.published, true))
    .orderBy(desc(publications.publishedAt), desc(publications.createdAt))
    .limit(limit);
}
