import useIsAuthorized from '@/hook/useIsAuthorized';
import RequestStatus from '@/lib/enums';
import LoadingPage from '@/pages/loadingPage';
import React from 'react';
import { Navigate, RouteProps, useLocation } from 'react-router-dom';

const ProtectedRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const isAuthorized = useIsAuthorized();
  const location = useLocation();

  if (isAuthorized === RequestStatus.TRUE) {
    return React.cloneElement(children as React.ReactElement<unknown>, {
      ...rest,
    });
  } else if (isAuthorized === RequestStatus.UNKNOWN) {
    return <LoadingPage />;
  }

  return <Navigate to="/?login" replace state={{ path: location.state }} />;
};

export default ProtectedRoute;
