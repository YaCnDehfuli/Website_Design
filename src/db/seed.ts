import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { z } from "zod";
import { projectTags, projects, publications, tags } from "./schema";

const seedEnvironment = z.object({
  DATABASE_URL: z.string().url().startsWith("postgres"),
});

const { DATABASE_URL } = seedEnvironment.parse(process.env);
const client = postgres(DATABASE_URL, { max: 1, prepare: false });
const database = drizzle(client);
const seededAt = new Date("2025-05-29T22:00:00.000Z");
const projectBody = `## The question

How can a personal website remain small enough to learn from while still practicing normal production engineering?

## The approach

The application uses server-rendered routes, strict TypeScript, explicit module boundaries, and PostgreSQL for content that benefits from structured queries. Stable biography and engineering prose remain in source control.

## Security posture

Secrets stay server-side, external input is validated at the boundary, and schema changes move through committed SQL migrations. The design avoids adding infrastructure without a demonstrated need.`;
const publicationBody = `## Start with the deployment unit

This website has one interface, one owner, and one release cadence. A single Next.js application keeps those facts visible.

## Keep boundaries inside the application

Routes coordinate requests, feature modules own behavior, and the database module owns persistence. These boundaries preserve room to change without adding network calls or separate deployments.

## Earn complexity

Microservices, queues, and caches solve real problems, but none are requirements here. Deferring them makes the current system easier to operate and its trade-offs easier to explain.`;

const tagData = [
  { name: "Next.js", slug: "next-js" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Security", slug: "security" },
] as const;

async function seed() {
  await database.transaction(async (transaction) => {
    const seededTags = await Promise.all(
      tagData.map(async (tag) => {
        const [savedTag] = await transaction
          .insert(tags)
          .values(tag)
          .onConflictDoUpdate({ target: tags.slug, set: { name: tag.name } })
          .returning({ id: tags.id, slug: tags.slug });

        if (!savedTag) throw new Error(`Failed to seed tag: ${tag.slug}`);
        return savedTag;
      }),
    );

    const [project] = await transaction
      .insert(projects)
      .values({
        slug: "personal-website-system",
        title: "Personal Website System",
        summary:
          "A production-minded personal site built as a modular Next.js monolith with a reviewed PostgreSQL data model.",
        body: projectBody,
        repositoryUrl: "https://github.com/YaCnDehfuli/Website_Design",
        featured: true,
        published: true,
        sortOrder: 10,
        publishedAt: seededAt,
        createdAt: seededAt,
        updatedAt: seededAt,
      })
      .onConflictDoUpdate({
        target: projects.slug,
        set: {
          title: "Personal Website System",
          summary:
            "A production-minded personal site built as a modular Next.js monolith with a reviewed PostgreSQL data model.",
          body: projectBody,
          repositoryUrl: "https://github.com/YaCnDehfuli/Website_Design",
          featured: true,
          published: true,
          sortOrder: 10,
          publishedAt: seededAt,
          updatedAt: seededAt,
        },
      })
      .returning({ id: projects.id });

    if (!project) throw new Error("Failed to seed project");

    await transaction.delete(projectTags).where(eq(projectTags.projectId, project.id));
    await transaction.insert(projectTags).values(
      seededTags.map((tag) => ({
        projectId: project.id,
        tagId: tag.id,
      })),
    );

    await transaction
      .insert(publications)
      .values({
        slug: "why-this-site-is-a-modular-monolith",
        title: "Why This Site Is a Modular Monolith",
        summary:
          "A short architecture note on choosing explicit boundaries without introducing distributed-system overhead.",
        body: publicationBody,
        venue: "Engineering notes",
        published: true,
        publishedAt: seededAt,
        createdAt: seededAt,
        updatedAt: seededAt,
      })
      .onConflictDoUpdate({
        target: publications.slug,
        set: {
          title: "Why This Site Is a Modular Monolith",
          summary:
            "A short architecture note on choosing explicit boundaries without introducing distributed-system overhead.",
          body: publicationBody,
          venue: "Engineering notes",
          published: true,
          publishedAt: seededAt,
          updatedAt: seededAt,
        },
      });
  });
}

try {
  await seed();
  console.info("Seed completed.");
} finally {
  await client.end();
}
