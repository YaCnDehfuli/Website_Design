import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/features/projects/queries";
import { getPublishedPublications } from "@/features/publications/queries";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, publications] = await Promise.all([
    getPublishedProjects(),
    getPublishedPublications(),
  ]);

  return [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/publications"), changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/engineering"), changeFrequency: "yearly", priority: 0.6 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.5 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
      ...(project.publishedAt ? { lastModified: project.publishedAt } : {}),
    })),
    ...publications.map((publication) => ({
      url: absoluteUrl(`/publications/${publication.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.8,
      ...(publication.publishedAt ? { lastModified: publication.publishedAt } : {}),
    })),
  ];
}
