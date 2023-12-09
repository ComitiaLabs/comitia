import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import Layout from './components/layout/index.tsx';

export const paths = {
  base: '/',
  home: '/',
} as const;

export type AppPath = (typeof paths)[keyof typeof paths];

export const routes: RouteObject[] = [
  {
    path: paths.base,
    Component: Layout,
    children: [
      {
        path: paths.home,
        lazy: async () => {
          return {
            Component: (await import('./pages/home/index.tsx')).default,
          };
        },
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default router;
