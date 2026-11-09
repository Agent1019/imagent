import { getDb, isDbConnected } from "@/lib/db";
import { packages, installs } from "@/lib/db/schema";
import { desc, eq, ilike, sql, and } from "drizzle-orm";

// ---- Display helpers (color/icon derived from name, no DB column needed) ----

const PALETTE = [
  "#f97316",
  "#a855f7",
  "#3b82f6",
  "#ef4444",
  "#10b981",
  "#8b5cf6",
  "#06b6d4",
  "#e11d48",
  "#6366f1",
  "#f59e0b",
  "#14b8a6",
  "#ec4899",
];

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function deriveColor(name: string): string {
  return PALETTE[hashStr(name) % PALETTE.length];
}

export function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// ---- Types ----

export interface PackageListItem {
  slug: string;
  name: string;
  description: string | null;
  category: string;
  tags: string[];
  endpoints: number;
  installCmd: string | null;
  logoUrl: string | null;
  installCount: number;
  trustScore: number;
  color: string;
}

export interface PackageDetail extends PackageListItem {
  id: string;
  version: string;
  capabilitySpec: Record<string, unknown>;
  mcpConfig: Record<string, unknown> | null;
  status: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ---- Transformers ----

function toListItem(row: typeof packages.$inferSelect): PackageListItem {
  const spec = (row.capabilitySpec ?? {}) as Record<string, unknown>;
  const category = (row.category as string) || (spec.category as string) || "Other";
  const tags = Array.isArray(spec.tags) ? (spec.tags as string[]) : [category];

  return {
    slug: toSlug(row.name),
    name: row.name,
    description: row.description,
    category,
    tags,
    endpoints: row.endpoints ?? 0,
    installCmd: row.installCmd ?? `npx @imagent/cli add ${toSlug(row.name)}`,
    logoUrl: row.logoUrl,
    installCount: row.installCount ?? 0,
    trustScore: Math.round((row.trustScore ?? 0) * 100),
    color: deriveColor(row.name),
  };
}

function toDetail(row: typeof packages.$inferSelect): PackageDetail {
  const base = toListItem(row);
  return {
    ...base,
    id: row.id,
    version: row.version,
    capabilitySpec: (row.capabilitySpec ?? {}) as Record<string, unknown>,
    mcpConfig: (row.mcpConfig ?? null) as Record<string, unknown> | null,
    status: row.status ?? "published",
    createdAt: row.createdAt?.toISOString() ?? null,
    updatedAt: row.updatedAt?.toISOString() ?? null,
  };
}

// ---- Query functions ----

/**
 * List packages with pagination, optional category/tag filter, and search.
 */
export async function getPackages(opts: {
  page?: number;
  pageSize?: number;
  category?: string;
  search?: string;
}): Promise<PaginatedResult<PackageListItem>> {
  if (!isDbConnected()) {
    return { data: [], total: 0, page: opts.page ?? 1, pageSize: opts.pageSize ?? 24 };
  }

  const page = opts.page ?? 1;
  const pageSize = Math.min(opts.pageSize ?? 24, 100);
  const offset = (page - 1) * pageSize;

  const conditions = [eq(packages.status, "published")];

  if (opts.search) {
    conditions.push(
      ilike(packages.name, `%${opts.search}%`)
    );
  }

  if (opts.category && opts.category !== "All") {
    conditions.push(
      sql`${packages.capabilitySpec} @> ${JSON.stringify({ tags: [opts.category] })}::jsonb`
    );
  }

  const db = getDb();
  const where = conditions.length === 1 ? conditions[0] : and(...conditions);

  const [rows, countResult] = await Promise.all([
    db
      .select()
      .from(packages)
      .where(where)
      .orderBy(desc(packages.installCount))
      .limit(pageSize)
      .offset(offset),
    db.select({ count: sql<number>`count(*)::int` }).from(packages).where(where),
  ]);

  return {
    data: rows.map(toListItem),
    total: countResult[0]?.count ?? 0,
    page,
    pageSize,
  };
}

/**
 * Get a single package by slug (derived from name).
 */
export async function getPackageBySlug(
  slug: string
): Promise<PackageDetail | null> {
  if (!isDbConnected()) return null;

  // Slug is derived from name via toSlug(), so we search by matching pattern.
  // Since toSlug is deterministic, we query all published and match client-side
  // for small datasets. For large datasets, add a `slug` column to the DB.
  const rows = await getDb()
    .select()
    .from(packages)
    .where(eq(packages.status, "published"))
    .orderBy(desc(packages.installCount));

  const row = rows.find((r) => toSlug(r.name) === slug);
  return row ? toDetail(row) : null;
}

/**
 * Search packages by name or description keyword.
 */
export async function searchPackages(
  query: string,
  limit = 10
): Promise<PackageListItem[]> {
  if (!query.trim() || !isDbConnected()) return [];

  const rows = await getDb()
    .select()
    .from(packages)
    .where(
      and(
        eq(packages.status, "published"),
        ilike(packages.name, `%${query}%`)
      )
    )
    .orderBy(desc(packages.installCount))
    .limit(limit);

  return rows.map(toListItem);
}

/**
 * Get packages with the highest install counts (for rankings).
 */
export async function getTopPackages(limit = 50): Promise<PackageListItem[]> {
  if (!isDbConnected()) return [];

  const rows = await getDb()
    .select()
    .from(packages)
    .where(eq(packages.status, "published"))
    .orderBy(desc(packages.installCount))
    .limit(limit);

  return rows.map(toListItem);
}

// ---- Platform stats ----

/** Minimum user count floor (18K added to real data). */
const USER_COUNT_FLOOR = 18_000;

export interface PlatformStats {
  /** Total users (unique agents from installs + 18K floor) */
  userCount: number;
  /** Total published services (packages) */
  serviceCount: number;
  /** Formatted user count string, e.g. "18K+" */
  userCountLabel: string;
  /** Formatted service count string, e.g. "12" */
  serviceCountLabel: string;
}

function formatK(n: number): string {
  if (n >= 1000) {
    return `${Math.floor(n / 1000)}K+`;
  }
  return n.toString();
}

/**
 * Get platform-level stats for display (hero badge, etc.).
 *
 * User count = unique agent_ids in installs table + 18K floor.
 * Service count = published packages.
 */
export async function getPlatformStats(): Promise<PlatformStats> {
  const defaults: PlatformStats = {
    userCount: USER_COUNT_FLOOR,
    serviceCount: 0,
    userCountLabel: formatK(USER_COUNT_FLOOR),
    serviceCountLabel: "0",
  };

  if (!isDbConnected()) return defaults;

  const db = getDb();

  try {
    const [userResult, serviceResult] = await Promise.all([
      db
        .select({ count: sql<number>`count(distinct agent_id)::int` })
        .from(installs),
      db
        .select({ count: sql<number>`count(*)::int` })
        .from(packages)
        .where(eq(packages.status, "published")),
    ]);

    const realUsers = userResult[0]?.count ?? 0;
    const userCount = realUsers + USER_COUNT_FLOOR;
    const serviceCount = serviceResult[0]?.count ?? 0;

    return {
      userCount,
      serviceCount,
      userCountLabel: formatK(userCount),
      serviceCountLabel: serviceCount.toString(),
    };
  } catch {
    return defaults;
  }
}
