// hooks/usePermissions.ts
'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Permission, ROLE_PERMISSIONS, UserRole } from '@/types/roles';

interface Membership {
  role: UserRole;
  organization_id: string;
}

export function usePermissions() {
  const [membership, setMembership] = useState<Membership | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadMembership() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setLoading(false);
          return;
        }

        // Obtener membership del usuario
        const { data, error } = await supabase
          .from('fact_memberships')
          .select('role, organization_id')
          .eq('user_id', user.id)
          .eq('is_active', true)
          .single();

        if (error) {
          console.error('Error loading membership:', error);
        } else {
          setMembership(data as Membership);
        }
      } catch (error) {
        console.error('Error in loadMembership:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMembership();
  }, [supabase]);

  const hasPermission = (permission: Permission): boolean => {
    if (!membership) return false;
    const rolePermissions = ROLE_PERMISSIONS[membership.role] || [];
    return rolePermissions.includes(permission);
  };

  const hasAnyPermission = (permissions: Permission[]): boolean => {
    return permissions.some((p) => hasPermission(p));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every((p) => hasPermission(p));
  };

  const isRole = (role: UserRole): boolean => {
    return membership?.role === role;
  };

  return {
    membership,
    loading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isRole,
  };
}
