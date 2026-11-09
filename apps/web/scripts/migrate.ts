import "dotenv/config";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { max: 1 });

async function migrate() {
  console.log("Running migration...");

  await sql`
    CREATE TABLE IF NOT EXISTS packages (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      name TEXT NOT NULL UNIQUE,
      description TEXT,
      capability_spec JSONB NOT NULL DEFAULT '{}',
      version TEXT NOT NULL DEFAULT '0.1.0',
      author_id UUID,
      mcp_config JSONB,
      trust_score FLOAT DEFAULT 0,
      install_count INT DEFAULT 0,
      status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'deprecated')),
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  packages table created");

  await sql`
    CREATE TABLE IF NOT EXISTS package_versions (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
      version TEXT NOT NULL,
      changelog TEXT,
      artifact_url TEXT,
      sandbox_test_passed BOOLEAN DEFAULT false,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  package_versions table created");

  await sql`
    CREATE TABLE IF NOT EXISTS installs (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
      agent_id TEXT,
      version TEXT,
      success BOOLEAN,
      execution_data JSONB,
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `;
  console.log("  installs table created");

  await sql`CREATE INDEX IF NOT EXISTS idx_packages_name ON packages(name)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_packages_capability ON packages USING GIN(capability_spec)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_packages_status ON packages(status)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_installs_package ON installs(package_id)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_package_versions_package ON package_versions(package_id)`;
  console.log("  indexes created");

  console.log("\nMigration complete!");
  await sql.end();
}

migrate().catch((e) => {
  console.error("Migration failed:", e);
  console.error("Stack:", e.stack);
  process.exit(1);
});
