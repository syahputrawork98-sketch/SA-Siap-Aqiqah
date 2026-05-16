import React from 'react';
import MitraKandangDashboard from '@/features/mitra/pages/MitraKandangDashboard';
import MitraCateringDashboard from '@/features/mitra/pages/MitraCateringDashboard';
import MitraKurirDashboard from '@/features/mitra/pages/MitraKurirDashboard';

export const mitraKandangRoutes = [
  {
    index: true,
    element: <MitraKandangDashboard />,
  },
];

export const mitraCateringRoutes = [
  {
    index: true,
    element: <MitraCateringDashboard />,
  },
];

export const mitraKurirRoutes = [
  {
    index: true,
    element: <MitraKurirDashboard />,
  },
];
