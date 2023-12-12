import LoadingPage from '@/pages/loadingPage';
import { Outlet, useNavigation } from 'react-router-dom';

export const Layout = () => {
  const { state } = useNavigation();

  return <>{state === 'loading' ? <LoadingPage /> : <Outlet />}</>;
};

export default Layout;
