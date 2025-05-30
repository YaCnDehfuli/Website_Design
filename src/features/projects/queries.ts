import "server-only";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { projectTags, projects, tags } from "@/db/schema";

export type ProjectSummary = Readonly<{
  id: string;
  slug: string;
  title: string;
  summary: string;
  repositoryUrl: string | null;
  liveUrl: string | null;
  publishedAt: Date | null;
  tags: readonly { name: string; slug: string }[];
}>;

type ProjectRow = Omit<ProjectSummary, "tags"> & {
  tagName: string | null;
  tagSlug: string | null;
};

const publicProjectColumns = {
  id: projects.id,
  slug: projects.slug,
  title: projects.title,
  summary: projects.summary,
  repositoryUrl: projects.repositoryUrl,
  liveUrl: projects.liveUrl,
  publishedAt: projects.publishedAt,
  tagName: tags.name,
  tagSlug: tags.slug,
};

export async function getPublishedProjects(): Promise<readonly ProjectSummary[]> {
  const rows = await db
    .select(publicProjectColumns)
    .from(projects)
    .leftJoin(projectTags, eq(projects.id, projectTags.projectId))
    .leftJoin(tags, eq(projectTags.tagId, tags.id))
    .where(eq(projects.published, true))
    .orderBy(desc(projects.featured), asc(projects.sortOrder), desc(projects.publishedAt));

  return groupProjectRows(rows);
}

export async function getFeaturedProjects(limit = 3): Promise<readonly ProjectSummary[]> {
  const rows = await db
    .select(publicProjectColumns)
    .from(projects)
    .leftJoin(projectTags, eq(projects.id, projectTags.projectId))
    .leftJoin(tags, eq(projectTags.tagId, tags.id))
    .where(and(eq(projects.published, true), eq(projects.featured, true)))
    .orderBy(asc(projects.sortOrder), desc(projects.publishedAt));

  return groupProjectRows(rows).slice(0, limit);
}

function groupProjectRows(rows: readonly ProjectRow[]) {
  const grouped = new Map<
    string,
    Omit<ProjectSummary, "tags"> & { tags: { name: string; slug: string }[] }
  >();

  for (const row of rows) {
    const existing = grouped.get(row.id);
    const tag = row.tagName && row.tagSlug ? { name: row.tagName, slug: row.tagSlug } : null;

    if (existing) {
      if (tag) existing.tags.push(tag);
      continue;
    }

    grouped.set(row.id, {
      id: row.id,
      slug: row.slug,
      title: row.title,
      summary: row.summary,
      repositoryUrl: row.repositoryUrl,
      liveUrl: row.liveUrl,
      publishedAt: row.publishedAt,
      tags: tag ? [tag] : [],
    });
  }

  return [...grouped.values()];
}
