import MitraKandangDashboard from '@/features/mitra/pages/MitraKandangDashboard';
import MitraKandangDetail from '@/features/mitra/pages/MitraKandangDetail';
import MitraCateringDashboard from '@/features/mitra/pages/MitraCateringDashboard';
import MitraCateringDetail from '@/features/mitra/pages/MitraCateringDetail';
import MitraKurirDashboard from '@/features/mitra/pages/MitraKurirDashboard';
import MitraKurirDetail from '@/features/mitra/pages/MitraKurirDetail';

export const mitraKandangRoutes = [
  {
    index: true,
    element: <MitraKandangDashboard />,
  },
  {
    path: 'pesanan/:id',
    element: <MitraKandangDetail />,
  },
];

export const mitraCateringRoutes = [
  {
    index: true,
    element: <MitraCateringDashboard />,
  },
  {
    path: 'pesanan/:id',
    element: <MitraCateringDetail />,
  },
];

export const mitraKurirRoutes = [
  {
    index: true,
    element: <MitraKurirDashboard />,
  },
  {
    path: 'pesanan/:id',
    element: <MitraKurirDetail />,
  },
];
