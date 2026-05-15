import React from 'react';
import Dashboard from '@/features/admin/pages/Dashboard';
import Pesanan from '@/features/admin/pages/Pesanan';

export const adminRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: 'pesanan',
    element: <Pesanan />,
  },
];
