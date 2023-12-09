import { createBrowserRouter, type RouteObject } from 'react-router-dom';

export const paths = {
  home: '/',
} as const;

export type AppPath = (typeof paths)[keyof typeof paths];

export const routes: RouteObject[] = [
  {
    path: paths.home,
    lazy: async () => {
      return {
        Component: (await import('./pages/home/index.tsx')).default,
      };
    },
    children: [],
  },
];

export const router = createBrowserRouter(routes);

export default router;
