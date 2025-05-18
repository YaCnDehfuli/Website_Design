# Personal Website

A learning-oriented, production-quality personal website built as a Next.js modular monolith.

The public site will present professional background, projects, publications, contact details,
and engineering principles. PostgreSQL-backed features are introduced incrementally so each
commit remains small and reviewable.

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
corepack pnpm build
```

## Project documentation

- [Architecture](docs/architecture.md)
- [Development workflow](docs/development.md)
- [Dated commit plan](docs/commit-plan.md)
