import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Logout() {
  const { loginRestart } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loginRestart();
    navigate('/login', { replace: true });
  }, []);

  return null;
}

export default Logout;
