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
  const [user, setUser_] = useState(null);
  const [accessToken, setAccessToken_] = useState(null);
  const [refreshToken, setRefreshToken_] = useState(null);

  const setUser = (newUser) => {
    if (newUser) {
      Cookies.set('user', newUser);
    } else {
      Cookies.remove('user');
    }

    setUser_(newUser);
  };

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
