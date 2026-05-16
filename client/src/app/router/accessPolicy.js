export const ROLES = {
  PUBLIC: 'public',
  USER: 'user',
  MITRA_KANDANG: 'mitra_kandang',
  MITRA_CATERING: 'mitra_catering',
  MITRA_KURIR: 'mitra_kurir',
  ADMIN: 'admin',
  SUPERADMIN: 'superadmin',
};

export const DEFAULT_PATHS = {
  [ROLES.PUBLIC]: '/',
  [ROLES.USER]: '/user',
  [ROLES.MITRA_KANDANG]: '/mitra-kandang',
  [ROLES.MITRA_CATERING]: '/mitra-catering',
  [ROLES.MITRA_KURIR]: '/mitra-kurir',
  [ROLES.ADMIN]: '/admin',
  [ROLES.SUPERADMIN]: '/superadmin',
};
