# Development workflow

## Local setup

Install the Node.js version declared in `.nvmrc` with your preferred version manager, then use the
package-manager version declared in `package.json`:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

The application is available at [http://localhost:3000](http://localhost:3000).

Start the local PostgreSQL service before working on database-backed features:

```bash
# Start Docker Desktop first on macOS, then verify its engine is ready.
docker info
docker compose up -d postgres
docker compose ps
```

The service uses a named volume, so data survives container restarts. Run `docker compose down` to
stop it without deleting data. Run `docker compose down --volumes` only when intentionally resetting
the local database.

Copy `.env.example` to `.env.local` before running database-backed commands. Runtime queries use
`DATABASE_URL`; Drizzle Kit uses `MIGRATION_DATABASE_URL` so deployments can keep pooled and direct
credentials separate.

If `pnpm dev` reports that another server is already running for this repository, use the existing
URL printed in that server's output. Stop the existing process with `Ctrl+C` in its original terminal
before starting another one.

## Available commands

| Command                          | Purpose                                                   |
| -------------------------------- | --------------------------------------------------------- |
| `corepack pnpm dev`              | Start the development server                              |
| `corepack pnpm build`            | Create a production build and run Next.js type validation |
| `corepack pnpm start`            | Serve an existing production build                        |
| `corepack pnpm test`             | Run fast, database-independent Vitest tests               |
| `corepack pnpm test:e2e`         | Run Playwright against an existing production build       |
| `corepack pnpm test:watch`       | Run Vitest in local watch mode                            |
| `corepack pnpm test:integration` | Run PostgreSQL repository integration tests               |
| `corepack pnpm lint`             | Run ESLint across the repository                          |
| `corepack pnpm typecheck`        | Run TypeScript without emitting files                     |
| `corepack pnpm format`           | Apply Prettier formatting                                 |
| `corepack pnpm format:check`     | Verify formatting without rewriting files                 |
| `corepack pnpm db:generate`      | Generate a reviewed SQL migration from the schema         |
| `corepack pnpm db:migrate`       | Apply committed migrations with the direct database URL   |
| `corepack pnpm db:seed`          | Upsert deterministic local portfolio examples             |
| `corepack pnpm db:studio`        | Inspect local data through Drizzle Studio                 |

## Quality gate

Before requesting review, run:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm format:check
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm build
```

Feature-specific Vitest, PostgreSQL integration, and Playwright commands join this gate as their
milestones are implemented.

PostgreSQL integration tests require the local Compose service, current migrations, and deterministic
seed data. They reject non-local database hosts and remove only records created by the test:

```bash
docker compose up -d postgres
corepack pnpm db:migrate
corepack pnpm db:seed
corepack pnpm test:integration
```

## Commit workflow

Each commit should:

1. Address one coherent concern.
2. Normally remain below a few hundred non-generated lines.
3. Leave the application buildable.
4. Include schema and generated migration artifacts together when the database changes.
5. Exclude unrelated formatting, dependency updates, and local artifacts.
6. Pass its documented verification gate before commit creation.

Generated lockfiles, SQL migrations, migration snapshots, and reviewed content are reasonable size
exceptions. The Git log is the source of truth for completed commits; the dated plan records intended
order rather than live status.

## Review workflow

For each planned commit:

1. Confirm the previous commit and clean worktree.
2. Implement only the planned scope.
3. Run the relevant quality gate.
4. Stage the exact files and inspect `git diff --cached --check`.
5. Present the diff summary and test results for approval.
6. Create the commit only after approval.
7. Verify author date, committer date, commit message, and clean status.

Pushing and deployment are separate actions and require explicit authorization.
