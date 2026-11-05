-- Initial schema for imagent package registry

-- Packages table
CREATE TABLE packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  capability_spec JSONB NOT NULL DEFAULT '{}',
  version TEXT NOT NULL DEFAULT '0.1.0',
  author_id UUID REFERENCES auth.users(id),
  mcp_config JSONB,
  trust_score FLOAT DEFAULT 0,
  install_count INT DEFAULT 0,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'deprecated')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Package versions
CREATE TABLE package_versions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
  version TEXT NOT NULL,
  changelog TEXT,
  artifact_url TEXT,
  sandbox_test_passed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Install/usage records
CREATE TABLE installs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  package_id UUID REFERENCES packages(id) ON DELETE CASCADE,
  agent_id TEXT,
  version TEXT,
  success BOOLEAN,
  execution_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX idx_packages_name ON packages(name);
CREATE INDEX idx_packages_capability ON packages USING GIN(capability_spec);
CREATE INDEX idx_packages_status ON packages(status);
CREATE INDEX idx_installs_package ON installs(package_id);
CREATE INDEX idx_package_versions_package ON package_versions(package_id);

-- Community posts. author_name is denormalized because auth.users is not readable by visitors.
CREATE TABLE community_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id),
  author_name TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'qa' CHECK (category IN ('mcp', 'agent', 'tools', 'qa', 'announcements')),
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_community_posts_created ON community_posts(created_at DESC);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE package_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE installs ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public reads published packages"
  ON packages FOR SELECT
  USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "authors insert packages"
  ON packages FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "authors update own packages"
  ON packages FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "authors delete own packages"
  ON packages FOR DELETE
  USING (auth.uid() = author_id);

CREATE POLICY "read versions of visible packages"
  ON package_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM packages p
      WHERE p.id = package_id
        AND (p.status = 'published' OR p.author_id = auth.uid())
    )
  );

CREATE POLICY "authors insert versions"
  ON package_versions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM packages p
      WHERE p.id = package_id AND p.author_id = auth.uid()
    )
  );

CREATE POLICY "public reads community posts"
  ON community_posts FOR SELECT
  USING (true);

CREATE POLICY "authors insert community posts"
  ON community_posts FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "authors update own community posts"
  ON community_posts FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "authors delete own community posts"
  ON community_posts FOR DELETE
  USING (auth.uid() = author_id);
