import React, { useState, createContext, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

const AuthContext = createContext({
  user: null,
  loginUpdate: () => {},
  loginRestart: () => {},
});

const cookies = new Cookies();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(cookies.get('user'));

  const loginUpdate = (userData) => {
    cookies.set('user', userData, {
      path: '/',
    });

    setUser(userData);
  };

  const loginRestart = () => {
    cookies.remove('user', {
      path: '/',
    });

    cookies.remove('accessToken', {
      path: '/',
    });

    cookies.remove('refreshToken', {
      path: '/',
    });

    setUser(null);
  };

  const authContextValue = useMemo(
    () => ({
      user,
      loginUpdate,
      loginRestart,
    }),
    [user]
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
