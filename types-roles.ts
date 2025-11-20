// types/roles.ts
export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  OWNER = 'owner',
  ADMIN = 'admin',
  MANAGER = 'manager',
  MEMBER = 'member',
}

export enum Permission {
  // Users
  USERS_VIEW_ALL = 'users:view:all',
  USERS_CREATE = 'users:create',
  USERS_EDIT = 'users:edit',
  USERS_DELETE = 'users:delete',
  USERS_SUSPEND = 'users:suspend',
  USERS_CHANGE_ROLE = 'users:change_role',

  // Tasks
  TASKS_VIEW_ALL = 'tasks:view:all',
  TASKS_CREATE = 'tasks:create',
  TASKS_EDIT_ALL = 'tasks:edit:all',
  TASKS_EDIT_OWN = 'tasks:edit:own',
  TASKS_DELETE = 'tasks:delete',
  TASKS_ASSIGN = 'tasks:assign',

  // Organizations
  ORG_VIEW_CONFIG = 'org:view:config',
  ORG_EDIT_CONFIG = 'org:edit:config',
  ORG_CREATE_SUB = 'org:create:sub',

  // Analytics
  ANALYTICS_VIEW_ORG = 'analytics:view:org',
  ANALYTICS_VIEW_TEAM = 'analytics:view:team',
  ANALYTICS_EXPORT = 'analytics:export',
}

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  [UserRole.SUPER_ADMIN]: Object.values(Permission),
  
  [UserRole.OWNER]: [
    Permission.USERS_VIEW_ALL,
    Permission.USERS_CREATE,
    Permission.USERS_EDIT,
    Permission.USERS_DELETE,
    Permission.USERS_SUSPEND,
    Permission.USERS_CHANGE_ROLE,
    Permission.TASKS_VIEW_ALL,
    Permission.TASKS_CREATE,
    Permission.TASKS_EDIT_ALL,
    Permission.TASKS_DELETE,
    Permission.TASKS_ASSIGN,
    Permission.ORG_VIEW_CONFIG,
    Permission.ORG_EDIT_CONFIG,
    Permission.ORG_CREATE_SUB,
    Permission.ANALYTICS_VIEW_ORG,
    Permission.ANALYTICS_VIEW_TEAM,
    Permission.ANALYTICS_EXPORT,
  ],
  
  [UserRole.ADMIN]: [
    Permission.USERS_VIEW_ALL,
    Permission.USERS_EDIT,
    Permission.TASKS_VIEW_ALL,
    Permission.TASKS_CREATE,
    Permission.TASKS_EDIT_ALL,
    Permission.TASKS_ASSIGN,
    Permission.ANALYTICS_VIEW_ORG,
    Permission.ANALYTICS_VIEW_TEAM,
  ],
  
  [UserRole.MANAGER]: [
    Permission.TASKS_CREATE,
    Permission.TASKS_EDIT_OWN,
    Permission.ANALYTICS_VIEW_TEAM,
  ],
  
  [UserRole.MEMBER]: [
    Permission.TASKS_EDIT_OWN,
  ],
};

export const ROLE_LABELS: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'Super Admin',
  [UserRole.OWNER]: 'Propietario',
  [UserRole.ADMIN]: 'Administrador',
  [UserRole.MANAGER]: 'Gerente',
  [UserRole.MEMBER]: 'Miembro',
};

export const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  [UserRole.SUPER_ADMIN]: 'Control total del sistema',
  [UserRole.OWNER]: 'Control total de la organización',
  [UserRole.ADMIN]: 'Gestión operativa sin configuraciones críticas',
  [UserRole.MANAGER]: 'Gestiona su equipo directo',
  [UserRole.MEMBER]: 'Usuario base con acceso limitado',
};
