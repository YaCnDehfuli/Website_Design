import { sql } from "drizzle-orm";
import {
  boolean,
  check,
  date,
  index,
  integer,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const projectTypeEnum = pgEnum("project_type", [
  "research",
  "software",
  "academic",
  "dataset",
  "embedded",
]);

export const projectStatusEnum = pgEnum("project_status", [
  "published-research",
  "maintained",
  "completed",
  "prototype",
  "archived",
]);

export const publicationTypeEnum = pgEnum("publication_type", [
  "journal",
  "conference",
  "thesis",
  "report",
  "article",
]);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    summary: text("summary").notNull(),
    body: text("body").notNull(),
    projectType: projectTypeEnum("project_type"),
    role: varchar("role", { length: 200 }),
    status: projectStatusEnum("status"),
    organization: varchar("organization", { length: 240 }),
    startedAt: date("started_at", { mode: "string" }),
    endedAt: date("ended_at", { mode: "string" }),
    heroImagePath: text("hero_image_path"),
    repositoryUrl: text("repository_url"),
    liveUrl: text("live_url"),
    featured: boolean("featured").default(false).notNull(),
    published: boolean("published").default(false).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("projects_slug_unique").on(table.slug),
    index("projects_public_order_idx").on(table.published, table.sortOrder, table.publishedAt),
    check("projects_slug_format", sql`${table.slug} ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'`),
  ],
);

export const publications = pgTable(
  "publications",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    slug: varchar("slug", { length: 160 }).notNull(),
    title: varchar("title", { length: 240 }).notNull(),
    summary: text("summary").notNull(),
    body: text("body").notNull(),
    publicationType: publicationTypeEnum("publication_type"),
    authors: text("authors").array(),
    doi: varchar("doi", { length: 255 }),
    venue: varchar("venue", { length: 200 }),
    externalUrl: text("external_url"),
    published: boolean("published").default(false).notNull(),
    publishedAt: timestamp("published_at", { withTimezone: true }),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("publications_slug_unique").on(table.slug),
    uniqueIndex("publications_doi_unique").on(table.doi),
    index("publications_public_date_idx").on(table.published, table.publishedAt),
    check("publications_slug_format", sql`${table.slug} ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'`),
  ],
);

export const tags = pgTable(
  "tags",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 80 }).notNull(),
    slug: varchar("slug", { length: 80 }).notNull(),
  },
  (table) => [
    uniqueIndex("tags_name_unique").on(table.name),
    uniqueIndex("tags_slug_unique").on(table.slug),
    check("tags_slug_format", sql`${table.slug} ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'`),
  ],
);

export const projectTags = pgTable(
  "project_tags",
  {
    projectId: uuid("project_id")
      .notNull()
      .references(() => projects.id, { onDelete: "cascade" }),
    tagId: uuid("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.tagId] })],
);

export const contactMessages = pgTable(
  "contact_messages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    message: text("message").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [index("contact_messages_created_at_idx").on(table.createdAt)],
);

export type Project = typeof projects.$inferSelect;
export type Publication = typeof publications.$inferSelect;
export type Tag = typeof tags.$inferSelect;
