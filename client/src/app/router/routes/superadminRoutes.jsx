import React from 'react';
import Dashboard from '@/features/superadmin/pages/Dashboard';
import Users from '@/features/superadmin/pages/Users';
import Mitra from '@/features/admin/pages/Mitra';
import Konsumen from '@/features/admin/pages/Konsumen';
import Laporan from '@/features/admin/pages/Laporan';
import Notifikasi from '@/features/admin/pages/Notifikasi';
import Pengaturan from '@/features/admin/pages/Pengaturan';

export const superadminRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: 'users',
    element: <Users />,
  },
  {
    path: 'mitra',
    element: <Mitra />,
  },
  {
    path: 'konsumen',
    element: <Konsumen />,
  },
  {
    path: 'laporan',
    element: <Laporan />,
  },
  {
    path: 'notifikasi',
    element: <Notifikasi />,
  },
  {
    path: 'pengaturan',
    element: <Pengaturan />,
  },
];
