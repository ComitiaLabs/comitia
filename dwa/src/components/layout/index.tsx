import LoadingPage from '@/pages/loadingPage';
import posthog from '@/posthog';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router-dom';

export const Layout = () => {
  const { state } = useNavigation();
  const location = useLocation();
  useEffect(() => {
    posthog.capture('$pageview');
  }, [location]);

  return <>{state === 'loading' ? <LoadingPage /> : <Outlet />}</>;
};

export default Layout;
