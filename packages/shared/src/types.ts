export interface Package {
  id: string;
  name: string;
  description: string;
  version: string;
  capabilitySpec: Record<string, unknown>;
  mcpConfig?: Record<string, unknown>;
  trustScore: number;
  installCount: number;
  status: "draft" | "published" | "deprecated";
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PackageVersion {
  id: string;
  packageId: string;
  version: string;
  changelog?: string;
  artifactUrl?: string;
  sandboxTestPassed: boolean;
  createdAt: string;
}

export interface InstallRecord {
  id: string;
  packageId: string;
  agentId?: string;
  version?: string;
  success: boolean;
  executionData?: Record<string, unknown>;
  createdAt: string;
}
