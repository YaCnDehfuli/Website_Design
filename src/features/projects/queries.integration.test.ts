import { describe, expect, it } from "vitest";
import { getFeaturedProjects, getPublishedProjectBySlug, getPublishedProjects } from "./queries";

describe("project queries", () => {
  it("returns the three seeded public projects in portfolio order", async () => {
    const projects = await getPublishedProjects();

    expect(projects.map(({ slug }) => slug)).toEqual([
      "vadvit-explainable-memory-forensics",
      "volmemlyzer-dfir-automation",
      "memory-dump-cfg-graph-malware-classification",
    ]);
    expect(projects.every(({ tags }) => tags.length > 0)).toBe(true);
  });

  it("limits featured projects and excludes unknown slugs", async () => {
    const featured = await getFeaturedProjects(2);

    expect(featured).toHaveLength(2);
    await expect(getPublishedProjectBySlug("does-not-exist")).resolves.toBeNull();
  });
});
