import React from 'react';
import Dashboard from '@/features/admin/pages/Dashboard';
import Pesanan from '@/features/admin/pages/Pesanan';
import DetailPesanan from '@/features/admin/pages/DetailPesanan';
import Pembayaran from '@/features/admin/pages/Pembayaran';
import DashboardData from '@/features/admin/pages/data-master/DashboardData';
import DataHewan from '@/features/admin/pages/data-master/DataHewan';
import DataKandang from '@/features/admin/pages/data-master/DataKandang';
import DataCatering from '@/features/admin/pages/data-master/DataCatering';
import DataMenu from '@/features/admin/pages/data-master/DataMenu';
import DataPaket from '@/features/admin/pages/data-master/DataPaket';
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
        element: <DataHewan />,
      },
      {
        path: 'kandang',
        element: <DataKandang />,
      },
      {
        path: 'catering',
        element: <DataCatering />,
      },
      {
        path: 'menu',
        element: <DataMenu />,
      },
      {
        path: 'paket',
        element: <DataPaket />,
      },
    ],
  },
];
