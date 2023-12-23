import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function NoAuthRoute({ children }) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/classes" />;
  }

  return children;
}

NoAuthRoute.defaultProps = {
  children: null,
};

NoAuthRoute.propTypes = {
  children: PropTypes.any,
};
