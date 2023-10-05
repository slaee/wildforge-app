import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GLOBALS from '../app_globals';
import Header from '../components/header';

export function PrivateRoute({ forUserType, children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (
    user &&
    (forUserType === GLOBALS.USER_TYPES.TEACHER ||
      forUserType === GLOBALS.USER_TYPES.ADMIN ||
      forUserType === GLOBALS.USER_TYPES.TEAM_LEADER ||
      forUserType === GLOBALS.USER_TYPES.STUDENT)
  ) {
    return <Navigate to="/classes" />;
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
}

PrivateRoute.defaultProps = {
  children: null,
};

PrivateRoute.propTypes = {
  forUserType: PropTypes.oneOf([
    GLOBALS.USER_TYPES.ANY,
    GLOBALS.USER_TYPES.STUDENT,
    GLOBALS.USER_TYPES.TEACHER,
    GLOBALS.USER_TYPES.ADMIN,
    GLOBALS.USER_TYPES.TEAM_LEADER,
  ]),
  children: PropTypes.any,
};
