import React, { useState, createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';

const AuthContext = createContext({
  user: null,
  accessToken: null,
  refreshToken: null,
  setUser: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
});

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken_] = useState(Cookies.get('access_token'));
  const [refreshToken, setRefreshToken_] = useState(
    Cookies.get('refresh_token')
  );

  const setAccessToken = (newAccessToken) => {
    if (newAccessToken) {
      Cookies.set('access_token', newAccessToken, {
        secure: true,
        sameSite: 'strict',
      });
    } else {
      Cookies.remove('access_token');
    }

    setAccessToken_(newAccessToken);
  };

  const setRefreshToken = (newRefreshToken) => {
    if (newRefreshToken) {
      Cookies.set('refresh_token', newRefreshToken, {
        secure: true,
        sameSite: 'strict',
      });
    } else {
      Cookies.remove('refresh_token');
    }

    setRefreshToken_(newRefreshToken);
  };

  const authContextValue = useMemo(
    () => ({
      accessToken,
      refreshToken,
      setAccessToken,
      setRefreshToken,
    }),
    [accessToken, refreshToken]
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
