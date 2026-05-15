import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createAppRouterConfig } from './routes';

const AppRouter = () => {
  const router = createBrowserRouter(createAppRouterConfig());

  return <RouterProvider router={router} />;
};

export default AppRouter;
