import Layout from '@/components/layout/index.tsx';
import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import ProtectedRoute from './hoc/protectedRoute.tsx';
import Chat from './pages/chat/index.tsx';
import Home from './pages/home/index.tsx';

export const paths = {
  base: '/',
  home: '/',
  chat: '/chat'
} as const;

export type AppPath = (typeof paths)[keyof typeof paths];

export const routes: RouteObject[] = [
  {
    path: paths.base,
    Component: Layout,
    children: [
      {
        path: paths.home,
        element: <Home />
      },
      {
        path: paths.chat,
        element: (
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        )
      }
    ]
  }
];

export const router = createBrowserRouter(routes);

export default router;
