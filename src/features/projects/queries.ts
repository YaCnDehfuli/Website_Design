import "server-only";
import { cache } from "react";
import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "@/db/client";
import { projectTags, projects, tags } from "@/db/schema";

export type ProjectSummary = Readonly<{
  id: string;
  slug: string;
  title: string;
  summary: string;
  projectType: "research" | "software" | "academic" | "dataset" | "embedded" | null;
  role: string | null;
  status: "published-research" | "maintained" | "completed" | "prototype" | "archived" | null;
  organization: string | null;
  startedAt: string | null;
  endedAt: string | null;
  heroImagePath: string | null;
  repositoryUrl: string | null;
  liveUrl: string | null;
  publishedAt: Date | null;
  tags: readonly { name: string; slug: string }[];
}>;

export type ProjectDetail = ProjectSummary & Readonly<{ body: string }>;

type ProjectRow = Omit<ProjectSummary, "tags"> & {
  tagName: string | null;
  tagSlug: string | null;
};

const publicProjectColumns = {
  id: projects.id,
  slug: projects.slug,
  title: projects.title,
  summary: projects.summary,
  projectType: projects.projectType,
  role: projects.role,
  status: projects.status,
  organization: projects.organization,
  startedAt: projects.startedAt,
  endedAt: projects.endedAt,
  heroImagePath: projects.heroImagePath,
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

export const getPublishedProjectBySlug = cache(
  async (slug: string): Promise<ProjectDetail | null> => {
    const [project] = await db
      .select({
        id: projects.id,
        slug: projects.slug,
        title: projects.title,
        summary: projects.summary,
        body: projects.body,
        projectType: projects.projectType,
        role: projects.role,
        status: projects.status,
        organization: projects.organization,
        startedAt: projects.startedAt,
        endedAt: projects.endedAt,
        heroImagePath: projects.heroImagePath,
        repositoryUrl: projects.repositoryUrl,
        liveUrl: projects.liveUrl,
        publishedAt: projects.publishedAt,
      })
      .from(projects)
      .where(and(eq(projects.slug, slug), eq(projects.published, true)))
      .limit(1);

    if (!project) return null;

    const projectTagRows = await db
      .select({ name: tags.name, slug: tags.slug })
      .from(projectTags)
      .innerJoin(tags, eq(projectTags.tagId, tags.id))
      .where(eq(projectTags.projectId, project.id))
      .orderBy(asc(tags.name));

    return { ...project, tags: projectTagRows };
  },
);

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
      projectType: row.projectType,
      role: row.role,
      status: row.status,
      organization: row.organization,
      startedAt: row.startedAt,
      endedAt: row.endedAt,
      heroImagePath: row.heroImagePath,
      repositoryUrl: row.repositoryUrl,
      liveUrl: row.liveUrl,
      publishedAt: row.publishedAt,
      tags: tag ? [tag] : [],
    });
  }

  return [...grouped.values()];
}
