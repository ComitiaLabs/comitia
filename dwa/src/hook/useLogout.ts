import { handleClose } from '@/lib/web5Tools';
import { usePostHog } from 'posthog-js/react';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const posthog = usePostHog();
  const navigate = useNavigate();
  const logout = () => {
    handleClose();
    posthog?.capture('logout');
    navigate('/');
  };

  return logout;
};

export default useLogout;
