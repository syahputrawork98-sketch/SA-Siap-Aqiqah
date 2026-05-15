export const ROLES = {
  PUBLIC: 'public',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

export const DEFAULT_PATHS = {
  [ROLES.PUBLIC]: '/',
  [ROLES.ADMIN]: '/admin',
  [ROLES.SUPERADMIN]: '/superadmin',
};
