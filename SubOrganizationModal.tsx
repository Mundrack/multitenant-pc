// components/SubOrganizationModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Building2, User, FileText, Hash } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { SubOrganization } from '@/types/organizations';
import { useToast } from '@/hooks/useToast';

interface SubOrganizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  parentOrganizationId: string;
  subOrganization?: SubOrganization | null;
  mode: 'create' | 'edit';
}

export function SubOrganizationModal({
  isOpen,
  onClose,
  onSuccess,
  parentOrganizationId,
  subOrganization,
  mode,
}: SubOrganizationModalProps) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    level: 1,
    description: '',
    manager_id: '',
  });

  const { showToast } = useToast();
  const supabase = createClient();

  // Cargar usuarios disponibles para ser managers
  useEffect(() => {
    if (isOpen) {
      loadUsers();
    }
  }, [isOpen]);

  // Cargar datos del formulario si es edición
  useEffect(() => {
    if (mode === 'edit' && subOrganization) {
      setFormData({
        name: subOrganization.name,
        code: subOrganization.code || '',
        level: subOrganization.level,
        description: subOrganization.description || '',
        manager_id: subOrganization.manager_id || '',
      });
    } else {
      setFormData({
        name: '',
        code: '',
        level: 1,
        description: '',
        manager_id: '',
      });
    }
  }, [mode, subOrganization]);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('fact_memberships')
        .select(`
          user:dim_users!fact_memberships_user_id_fkey(
            id,
            full_name,
            email
          ),
          role
        `)
        .eq('organization_id', parentOrganizationId)
        .eq('is_active', true)
        .in('role', ['admin', 'manager']);

      if (error) throw error;
      
      const uniqueUsers = data
        .map(m => m.user)
        .filter((user, index, self) => 
          user && self.findIndex(u => u?.id === user.id) === index
        );
      
      setUsers(uniqueUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'create') {
        const { error } = await supabase
          .from('dim_sub_organizations')
          .insert({
            parent_organization_id: parentOrganizationId,
            name: formData.name,
            code: formData.code || null,
            level: formData.level,
            description: formData.description || null,
            manager_id: formData.manager_id || null,
          });

        if (error) throw error;
        showToast('Sub-organización creada exitosamente', 'success');
      } else {
        if (!subOrganization) throw new Error('No sub-organization to edit');

        const { error } = await supabase
          .from('dim_sub_organizations')
          .update({
            name: formData.name,
            code: formData.code || null,
            level: formData.level,
            description: formData.description || null,
            manager_id: formData.manager_id || null,
            updated_at: new Date().toISOString(),
          })
          .eq('id', subOrganization.id);

        if (error) throw error;
        showToast('Sub-organización actualizada exitosamente', 'success');
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error('Error saving sub-organization:', error);
      showToast(error.message || 'Error al guardar sub-organización', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-neutral-900 rounded-xl shadow-2xl border border-neutral-800">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <Building2 className="w-5 h-5 text-teal-500" />
            </div>
            <h2 className="text-xl font-bold text-white">
              {mode === 'create' ? 'Nueva Sub-organización' : 'Editar Sub-organización'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Nombre *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Ej: Departamento de Ventas"
                required
              />
            </div>
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Código (Opcional)
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="Ej: DEPT-VENTAS"
              />
            </div>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Nivel *
            </label>
            <select
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            >
              <option value={1}>Nivel 1 (Sucursal)</option>
              <option value={2}>Nivel 2 (Departamento)</option>
              <option value={3}>Nivel 3 (Equipo)</option>
              <option value={4}>Nivel 4 (Sub-equipo)</option>
            </select>
          </div>

          {/* Manager */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Manager (Opcional)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <select
                value={formData.manager_id}
                onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Sin manager asignado</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.full_name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Descripción (Opcional)
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-neutral-500" />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                placeholder="Describe esta sub-organización..."
                rows={3}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-neutral-800 text-white rounded-lg hover:bg-neutral-700 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
