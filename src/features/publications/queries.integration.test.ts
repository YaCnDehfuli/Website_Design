import { describe, expect, it } from "vitest";
import {
  getPublishedPublicationBySlug,
  getPublishedPublications,
  getRecentPublications,
} from "./queries";

describe("publication queries", () => {
  it("returns seeded publications newest first", async () => {
    const publications = await getPublishedPublications();

    expect(publications.map(({ doi }) => doi)).toEqual([
      "10.1145/3764580",
      "10.1016/j.jisa.2025.104200",
    ]);
  });

  it("limits recent publications and excludes unknown slugs", async () => {
    const recent = await getRecentPublications(1);

    expect(recent).toHaveLength(1);
    await expect(getPublishedPublicationBySlug("does-not-exist")).resolves.toBeNull();
  });
});
