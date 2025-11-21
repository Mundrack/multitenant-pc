// components/OrganizationTree.tsx
'use client';

import { useState } from 'react';
import { Building2, ChevronRight, ChevronDown, Users, Edit2, Trash2 } from 'lucide-react';
import type { OrganizationTree as OrgTreeType } from '@/types/organizations';

interface OrganizationTreeProps {
  tree: OrgTreeType[];
  onEdit?: (id: string, type: 'organization' | 'sub_organization') => void;
  onDelete?: (id: string, type: 'organization' | 'sub_organization') => void;
  onSelect?: (id: string, type: 'organization' | 'sub_organization') => void;
}

export function OrganizationTree({ tree, onEdit, onDelete, onSelect }: OrganizationTreeProps) {
  return (
    <div className="space-y-2">
      {tree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          onEdit={onEdit}
          onDelete={onDelete}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function TreeNode({ node, onEdit, onDelete, onSelect }: {
  node: OrgTreeType;
  onEdit?: (id: string, type: 'organization' | 'sub_organization') => void;
  onDelete?: (id: string, type: 'organization' | 'sub_organization') => void;
  onSelect?: (id: string, type: 'organization' | 'sub_organization') => void;
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div>
      <div
        className={`group flex items-center gap-3 p-3 rounded-lg transition-colors ${
          node.type === 'organization'
            ? 'bg-orange-500/10 border border-orange-500/20'
            : 'bg-neutral-800 hover:bg-neutral-700 border border-neutral-700'
        }`}
      >
        {/* Expand/Collapse Button */}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-neutral-600 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            )}
          </button>
        )}

        {!hasChildren && <div className="w-6" />}

        {/* Icon */}
        <div
          className={`p-2 rounded-lg ${
            node.type === 'organization'
              ? 'bg-orange-500/20'
              : 'bg-teal-500/20'
          }`}
        >
          <Building2
            className={`w-5 h-5 ${
              node.type === 'organization' ? 'text-orange-500' : 'text-teal-500'
            }`}
          />
        </div>

        {/* Content */}
        <div 
          className="flex-1 min-w-0 cursor-pointer"
          onClick={() => onSelect?.(node.id, node.type)}
        >
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-white truncate">
              {node.name}
            </h3>
            <span
              className={`px-2 py-0.5 text-xs rounded-full ${
                node.type === 'organization'
                  ? 'bg-orange-500/20 text-orange-400'
                  : 'bg-teal-500/20 text-teal-400'
              }`}
            >
              Nivel {node.level}
            </span>
          </div>

          {node.manager && (
            <div className="flex items-center gap-1 mt-1 text-sm text-neutral-400">
              <Users className="w-3 h-3" />
              Manager: {node.manager.full_name}
            </div>
          )}

          {hasChildren && (
            <div className="text-xs text-neutral-500 mt-1">
              {node.children.length} sub-organización(es)
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {onEdit && (
            <button
              onClick={() => onEdit(node.id, node.type)}
              className="p-2 text-neutral-400 hover:text-teal-500 hover:bg-neutral-600 rounded-lg transition-colors"
              title="Editar"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}

          {onDelete && node.type === 'sub_organization' && (
            <button
              onClick={() => onDelete(node.id, node.type)}
              className="p-2 text-neutral-400 hover:text-red-500 hover:bg-neutral-600 rounded-lg transition-colors"
              title="Eliminar"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="ml-10 mt-2 space-y-2 border-l-2 border-neutral-700 pl-4">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onEdit={onEdit}
              onDelete={onDelete}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}