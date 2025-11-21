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
  const [availableParents, setAvailableParents] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    level: 1,
    description: '',
    manager_id: '',
    parent_sub_org_id: '',
  });

  const { showToast } = useToast();
  const supabase = createClient();

  // Cargar usuarios y padres disponibles
  useEffect(() => {
    if (isOpen) {
      loadUsers();
      loadAvailableParents();
    }
  }, [isOpen, formData.level]);

  // Cargar datos del formulario si es edición
  useEffect(() => {
    if (mode === 'edit' && subOrganization) {
      setFormData({
        name: subOrganization.name,
        code: subOrganization.code || '',
        level: subOrganization.level,
        description: subOrganization.description || '',
        manager_id: subOrganization.manager_id || '',
        parent_sub_org_id: '',
      });
    } else {
      setFormData({
        name: '',
        code: '',
        level: 1,
        description: '',
        manager_id: '',
        parent_sub_org_id: '',
      });
    }
  }, [mode, subOrganization, isOpen]);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('fact_memberships')
        .select(`
          user_id,
          role,
          dim_users!fact_memberships_user_id_fkey(
            id,
            full_name,
            email
          )
        `)
        .eq('organization_id', parentOrganizationId)
        .eq('is_active', true)
        .in('role', ['admin', 'manager']);

      if (error) throw error;
      
      const uniqueUsers = data
        .map(m => m.dim_users)
        .filter((user, index, self) => 
          user && self.findIndex(u => u?.id === user.id) === index
        );
      
      setUsers(uniqueUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const loadAvailableParents = async () => {
    // Para nivel 1, no se necesita padre
    if (formData.level === 1) {
      setAvailableParents([]);
      return;
    }

    try {
      // Cargar sub-orgs del nivel anterior
      const targetLevel = formData.level - 1;
      
      const { data, error } = await supabase
        .from('dim_sub_organizations')
        .select('id, name, level')
        .eq('parent_organization_id', parentOrganizationId)
        .eq('level', targetLevel)
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setAvailableParents(data || []);
    } catch (error) {
      console.error('Error loading parents:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación: Si nivel > 1, debe tener padre
    if (formData.level > 1 && !formData.parent_sub_org_id) {
      showToast(`Debes seleccionar una organización padre de Nivel ${formData.level - 1}`, 'error');
      return;
    }

    setLoading(true);

    try {
      const dataToInsert: any = {
        parent_organization_id: parentOrganizationId, // Siempre la org principal
        name: formData.name,
        code: formData.code || null,
        level: formData.level,
        description: formData.description || null,
        manager_id: formData.manager_id || null,
      };

      // Solo agregar parent_sub_organization_id si es nivel 2+
      if (formData.level > 1) {
        dataToInsert.parent_sub_organization_id = formData.parent_sub_org_id;
      } else {
        dataToInsert.parent_sub_organization_id = null;
      }

      console.log('Datos a insertar:', dataToInsert);

      if (mode === 'create') {
        const { data, error } = await supabase
          .from('dim_sub_organizations')
          .insert(dataToInsert)
          .select();

        if (error) {
          console.error('Error de Supabase:', error);
          throw error;
        }
        
        console.log('Sub-org creada:', data);
        showToast('Sub-organización creada exitosamente', 'success');
      } else {
        if (!subOrganization) throw new Error('No sub-organization to edit');

        const { error } = await supabase
          .from('dim_sub_organizations')
          .update({
            ...dataToInsert,
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
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Building2 className="w-5 h-5 text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              {mode === 'create' ? 'Nueva Sub-organización' : 'Editar Sub-organización'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre *
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ej: Departamento de Ventas"
                required
              />
            </div>
          </div>

          {/* Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código (Opcional)
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Ej: DEPT-VENTAS"
              />
            </div>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nivel *
            </label>
            <select
              value={formData.level}
              onChange={(e) => {
                const newLevel = parseInt(e.target.value);
                setFormData({ ...formData, level: newLevel, parent_sub_org_id: '' });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            >
              <option value={1}>Nivel 1 (Sucursal)</option>
              <option value={2}>Nivel 2 (Departamento)</option>
              <option value={3}>Nivel 3 (Equipo)</option>
              <option value={4}>Nivel 4 (Sub-equipo)</option>
            </select>
          </div>

          {/* Parent Selector - Solo para nivel 2+ */}
          {formData.level > 1 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organización Padre * (Nivel {formData.level - 1})
              </label>
              {availableParents.length > 0 ? (
                <select
                  value={formData.parent_sub_org_id}
                  onChange={(e) => setFormData({ ...formData, parent_sub_org_id: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                >
                  <option value="">Selecciona la organización padre</option>
                  {availableParents.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.name} (Nivel {parent.level})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    ⚠️ No hay organizaciones de Nivel {formData.level - 1} disponibles.
                    <br />
                    Primero crea una organización de ese nivel.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Manager */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manager (Opcional)
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select
                value={formData.manager_id}
                onChange={(e) => setFormData({ ...formData, manager_id: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descripción (Opcional)
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
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
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || (formData.level > 1 && availableParents.length === 0)}
            >
              {loading ? 'Guardando...' : mode === 'create' ? 'Crear' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}