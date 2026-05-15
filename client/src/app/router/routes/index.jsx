import React from 'react';
import { Navigate } from 'react-router-dom';
import PublicLayout from '@/app/layouts/PublicLayout';
import RoleLayout from '@/app/layouts/RoleLayout';
import RoleGuard from '@/app/router/RoleGuard';
import { ROLES } from '@/app/router/accessPolicy';

import { publicRoutes } from './publicRoutes';
import { adminRoutes } from './adminRoutes';
import { superadminRoutes } from './superadminRoutes';

export const createAppRouterConfig = () => [
  // Public Routes
  {
    path: '/',
    element: <PublicLayout />,
    children: publicRoutes,
  },

  // Admin Routes (with RoleGuard)
  {
    path: '/admin',
    element: (
      <RoleGuard allowedRoles={[ROLES.ADMIN, ROLES.SUPERADMIN]}>
        <RoleLayout role={ROLES.ADMIN} />
      </RoleGuard>
    ),
    children: adminRoutes,
  },

  // Superadmin Routes (with RoleGuard)
  {
    path: '/superadmin',
    element: (
      <RoleGuard allowedRoles={[ROLES.SUPERADMIN]}>
        <RoleLayout role={ROLES.SUPERADMIN} />
      </RoleGuard>
    ),
    children: superadminRoutes,
  },

  // Fallback
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
