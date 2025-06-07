import { config } from "dotenv";
import { eq, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";
import { projectTags, projects, publications, tags } from "./schema";
import { projectSeeds } from "./seed-data/projects";
import { publicationSeeds } from "./seed-data/publications";
import { tagSeeds } from "./seed-data/tags";

config({ path: [".env.local", ".env"], quiet: true });

const seedEnvironment = z.object({
  DATABASE_URL: z.string().url().startsWith("postgres"),
});

const parsedEnvironment = seedEnvironment.safeParse(process.env);

if (!parsedEnvironment.success) {
  throw new Error(
    "DATABASE_URL is missing or invalid. Copy .env.example to .env.local and provide a PostgreSQL URL.",
  );
}

const client = postgres(parsedEnvironment.data.DATABASE_URL, { max: 1, prepare: false });
const database = drizzle(client);
const seededAt = new Date("2025-06-07T22:00:00.000Z");
const obsoleteTagSlugs = ["next-js", "postgresql", "typescript", "security"];

async function seed() {
  await database.transaction(async (transaction) => {
    await transaction
      .delete(publications)
      .where(eq(publications.slug, "why-this-site-is-a-modular-monolith"));
    await transaction.delete(projects).where(eq(projects.slug, "personal-website-system"));
    await transaction.delete(tags).where(inArray(tags.slug, obsoleteTagSlugs));

    const tagIds = new Map<string, string>();

    for (const tag of tagSeeds) {
      const [savedTag] = await transaction
        .insert(tags)
        .values(tag)
        .onConflictDoUpdate({ target: tags.slug, set: { name: tag.name } })
        .returning({ id: tags.id, slug: tags.slug });

      if (!savedTag) throw new Error(`Failed to seed tag: ${tag.slug}`);
      tagIds.set(savedTag.slug, savedTag.id);
    }

    for (const project of projectSeeds) {
      const { tagSlugs, ...values } = project;
      const [savedProject] = await transaction
        .insert(projects)
        .values({ ...values, published: true, createdAt: seededAt, updatedAt: seededAt })
        .onConflictDoUpdate({
          target: projects.slug,
          set: { ...values, published: true, updatedAt: seededAt },
        })
        .returning({ id: projects.id });

      if (!savedProject) throw new Error(`Failed to seed project: ${project.slug}`);

      await transaction.delete(projectTags).where(eq(projectTags.projectId, savedProject.id));
      await transaction.insert(projectTags).values(
        tagSlugs.map((tagSlug) => {
          const tagId = tagIds.get(tagSlug);
          if (!tagId) throw new Error(`Unknown project tag: ${tagSlug}`);
          return { projectId: savedProject.id, tagId };
        }),
      );
    }

    for (const publication of publicationSeeds) {
      const values = { ...publication, authors: [...publication.authors] };

      await transaction
        .insert(publications)
        .values({ ...values, published: true, createdAt: seededAt, updatedAt: seededAt })
        .onConflictDoUpdate({
          target: publications.slug,
          set: { ...values, published: true, updatedAt: seededAt },
        });
    }
  });
}

async function main() {
  try {
    await seed();
    console.info("Seed completed.");
  } finally {
    await client.end();
  }
}

void main().catch((error: unknown) => {
  console.error("Seed failed.", error);
  process.exitCode = 1;
});
