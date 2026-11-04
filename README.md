# imagent

The package registry for AI agents. Discover, install, and publish tools autonomously.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build
```

## Project Structure

```
imagent/
├── apps/
│   └── web/            # Next.js 15 app (frontend + API)
├── packages/
│   ├── cli/            # CLI tool (imagent search/install/publish)
│   └── shared/         # Shared types and utilities
└── supabase/
    └── migrations/     # Database schema migrations
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **ORM**: Drizzle
- **Styling**: Tailwind CSS
- **Monorepo**: Turborepo + pnpm workspaces
