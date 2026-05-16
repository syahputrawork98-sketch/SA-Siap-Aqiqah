import { Navigate, Outlet } from 'react-router-dom';
import PublicLayout from '@/app/layouts/PublicLayout';
import RoleLayout from '@/app/layouts/RoleLayout';
import RoleGuard from '@/app/router/RoleGuard';
import { ROLES } from '@/app/router/accessPolicy';

import { publicRoutes } from './publicRoutes';
import { adminRoutes } from './adminRoutes';
import { superadminRoutes } from './superadminRoutes';
import { userRoutes } from './userRoutes';
import { mitraKandangRoutes, mitraCateringRoutes, mitraKurirRoutes } from './mitraRoutes';

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

  // User Routes
  {
    path: '/user',
    element: (
      <RoleGuard allowedRoles={[ROLES.USER]}>
        <div className="bg-[#fdfbf8] min-h-screen">
          <main className="p-5 md:p-8">
            <Outlet />
          </main>
        </div>
      </RoleGuard>
    ),
    children: userRoutes,
  },

  // Mitra Kandang Routes
  {
    path: '/mitra-kandang',
    element: (
      <RoleGuard allowedRoles={[ROLES.MITRA_KANDANG]}>
        <div className="bg-[#fdfbf8] min-h-screen">
          <main className="p-5 md:p-8">
            <Outlet />
          </main>
        </div>
      </RoleGuard>
    ),
    children: mitraKandangRoutes,
  },

  // Mitra Catering Routes
  {
    path: '/mitra-catering',
    element: (
      <RoleGuard allowedRoles={[ROLES.MITRA_CATERING]}>
        <div className="bg-[#fdfbf8] min-h-screen">
          <main className="p-5 md:p-8">
            <Outlet />
          </main>
        </div>
      </RoleGuard>
    ),
    children: mitraCateringRoutes,
  },

  // Mitra Kurir Routes
  {
    path: '/mitra-kurir',
    element: (
      <RoleGuard allowedRoles={[ROLES.MITRA_KURIR]}>
        <div className="bg-[#fdfbf8] min-h-screen">
          <main className="p-5 md:p-8">
            <Outlet />
          </main>
        </div>
      </RoleGuard>
    ),
    children: mitraKurirRoutes,
  },

  // Fallback
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
