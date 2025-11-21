// app/dashboard/organizations/page.tsx
'use client';

import { useState } from 'react';
import { Building2, Plus, Users, BarChart3 } from 'lucide-react';
import { useOrganizationContext } from '@/lib/contexts/OrganizationContext';
import { OrganizationTree } from '@/components/OrganizationTree';
import { SubOrganizationModal } from '@/components/SubOrganizationModal';
import { LoadingCard } from '@/components/LoadingCard';
import { ErrorState } from '@/components/ErrorState';
import { useToast } from '@/hooks/useToast';
import { createClient } from '@/lib/supabase/client';

export default function OrganizationsPage() {
  const {
    currentOrganization,
    organizationTree,
    subOrganizations,
    loading,
    refreshOrganizations,
  } = useOrganizationContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedSubOrg, setSelectedSubOrg] = useState<any>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const { showToast } = useToast();
  const supabase = createClient();

  if (loading) {
    return (
      <div className="p-8">
        <LoadingCard message="Cargando organizaciones..." />
      </div>
    );
  }

  if (!currentOrganization) {
    return (
      <div className="p-8">
        <ErrorState
          message="No se encontró organización activa"
          description="Por favor, contacta al administrador"
        />
      </div>
    );
  }

  const handleCreate = () => {
    setModalMode('create');
    setSelectedSubOrg(null);
    setModalOpen(true);
  };

  const handleEdit = async (id: string, type: 'organization' | 'sub_organization') => {
    if (type === 'sub_organization') {
      const subOrg = subOrganizations.find(s => s.id === id);
      if (subOrg) {
        setSelectedSubOrg(subOrg);
        setModalMode('edit');
        setModalOpen(true);
      }
    } else {
      showToast('Para editar la organización principal, ve a Configuración', 'info');
    }
  };

  const handleDelete = async (id: string, type: 'organization' | 'sub_organization') => {
    if (type === 'organization') {
      showToast('No puedes eliminar la organización principal', 'error');
      return;
    }

    if (!confirm('¿Estás seguro de eliminar esta sub-organización?')) {
      return;
    }

    setDeleting(id);
    try {
      const { error } = await supabase
        .from('dim_sub_organizations')
        .delete()
        .eq('id', id);

      if (error) throw error;

      showToast('Sub-organización eliminada exitosamente', 'success');
      await refreshOrganizations();
    } catch (error: any) {
      console.error('Error deleting sub-organization:', error);
      showToast(error.message || 'Error al eliminar sub-organización', 'error');
    } finally {
      setDeleting(null);
    }
  };

  const stats = {
    totalSubOrgs: subOrganizations.length,
    activeSubOrgs: subOrganizations.filter(s => s.is_active).length,
    withManager: subOrganizations.filter(s => s.manager_id).length,
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Organizaciones</h1>
          <p className="text-neutral-400 mt-1">
            Gestiona la estructura de tu organización
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nueva Sub-organización
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-teal-500/20 rounded-lg">
              <Building2 className="w-6 h-6 text-teal-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Total Sub-organizaciones</p>
              <p className="text-2xl font-bold text-white">{stats.totalSubOrgs}</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Activas</p>
              <p className="text-2xl font-bold text-white">{stats.activeSubOrgs}</p>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-neutral-400">Con Manager</p>
              <p className="text-2xl font-bold text-white">{stats.withManager}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Organization Tree */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">
          Estructura Organizacional
        </h2>
        
        {organizationTree.length > 0 ? (
          <OrganizationTree
            tree={organizationTree}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <div className="text-center py-12">
            <Building2 className="w-12 h-12 text-neutral-600 mx-auto mb-4" />
            <p className="text-neutral-400">No hay sub-organizaciones</p>
            <button
              onClick={handleCreate}
              className="mt-4 text-teal-500 hover:text-teal-400 transition-colors"
            >
              Crear la primera sub-organización
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      <SubOrganizationModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedSubOrg(null);
        }}
        onSuccess={async () => {
          await refreshOrganizations();
        }}
        parentOrganizationId={currentOrganization.id}
        subOrganization={selectedSubOrg}
        mode={modalMode}
      />
    </div>
  );
}
