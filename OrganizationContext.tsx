// lib/contexts/OrganizationContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Organization, SubOrganization, OrganizationTree } from '@/types/organizations';
import { useOrganizations } from '@/hooks/useOrganizations';

interface OrganizationContextType {
  currentOrganization: Organization | null;
  currentSubOrganization: SubOrganization | null;
  organizationTree: OrganizationTree[];
  subOrganizations: SubOrganization[];
  loading: boolean;
  switchOrganization: (orgId: string) => void;
  switchSubOrganization: (subOrgId: string | null) => void;
  refreshOrganizations: () => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [currentSubOrgId, setCurrentSubOrgId] = useState<string | null>(null);
  const [currentSubOrg, setCurrentSubOrg] = useState<SubOrganization | null>(null);

  const supabase = createClient();

  // Hook de organizaciones
  const {
    currentOrganization,
    subOrganizations,
    organizationTree,
    loading: orgsLoading,
    refreshOrganizations,
  } = useOrganizations(organizationId || undefined);

  // Cargar usuario y su organización
  useEffect(() => {
    const loadUserOrganization = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        setUserId(user.id);

        // Obtener membership activo
        const { data: membership } = await supabase
          .from('fact_memberships')
          .select('organization_id, sub_organization_id')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();

        if (membership) {
          setOrganizationId(membership.organization_id);
          
          // Si tiene sub-org asignada, cargarla
          if (membership.sub_organization_id) {
            setCurrentSubOrgId(membership.sub_organization_id);
          }
        }
      } catch (error) {
        console.error('Error loading user organization:', error);
      }
    };

    loadUserOrganization();
  }, []);

  // Cargar sub-org actual
  useEffect(() => {
    const loadCurrentSubOrg = async () => {
      if (!currentSubOrgId) {
        setCurrentSubOrg(null);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('dim_sub_organizations')
          .select(`
            *,
            manager:dim_users!dim_sub_organizations_manager_id_fkey(id, full_name, email)
          `)
          .eq('id', currentSubOrgId)
          .single();

        if (error) throw error;
        setCurrentSubOrg(data);
      } catch (error) {
        console.error('Error loading sub-organization:', error);
        setCurrentSubOrg(null);
      }
    };

    loadCurrentSubOrg();
  }, [currentSubOrgId]);

  // Cambiar organización activa
  const switchOrganization = (orgId: string) => {
    setOrganizationId(orgId);
    setCurrentSubOrgId(null); // Resetear sub-org
    
    // Guardar en localStorage para persistencia
    localStorage.setItem('active_organization_id', orgId);
  };

  // Cambiar sub-organización activa
  const switchSubOrganization = (subOrgId: string | null) => {
    setCurrentSubOrgId(subOrgId);
    
    // Guardar en localStorage
    if (subOrgId) {
      localStorage.setItem('active_sub_organization_id', subOrgId);
    } else {
      localStorage.removeItem('active_sub_organization_id');
    }
  };

  // Cargar desde localStorage al iniciar
  useEffect(() => {
    const savedOrgId = localStorage.getItem('active_organization_id');
    const savedSubOrgId = localStorage.getItem('active_sub_organization_id');
    
    if (savedOrgId && !organizationId) {
      setOrganizationId(savedOrgId);
    }
    
    if (savedSubOrgId && !currentSubOrgId) {
      setCurrentSubOrgId(savedSubOrgId);
    }
  }, []);

  const value: OrganizationContextType = {
    currentOrganization,
    currentSubOrganization: currentSubOrg,
    organizationTree,
    subOrganizations,
    loading: orgsLoading,
    switchOrganization,
    switchSubOrganization,
    refreshOrganizations,
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganizationContext() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganizationContext must be used within OrganizationProvider');
  }
  return context;
}
