# Managed deployment and release runbook

## Target topology

Deploy the repository as one Next.js application on a managed Next.js host and use one managed
PostgreSQL database. Vercel and Neon are the reference providers for the first release, but the
application remains compatible with providers that satisfy the contract in `docs/architecture.md`.

The application host runs the site and uses a pooled database connection. GitHub Actions applies
committed SQL migrations over a separate direct connection. Database migrations never run during
dependency installation, application builds, or server startup.

## Production configuration

Configure these values in the indicated secret stores. Never commit production credentials.

| Variable                 | Location                               | Value                                                              |
| ------------------------ | -------------------------------------- | ------------------------------------------------------------------ |
| `DATABASE_URL`           | Managed Next.js host                   | TLS-enabled pooled PostgreSQL URL for runtime queries              |
| `SITE_URL`               | Managed Next.js host                   | Canonical HTTPS origin without a trailing slash                    |
| `MIGRATION_DATABASE_URL` | GitHub `production` environment secret | TLS-enabled direct PostgreSQL URL with schema-migration privileges |

Use separate database roles for runtime queries and migrations when the provider supports them.
The runtime role needs read access to published portfolio data and insert access to contact
messages; the migration role owns schema changes. Require TLS for both connections.

## One-time setup

1. Provision a managed PostgreSQL project in the application's deployment region.
2. Record its pooled and direct TLS connection strings in a password manager.
3. In GitHub, create an environment named `production` and add
   `MIGRATION_DATABASE_URL` as an environment secret.
4. Add required reviewers to the `production` environment so a workflow dispatch cannot reach the
   migration step without human approval.
5. Import this repository into the managed Next.js host and select its Next.js preset.
6. Configure `DATABASE_URL` and `SITE_URL` for the production environment on the application host.
7. Keep the default build command, `pnpm build`; do not add migration or seed commands to it.
8. Protect the default branch and require the `Test and build` job from the `Quality` workflow.

Preview deployments should use an isolated preview database or omit database credentials. Never
point untrusted pull-request code at the production database.

## First release

1. Confirm the `Quality` workflow passes on the exact commit being released.
2. Create a provider backup or verify point-in-time recovery before the first migration.
3. From GitHub Actions, run `Migrate production database` on the default branch.
4. Enter `migrate-production` when prompted and approve the protected `production` environment.
5. Confirm the migration job completed before triggering or promoting the application deployment.
6. The initial dataset is portfolio content, so seed it deliberately from a trusted workstation
   only if production is empty. Do not add `db:seed` to the migration workflow.
7. Deploy the same commit to the managed Next.js host.
8. Complete the smoke checks below and record the release commit in the deployment notes.

For later releases with an additive migration, deploy in the same order: migrate first, then deploy
code that understands the new schema. Expand-and-contract changes require separate releases so the
old and new application versions both remain compatible during rollout.

## Smoke checks

- Open `/`, `/about`, `/projects`, `/publications`, `/engineering`, and `/contact` over HTTPS.
- Open one project and one publication detail page; verify their media and outbound links.
- Confirm `/robots.txt`, `/sitemap.xml`, and `/opengraph-image` return successful responses with the
  production origin.
- Submit a unique contact message and confirm the success state. Verify the row in PostgreSQL,
  then remove the smoke-test row through the provider console.
- Request a nonexistent project slug and confirm the custom not-found page returns HTTP 404.
- Check the application and database dashboards for new errors without copying secrets or contact
  message bodies into issue trackers.

## Rollback and recovery

If application behavior regresses without a schema problem, roll the managed host back to the last
known-good deployment. Additive migrations may remain in place because the prior application must
remain compatible with them.

Do not attempt an improvised destructive down migration. For a bad schema change, stop the rollout,
preserve logs, and prefer a reviewed forward-fix migration. Restore from a managed backup only for
data loss or corruption, following the provider's recovery procedure and recording the recovery
point. Rotate any credential that appears in logs or a public artifact.

## Release checklist

- [ ] The release commit is reviewed and the worktree is clean.
- [ ] The `Quality` workflow passes.
- [ ] New SQL is additive, reviewed, and backed up.
- [ ] The protected migration workflow succeeds, if the release has migrations.
- [ ] The managed host deploys the same commit.
- [ ] Production smoke checks pass.
- [ ] No production secret or private contact data appears in logs or artifacts.
- [ ] The release commit and any operational notes are recorded.
