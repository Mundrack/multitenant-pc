// components/OrganizationSelector.tsx
'use client';

import { useState } from 'react';
import { useOrganizationContext } from '@/lib/contexts/OrganizationContext';
import { Building2, ChevronDown, Check } from 'lucide-react';

export function OrganizationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    currentOrganization,
    currentSubOrganization,
    organizationTree,
    switchOrganization,
    switchSubOrganization,
    loading,
  } = useOrganizationContext();

  if (loading) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 animate-pulse">
        <Building2 className="w-4 h-4 text-neutral-500" />
        <div className="w-24 h-4 bg-neutral-700 rounded" />
      </div>
    );
  }

  if (!currentOrganization) {
    return null;
  }

  const displayName = currentSubOrganization 
    ? currentSubOrganization.name 
    : currentOrganization.name;

  // Aplanar el árbol para el dropdown
  const flattenTree = (tree: any[]): any[] => {
    const result: any[] = [];
    
    tree.forEach(node => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        result.push(...flattenTree(node.children));
      }
    });
    
    return result;
  };

  const allOrgs = flattenTree(organizationTree);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors"
      >
        <Building2 className="w-4 h-4 text-orange-500" />
        <span className="text-sm font-medium text-white max-w-[150px] truncate">
          {displayName}
        </span>
        <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-72 bg-neutral-800 rounded-lg shadow-xl border border-neutral-700 z-50 max-h-96 overflow-y-auto">
            {allOrgs.map((node) => {
              const isActive = currentSubOrganization 
                ? node.id === currentSubOrganization.id 
                : node.id === currentOrganization.id;
              
              const indent = node.level * 20;

              return (
                <button
                  key={node.id}
                  onClick={() => {
                    if (node.type === 'organization') {
                      switchSubOrganization(null);
                    } else {
                      switchSubOrganization(node.id);
                    }
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2.5 hover:bg-neutral-700 transition-colors text-left ${
                    isActive ? 'bg-neutral-700/50' : ''
                  }`}
                  style={{ paddingLeft: `${16 + indent}px` }}
                >
                  <Building2 className={`w-4 h-4 flex-shrink-0 ${
                    node.type === 'organization' ? 'text-orange-500' : 'text-teal-500'
                  }`} />
                  
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {node.name}
                    </div>
                    {node.manager && (
                      <div className="text-xs text-neutral-400 truncate">
                        Manager: {node.manager.full_name}
                      </div>
                    )}
                  </div>

                  {isActive && (
                    <Check className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}

            {/* Link a gestión de organizaciones */}
            <div className="border-t border-neutral-700 p-2">
              <a
                href="/dashboard/organizations"
                className="flex items-center gap-2 px-3 py-2 text-sm text-neutral-400 hover:text-white hover:bg-neutral-700 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Building2 className="w-4 h-4" />
                Gestionar Organizaciones
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
