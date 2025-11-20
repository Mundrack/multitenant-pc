'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { usePermissions } from '@/hooks/usePermissions';
import { Permission, ROLE_LABELS, UserRole } from '@/types/roles';

interface TeamMember {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  is_active: boolean;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const { hasPermission, membership } = usePermissions();
  const supabase = createClient();

  useEffect(() => {
    loadTeamMembers();
  }, []);

  async function loadTeamMembers() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !membership) return;

      // Obtener todos los miembros de la organización
      const { data, error } = await supabase
        .from('fact_memberships')
        .select(
          `
          id,
          role,
          created_at,
          is_active,
          dim_users (
            id,
            email,
            full_name
          )
        `
        )
        .eq('organization_id', membership.organization_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading team members:', error);
      } else {
        const formatted = data.map((m: any) => ({
          id: m.dim_users.id,
          email: m.dim_users.email,
          full_name: m.dim_users.full_name,
          role: m.role,
          created_at: m.created_at,
          is_active: m.is_active,
        }));
        setMembers(formatted);
      }
    } catch (error) {
      console.error('Error in loadTeamMembers:', error);
    } finally {
      setLoading(false);
    }
  }

  const getRoleBadgeColor = (role: UserRole) => {
    const colors = {
      [UserRole.SUPER_ADMIN]: 'bg-purple-100 text-purple-800',
      [UserRole.OWNER]: 'bg-orange-100 text-orange-800',
      [UserRole.ADMIN]: 'bg-blue-100 text-blue-800',
      [UserRole.MANAGER]: 'bg-teal-100 text-teal-800',
      [UserRole.MEMBER]: 'bg-gray-100 text-gray-800',
    };
    return colors[role] || colors[UserRole.MEMBER];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando equipo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Equipo</h1>
              <p className="text-gray-600">
                Gestiona los miembros de tu organización
              </p>
            </div>
            {hasPermission(Permission.USERS_CREATE) && (
              <button
                onClick={() => setShowInviteModal(true)}
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Invitar Usuario
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border-b">
            <div>
              <p className="text-sm text-gray-600">Total Miembros</p>
              <p className="text-3xl font-bold text-gray-900">{members.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Activos</p>
              <p className="text-3xl font-bold text-green-500">
                {members.filter((m) => m.is_active).length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Administradores</p>
              <p className="text-3xl font-bold text-blue-500">
                {
                  members.filter(
                    (m) => m.role === UserRole.ADMIN || m.role === UserRole.OWNER
                  ).length
                }
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Miembros</p>
              <p className="text-3xl font-bold text-teal-500">
                {members.filter((m) => m.role === UserRole.MEMBER).length}
              </p>
            </div>
          </div>

          {/* Members List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Ingreso
                  </th>
                  {hasPermission(Permission.USERS_EDIT) && (
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                            <span className="text-orange-600 font-semibold">
                              {member.full_name?.charAt(0).toUpperCase() || 'U'}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.full_name || 'Sin nombre'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRoleBadgeColor(
                          member.role
                        )}`}
                      >
                        {ROLE_LABELS[member.role]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {member.is_active ? (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Activo
                        </span>
                      ) : (
                        <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(member.created_at).toLocaleDateString('es-ES')}
                    </td>
                    {hasPermission(Permission.USERS_EDIT) && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-orange-600 hover:text-orange-900 mr-4">
                          Editar
                        </button>
                        {hasPermission(Permission.USERS_DELETE) && (
                          <button className="text-red-600 hover:text-red-900">
                            Eliminar
                          </button>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Invite Modal (Placeholder) */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Invitar Usuario</h2>
            <p className="text-gray-600 mb-6">
              La funcionalidad de invitación estará disponible próximamente.
            </p>
            <button
              onClick={() => setShowInviteModal(false)}
              className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
