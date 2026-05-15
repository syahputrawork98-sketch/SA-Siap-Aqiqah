import React from 'react';
import Home from '@/features/public/pages/Home';
import About from '@/features/public/pages/About';
import Services from '@/features/public/pages/Services';
import Paket from '@/features/public/pages/Paket';
import Contact from '@/features/public/pages/Contact';
import KonfirmasiPembayaran from '@/features/public/pages/KonfirmasiPembayaran';

export const publicRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: 'tentang',
    element: <About />,
  },
  {
    path: 'layanan',
    element: <Services />,
  },
  {
    path: 'paket',
    element: <Paket />,
  },
  {
    path: 'kontak',
    element: <Contact />,
  },
  {
    path: 'konfirmasi-pembayaran',
    element: <KonfirmasiPembayaran />,
  },
];
