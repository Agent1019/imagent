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
