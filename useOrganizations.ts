// hooks/useOrganizations.ts
'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Organization, SubOrganization, OrganizationTree } from '@/types/organizations';

export function useOrganizations(organizationId?: string) {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [subOrganizations, setSubOrganizations] = useState<SubOrganization[]>([]);
  const [organizationTree, setOrganizationTree] = useState<OrganizationTree[]>([]);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  // Cargar organización actual
  const loadCurrentOrganization = useCallback(async (orgId: string) => {
    try {
      const { data, error } = await supabase
        .from('dim_organizations')
        .select('*')
        .eq('id', orgId)
        .single();

      if (error) throw error;
      setCurrentOrganization(data);
    } catch (err: any) {
      console.error('Error loading organization:', err);
      setError(err.message);
    }
  }, []);

  // Cargar sub-organizaciones
  const loadSubOrganizations = useCallback(async (orgId: string) => {
    try {
      const { data, error } = await supabase
        .from('dim_sub_organizations')
        .select(`
          *,
          manager:dim_users!dim_sub_organizations_manager_id_fkey(id, full_name, email),
          parent_organization:dim_organizations!dim_sub_organizations_parent_organization_id_fkey(id, name)
        `)
        .eq('parent_organization_id', orgId)
        .eq('is_active', true)
        .order('level', { ascending: true })
        .order('name', { ascending: true });

      if (error) throw error;
      setSubOrganizations(data || []);
    } catch (err: any) {
      console.error('Error loading sub-organizations:', err);
      setError(err.message);
    }
  }, []);

  // Construir árbol jerárquico
  const buildOrganizationTree = useCallback((
    org: Organization,
    subOrgs: SubOrganization[]
  ): OrganizationTree[] => {
    const tree: OrganizationTree[] = [];

    // Agregar organización raíz
    tree.push({
      id: org.id,
      name: org.name,
      type: 'organization',
      level: 0,
      path: org.name,
      children: [],
      is_active: org.is_active,
    });

    // Agregar sub-organizaciones por nivel
    const buildChildren = (parentId: string, level: number, parentPath: string): OrganizationTree[] => {
      const children = subOrgs
        .filter(sub => sub.parent_organization_id === parentId && sub.level === level)
        .map(sub => {
          const path = `${parentPath} > ${sub.name}`;
          return {
            id: sub.id,
            name: sub.name,
            type: 'sub_organization' as const,
            level: sub.level,
            parent_id: sub.parent_organization_id,
            path,
            children: buildChildren(sub.id, level + 1, path),
            manager: sub.manager ? {
              id: sub.manager.id,
              full_name: sub.manager.full_name,
            } : undefined,
            is_active: sub.is_active,
          };
        });
      return children;
    };

    tree[0].children = buildChildren(org.id, 1, org.name);
    return tree;
  }, []);

  // Cargar todo
  const loadOrganizations = useCallback(async () => {
    if (!organizationId) return;

    setLoading(true);
    setError(null);

    try {
      await loadCurrentOrganization(organizationId);
      await loadSubOrganizations(organizationId);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [organizationId, loadCurrentOrganization, loadSubOrganizations]);

  // Crear sub-organización
  const createSubOrganization = async (input: {
    name: string;
    code?: string;
    level: number;
    description?: string;
    manager_id?: string;
  }) => {
    if (!currentOrganization) throw new Error('No organization selected');

    try {
      const { data, error } = await supabase
        .from('dim_sub_organizations')
        .insert({
          parent_organization_id: currentOrganization.id,
          ...input,
        })
        .select(`
          *,
          manager:dim_users!dim_sub_organizations_manager_id_fkey(id, full_name, email)
        `)
        .single();

      if (error) throw error;
      
      // Recargar sub-organizaciones
      await loadSubOrganizations(currentOrganization.id);
      
      return data;
    } catch (err: any) {
      console.error('Error creating sub-organization:', err);
      throw err;
    }
  };

  // Actualizar sub-organización
  const updateSubOrganization = async (id: string, input: {
    name?: string;
    code?: string;
    description?: string;
    manager_id?: string;
    is_active?: boolean;
  }) => {
    try {
      const { data, error } = await supabase
        .from('dim_sub_organizations')
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select(`
          *,
          manager:dim_users!dim_sub_organizations_manager_id_fkey(id, full_name, email)
        `)
        .single();

      if (error) throw error;
      
      // Recargar sub-organizaciones
      if (currentOrganization) {
        await loadSubOrganizations(currentOrganization.id);
      }
      
      return data;
    } catch (err: any) {
      console.error('Error updating sub-organization:', err);
      throw err;
    }
  };

  // Eliminar sub-organización
  const deleteSubOrganization = async (id: string) => {
    try {
      const { error } = await supabase
        .from('dim_sub_organizations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Recargar sub-organizaciones
      if (currentOrganization) {
        await loadSubOrganizations(currentOrganization.id);
      }
    } catch (err: any) {
      console.error('Error deleting sub-organization:', err);
      throw err;
    }
  };

  // Efecto para cargar datos
  useEffect(() => {
    if (organizationId) {
      loadOrganizations();
    }
  }, [organizationId, loadOrganizations]);

  // Efecto para construir árbol
  useEffect(() => {
    if (currentOrganization && subOrganizations.length >= 0) {
      const tree = buildOrganizationTree(currentOrganization, subOrganizations);
      setOrganizationTree(tree);
    }
  }, [currentOrganization, subOrganizations, buildOrganizationTree]);

  return {
    currentOrganization,
    subOrganizations,
    organizationTree,
    loading,
    error,
    createSubOrganization,
    updateSubOrganization,
    deleteSubOrganization,
    refreshOrganizations: loadOrganizations,
  };
}
