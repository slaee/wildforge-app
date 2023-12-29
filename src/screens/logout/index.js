import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Logout() {
  const navigate = useNavigate();
  const { setAccessToken, setRefreshToken, setUser } = useAuth();

  useEffect(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUser(null);

    navigate('/login', { replace: true });
  }, []);

  return null;
}

export default Logout;
