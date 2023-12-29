import React, {
  useState,
  createContext,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser_] = useState(Cookies.get('user'));
  const [accessToken, setAccessToken_] = useState(
    Cookies.get('accessToken') || null
  );
  const [refreshToken, setRefreshToken_] = useState(
    Cookies.get('refreshToken') || null
  );

  const setUser = (newUser) => {
    if (newUser) {
      Cookies.set('user', newUser, { expires: 7 });
    } else {
      Cookies.remove('user');
    }

    setUser_(newUser);
  };

  useEffect(() => {
    if (accessToken) {
      setUser(jwtDecode(accessToken));
    }
  }, [accessToken]);

  const setAccessToken = (newAccessToken) => {
    if (newAccessToken) {
      Cookies.set('accessToken', newAccessToken);
    } else {
      Cookies.remove('accessToken');
    }

    setAccessToken_(newAccessToken);
  };

  const setRefreshToken = (newRefreshToken) => {
    if (newRefreshToken) {
      Cookies.set('refreshToken', newRefreshToken);
    } else {
      Cookies.remove('refreshToken');
    }

    setRefreshToken_(newRefreshToken);
  };

  const authContextValue = useMemo(
    () => ({
      user,
      accessToken,
      refreshToken,
      setUser,
      setAccessToken,
      setRefreshToken,
    }),
    [user, accessToken, refreshToken]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

AuthProvider.defaultProps = {
  children: null,
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
