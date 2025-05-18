# Architecture

## Purpose

This repository contains one deployable personal website. It is intentionally structured as a
modular monolith: one Next.js application, one PostgreSQL database, and no separately deployed
backend.

The primary audience is technical peers. The site should make professional work easy to scan while
providing enough detail to demonstrate engineering judgment.

## Public routes

| Route                  | Responsibility                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `/`                    | Identity, current focus, featured projects, recent publications, and contact call to action |
| `/about`               | Biography, experience, and education                                                        |
| `/projects`            | Published project index                                                                     |
| `/projects/[slug]`     | Project case study                                                                          |
| `/publications`        | Published writing and research index                                                        |
| `/publications/[slug]` | Publication detail                                                                          |
| `/contact`             | Contact form and direct-contact fallback                                                    |
| `/engineering`         | Engineering philosophy and working principles                                               |

## Module boundaries

- `src/app` owns routing, layouts, route metadata, and framework-level error states. Route files
  should delegate business behavior rather than contain database or validation logic.
- `src/features` owns feature behavior for projects, publications, and contact. Each feature keeps
  its queries, validation, actions, types, and feature-specific components together.
- `src/components` owns reusable layout and small presentation components that do not contain
  feature-specific data access.
- `src/content` owns typed, stable material such as biography, experience, education, navigation,
  and engineering prose.
- `src/db` owns the server-only database client and Drizzle table definitions.
- `src/lib` owns small cross-cutting utilities such as environment parsing, metadata helpers, and
  trusted Markdown rendering.

Dependencies point inward: routes may use features and shared components; features may use the
database and shared utilities; the database layer never imports UI or route code.

## Rendering and data flow

- React Server Components are the default.
- Client Components are limited to browser interaction, such as mobile navigation and contact-form
  state.
- Stable content is imported from typed source files and can be rendered statically.
- Projects and publications are read from PostgreSQL on the server. Public queries return only rows
  marked as published.
- Missing or unpublished slugs use the framework's not-found response.
- Project and publication bodies are trusted Markdown stored as text. Raw HTML and executable MDX
  are not enabled.
- Contact submissions flow through a Server Action, Zod validation, and a repository insert. The
  browser never receives database credentials.

## Database ownership

PostgreSQL owns projects, publications, tags, project-tag relationships, and contact messages.
Biography, experience, education, navigation, and stable engineering prose do not belong in the
database.

Drizzle table definitions are the schema source of truth. Generated SQL migrations and snapshots
are reviewed and committed under `drizzle/`.

## Environment policy

- Secrets belong in untracked `.env` files locally and managed secret stores in deployment.
- `.env.example` documents variable names with safe placeholder values only.
- Server-side environment variables are parsed once through Zod before use.
- `DATABASE_URL` is the pooled runtime connection.
- `MIGRATION_DATABASE_URL` is the direct connection used by migration tooling and protected release
  workflows.
- `SITE_URL` is the canonical public origin used for metadata and sitemap generation.
- Client-exposed variables require an explicit `NEXT_PUBLIC_` prefix and should be avoided unless a
  browser feature genuinely needs them.

## Migration policy

1. Change the Drizzle schema.
2. Generate SQL with Drizzle Kit.
3. Review the SQL and generated metadata.
4. Apply it to a fresh local or CI database.
5. Commit the schema and migration together.

Production does not use `drizzle-kit push`, automatic application-start migrations, or destructive
down migrations. Schema changes should be additive and backward compatible; destructive changes use
a multi-release expand-and-contract sequence.

## Deployment contract

Application code remains provider-neutral. A conforming managed Next.js host must support the Node.js
runtime, App Router Server Components, and Server Actions. A conforming managed PostgreSQL provider
must supply TLS-enabled pooled and direct connection strings.

Migrations run through a protected, manually dispatched GitHub Actions workflow before deploying code
that depends on the new schema.

## Explicit non-goals

The project does not introduce microservices, a monorepo, a separate backend, GraphQL, Redis, queues,
Kubernetes, authentication, an admin dashboard, analytics, a CMS, or database-backed stable prose.
Search, pagination, tag filtering, theme switching, and animation frameworks are also deferred until
real content or usage demonstrates a need.
