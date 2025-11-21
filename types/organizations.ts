// types/organizations.ts

export interface Organization {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logo_url?: string;
  website?: string;
  phone?: string;
  email?: string;
  parent_organization_id?: string;
  organization_level: number;
  max_users: number;
  max_storage_gb: number;
  features: Record<string, boolean>;
  tenant_id?: string;
  is_active: boolean;
  trial_ends_at?: string;
  subscription_status: 'trial' | 'active' | 'past_due' | 'cancelled' | 'inactive';
  created_at: string;
  updated_at: string;
}

export interface SubOrganization {
  id: string;
  parent_organization_id: string;
  name: string;
  code?: string;
  level: number;
  description?: string;
  manager_id?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  
  // Relaciones
  manager?: {
    id: string;
    full_name: string;
    email: string;
  };
  parent_organization?: {
    id: string;
    name: string;
  };
}

export interface OrganizationTree {
  id: string;
  name: string;
  type: 'organization' | 'sub_organization';
  level: number;
  parent_id?: string;
  path: string;
  children: OrganizationTree[];
  manager?: {
    id: string;
    full_name: string;
  };
  is_active: boolean;
}

export interface CreateSubOrganizationInput {
  parent_organization_id: string;
  name: string;
  code?: string;
  level: number;
  description?: string;
  manager_id?: string;
}

export interface UpdateSubOrganizationInput {
  name?: string;
  code?: string;
  description?: string;
  manager_id?: string;
  is_active?: boolean;
}

export interface OrganizationStats {
  total_members: number;
  active_members: number;
  total_tasks: number;
  completed_tasks: number;
  pending_tasks: number;
  total_sub_organizations: number;
}

export interface OrganizationContext {
  currentOrganization: Organization | null;
  currentSubOrganization: SubOrganization | null;
  organizationTree: OrganizationTree[];
  subOrganizations: SubOrganization[];
  loading: boolean;
  switchOrganization: (orgId: string) => void;
  switchSubOrganization: (subOrgId: string | null) => void;
  refreshOrganizations: () => Promise<void>;
}