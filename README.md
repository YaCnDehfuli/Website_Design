# Personal Website

A learning-oriented, production-quality personal website built as a Next.js modular monolith.

The public site presents professional background, projects, publications, contact details, and
engineering principles. PostgreSQL-backed features live alongside the public interface in one
modular monolith.

## Development

Requirements:

- Node.js 24
- Corepack with pnpm 11

```bash
corepack pnpm install
corepack pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) after the development server starts.

Run the current quality gate before requesting review:

```bash
corepack pnpm format:check
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm db:migrate
corepack pnpm db:seed
corepack pnpm test:integration
corepack pnpm build
corepack pnpm exec playwright install chromium
corepack pnpm test:e2e
```

Database-backed checks require the local PostgreSQL service and `.env.local`; see the development
workflow for setup details.

## Project documentation

- [Architecture](docs/architecture.md)
- [Development workflow](docs/development.md)
- [Managed deployment and release runbook](docs/deployment.md)
- [Dated commit plan](docs/commit-plan.md)
