/**
 * Seed script — populates the database with initial MCP server packages.
 *
 * Usage:
 *   npx tsx scripts/seed.ts
 *
 * Requires DATABASE_URL env var pointing to your Supabase Postgres instance.
 */
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { packages } from "../lib/db/schema";

const sql = postgres(process.env.DATABASE_URL!);
const db = drizzle(sql);

const seedData = [
  {
    name: "Firecrawl",
    description: "Web scraping and crawling API for AI agents. Extract structured data from any URL.",
    capabilitySpec: { category: "Data", tags: ["Data", "DevTools"] },
    version: "1.2.0",
    trustScore: 0.94,
    installCount: 84200,
    status: "published",
  },
  {
    name: "Apollo",
    description: "B2B contact and company data API. Find decision-makers and enrich lead data.",
    capabilitySpec: { category: "Search", tags: ["Search", "Data"] },
    version: "2.0.1",
    trustScore: 0.91,
    installCount: 61300,
    status: "published",
  },
  {
    name: "Tavily",
    description: "AI-optimized search engine for LLM agents. Real-time, accurate search results.",
    capabilitySpec: { category: "Search", tags: ["Search", "AI/ML"] },
    version: "1.0.0",
    trustScore: 0.96,
    installCount: 95700,
    status: "published",
  },
  {
    name: "Brave Search",
    description: "Privacy-preserving search API. Independent web index with no tracking.",
    capabilitySpec: { category: "Search", tags: ["Search"] },
    version: "1.1.0",
    trustScore: 0.92,
    installCount: 52100,
    status: "published",
  },
  {
    name: "E2B",
    description: "Code interpreter sandbox for AI agents. Run Python and JS in secure sandboxes.",
    capabilitySpec: { category: "DevTools", tags: ["DevTools", "AI/ML"] },
    version: "0.9.0",
    trustScore: 0.93,
    installCount: 73400,
    status: "published",
  },
  {
    name: "Composio",
    description: "Unified tool integration platform. Connect 150+ apps to your AI agents.",
    capabilitySpec: { category: "Productivity", tags: ["Productivity", "DevTools"] },
    version: "2.1.0",
    trustScore: 0.89,
    installCount: 48900,
    status: "published",
  },
  {
    name: "Browserbase",
    description: "Cloud browser infrastructure for AI agents. Headless Chrome with full control.",
    capabilitySpec: { category: "DevTools", tags: ["DevTools", "Data"] },
    version: "1.0.3",
    trustScore: 0.9,
    installCount: 37600,
    status: "published",
  },
  {
    name: "Resend",
    description: "Email API for developers and agents. Send transactional emails at scale.",
    capabilitySpec: { category: "Communication", tags: ["Communication", "DevTools"] },
    version: "1.3.0",
    trustScore: 0.95,
    installCount: 44200,
    status: "published",
  },
  {
    name: "Stripe",
    description: "Payment processing and financial infrastructure. Accept payments and manage subscriptions.",
    capabilitySpec: { category: "Finance", tags: ["Finance", "DevTools"] },
    version: "3.0.0",
    trustScore: 0.99,
    installCount: 89100,
    status: "published",
  },
  {
    name: "Slack",
    description: "Team messaging and collaboration. Send messages, manage channels, and automate workflows.",
    capabilitySpec: { category: "Communication", tags: ["Communication", "Social"] },
    version: "2.0.0",
    trustScore: 0.97,
    installCount: 67800,
    status: "published",
  },
  {
    name: "Notion",
    description: "Workspace and knowledge management. Read, write, and organize team knowledge.",
    capabilitySpec: { category: "Productivity", tags: ["Productivity", "Data"] },
    version: "1.5.0",
    trustScore: 0.95,
    installCount: 71500,
    status: "published",
  },
  {
    name: "GitHub",
    description: "Code hosting and collaboration. Manage repos, issues, pull requests, and CI/CD.",
    capabilitySpec: { category: "DevTools", tags: ["DevTools", "Productivity"] },
    version: "2.2.0",
    trustScore: 0.98,
    installCount: 91200,
    status: "published",
  },
];

async function seed() {
  console.log("Seeding packages...");

  for (const pkg of seedData) {
    await db
      .insert(packages)
      .values(pkg)
      .onConflictDoUpdate({
        target: packages.name,
        set: {
          description: pkg.description,
          capabilitySpec: pkg.capabilitySpec,
          version: pkg.version,
          trustScore: pkg.trustScore,
          installCount: pkg.installCount,
          status: pkg.status,
        },
      });
    console.log(`  ✓ ${pkg.name}`);
  }

  console.log(`\nSeeded ${seedData.length} packages.`);
  await sql.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
