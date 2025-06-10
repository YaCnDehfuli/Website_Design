import { describe, expect, it } from "vitest";
import { projectSeeds } from "./projects";
import { publicationSeeds } from "./publications";
import { tagSeeds } from "./tags";

describe("portfolio seed data", () => {
  it("keeps stable identifiers unique", () => {
    expect(new Set(projectSeeds.map(({ slug }) => slug)).size).toBe(projectSeeds.length);
    expect(new Set(publicationSeeds.map(({ slug }) => slug)).size).toBe(publicationSeeds.length);
    expect(new Set(publicationSeeds.map(({ doi }) => doi)).size).toBe(publicationSeeds.length);
    expect(new Set(tagSeeds.map(({ slug }) => slug)).size).toBe(tagSeeds.length);
  });

  it("references only declared tags", () => {
    const declaredTags = new Set(tagSeeds.map(({ slug }) => slug));

    for (const project of projectSeeds) {
      expect(project.tagSlugs.length).toBeGreaterThan(0);
      expect(new Set(project.tagSlugs).size).toBe(project.tagSlugs.length);
      expect(project.tagSlugs.every((slug) => declaredTags.has(slug))).toBe(true);
    }
  });

  it("contains the intended featured portfolio records", () => {
    expect(projectSeeds.filter(({ featured }) => featured)).toHaveLength(3);
    expect(publicationSeeds).toHaveLength(2);
    expect(projectSeeds.every(({ heroImagePath }) => heroImagePath?.startsWith("/projects/"))).toBe(
      true,
    );
  });
});
