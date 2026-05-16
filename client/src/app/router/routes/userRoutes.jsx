import UserDashboard from '@/features/user/pages/UserDashboard';
import PesananSaya from '@/features/user/pages/PesananSaya';
import DetailPesananSaya from '@/features/user/pages/DetailPesananSaya';

export const userRoutes = [
  {
    index: true,
    element: <UserDashboard />,
  },
  {
    path: 'pesanan',
    element: <PesananSaya />,
  },
  {
    path: 'pesanan/:id',
    element: <DetailPesananSaya />,
  },
];
