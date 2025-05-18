# Development workflow

## Local setup

Install the Node.js version declared in `.nvmrc` with your preferred version manager, then use the
package-manager version declared in `package.json`:

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

The application is available at [http://localhost:3000](http://localhost:3000).

PostgreSQL and database commands will be documented when the database milestone is introduced. Until
then, the repository must build without database configuration.

## Available commands

| Command                      | Purpose                                                   |
| ---------------------------- | --------------------------------------------------------- |
| `corepack pnpm dev`          | Start the development server                              |
| `corepack pnpm build`        | Create a production build and run Next.js type validation |
| `corepack pnpm start`        | Serve an existing production build                        |
| `corepack pnpm lint`         | Run ESLint across the repository                          |
| `corepack pnpm typecheck`    | Run TypeScript without emitting files                     |
| `corepack pnpm format`       | Apply Prettier formatting                                 |
| `corepack pnpm format:check` | Verify formatting without rewriting files                 |

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
