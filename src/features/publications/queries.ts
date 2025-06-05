import "server-only";
import { cache } from "react";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { publications } from "@/db/schema";

export type PublicationSummary = Readonly<{
  id: string;
  slug: string;
  title: string;
  summary: string;
  publicationType: "journal" | "conference" | "thesis" | "report" | "article" | null;
  authors: readonly string[] | null;
  doi: string | null;
  venue: string | null;
  externalUrl: string | null;
  publishedAt: Date | null;
}>;

export type PublicationDetail = PublicationSummary & Readonly<{ body: string }>;

const publicPublicationColumns = {
  id: publications.id,
  slug: publications.slug,
  title: publications.title,
  summary: publications.summary,
  publicationType: publications.publicationType,
  authors: publications.authors,
  doi: publications.doi,
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

export const getPublishedPublicationBySlug = cache(
  async (slug: string): Promise<PublicationDetail | null> => {
    const [publication] = await db
      .select({ ...publicPublicationColumns, body: publications.body })
      .from(publications)
      .where(and(eq(publications.slug, slug), eq(publications.published, true)))
      .limit(1);

    return publication ?? null;
  },
);
