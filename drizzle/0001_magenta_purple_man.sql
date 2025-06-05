CREATE TYPE "public"."project_status" AS ENUM('published-research', 'maintained', 'completed', 'prototype', 'archived');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('research', 'software', 'academic', 'dataset', 'embedded');--> statement-breakpoint
CREATE TYPE "public"."publication_type" AS ENUM('journal', 'conference', 'thesis', 'report', 'article');--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "project_type" "project_type";--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "role" varchar(200);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "status" "project_status";--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "organization" varchar(240);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "started_at" date;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "ended_at" date;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "hero_image_path" text;--> statement-breakpoint
ALTER TABLE "publications" ADD COLUMN "publication_type" "publication_type";--> statement-breakpoint
ALTER TABLE "publications" ADD COLUMN "authors" text[];--> statement-breakpoint
ALTER TABLE "publications" ADD COLUMN "doi" varchar(255);--> statement-breakpoint
CREATE UNIQUE INDEX "publications_doi_unique" ON "publications" USING btree ("doi");