import { handleClose } from '@/lib/web5Tools';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();
  const logout = () => {
    handleClose();
    navigate('/');
  };

  return logout;
};

export default useLogout;
