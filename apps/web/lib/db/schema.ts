import {
  pgTable,
  uuid,
  text,
  jsonb,
  doublePrecision,
  integer,
  boolean,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const packages = pgTable(
  "packages",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description"),
    category: text("category"),
    endpoints: integer("endpoints").default(0),
    installCmd: text("install_cmd"),
    logoUrl: text("logo_url"),
    capabilitySpec: jsonb("capability_spec").notNull().default({}),
    version: text("version").notNull().default("0.1.0"),
    authorId: uuid("author_id"),
    mcpConfig: jsonb("mcp_config"),
    trustScore: doublePrecision("trust_score").default(0),
    installCount: integer("install_count").default(0),
    status: text("status").default("published"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("idx_packages_name").on(table.name),
    index("idx_packages_status").on(table.status),
    index("idx_packages_category").on(table.category),
  ]
);

export const packageVersions = pgTable(
  "package_versions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    packageId: uuid("package_id").references(() => packages.id, {
      onDelete: "cascade",
    }),
    version: text("version").notNull(),
    changelog: text("changelog"),
    artifactUrl: text("artifact_url"),
    sandboxTestPassed: boolean("sandbox_test_passed").default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_package_versions_package").on(table.packageId)]
);

export const installs = pgTable(
  "installs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    packageId: uuid("package_id").references(() => packages.id, {
      onDelete: "cascade",
    }),
    agentId: text("agent_id"),
    version: text("version"),
    success: boolean("success"),
    executionData: jsonb("execution_data"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [index("idx_installs_package").on(table.packageId)]
);
