import React from 'react';
import Dashboard from '@/features/admin/pages/Dashboard';
import Pesanan from '@/features/admin/pages/Pesanan';
import DetailPesanan from '@/features/admin/pages/DetailPesanan';

export const adminRoutes = [
  {
    index: true,
    element: <Dashboard />,
  },
  {
    path: 'pesanan',
    element: <Pesanan />,
  },
  {
    path: 'pesanan/:id',
    element: <DetailPesanan />,
  },
];
