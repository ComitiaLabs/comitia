import Layout from '@/components/layout/index.tsx';
import {
  Outlet,
  createBrowserRouter,
  type RouteObject,
} from 'react-router-dom';
import ProtectedRoute from './hoc/protectedRoute.tsx';

export const paths = {
  base: '/',
  home: '/',
  chat: '/chat',
  chat_with_id: '/chat/:id',
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
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: '',
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
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);

export default router;
