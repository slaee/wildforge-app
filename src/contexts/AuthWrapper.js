import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export function AuthWrapper({ isAuthenticated }) {
  return isAuthenticated ? (
    <Navigate to="/classes" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
AuthWrapper.defaultProps = {
  isAuthenticated: false,
};
AuthWrapper.propTypes = {
  isAuthenticated: PropTypes.bool,
};
