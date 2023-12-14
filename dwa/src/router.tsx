import { createBrowserRouter, type RouteObject } from 'react-router-dom';
import Layout from './components/layout/index.tsx';
import ProtectedRoute from './hoc/protectedRoute.tsx';
import Chat from './pages/chat/index.tsx';
import ErrorPage from './pages/error/index.tsx';
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
    errorElement: <ErrorPage />,
    element: <Layout />,
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
