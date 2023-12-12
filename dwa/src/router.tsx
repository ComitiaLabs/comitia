import Layout from '@/components/layout/index.tsx';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';

export const paths = {
  base: '/',
  home: '/',
  chat: '/chat',
  chat_with_id: '/chat/:id',
  login: '/login',
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
      {
        path: paths.chat,
        lazy: async () => {
          return {
            Component: (await import('./pages/chat/index.tsx')).default,
          };
        },
        children: [
          {
            path: paths.chat_with_id,
            lazy: async () => {
              return {
                Component: (await import('./pages/chat/[id].tsx')).default,
              };
            },
          },
        ],
      },
      {
        path: paths.login,
        lazy: async () => {
          return {
            Component: (await import('./pages/login/login.tsx')).default,
          };
        }
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default router;
