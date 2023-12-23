import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

function ClassCards({ id, name, section, schedule }) {
  const { user } = useAuth();
  const isModerator = user.role;

  const cardLink = isModerator ? `/classes/${id}` : `/classes/${id}/teams`;

  return (
    <Link to={cardLink} className="text-decoration-none">
      <div className="class-card d-flex flex-column justify-content-center p-5">
        <div className="text-center fw-bold fs-3">{name}</div>
        <div className="text-center fw-semibold">{section}</div>
        <div className="text-center fw-semibold">{schedule}</div>
      </div>
    </Link>
  );
}

ClassCards.defaultProps = {
  id: 0,
  name: '',
  section: '',
  schedule: '',
};

ClassCards.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  section: PropTypes.string,
  schedule: PropTypes.string,
};

export default ClassCards;
