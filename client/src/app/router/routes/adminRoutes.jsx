import React from 'react';
import Dashboard from '@/features/admin/pages/Dashboard';
import Pesanan from '@/features/admin/pages/Pesanan';
import DetailPesanan from '@/features/admin/pages/DetailPesanan';
import Pembayaran from '@/features/admin/pages/Pembayaran';
import DashboardData from '@/features/admin/pages/data-master/DashboardData';
import DataMasterPlaceholder from '@/features/admin/pages/data-master/DataMasterPlaceholder';
import { Navigate } from 'react-router-dom';

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
  {
    path: 'pembayaran',
    element: <Pembayaran />,
  },
  {
    path: 'data-master',
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <DashboardData />,
      },
      {
        path: 'hewan',
        element: <DataMasterPlaceholder title="Data Hewan" />,
      },
      {
        path: 'kandang',
        element: <DataMasterPlaceholder title="Data Kandang" />,
      },
      {
        path: 'catering',
        element: <DataMasterPlaceholder title="Data Catering" />,
      },
      {
        path: 'menu',
        element: <DataMasterPlaceholder title="Data Menu" />,
      },
      {
        path: 'paket',
        element: <DataMasterPlaceholder title="Data Paket" />,
      },
    ],
  },
];
